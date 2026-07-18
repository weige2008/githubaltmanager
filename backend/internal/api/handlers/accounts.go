package handlers

import (
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"githubaltmanager/internal/api/resp"
	"githubaltmanager/internal/crypto"
	"githubaltmanager/internal/model"
	"githubaltmanager/internal/service"

	"gorm.io/gorm"
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
		grp.POST("/:id/restore", h.Restore)
		grp.POST("/:id/check", h.CheckStatus)
		grp.POST("/batch-check", h.BatchCheckStatus)
		grp.POST("/batch-check-group", h.BatchCheckByGroup)
		grp.GET("/groups", h.ListGroups)
		grp.GET("/recycle-bin", h.ListRecycleBin)
		grp.DELETE("/recycle-bin/:id", h.PermanentDelete)
		grp.POST("/recycle-bin/clean", h.CleanRecycleBin)
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
	Group          string `json:"group"`
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
	if p.Group != "" {
		h.c.DB.Model(&model.Account{}).Where("id = ?", acc.ID).Update("account_group", p.Group)
		acc.Group = p.Group
	}
	resp.Created(c, h.s.ToOut(acc))
}

func (h *AccountHandler) List(c *gin.Context) {
	group := c.Query("group")
	query := h.c.DB.Where("deleted_at IS NULL")
	if group != "" {
		query = query.Where("account_group = ?", group)
	}
	var accs []model.Account
	if err := query.Find(&accs).Error; err != nil {
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
	acc, err := h.s.GetActive(uint(id))
	if err != nil {
		resp.NotFound(c, "账户不存在")
		return
	}
	resp.OK(c, h.s.ToOut(acc))
}

func (h *AccountHandler) GetSecrets(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	acc, err := h.s.GetActive(uint(id))
	if err != nil {
		resp.NotFound(c, "账户不存在")
		return
	}
	token, derr := crypto.DecryptField(acc.TokenEnc)
	if derr != nil {
		resp.Internal(c, "解密失败", derr)
		return
	}
	password, _ := crypto.DecryptField(acc.PasswordEnc)
	email, _ := crypto.DecryptField(acc.RecoveryEmail)
	resp.OK(c, gin.H{"token": token, "password": password, "email": email})
}

type UpdatePayload struct {
	Password      *string `json:"password"`
	RecoveryEmail *string `json:"recovery_email"`
	Note          *string `json:"note"`
	Group         *string `json:"group"`
}

func (h *AccountHandler) Update(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	var p UpdatePayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	_, err := h.s.Get(uint(id))
	if err != nil {
		resp.NotFound(c, "账户不存在")
		return
	}
	updates := map[string]any{}
	if p.Note != nil {
		updates["note"] = *p.Note
	}
	if p.Group != nil {
		updates["account_group"] = *p.Group
	}

	// Handle encrypted fields
	if p.Password != nil && *p.Password != "" {
		encPass, encErr := crypto.EncryptField(*p.Password)
		if encErr == nil {
			updates["password_enc"] = encPass
		}
	}
	if p.RecoveryEmail != nil && *p.RecoveryEmail != "" {
		encEmail, encErr := crypto.EncryptField(*p.RecoveryEmail)
		if encErr == nil {
			updates["recovery_email"] = encEmail
		}
	}

	if len(updates) > 0 {
		if dbErr := h.c.DB.Model(&model.Account{}).Where("id = ?", id).Updates(updates).Error; dbErr != nil {
			resp.Internal(c, "更新失败", dbErr)
			return
		}
	}
	acc, err := h.s.Get(uint(id))
	if err != nil {
		resp.Internal(c, "重新加载账户失败", err)
		return
	}
	resp.OK(c, h.s.ToOut(acc))
}

func (h *AccountHandler) Delete(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	// Soft delete - move to recycle bin & disable all scheduled tasks
	now := time.Now()
	err := h.c.DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Model(&model.Account{}).Where("id = ? AND deleted_at IS NULL", id).Update("deleted_at", &now).Error; err != nil {
			return err
		}
		return tx.Model(&model.ScheduledTask{}).Where("account_id = ?", id).Update("enabled", false).Error
	})
	if err != nil {
		resp.Internal(c, "删除失败", err)
		return
	}
	resp.OK(c, gin.H{"ok": true})
}

