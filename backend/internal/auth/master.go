package auth

import (
	"crypto/subtle"
	"encoding/base64"
	"errors"
	"fmt"
	"strings"

	"githubaltmanager/internal/crypto"

	"golang.org/x/crypto/argon2"
)

// HashMasterPassword 使用 Argon2id 对 master 密码做单向哈希存储
// 返回格式: argon2id$v=<iter>$m=<memory>$p=<parallel>$<salt_b64>$<hash_b64>
func HashMasterPassword(password string, saltHex string, p crypto.KeyParams) (string, error) {
	if password == "" {
		return "", errors.New("empty password")
	}
	salt, err := decodeHex(saltHex)
	if err != nil {
		return "", err
	}
	hash := argon2.IDKey([]byte(password), salt, p.Iterations, p.Memory, p.Parallel, 32)
	return fmt.Sprintf(
		"$argon2id$v=%d$m=%d$p=%d$%s$%s",
		p.Iterations, p.Memory, p.Parallel,
		base64.StdEncoding.EncodeToString(salt),
		base64.StdEncoding.EncodeToString(hash),
	), nil
}

// VerifyMasterPassword 校验密码与存储哈希是否匹配
func VerifyMasterPassword(password, storedHash, saltHex string, p crypto.KeyParams) (bool, error) {
	if storedHash == "" {
		return false, errors.New("empty stored hash")
	}
	salt, err := decodeHex(saltHex)
	if err != nil {
		return false, err
	}
	candidate := argon2.IDKey([]byte(password), salt, p.Iterations, p.Memory, p.Parallel, 32)
	candidateEnc := base64.StdEncoding.EncodeToString(candidate)

	want, err := parseHashB64(storedHash)
	if err != nil {
		return false, err
	}
	// constant-time compare
	if subtle.ConstantTimeCompare([]byte(candidateEnc), []byte(want)) != 1 {
		return false, nil
	}
	return true, nil
}

// parseHashB64 从存储格式提取最后的 base64 哈希部分
func parseHashB64(stored string) (string, error) {
	parts := strings.Split(stored, "$")
	if len(parts) < 6 {
		return "", fmt.Errorf("malformed hash")
	}
	return parts[len(parts)-1], nil
}

func decodeHex(s string) ([]byte, error) {
	if len(s) == 0 {
		return nil, errors.New("empty salt")
	}
	out := make([]byte, len(s)/2)
	n, err := hexDecode(s, out)
	if err != nil {
		return nil, err
	}
	return out[:n], nil
}

func hexDecode(s string, dst []byte) (int, error) {
	if len(s)%2 != 0 {
		return 0, errors.New("odd length hex")
	}
	for i := 0; i < len(s)/2; i++ {
		hi, err := hexNibble(s[i*2])
		if err != nil {
			return 0, err
		}
		lo, err := hexNibble(s[i*2+1])
		if err != nil {
			return 0, err
		}
		dst[i] = hi<<4 | lo
	}
	return len(s) / 2, nil
}

func hexNibble(c byte) (byte, error) {
	switch {
	case c >= '0' && c <= '9':
		return c - '0', nil
	case c >= 'a' && c <= 'f':
		return c - 'a' + 10, nil
	case c >= 'A' && c <= 'F':
		return c - 'A' + 10, nil
	}
	return 0, fmt.Errorf("invalid hex char %q", c)
}
