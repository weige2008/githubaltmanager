package auth

import (
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// Claims JWT 自定义声明
type Claims struct {
	Sub string `json:"sub"` // 固定 "admin"
	jwt.RegisteredClaims
}

// IssueToken 签发一个 JWT（有效期 7 天）
func IssueToken(secret string) (string, error) {
	if secret == "" {
		return "", errors.New("empty jwt secret")
	}
	now := time.Now()
	claims := Claims{
		Sub: "admin",
		RegisteredClaims: jwt.RegisteredClaims{
			IssuedAt:  jwt.NewNumericDate(now),
			ExpiresAt: jwt.NewNumericDate(now.Add(7 * 24 * time.Hour)),
			Issuer:    "githubaltmanager",
		},
	}
	tok := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return tok.SignedString([]byte(secret))
}

// ParseToken 解析并验证 JWT，返回 claims
func ParseToken(tokenStr, secret string) (*Claims, error) {
	tokenStr = strings.TrimSpace(tokenStr)
	tokenStr = strings.TrimPrefix(tokenStr, "Bearer ")
	if tokenStr == "" {
		return nil, errors.New("empty token")
	}
	claims := &Claims{}
	tok, err := jwt.ParseWithClaims(tokenStr, claims, func(t *jwt.Token) (any, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}
		return []byte(secret), nil
	})
	if err != nil {
		return nil, err
	}
	if !tok.Valid {
		return nil, errors.New("invalid token")
	}
	return claims, nil
}
