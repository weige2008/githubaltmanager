package handlers

import (
	"fmt"
	"sync"

	"github.com/gin-gonic/gin"
	"githubaltmanager/internal/api/resp"
	"githubaltmanager/internal/service"
)

// runIndexed 有界并发执行（workers 为并发数，<1 时取 1）
func runIndexed(items int, workers int, fn func(i int)) {
	if workers < 1 {
		workers = 1
	}
	sem := make(chan struct{}, workers)
	var wg sync.WaitGroup
	for i := 0; i < items; i++ {
		wg.Add(1)
		sem <- struct{}{}
		go func(i int) {
			defer wg.Done()
			defer func() { <-sem }()
			fn(i)
		}(i)
	}
	wg.Wait()
}

// splitSuccessFailed 把按索引的结果数组按成功/失败拆分（保持顺序）
func splitSuccessFailed(results []gin.H) (success, failed []gin.H) {
	success = []gin.H{}
	failed = []gin.H{}
	for _, r := range results {
		if r["error"] != nil {
			failed = append(failed, r)
		} else {
			success = append(success, r)
		}
	}
	return
}

type BatchHandler struct {
	c *service.Container
	s *service.RepoService
}

func NewBatchHandler(c *service.Container) *BatchHandler {
	return &BatchHandler{c: c, s: service.NewRepoService(c.DB)}
}

func RegisterBatchRoutes(g *gin.RouterGroup, c *service.Container) {
	h := NewBatchHandler(c)
	grp := g.Group("/batch")
	{
		grp.POST("/create-workflows", h.CreateWorkflows)
		grp.POST("/dispatch", h.Dispatch)
		grp.POST("/create-repos", h.CreateRepos)
		grp.POST("/fetch-template", h.FetchTemplate)
		grp.POST("/update-repos", h.UpdateRepos)
		grp.POST("/set-secrets", h.SetSecrets)
		grp.POST("/delete-secrets", h.DeleteSecrets)
		grp.POST("/toggle-visibility", h.ToggleVisibility)
		grp.POST("/star", h.BatchStar)
		grp.POST("/unstar", h.BatchUnstar)
		grp.POST("/follow", h.BatchFollow)
		grp.POST("/unfollow", h.BatchUnfollow)
	}
}

type BatchCreateWorkflowsPayload struct {
	RepoIDs       []uint `json:"repo_ids" binding:"required"`
	Filename      string `json:"filename" binding:"required"`
	Content       string `json:"content" binding:"required"`
	CommitMessage string `json:"commit_message"`
	Branch        string `json:"branch"`
}

func (h *BatchHandler) CreateWorkflows(c *gin.Context) {
	var p BatchCreateWorkflowsPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	if len(p.RepoIDs) == 0 {
		resp.BadRequest(c, "请提供 repo_ids", nil)
		return
	}
	msg := p.CommitMessage
	if msg == "" {
		msg = "Batch create workflow " + p.Filename
	}
	// 有界并发执行（5 路），数量不限
	results := make([]gin.H, len(p.RepoIDs))
	runIndexed(len(p.RepoIDs), 5, func(i int) {
		rid := p.RepoIDs[i]
		if _, err := h.s.CreateWorkflow(h.c, rid, p.Filename, p.Content, msg, p.Branch); err != nil {
			results[i] = gin.H{"repo_id": rid, "error": err.Error()}
		} else {
			results[i] = gin.H{"repo_id": rid}
		}
	})
	success, failed := splitSuccessFailed(results)
	resp.OK(c, gin.H{"success": success, "failed": failed})
}

type BatchDispatchPayload struct {
	RepoIDs  []uint             `json:"repo_ids" binding:"required"`
	Filename string             `json:"filename" binding:"required"`
	Ref      string             `json:"ref"`
	Inputs   map[string]string  `json:"inputs"`
}

func (h *BatchHandler) Dispatch(c *gin.Context) {
	var p BatchDispatchPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	if len(p.RepoIDs) == 0 {
		resp.BadRequest(c, "请提供 repo_ids", nil)
		return
	}
	// 有界并发执行（5 路），数量不限
	results := make([]gin.H, len(p.RepoIDs))
	runIndexed(len(p.RepoIDs), 5, func(i int) {
		rid := p.RepoIDs[i]
		if err := h.s.DispatchWorkflow(h.c, rid, p.Filename, p.Ref, p.Inputs); err != nil {
			results[i] = gin.H{"repo_id": rid, "error": err.Error()}
		} else {
			results[i] = gin.H{"repo_id": rid}
		}
	})
	success, failed := splitSuccessFailed(results)
	resp.OK(c, gin.H{"success": success, "failed": failed})
}

