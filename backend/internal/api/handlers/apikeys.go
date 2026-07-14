package handlers

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"githubaltmanager/internal/api/resp"
	"githubaltmanager/internal/model"
	"githubaltmanager/internal/service"
)

type APIKeyHandler struct {
	c *service.Container
}

func NewAPIKeyHandler(c *service.Container) *APIKeyHandler {
	return &APIKeyHandler{c: c}
}

func RegisterAPIKeyRoutes(g *gin.RouterGroup, c *service.Container) {
	h := NewAPIKeyHandler(c)
	grp := g.Group("/apikeys")
	{
		grp.GET("", h.List)
		grp.POST("", h.Create)
		grp.DELETE("/:id", h.Delete)
		grp.PUT("/:id/toggle", h.Toggle)
	}
}

func generateAPIKey() (fullKey, hash, prefix string) {
	b := make([]byte, 32)
	rand.Read(b)
	fullKey = "gam_" + hex.EncodeToString(b)
	h := sha256.Sum256([]byte(fullKey))
	hash = hex.EncodeToString(h[:])
	prefix = fullKey[:14]
	return
}

type CreateAPIKeyPayload struct {
	Name      string `json:"name" binding:"required"`
	ExpiresIn int    `json:"expires_in_days"`
}

func (h *APIKeyHandler) Create(c *gin.Context) {
	var p CreateAPIKeyPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "name required", err)
		return
	}
	fullKey, hash, prefix := generateAPIKey()
	key := model.APIKey{
		Name:      p.Name,
		KeyHash:   hash,
		KeyPrefix: prefix,
		Enabled:   true,
	}
	if p.ExpiresIn > 0 {
		exp := time.Now().AddDate(0, 0, p.ExpiresIn)
		key.ExpiresAt = &exp
	}
	if err := h.c.DB.Create(&key).Error; err != nil {
		resp.Internal(c, "create failed", err)
		return
	}
	resp.Created(c, gin.H{
		"id":         key.ID,
		"name":       key.Name,
		"key":        fullKey,
		"key_prefix": prefix,
		"expires_at": key.ExpiresAt,
		"created_at": key.CreatedAt,
		"note":       "请保存此密钥，之后将无法再次查看",
	})
}

func (h *APIKeyHandler) List(c *gin.Context) {
	var keys []model.APIKey
	h.c.DB.Order("id DESC").Find(&keys)
	out := make([]gin.H, 0, len(keys))
	for _, k := range keys {
		out = append(out, gin.H{
			"id":           k.ID,
			"name":         k.Name,
			"key_prefix":   k.KeyPrefix,
			"enabled":      k.Enabled,
			"last_used_at": k.LastUsedAt,
			"expires_at":   k.ExpiresAt,
			"created_at":   k.CreatedAt,
		})
	}
	resp.OK(c, out)
}

func (h *APIKeyHandler) Delete(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	h.c.DB.Delete(&model.APIKey{}, id)
	resp.OK(c, gin.H{"ok": true})
}

func (h *APIKeyHandler) Toggle(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	var key model.APIKey
	h.c.DB.First(&key, id)
	key.Enabled = !key.Enabled
	h.c.DB.Save(&key)
	resp.OK(c, gin.H{"ok": true, "enabled": key.Enabled})
}