func (h *AccountHandler) Restore(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	// Restore account AND re-enable its scheduled tasks (which were disabled on soft-delete)
	err := h.c.DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Model(&model.Account{}).Where("id = ?", id).Update("deleted_at", nil).Error; err != nil {
			return err
		}
		return tx.Model(&model.ScheduledTask{}).Where("account_id = ?", id).Update("enabled", true).Error
	})
	if err != nil {
		resp.Internal(c, "恢复失败", err)
		return
	}
	resp.OK(c, gin.H{"ok": true})
}

func (h *AccountHandler) CheckStatus(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	if _, err := h.s.GetActive(uint(id)); err != nil {
		resp.NotFound(c, "账户不存在")
		return
	}
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
	if len(p.IDs) > 100 {
		resp.BadRequest(c, "最多 100 个账户", nil)
		return
	}
	results := make([]gin.H, 0, len(p.IDs))
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

type BatchCheckGroupPayload struct {
	Group string `json:"group"`
}

func (h *AccountHandler) BatchCheckByGroup(c *gin.Context) {
	var p BatchCheckGroupPayload
	c.ShouldBindJSON(&p)
	query := h.c.DB.Where("deleted_at IS NULL")
	if p.Group != "" {
		query = query.Where("account_group = ?", p.Group)
	}
	var accs []model.Account
	query.Limit(500).Find(&accs)
	results := make([]gin.H, 0, len(accs))
	for _, acc := range accs {
		result, err := h.s.CheckStatus(h.c, acc.ID)
		if err != nil {
			results = append(results, gin.H{"id": acc.ID, "ok": false, "error": err.Error()})
		} else {
			results = append(results, gin.H{"id": acc.ID, "ok": true, "status": result.Status, "reason": result.StatusReason})
		}
	}
	resp.OK(c, gin.H{"results": results, "total": len(accs)})
}

func (h *AccountHandler) ListGroups(c *gin.Context) {
	var groups []string
	h.c.DB.Model(&model.Account{}).Where("deleted_at IS NULL AND account_group != ''").Distinct("account_group").Pluck("account_group", &groups)
	resp.OK(c, groups)
}

func (h *AccountHandler) ListRecycleBin(c *gin.Context) {
	var accs []model.Account
	h.c.DB.Where("deleted_at IS NOT NULL").Find(&accs)
	out := make([]service.AccountOut, 0, len(accs))
	for i := range accs {
		out = append(out, h.s.ToOut(&accs[i]))
	}
	resp.OK(c, out)
}

// PermanentDelete 永久删除账户（连同关联的仓库/workflow/任务）
func (h *AccountHandler) PermanentDelete(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	err := h.c.DB.Transaction(func(tx *gorm.DB) error {
		tx.Where("account_id = ?", id).Delete(&model.Repository{})
		tx.Where("account_id = ?", id).Delete(&model.Workflow{})
		tx.Where("account_id = ?", id).Delete(&model.ScheduledTask{})
		return tx.Where("id = ?", id).Delete(&model.Account{}).Error
	})
	if err != nil {
		resp.Internal(c, "永久删除失败", err)
		return
	}
	resp.OK(c, gin.H{"ok": true})
}

// CleanRecycleBin 清理回收站中超过保留期的账户（连同关联行）
func (h *AccountHandler) CleanRecycleBin(c *gin.Context) {
	var cfg model.AppConfig
	h.c.DB.First(&cfg, 1)
	days := cfg.RecycleBinDays
	if days <= 0 {
		days = 30
	}
	threshold := time.Now().AddDate(0, 0, -days)

	var ids []uint
	if err := h.c.DB.Model(&model.Account{}).Where("deleted_at IS NOT NULL AND deleted_at < ?", threshold).Pluck("id", &ids).Error; err != nil {
		resp.Internal(c, "查询回收站失败", err)
		return
	}

	if len(ids) > 0 {
		err := h.c.DB.Transaction(func(tx *gorm.DB) error {
			tx.Where("account_id IN ?", ids).Delete(&model.Repository{})
			tx.Where("account_id IN ?", ids).Delete(&model.Workflow{})
			tx.Where("account_id IN ?", ids).Delete(&model.ScheduledTask{})
			return tx.Where("id IN ?", ids).Delete(&model.Account{}).Error
		})
		if err != nil {
			resp.Internal(c, "清理回收站失败", err)
			return
		}
	}

	now := time.Now()
	if err := h.c.DB.Model(&model.AppConfig{}).Where("id = 1").Update("recycle_bin_last_clean", &now).Error; err != nil {
		resp.Internal(c, "更新清理时间失败", err)
		return
	}
	resp.OK(c, gin.H{"ok": true, "cleaned_before": threshold.Format("2006-01-02")})
}