type FetchTemplatePayload struct {
	AccountID uint   `json:"account_id" binding:"required"`
	Owner     string `json:"owner" binding:"required"`
	Repo      string `json:"repo" binding:"required"`
	Ref       string `json:"ref"`
}

func (h *BatchHandler) FetchTemplate(c *gin.Context) {
	var p FetchTemplatePayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	files, err := h.s.FetchTemplateFiles(h.c, p.AccountID, p.Owner, p.Repo, p.Ref)
	if err != nil {
		resp.Internal(c, "获取模板文件失败: "+err.Error(), err)
		return
	}
	resp.OK(c, gin.H{"files": files, "count": len(files)})
}

type BatchCreateReposPayload struct {
	AccountIDs  []uint                     `json:"account_ids" binding:"required"`
	RepoName    string                     `json:"repo_name" binding:"required"`
	Description string                     `json:"description"`
	Private     bool                       `json:"private"`
	Files       []service.TemplateFile     `json:"files"`
	Secrets     []service.SecretEntry      `json:"secrets"`
	Count       int                        `json:"count"` // 每个账户创建的仓库数量，默认1
}

func (h *BatchHandler) CreateRepos(c *gin.Context) {
	var p BatchCreateReposPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	if len(p.AccountIDs) == 0 {
		resp.BadRequest(c, "请提供 account_ids", nil)
		return
	}
	if p.Count <= 0 {
		p.Count = 1
	}
	if p.Count > 50 {
		p.Count = 50
	}
	success := []gin.H{}
	failed := []gin.H{}
	for _, aid := range p.AccountIDs {
		for i := 0; i < p.Count; i++ {
			name := p.RepoName
			if p.Count > 1 {
				name = fmt.Sprintf("%s-%d", p.RepoName, i+1)
			}
			repo, err := h.s.CreateRepoForAccount(h.c, aid, name, p.Description, p.Private, p.Files, p.Secrets)
			if err != nil {
				failed = append(failed, gin.H{"account_id": aid, "repo_name": name, "error": err.Error()})
			} else {
				success = append(success, gin.H{"account_id": aid, "repo": repo.FullName})
			}
		}
	}
	resp.OK(c, gin.H{"success": success, "failed": failed})
}

type BatchUpdateReposPayload struct {
	RepoIDs       []uint `json:"repo_ids" binding:"required"`
	TemplateOwner string `json:"template_owner" binding:"required"`
	TemplateRepo  string `json:"template_repo" binding:"required"`
	TemplateRef   string `json:"template_ref"`
	// Secrets / secrets_only 已迁移至 /api/batch/set-secrets 与 /api/batch/delete-secrets
}

func (h *BatchHandler) UpdateRepos(c *gin.Context) {
	var p BatchUpdateReposPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	if len(p.RepoIDs) == 0 {
		resp.BadRequest(c, "请提供 repo_ids", nil)
		return
	}
	if p.TemplateOwner == "" || p.TemplateRepo == "" {
		resp.BadRequest(c, "template_owner/template_repo 不能为空", nil)
		return
	}
	// 有界并发执行（3 路：清空重写为重操作，不宜过高并发），数量不限
	results := make([]gin.H, len(p.RepoIDs))
	runIndexed(len(p.RepoIDs), 3, func(i int) {
		rid := p.RepoIDs[i]
		if err := h.s.UpdateRepoFromTemplate(h.c, rid, p.TemplateOwner, p.TemplateRepo, p.TemplateRef); err != nil {
			results[i] = gin.H{"repo_id": rid, "error": err.Error()}
		} else {
			results[i] = gin.H{"repo_id": rid}
		}
	})
	success, failed := splitSuccessFailed(results)
	resp.OK(c, gin.H{"success": success, "failed": failed})
}

// validSecretName 校验 secret 名称（GitHub 规范：字母/数字/下划线，不进路径参数）
func validSecretName(name string) bool {
	if name == "" || len(name) > 100 {
		return false
	}
	for _, r := range name {
		if !(r >= 'A' && r <= 'Z' || r >= 'a' && r <= 'z' || r >= '0' && r <= '9' || r == '_') {
			return false
		}
	}
	return true
}

