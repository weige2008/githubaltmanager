package handlers

import (
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
	success := []gin.H{}
	failed := []gin.H{}
	for _, aid := range p.AccountIDs {
		repo, err := h.s.CreateRepoForAccount(h.c, aid, p.RepoName, p.Description, p.Private, p.Files, p.Secrets)
		if err != nil {
			failed = append(failed, gin.H{"account_id": aid, "error": err.Error()})
		} else {
			success = append(success, gin.H{"account_id": aid, "repo": repo.FullName})
		}
	}
	resp.OK(c, gin.H{"success": success, "failed": failed})
}

type BatchUpdateReposPayload struct {
	RepoIDs       []uint `json:"repo_ids" binding:"required"`
	TemplateOwner string `json:"template_owner" binding:"required"`
	TemplateRepo  string `json:"template_repo" binding:"required"`
	TemplateRef   string `json:"template_ref"`
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
