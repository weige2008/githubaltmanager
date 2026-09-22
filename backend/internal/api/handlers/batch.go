package handlers

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"githubaltmanager/internal/api/resp"
	"githubaltmanager/internal/service"
)

const MAX_BATCH_SIZE = 100

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
	if len(p.RepoIDs) == 0 || len(p.RepoIDs) > MAX_BATCH_SIZE {
		resp.BadRequest(c, "repo_ids 数量必须在 1-100 之间", nil)
		return
	}
	msg := p.CommitMessage
	if msg == "" {
		msg = "Batch create workflow " + p.Filename
	}
	success := []gin.H{}
	failed := []gin.H{}
	for _, rid := range p.RepoIDs {
		_, err := h.s.CreateWorkflow(h.c, rid, p.Filename, p.Content, msg, p.Branch)
		if err != nil {
			failed = append(failed, gin.H{"repo_id": rid, "error": err.Error()})
		} else {
			success = append(success, gin.H{"repo_id": rid})
		}
	}
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
	if len(p.RepoIDs) == 0 || len(p.RepoIDs) > MAX_BATCH_SIZE {
		resp.BadRequest(c, "repo_ids 数量必须在 1-100 之间", nil)
		return
	}
	success := []gin.H{}
	failed := []gin.H{}
	for _, rid := range p.RepoIDs {
		err := h.s.DispatchWorkflow(h.c, rid, p.Filename, p.Ref, p.Inputs)
		if err != nil {
			failed = append(failed, gin.H{"repo_id": rid, "error": err.Error()})
		} else {
			success = append(success, gin.H{"repo_id": rid})
		}
	}
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
	if len(p.AccountIDs) == 0 || len(p.AccountIDs) > MAX_BATCH_SIZE {
		resp.BadRequest(c, "account_ids 数量必须在 1-100 之间", nil)
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
	if len(p.RepoIDs) == 0 || len(p.RepoIDs) > MAX_BATCH_SIZE {
		resp.BadRequest(c, "repo_ids 数量必须在 1-100 之间", nil)
		return
	}
	if p.TemplateOwner == "" || p.TemplateRepo == "" {
		resp.BadRequest(c, "template_owner/template_repo 不能为空", nil)
		return
	}
	success := []gin.H{}
	failed := []gin.H{}
	for _, rid := range p.RepoIDs {
		err := h.s.UpdateRepoFromTemplate(h.c, rid, p.TemplateOwner, p.TemplateRepo, p.TemplateRef)
		if err != nil {
			failed = append(failed, gin.H{"repo_id": rid, "error": err.Error()})
		} else {
			success = append(success, gin.H{"repo_id": rid})
		}
	}
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
	if len(p.RepoIDs) == 0 || len(p.RepoIDs) > MAX_BATCH_SIZE {
		resp.BadRequest(c, "repo_ids 数量必须在 1-100 之间", nil)
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
	success := []gin.H{}
	failed := []gin.H{}
	for _, rid := range p.RepoIDs {
		if err := h.s.SetRepoSecrets(h.c, rid, p.Secrets); err != nil {
			failed = append(failed, gin.H{"repo_id": rid, "error": err.Error()})
		} else {
			success = append(success, gin.H{"repo_id": rid, "message": fmt.Sprintf("已设置 %d 个 secrets", len(p.Secrets))})
		}
	}
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
	if len(p.RepoIDs) == 0 || len(p.RepoIDs) > MAX_BATCH_SIZE {
		resp.BadRequest(c, "repo_ids 数量必须在 1-100 之间", nil)
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
	success := []gin.H{}
	failed := []gin.H{}
	for _, rid := range p.RepoIDs {
		deleted, err := h.s.DeleteRepoSecrets(h.c, rid, p.All, p.Names)
		if err != nil {
			failed = append(failed, gin.H{"repo_id": rid, "error": err.Error()})
		} else {
			scope := "指定"
			if p.All {
				scope = "全部"
			}
			success = append(success, gin.H{"repo_id": rid, "deleted": deleted, "message": fmt.Sprintf("已删除 %s secrets %d 个", scope, deleted)})
		}
	}
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
	if len(p.RepoIDs) == 0 || len(p.RepoIDs) > MAX_BATCH_SIZE {
		resp.BadRequest(c, "repo_ids 数量必须在 1-100 之间", nil)
		return
	}
	success := []gin.H{}
	failed := []gin.H{}
	for _, rid := range p.RepoIDs {
		err := h.s.ToggleRepoVisibility(h.c, rid, p.IsPrivate)
		if err != nil {
			failed = append(failed, gin.H{"repo_id": rid, "error": err.Error()})
		} else {
			vis := "public"
			if p.IsPrivate { vis = "private" }
			success = append(success, gin.H{"repo_id": rid, "visibility": vis})
		}
	}
	resp.OK(c, gin.H{"success": success, "failed": failed})
}