type BatchSetSecretsPayload struct {
	RepoIDs []uint                `json:"repo_ids" binding:"required"`
	Secrets []service.SecretEntry `json:"secrets" binding:"required"`
}

// SetSecrets 批量为仓库设置 Actions secrets（不动仓库文件）
func (h *BatchHandler) SetSecrets(c *gin.Context) {
	var p BatchSetSecretsPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	if len(p.RepoIDs) == 0 {
		resp.BadRequest(c, "请提供 repo_ids", nil)
		return
	}
	if len(p.Secrets) == 0 || len(p.Secrets) > 100 {
		resp.BadRequest(c, "secrets 数量必须在 1-100 之间", nil)
		return
	}
	for _, sec := range p.Secrets {
		if !validSecretName(sec.Name) {
			resp.BadRequest(c, "secret 名称只能包含字母、数字和下划线: "+sec.Name, nil)
			return
		}
	}
	// 有界并发执行（5 路），数量不限
	results := make([]gin.H, len(p.RepoIDs))
	runIndexed(len(p.RepoIDs), 5, func(i int) {
		rid := p.RepoIDs[i]
		if err := h.s.SetRepoSecrets(h.c, rid, p.Secrets); err != nil {
			results[i] = gin.H{"repo_id": rid, "error": err.Error()}
		} else {
			results[i] = gin.H{"repo_id": rid, "message": fmt.Sprintf("已设置 %d 个 secrets", len(p.Secrets))}
		}
	})
	success, failed := splitSuccessFailed(results)
	resp.OK(c, gin.H{"success": success, "failed": failed})
}

type BatchDeleteSecretsPayload struct {
	RepoIDs []uint  `json:"repo_ids" binding:"required"`
	All     bool    `json:"all"`
	Names   []string `json:"names"`
}

// DeleteSecrets 批量删除仓库的 Actions secrets（all=true 删除全部，否则按 names）
func (h *BatchHandler) DeleteSecrets(c *gin.Context) {
	var p BatchDeleteSecretsPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	if len(p.RepoIDs) == 0 {
		resp.BadRequest(c, "请提供 repo_ids", nil)
		return
	}
	if !p.All && len(p.Names) == 0 {
		resp.BadRequest(c, "请提供 names 或 all=true", nil)
		return
	}
	for _, n := range p.Names {
		if !validSecretName(n) {
			resp.BadRequest(c, "secret 名称只能包含字母、数字和下划线: "+n, nil)
			return
		}
	}
	// 有界并发执行（3 路），数量不限
	results := make([]gin.H, len(p.RepoIDs))
	runIndexed(len(p.RepoIDs), 3, func(i int) {
		rid := p.RepoIDs[i]
		deleted, err := h.s.DeleteRepoSecrets(h.c, rid, p.All, p.Names)
		if err != nil {
			results[i] = gin.H{"repo_id": rid, "error": err.Error()}
		} else {
			scope := "指定"
			if p.All {
				scope = "全部"
			}
			results[i] = gin.H{"repo_id": rid, "deleted": deleted, "message": fmt.Sprintf("已删除 %s secrets %d 个", scope, deleted)}
		}
	})
	success, failed := splitSuccessFailed(results)
	resp.OK(c, gin.H{"success": success, "failed": failed})
}

// validTarget 校验 GitHub 用户名 / 仓库名（防路径注入，宽松对齐 GitHub 字符集）
func validTarget(s string) bool {
	if s == "" || len(s) > 200 {
		return false
	}
	for _, r := range s {
		if r == '/' || r == '\\' || r == ' ' || r == '?' || r == '#' {
			return false
		}
	}
	return true
}

// runAccountAction 对 account_ids 逐个执行动作，返回统一 success/failed 结构
func (h *BatchHandler) runAccountAction(ids []uint, fn func(id uint) (string, error)) (success, failed []gin.H) {
	success = []gin.H{}
	failed = []gin.H{}
	for _, id := range ids {
		msg, err := fn(id)
		if err != nil {
			failed = append(failed, gin.H{"account_id": id, "error": err.Error()})
		} else {
			success = append(success, gin.H{"account_id": id, "message": msg})
		}
	}
	return
}

func (h *BatchHandler) accountSvc() *service.AccountService {
	return service.NewAccountService(h.c.DB)
}

type BatchRepoTargetPayload struct {
	AccountIDs []uint `json:"account_ids" binding:"required"`
	Owner      string `json:"owner" binding:"required"`
	Repo       string `json:"repo" binding:"required"`
}

