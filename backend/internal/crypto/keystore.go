package crypto

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"fmt"
	"sync"

	"golang.org/x/crypto/argon2"
)

// KeyParams Argon2id 派生参数
type KeyParams struct {
	Iterations uint32
	Memory     uint32 // KB
	Parallel   uint8
	KeyLen     uint32 // 输出密钥长度 (32 = AES-256)
}

// DefaultKeyParams 合理默认值
func DefaultKeyParams() KeyParams {
	return KeyParams{Iterations: 3, Memory: 64 * 1024, Parallel: 2, KeyLen: 32}
}

// DeriveKey 由 master 密码 + 盐派生 AES-256 密钥
func DeriveKey(masterPassword string, saltHex string, p KeyParams) ([]byte, error) {
	salt, err := hex.DecodeString(saltHex)
	if err != nil {
		return nil, fmt.Errorf("invalid salt hex: %w", err)
	}
	if len(salt) < 8 {
		return nil, errors.New("salt too short (need >= 8 bytes)")
	}
	return argon2.IDKey([]byte(masterPassword), salt, p.Iterations, p.Memory, p.Parallel, p.KeyLen), nil
}

// RandomHex 生成 n 字节的随机 hex 字符串
func RandomHex(n int) (string, error) {
	b := make([]byte, n)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return hex.EncodeToString(b), nil
}

// ===== 内存密钥仓库 =====
// KeyStore 管理运行时驻留的 AES 密钥。
// 服务重启后密钥丢失，需要重新登录（master 密码）才能恢复解密能力。
type KeyStore struct {
	mu       sync.RWMutex
	masterKey []byte // 32 bytes AES-256 key；nil 表示尚未解锁
}

var globalKS = &KeyStore{}

// SetMasterKey 写入主密钥（登录/初始化后调用）
func SetMasterKey(key []byte) {
	globalKS.mu.Lock()
	defer globalKS.mu.Unlock()
	k := make([]byte, len(key))
	copy(k, key)
	globalKS.masterKey = k
}

// ClearMasterKey 清除主密钥（登出/关闭时）
func ClearMasterKey() {
	globalKS.mu.Lock()
	defer globalKS.mu.Unlock()
	globalKS.masterKey = nil
}

// IsUnlocked 是否已解锁
func IsUnlocked() bool {
	globalKS.mu.RLock()
	defer globalKS.mu.RUnlock()
	return globalKS.masterKey != nil
}

// GetMasterKey 读取主密钥；未解锁返回错误
func GetMasterKey() ([]byte, error) {
	globalKS.mu.RLock()
	defer globalKS.mu.RUnlock()
	if globalKS.masterKey == nil {
		return nil, errors.New("keystore locked: please login first")
	}
	k := make([]byte, len(globalKS.masterKey))
	copy(k, globalKS.masterKey)
	return k, nil
}

// EncryptField 加密单个字段（便捷封装）
func EncryptField(plaintext string) (string, error) {
	key, err := GetMasterKey()
	if err != nil {
		return "", err
	}
	if plaintext == "" {
		return "", nil
	}
	return EncryptString(key, plaintext)
}

// DecryptField 解密单个字段（便捷封装）
func DecryptField(ciphertextB64 string) (string, error) {
	if ciphertextB64 == "" {
		return "", nil
	}
	key, err := GetMasterKey()
	if err != nil {
		return "", err
	}
	return DecryptString(key, ciphertextB64)
}
