package handlers

import (
	"errors"
	"strings"

	"github.com/gin-gonic/gin"
	"githubaltmanager/internal/api/resp"
	"githubaltmanager/internal/auth"
	"githubaltmanager/internal/crypto"
	"githubaltmanager/internal/model"
	"githubaltmanager/internal/service"
	"gorm.io/gorm"
)

type AuthHandler struct {
	c *service.Container
}

func NewAuthHandler(c *service.Container) *AuthHandler { return &AuthHandler{c: c} }

// Status GET /api/auth/status
func (h *AuthHandler) Status(c *gin.Context) {
	var cfg model.AppConfig
	err := h.c.DB.First(&cfg, 1).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		resp.OK(c, gin.H{"isInitialized": false})
		return
	}
	if err != nil {
		resp.Internal(c, "查询配置失败", err)
		return
	}
	resp.OK(c, gin.H{"isInitialized": cfg.IsInitialized})
}

type SetupPayload struct {
	MasterPassword string `json:"masterPassword" binding:"required,min=8"`
}

// Setup POST /api/auth/setup
func (h *AuthHandler) Setup(c *gin.Context) {
	var p SetupPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误：密码至少 8 位", err)
		return
	}

	var cfg model.AppConfig
	err := h.c.DB.First(&cfg, 1).Error
	if err == nil && cfg.IsInitialized {
		resp.BadRequest(c, "系统已初始化，请直接登录")
		return
	}

	params := h.c.KeyParams()
	hash, err := auth.HashMasterPassword(p.MasterPassword, h.c.CFG.Security.MasterSalt, params)
	if err != nil {
		resp.Internal(c, "哈希失败", err)
		return
	}

	cfg = model.AppConfig{
		BaseModel:          model.BaseModel{ID: 1},
		MasterPasswordHash: hash,
		IsInitialized:      true,
	}
	if err := h.c.DB.Save(&cfg).Error; err != nil {
		resp.Internal(c, "保存配置失败", err)
		return
	}

	key, err := crypto.DeriveKey(p.MasterPassword, h.c.CFG.Security.MasterSalt, params)
	if err != nil {
		resp.Internal(c, "派生密钥失败", err)
		return
	}
	crypto.SetMasterKey(key)

	token, err := auth.IssueToken(h.c.CFG.Security.JWTSecret)
	if err != nil {
		resp.Internal(c, "签发 token 失败", err)
		return
	}
	resp.OK(c, gin.H{"token": token})
}

type LoginPayload struct {
	MasterPassword string `json:"masterPassword" binding:"required"`
}

// Login POST /api/auth/login
func (h *AuthHandler) Login(c *gin.Context) {
	var p LoginPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "请输入主密码", err)
		return
	}

	var cfg model.AppConfig
	if err := h.c.DB.First(&cfg, 1).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			resp.BadRequest(c, "系统尚未初始化")
			return
		}
		resp.Internal(c, "读取配置失败", err)
		return
	}
	if !cfg.IsInitialized {
		resp.BadRequest(c, "系统尚未初始化")
		return
	}

	params := h.c.KeyParams()
	ok, err := auth.VerifyMasterPassword(p.MasterPassword, cfg.MasterPasswordHash, h.c.CFG.Security.MasterSalt, params)
	if err != nil {
		resp.Internal(c, "校验失败", err)
		return
	}
	if !ok {
		resp.Unauthorized(c, "主密码错误")
		return
	}

	key, err := crypto.DeriveKey(p.MasterPassword, h.c.CFG.Security.MasterSalt, params)
	if err != nil {
		resp.Internal(c, "派生密钥失败", err)
		return
	}
	crypto.SetMasterKey(key)

	token, err := auth.IssueToken(h.c.CFG.Security.JWTSecret)
	if err != nil {
		resp.Internal(c, "签发 token 失败", err)
		return
	}
	resp.OK(c, gin.H{"token": token})
}

