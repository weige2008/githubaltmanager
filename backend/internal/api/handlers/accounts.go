package handlers

import (
	"errors"
	"strconv"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"githubaltmanager/internal/api/resp"
	"githubaltmanager/internal/crypto"
	"githubaltmanager/internal/github"
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
		grp.GET("/:id/profile", h.GetGitHubProfile)
		grp.PATCH("/:id/profile", h.UpdateGitHubProfile)
		grp.GET("/:id/email-visibility", h.GetEmailVisibility)
		grp.PATCH("/:id/email-visibility", h.SetEmailVisibility)
		grp.PUT("/:id", h.Update)
		grp.DELETE("/:id", h.Delete)
		grp.POST("/:id/restore", h.Restore)
		grp.POST("/:id/check", h.CheckStatus)
		grp.POST("/batch-check", h.BatchCheckStatus)
		grp.POST("/batch-check-group", h.BatchCheckByGroup)
		grp.POST("/export", h.Export)
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
	// 导入后立即做一次完整检测（API + 网页双探测），区分正常/受限/封禁/Token过期，
	// 而非固定标记 active；检测失败（如网络抖动）则保留导入时的默认状态
	if checked, err := h.s.CheckStatus(h.c, acc.ID); err == nil {
		acc = checked
	}
	// 3 分钟后自动复检一次：新账户信息在 GitHub 侧可能延迟生效，首检存在偏差
	h.s.ScheduleRecheck(h.c, acc.ID, 3*time.Minute)
	resp.Created(c, h.s.ToOut(acc))
}

