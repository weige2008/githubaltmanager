package handlers

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"githubaltmanager/internal/api/resp"
	"githubaltmanager/internal/crypto"
	"githubaltmanager/internal/service"
)

type AccountHandler struct {
	c *service.Container
	s *service.AccountService
}

func NewAccountHandler(c *service.Container) *AccountHandler {
	return &AccountHandler{c: c, s: service.NewAccountService(c.DB)}
}

func RegisterAccountRoutes(g *gin.RouterGroup, c *service.Container) {
	h := NewAccountHandler(c)
	grp := g.Group("/accounts")
	{
		grp.GET("", h.List)
		grp.POST("/import", h.Import)
		grp.GET("/:id", h.Get)
		grp.GET("/:id/secrets", h.GetSecrets)
		grp.PUT("/:id", h.Update)
		grp.DELETE("/:id", h.Delete)
		grp.POST("/:id/check", h.CheckStatus)
		grp.POST("/batch-check", h.BatchCheckStatus)
		// 仓库/workflow 子路由
		grp.GET("/:id/repos", h.ListRepos)
		grp.POST("/:id/repos/refresh", h.RefreshRepos)
		grp.POST("/:id/scan-workflows", h.ScanWorkflows)
	}
}

type ImportPayload struct {
	Token          string `json:"token" binding:"required"`
	Password       string `json:"password"`
	RecoveryEmail  string `json:"recovery_email"`
	Note           string `json:"note"`
}

func (h *AccountHandler) Import(c *gin.Context) {
	var p ImportPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "token 不能为空", err)
		return
	}
	acc, err := h.s.ImportByToken(h.c, p.Token, p.Password, p.RecoveryEmail, p.Note)
	if err != nil {
		resp.BadRequest(c, "导入失败: "+err.Error(), err)
		return
	}
	resp.Created(c, h.s.ToOut(acc))
}

func (h *AccountHandler) List(c *gin.Context) {
	accs, err := h.s.List()
	if err != nil {
		resp.Internal(c, "查询失败", err)
		return
	}
	out := make([]service.AccountOut, 0, len(accs))
	for i := range accs {
		out = append(out, h.s.ToOut(&accs[i]))
	}
	resp.OK(c, out)
}

func (h *AccountHandler) Get(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	acc, err := h.s.Get(uint(id))
	if err != nil {
		resp.NotFound(c, "账户不存在")
		return
	}
	resp.OK(c, h.s.ToOut(acc))
}

// GetSecrets 解密并返回 token / password / email 明文
func (h *AccountHandler) GetSecrets(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	token, acc, err := h.s.GetDecryptedToken(uint(id))
	if err != nil {
		resp.NotFound(c, "账户不存在")
		return
	}
	password, _ := crypto.DecryptField(acc.PasswordEnc)
	email, _ := crypto.DecryptField(acc.RecoveryEmail)
	resp.OK(c, gin.H{
		"token":   token,
		"password": password,
		"email":   email,
	})
}

type UpdatePayload struct {
	Password      *string `json:"password"`
	RecoveryEmail *string `json:"recovery_email"`
	Note          *string `json:"note"`
}

func (h *AccountHandler) Update(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	var p UpdatePayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	acc, err := h.s.Update(uint(id), p.Password, p.RecoveryEmail, p.Note)
	if err != nil {
		resp.Internal(c, "更新失败", err)
		return
	}
	resp.OK(c, h.s.ToOut(acc))
}

func (h *AccountHandler) Delete(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	if err := h.s.Delete(uint(id)); err != nil {
		resp.Internal(c, "删除失败", err)
		return
	}
	resp.OK(c, gin.H{"ok": true})
}

func (h *AccountHandler) CheckStatus(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	acc, err := h.s.CheckStatus(h.c, uint(id))
	if err != nil {
		resp.Internal(c, "检测失败: "+err.Error(), err)
		return
	}
	resp.OK(c, h.s.ToOut(acc))
}

type BatchCheckPayload struct {
	IDs []uint `json:"ids" binding:"required"`
}

func (h *AccountHandler) BatchCheckStatus(c *gin.Context) {
	var p BatchCheckPayload
	if err := c.ShouldBindJSON(&p); err != nil || len(p.IDs) == 0 {
		resp.BadRequest(c, "请提供 ids", err)
		return
	}
	results := make([]gin.H, 0, len(p.IDs))
	// 并发处理
	for _, id := range p.IDs {
		acc, err := h.s.CheckStatus(h.c, id)
		if err != nil {
			results = append(results, gin.H{"id": id, "ok": false, "error": err.Error()})
		} else {
			results = append(results, gin.H{"id": id, "ok": true, "status": acc.Status, "reason": acc.StatusReason})
		}
	}
	resp.OK(c, gin.H{"results": results})
}