type ChangePasswordPayload struct {
	OldPassword string `json:"oldPassword" binding:"required"`
	NewPassword string `json:"newPassword" binding:"required,min=8"`
}

// ChangePassword POST /api/auth/change-password
func (h *AuthHandler) ChangePassword(c *gin.Context) {
	var p ChangePasswordPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误：新密码至少 8 位", err)
		return
	}

	var cfg model.AppConfig
	if err := h.c.DB.First(&cfg, 1).Error; err != nil {
		resp.Internal(c, "读取配置失败", err)
		return
	}
	params := h.c.KeyParams()
	ok, err := auth.VerifyMasterPassword(p.OldPassword, cfg.MasterPasswordHash, h.c.CFG.Security.MasterSalt, params)
	if err != nil {
		resp.Internal(c, "校验失败", err)
		return
	}
	if !ok {
		resp.Unauthorized(c, "原密码错误")
		return
	}

	oldKey, err := crypto.DeriveKey(p.OldPassword, h.c.CFG.Security.MasterSalt, params)
	if err != nil {
		resp.Internal(c, "派生旧密钥失败", err)
		return
	}
	newKey, err := crypto.DeriveKey(p.NewPassword, h.c.CFG.Security.MasterSalt, params)
	if err != nil {
		resp.Internal(c, "派生新密钥失败", err)
		return
	}

	if err := reencryptAccounts(h.c.DB, oldKey, newKey); err != nil {
		resp.Internal(c, "重新加密账户数据失败", err)
		return
	}

	newHash, err := auth.HashMasterPassword(p.NewPassword, h.c.CFG.Security.MasterSalt, params)
	if err != nil {
		resp.Internal(c, "新密码哈希失败", err)
		return
	}
	cfg.MasterPasswordHash = newHash
	if err := h.c.DB.Save(&cfg).Error; err != nil {
		resp.Internal(c, "保存配置失败", err)
		return
	}

	crypto.SetMasterKey(newKey)
	resp.OK(c, gin.H{"ok": true})
}

func reencryptAccounts(db *gorm.DB, oldKey, newKey []byte) error {
	var accs []model.Account
	if err := db.Find(&accs).Error; err != nil {
		return err
	}
	for i := range accs {
		a := &accs[i]
		updates := map[string]any{}
		if a.TokenEnc != "" {
			if pt, err := crypto.Decrypt(oldKey, a.TokenEnc); err == nil {
				if nc, err := crypto.Encrypt(newKey, pt); err == nil {
					updates["token_enc"] = nc
				}
			}
		}
		if a.PasswordEnc != "" {
			if pt, err := crypto.Decrypt(oldKey, a.PasswordEnc); err == nil {
				if nc, err := crypto.Encrypt(newKey, pt); err == nil {
					updates["password_enc"] = nc
				}
			}
		}
		if a.RecoveryEmail != "" {
			if pt, err := crypto.Decrypt(oldKey, a.RecoveryEmail); err == nil {
				if nc, err := crypto.Encrypt(newKey, pt); err == nil {
					updates["recovery_email"] = nc
				}
			}
		}
		if len(updates) > 0 {
			if err := db.Model(a).Updates(updates).Error; err != nil {
				return err
			}
		}
	}
	return nil
}

// AuthMiddleware JWT 鉴权中间件
func AuthMiddleware(secret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		token := strings.TrimSpace(c.GetHeader("Authorization"))
		token = strings.TrimPrefix(token, "Bearer ")
		if token == "" {
			resp.Abort(c, 401, "unauthorized", "未登录")
			return
		}
		if _, err := auth.ParseToken(token, secret); err != nil {
			resp.Abort(c, 401, "unauthorized", "登录已失效")
			return
		}
		c.Next()
	}
}

// UnlockGuard 确保密钥已解锁
func UnlockGuard() gin.HandlerFunc {
	return func(c *gin.Context) {
		if !crypto.IsUnlocked() {
			resp.Abort(c, 401, "locked", "密钥未解锁，请重新登录")
			return
		}
		c.Next()
	}
}
