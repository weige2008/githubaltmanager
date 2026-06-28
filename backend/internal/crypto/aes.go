package crypto

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"errors"
	"fmt"
)

// Encrypt 使用 AES-256-GCM 加密明文，返回 base64( nonce || ciphertext )
func Encrypt(key, plaintext []byte) (string, error) {
	if len(key) != 32 {
		return "", fmt.Errorf("invalid key length: want 32, got %d", len(key))
	}
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", fmt.Errorf("new cipher: %w", err)
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", fmt.Errorf("new gcm: %w", err)
	}
	nonce := make([]byte, gcm.NonceSize())
	if _, err := rand.Read(nonce); err != nil {
		return "", fmt.Errorf("read nonce: %w", err)
	}
	// 注意：nonce 会追加到 ciphertext 后面，但 GCM 的 Seal 推荐传 dst=nonce
	out := gcm.Seal(nonce, nonce, plaintext, nil)
	return base64.StdEncoding.EncodeToString(out), nil
}

// Decrypt 解密 Encrypt 产出的密文
func Decrypt(key []byte, ciphertextB64 string) ([]byte, error) {
	if len(key) != 32 {
		return nil, fmt.Errorf("invalid key length: want 32, got %d", len(key))
	}
	raw, err := base64.StdEncoding.DecodeString(ciphertextB64)
	if err != nil {
		return nil, fmt.Errorf("base64 decode: %w", err)
	}
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, fmt.Errorf("new cipher: %w", err)
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, fmt.Errorf("new gcm: %w", err)
	}
	ns := gcm.NonceSize()
	if len(raw) < ns {
		return nil, errors.New("ciphertext too short")
	}
	nonce, ct := raw[:ns], raw[ns:]
	pt, err := gcm.Open(nil, nonce, ct, nil)
	if err != nil {
		return nil, fmt.Errorf("gcm open: %w", err)
	}
	return pt, nil
}

// EncryptString 便捷封装
func EncryptString(key []byte, plaintext string) (string, error) {
	return Encrypt(key, []byte(plaintext))
}

// DecryptString 便捷封装
func DecryptString(key []byte, ciphertextB64 string) (string, error) {
	pt, err := Decrypt(key, ciphertextB64)
	if err != nil {
		return "", err
	}
	return string(pt), nil
}
