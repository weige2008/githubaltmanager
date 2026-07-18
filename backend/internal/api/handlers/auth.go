package handlers

import (
	"errors"
	"fmt"
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
	result := h.c.DB.Where("id = 1").Limit(1).Find(&cfg)
	if result.Error != nil {
		resp.Internal(c, "查询配置失败", result.Error)
		return
	}
	if result.RowsAffected == 0 {
		resp.OK(c, gin.H{"isInitialized": false})
		return
	}
	resp.OK(c, gin.H{"isInitialized": cfg.IsInitialized})
}

type SetupPayload struct {
	MasterPassword string `json:"masterPassword" binding:"required,min=12"`
}

// Setup POST /api/auth/setup
func (h *AuthHandler) Setup(c *gin.Context) {
	var p SetupPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误：密码至少 12 位", err)
		return
	}

	// Atomic check-and-create: only insert if row doesn't exist or is not initialized
	var cfg model.AppConfig
	result := h.c.DB.Where("id = 1").Limit(1).Find(&cfg)
	if result.Error != nil {
		resp.Internal(c, "读取配置失败", result.Error)
		return
	}
	if result.RowsAffected > 0 && cfg.IsInitialized {
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
	// 使用 Assign(...).FirstOrCreate 或 Create 仅在不存在时；为了防止并发竞争，
	// 我们用事务 + 行锁风格的条件 UPDATE
	tx := h.c.DB.Begin()
	var existing model.AppConfig
	tx.Where("id = 1 AND is_initialized = ?", true).Limit(1).Find(&existing)
	if existing.IsInitialized {
		tx.Rollback()
		resp.BadRequest(c, "系统已初始化，请直接登录")
		return
	}
	if err := tx.Save(&cfg).Error; err != nil {
		tx.Rollback()
		resp.Internal(c, "保存配置失败", err)
		return
	}
	if err := tx.Commit().Error; err != nil {
		resp.Internal(c, "提交事务失败", err)
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
	NewPassword string `json:"newPassword" binding:"required,min=12"`
}

// ChangePassword POST /api/auth/change-password
func (h *AuthHandler) ChangePassword(c *gin.Context) {
	var p ChangePasswordPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误：新密码至少 12 位", err)
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
	// 预先验证所有账户都能用 oldKey 解密；任一失败则中止，不进行任何写入
	type planned struct {
		id      uint
		updates map[string]any
	}
	plans := make([]planned, 0, len(accs))
	for i := range accs {
		a := &accs[i]
		p := planned{id: a.ID, updates: map[string]any{}}
		if a.TokenEnc != "" {
			pt, err := crypto.Decrypt(oldKey, a.TokenEnc)
			if err != nil {
				return fmt.Errorf("账户 %s 解密失败，已中止所有更改: %w", a.GithubLogin, err)
			}
			nc, err := crypto.Encrypt(newKey, pt)
			if err != nil {
				return fmt.Errorf("账户 %s 重新加密失败，已中止所有更改: %w", a.GithubLogin, err)
			}
			p.updates["token_enc"] = nc
		}
		if a.PasswordEnc != "" {
			pt, err := crypto.Decrypt(oldKey, a.PasswordEnc)
			if err != nil {
				return fmt.Errorf("账户 %s 密码解密失败，已中止所有更改: %w", a.GithubLogin, err)
			}
			nc, err := crypto.Encrypt(newKey, pt)
			if err != nil {
				return fmt.Errorf("账户 %s 密码重新加密失败，已中止所有更改: %w", a.GithubLogin, err)
			}
			p.updates["password_enc"] = nc
		}
		if a.RecoveryEmail != "" {
			pt, err := crypto.Decrypt(oldKey, a.RecoveryEmail)
			if err != nil {
				return fmt.Errorf("账户 %s 邮箱解密失败，已中止所有更改: %w", a.GithubLogin, err)
			}
			nc, err := crypto.Encrypt(newKey, pt)
			if err != nil {
				return fmt.Errorf("账户 %s 邮箱重新加密失败，已中止所有更改: %w", a.GithubLogin, err)
			}
			p.updates["recovery_email"] = nc
		}
		if len(p.updates) > 0 {
			plans = append(plans, p)
		}
	}
	// 所有账户都通过验证，现在原子地执行所有更新
	return db.Transaction(func(tx *gorm.DB) error {
		for _, p := range plans {
			if err := tx.Model(&model.Account{}).Where("id = ?", p.id).Updates(p.updates).Error; err != nil {
				return fmt.Errorf("账户 ID %d 更新失败: %w", p.id, err)
			}
		}
		return nil
	})
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
