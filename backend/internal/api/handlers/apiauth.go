package handlers

import (
	"crypto/sha256"
	"encoding/hex"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"githubaltmanager/internal/api/resp"
	"githubaltmanager/internal/auth"
	"githubaltmanager/internal/model"
	"gorm.io/gorm"
)

// VerifyAPIKey 验证 API Key
func VerifyAPIKey(db *gorm.DB, keyStr string) (*model.APIKey, bool) {
	if len(keyStr) < 10 || !strings.HasPrefix(keyStr, "gam_") {
		return nil, false
	}
	h := sha256.Sum256([]byte(keyStr))
	hash := hex.EncodeToString(h[:])
	var apikey model.APIKey
	if err := db.Where("key_hash = ? AND enabled = ?", hash, true).First(&apikey).Error; err != nil {
		return nil, false
	}
	if apikey.ExpiresAt != nil && apikey.ExpiresAt.Before(time.Now()) {
		return nil, false
	}
	now := time.Now()
	db.Model(&model.APIKey{}).Where("id = ?", apikey.ID).Update("last_used_at", &now)
	return &apikey, true
}

// DualAuthMiddleware 同时支持 JWT Bearer 和 X-API-Key 认证
func DualAuthMiddleware(jwtSecret string, db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Try API Key first (X-API-Key header)
		apiKey := strings.TrimSpace(c.GetHeader("X-API-Key"))
		if apiKey != "" {
			if _, ok := VerifyAPIKey(db, apiKey); ok {
				c.Next()
				return
			}
			resp.Abort(c, 401, "invalid_api_key", "API Key 无效或已过期")
			return
		}
		// Fall back to JWT Bearer token
		token := strings.TrimSpace(c.GetHeader("Authorization"))
		token = strings.TrimPrefix(token, "Bearer ")
		if token == "" {
			resp.Abort(c, 401, "unauthorized", "请提供 X-API-Key 或 Authorization 头")
			return
		}
		if _, err := auth.ParseToken(token, jwtSecret); err != nil {
			resp.Abort(c, 401, "unauthorized", "登录已失效")
			return
		}
		c.Next()
	}
}