// countMaps 一次 GROUP BY 查询返回每个账户的仓库/工作流/定时任务数量，避免 N+1
func (h *AccountHandler) countMaps() (repo, wf, task map[uint]int64) {
	type cnt struct {
		AccountID uint  `json:"account_id"`
		Cnt       int64 `json:"cnt"`
	}
	repo, wf, task = map[uint]int64{}, map[uint]int64{}, map[uint]int64{}
	var rows []cnt
	if err := h.c.DB.Model(&model.Repository{}).Select("account_id, COUNT(*) AS cnt").Group("account_id").Scan(&rows).Error; err == nil {
		for _, r := range rows {
			repo[r.AccountID] = r.Cnt
		}
	}
	if err := h.c.DB.Model(&model.Workflow{}).Select("account_id, COUNT(*) AS cnt").Group("account_id").Scan(&rows).Error; err == nil {
		for _, r := range rows {
			wf[r.AccountID] = r.Cnt
		}
	}
	if err := h.c.DB.Model(&model.ScheduledTask{}).Select("account_id, COUNT(*) AS cnt").Group("account_id").Scan(&rows).Error; err == nil {
		for _, r := range rows {
			task[r.AccountID] = r.Cnt
		}
	}
	return
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
	repoCnt, wfCnt, taskCnt := h.countMaps()
	out := make([]service.AccountOut, 0, len(accs))
	for i := range accs {
		o := h.s.ToOut(&accs[i])
		o.RepoCount = repoCnt[accs[i].ID]
		o.WorkflowCount = wfCnt[accs[i].ID]
		o.TaskCount = taskCnt[accs[i].ID]
		out = append(out, o)
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
	repoCnt, wfCnt, taskCnt := h.countMaps()
	out := h.s.ToOut(acc)
	out.RepoCount = repoCnt[acc.ID]
	out.WorkflowCount = wfCnt[acc.ID]
	out.TaskCount = taskCnt[acc.ID]
	resp.OK(c, out)
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

// Export 全量导出账户数据（含解密后的 token/密码/恢复邮箱），POST /api/accounts/export
func (h *AccountHandler) Export(c *gin.Context) {
	if !crypto.IsUnlocked() {
		resp.BadRequest(c, "密钥未解锁，请先登录后再导出", nil)
		return
	}
	var p BatchCheckPayload
	if err := c.ShouldBindJSON(&p); err != nil || len(p.IDs) == 0 {
		resp.BadRequest(c, "请提供 ids", err)
		return
	}
	// 内存保护：ids 数量上限（正常使用远达不到）
	if len(p.IDs) > 2000 {
		resp.BadRequest(c, "单次导出最多 2000 个账户", nil)
		return
	}
	items := make([]gin.H, 0, len(p.IDs))
	for _, id := range p.IDs {
		acc, err := h.s.GetActive(uint(id))
		if err != nil {
			continue // 不存在或已删除，跳过
		}
		token, tokErr := crypto.DecryptField(acc.TokenEnc)
		password, _ := crypto.DecryptField(acc.PasswordEnc)
		email, _ := crypto.DecryptField(acc.RecoveryEmail)
		items = append(items, gin.H{
			"id": acc.ID, "github_id": acc.GithubID,
			"login": acc.GithubLogin, "display_name": acc.DisplayName,
			"status": acc.Status, "status_reason": acc.StatusReason,
			"group": acc.Group, "note": acc.Note,
			"token": func() string { if tokErr != nil { return "" }; return token }(),
			"password": password, "recovery_email": email,
			"token_scopes": acc.TokenScopes,
			"github_created_at": acc.GithubCreatedAt, "last_checked_at": acc.LastCheckedAt,
			"created_at": acc.CreatedAt, "updated_at": acc.UpdatedAt,
			"html_url": "https://github.com/" + acc.GithubLogin,
		})
	}
	resp.OK(c, gin.H{"items": items, "count": len(items)})
}

// GetGitHubProfile 拉取账户当前 GitHub 公开资料（GET /api/accounts/:id/profile）
func (h *AccountHandler) GetGitHubProfile(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	if _, err := h.s.GetActive(uint(id)); err != nil {
		resp.NotFound(c, "账户不存在")
		return
	}
	u, err := h.s.GetGitHubProfile(h.c, uint(id))
	if err != nil {
		resp.Internal(c, "获取资料失败: "+err.Error(), err)
		return
	}
	resp.OK(c, u)
}

// UpdateGitHubProfilePayload 更新 GitHub 公开资料请求体（指针为 nil 表示不修改该字段）
type UpdateGitHubProfilePayload struct {
	Name            *string `json:"name"`
	Email           *string `json:"email"`
	Blog            *string `json:"blog"`
	Company         *string `json:"company"`
	Location        *string `json:"location"`
	Bio             *string `json:"bio"`
	TwitterUsername *string `json:"twitter_username"`
}

// UpdateGitHubProfile 通过账户 token 更新 GitHub 公开资料（PATCH /api/accounts/:id/profile）
func (h *AccountHandler) UpdateGitHubProfile(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	var p UpdateGitHubProfilePayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	if _, err := h.s.GetActive(uint(id)); err != nil {
		resp.NotFound(c, "账户不存在")
		return
	}
	payload := github.UpdateUserProfilePayload{
		Name:            p.Name,
		Email:           p.Email,
		Blog:            p.Blog,
		Company:         p.Company,
		Location:        p.Location,
		Bio:             p.Bio,
		TwitterUsername: p.TwitterUsername,
	}
	u, err := h.s.UpdateGitHubProfile(h.c, uint(id), payload)
	if err != nil {
		// 透传 GitHub 的状态码与原因（如 422：公开邮箱未验证）
		var apiErr *github.APIError
		if errors.As(err, &apiErr) {
			resp.Fail(c, apiErr.Status, "github_error", apiErr.Error())
			return
		}
		resp.Internal(c, "更新资料失败: "+err.Error(), err)
		return
	}
	resp.OK(c, u)
}

// GetEmailVisibility 返回账户主邮箱及其公开可见性（GET /api/accounts/:id/email-visibility）
func (h *AccountHandler) GetEmailVisibility(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	if _, err := h.s.GetActive(uint(id)); err != nil {
		resp.NotFound(c, "账户不存在")
		return
	}
	email, visibility, err := h.s.GetEmailVisibility(h.c, uint(id))
	if err != nil {
		resp.Internal(c, "获取邮箱可见性失败: "+err.Error(), err)
		return
	}
	resp.OK(c, gin.H{"email": email, "visibility": visibility})
}

// SetEmailVisibilityPayload 设置主邮箱公开可见性请求体
type SetEmailVisibilityPayload struct {
	Visibility string `json:"visibility" binding:"required,oneof=public private"`
}

// SetEmailVisibility 设置账户主邮箱公开可见性（PATCH /api/accounts/:id/email-visibility）
func (h *AccountHandler) SetEmailVisibility(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	var p SetEmailVisibilityPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "visibility 必须为 public 或 private", err)
		return
	}
	if _, err := h.s.GetActive(uint(id)); err != nil {
		resp.NotFound(c, "账户不存在")
		return
	}
	if err := h.s.SetEmailVisibility(h.c, uint(id), p.Visibility); err != nil {
		var apiErr *github.APIError
		if errors.As(err, &apiErr) {
			resp.Fail(c, apiErr.Status, "github_error", apiErr.Error())
			return
		}
		resp.Internal(c, "设置失败: "+err.Error(), err)
		return
	}
	resp.OK(c, gin.H{"ok": true, "visibility": p.Visibility})
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

// runCheckPool 账户级有界并发执行封禁检测（并发数 GAM_AUTOCHECK_CONCURRENCY，默认 10），结果保持请求顺序
func (h *AccountHandler) runCheckPool(ids []uint) []gin.H {
	workers := h.c.CFG.Scheduler.AutoCheckConcurrency
	if workers < 1 {
		workers = 1
	}
	results := make([]gin.H, len(ids))
	sem := make(chan struct{}, workers)
	var wg sync.WaitGroup
	for i, id := range ids {
		wg.Add(1)
		sem <- struct{}{}
		go func(i int, id uint) {
			defer wg.Done()
			defer func() { <-sem }()
			acc, err := h.s.CheckStatus(h.c, id)
			if err != nil {
				results[i] = gin.H{"id": id, "ok": false, "error": err.Error()}
			} else {
				results[i] = gin.H{"id": id, "ok": true, "status": acc.Status, "reason": acc.StatusReason}
			}
		}(i, id)
	}
	wg.Wait()
	return results
}

func (h *AccountHandler) BatchCheckStatus(c *gin.Context) {
	var p BatchCheckPayload
	if err := c.ShouldBindJSON(&p); err != nil || len(p.IDs) == 0 {
		resp.BadRequest(c, "请提供 ids", err)
		return
	}
	// 内存保护上限（正常使用远达不到）
	if len(p.IDs) > 5000 {
		resp.BadRequest(c, "单次最多 5000 个账户", nil)
		return
	}
	// 有界并发执行；不再限制 100 个（数量越多耗时越长，前端 300 秒超时后后端仍会跑完）
	resp.OK(c, gin.H{"results": h.runCheckPool(p.IDs)})
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
	query.Find(&accs)
	ids := make([]uint, len(accs))
	for i, a := range accs {
		ids[i] = a.ID
	}
	// 有界并发执行（与 batch-check 相同的池）
	resp.OK(c, gin.H{"results": h.runCheckPool(ids), "total": len(accs)})
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