type BatchUserTargetPayload struct {
	AccountIDs []uint `json:"account_ids" binding:"required"`
	Username   string `json:"username" binding:"required"`
}

func (h *BatchHandler) checkIDsAndTarget(c *gin.Context, ids []uint, target string, max int) bool {
	if len(ids) == 0 {
		resp.BadRequest(c, "account_ids 数量必须大于 0", nil)
		return false
	}
	if max > 0 && len(ids) > max {
		resp.BadRequest(c, fmt.Sprintf("account_ids 数量必须在 1-%d 之间", max), nil)
		return false
	}
	if target != "" && !validTarget(target) {
		resp.BadRequest(c, "目标名称包含非法字符: "+target, nil)
		return false
	}
	return true
}

// BatchStar 为每个账户对指定仓库点 Star
func (h *BatchHandler) BatchStar(c *gin.Context) {
	var p BatchRepoTargetPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	if !h.checkIDsAndTarget(c, p.AccountIDs, p.Owner+p.Repo, 0) {
		return
	}
	accSvc := h.accountSvc()
	success, failed := h.runAccountAction(p.AccountIDs, func(id uint) (string, error) {
		if err := accSvc.StarRepo(h.c, id, p.Owner, p.Repo); err != nil {
			return "", err
		}
		return "已 Star " + p.Owner + "/" + p.Repo, nil
	})
	resp.OK(c, gin.H{"success": success, "failed": failed})
}

// BatchUnstar 为每个账户取消指定仓库的 Star
func (h *BatchHandler) BatchUnstar(c *gin.Context) {
	var p BatchRepoTargetPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	if !h.checkIDsAndTarget(c, p.AccountIDs, p.Owner+p.Repo, 0) {
		return
	}
	accSvc := h.accountSvc()
	success, failed := h.runAccountAction(p.AccountIDs, func(id uint) (string, error) {
		if err := accSvc.UnstarRepo(h.c, id, p.Owner, p.Repo); err != nil {
			return "", err
		}
		return "已取消 Star " + p.Owner + "/" + p.Repo, nil
	})
	resp.OK(c, gin.H{"success": success, "failed": failed})
}

// BatchFollow 让每个账户关注指定用户
func (h *BatchHandler) BatchFollow(c *gin.Context) {
	var p BatchUserTargetPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	if !h.checkIDsAndTarget(c, p.AccountIDs, p.Username, 0) {
		return
	}
	accSvc := h.accountSvc()
	success, failed := h.runAccountAction(p.AccountIDs, func(id uint) (string, error) {
		if err := accSvc.FollowUser(h.c, id, p.Username); err != nil {
			return "", err
		}
		return "已关注 " + p.Username, nil
	})
	resp.OK(c, gin.H{"success": success, "failed": failed})
}

// BatchUnfollow 让每个账户取消关注指定用户
func (h *BatchHandler) BatchUnfollow(c *gin.Context) {
	var p BatchUserTargetPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	if !h.checkIDsAndTarget(c, p.AccountIDs, p.Username, 0) {
		return
	}
	accSvc := h.accountSvc()
	success, failed := h.runAccountAction(p.AccountIDs, func(id uint) (string, error) {
		if err := accSvc.UnfollowUser(h.c, id, p.Username); err != nil {
			return "", err
		}
		return "已取消关注 " + p.Username, nil
	})
	resp.OK(c, gin.H{"success": success, "failed": failed})
}

type BatchToggleVisibilityPayload struct {
	RepoIDs   []uint `json:"repo_ids" binding:"required"`
	IsPrivate bool   `json:"is_private"`
}

func (h *BatchHandler) ToggleVisibility(c *gin.Context) {
	var p BatchToggleVisibilityPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	if len(p.RepoIDs) == 0 {
		resp.BadRequest(c, "请提供 repo_ids", nil)
		return
	}
	// 有界并发执行（5 路），数量不限
	results := make([]gin.H, len(p.RepoIDs))
	runIndexed(len(p.RepoIDs), 5, func(i int) {
		rid := p.RepoIDs[i]
		if err := h.s.ToggleRepoVisibility(h.c, rid, p.IsPrivate); err != nil {
			results[i] = gin.H{"repo_id": rid, "error": err.Error()}
		} else {
			vis := "public"
			if p.IsPrivate { vis = "private" }
			results[i] = gin.H{"repo_id": rid, "visibility": vis}
		}
	})
	success, failed := splitSuccessFailed(results)
	resp.OK(c, gin.H{"success": success, "failed": failed})
}
