package handlers

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"githubaltmanager/internal/api/resp"
	"githubaltmanager/internal/service"
)

type RepoHandler struct {
	c *service.Container
	s *service.RepoService
}

func NewRepoHandler(c *service.Container) *RepoHandler {
	return &RepoHandler{c: c, s: service.NewRepoService(c.DB)}
}

func RegisterRepoRoutes(g *gin.RouterGroup, c *service.Container) {
	h := NewRepoHandler(c)
	grp := g.Group("/repos")
	{
		grp.GET("/:id/contents", h.ListContents)
		grp.GET("/:id/file", h.GetFile)
		grp.PUT("/:id/file", h.UpdateFile)
		grp.GET("/:id/workflows", h.ListWorkflows)
		grp.POST("/:id/workflows", h.CreateWorkflow)
		grp.POST("/:id/dispatch", h.Dispatch)
		grp.GET("/:id/workflow-inputs", h.GetWorkflowInputs)
	}
}

// 以下方法挂载在 AccountHandler 上（accounts.go 的 group /accounts/:id/... 需要这些方法）
func (h *AccountHandler) ListRepos(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	rs := service.NewRepoService(h.c.DB)
	repos, err := rs.ListByAccount(uint(id))
	if err != nil {
		resp.Internal(c, "查询仓库失败", err)
		return
	}
	resp.OK(c, repos)
}

func (h *AccountHandler) RefreshRepos(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	rs := service.NewRepoService(h.c.DB)
	total, err := rs.RefreshRepos(h.c, uint(id))
	if err != nil {
		resp.Internal(c, "拉取仓库失败: "+err.Error(), err)
		return
	}
	resp.OK(c, gin.H{"total": total})
}

func (h *AccountHandler) ScanWorkflows(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	rs := service.NewRepoService(h.c.DB)
	total, err := rs.ScanWorkflows(h.c, uint(id))
	if err != nil {
		resp.Internal(c, "扫描 workflow 失败: "+err.Error(), err)
		return
	}
	resp.OK(c, gin.H{"total": total})
}

type ListContentsQuery struct {
	Path string `form:"path"`
	Ref  string `form:"ref"`
}

func (h *RepoHandler) ListContents(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	var q ListContentsQuery
	_ = c.ShouldBindQuery(&q)
	entries, err := h.s.ListContents(h.c, uint(id), q.Path, q.Ref)
	if err != nil {
		resp.Internal(c, "读取目录失败: "+err.Error(), err)
		return
	}
	resp.OK(c, entries)
}

func (h *RepoHandler) GetFile(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	path := c.Query("path")
	ref := c.Query("ref")
	if path == "" {
		resp.BadRequest(c, "缺少 path 参数")
		return
	}
	fc, err := h.s.GetFile(h.c, uint(id), path, ref)
	if err != nil {
		resp.Internal(c, "读取文件失败: "+err.Error(), err)
		return
	}
	resp.OK(c, fc)
}

type UpdateFilePayload struct {
	Path    string `json:"path" binding:"required"`
	Content string `json:"content" binding:"required"` // base64
	Message string `json:"message" binding:"required"`
	Branch  string `json:"branch"`
}

func (h *RepoHandler) UpdateFile(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	var p UpdateFilePayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	sha, err := h.s.UpdateFile(h.c, uint(id), p.Path, p.Content, p.Message, p.Branch)
	if err != nil {
		resp.Internal(c, "修改文件失败: "+err.Error(), err)
		return
	}
	resp.OK(c, gin.H{"commit_sha": sha})
}

func (h *RepoHandler) ListWorkflows(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	wfs, err := h.s.ListWorkflows(uint(id))
	if err != nil {
		resp.Internal(c, "查询失败", err)
		return
	}
	resp.OK(c, wfs)
}

type CreateWorkflowPayload struct {
	Filename      string `json:"filename" binding:"required"`
	Content       string `json:"content" binding:"required"` // base64
	CommitMessage string `json:"commit_message"`
	Branch        string `json:"branch"`
}

func (h *RepoHandler) CreateWorkflow(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	var p CreateWorkflowPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	msg := p.CommitMessage
	if msg == "" {
		msg = "Create workflow " + p.Filename
	}
	path, err := h.s.CreateWorkflow(h.c, uint(id), p.Filename, p.Content, msg, p.Branch)
	if err != nil {
		resp.Internal(c, "创建失败: "+err.Error(), err)
		return
	}
	resp.Created(c, gin.H{"path": path})
}

type DispatchPayload struct {
	Filename string            `json:"filename" binding:"required"`
	Ref      string            `json:"ref"`
	Inputs   map[string]string `json:"inputs"`
}

func (h *RepoHandler) Dispatch(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	var p DispatchPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	if err := h.s.DispatchWorkflow(h.c, uint(id), p.Filename, p.Ref, p.Inputs); err != nil {
		resp.Internal(c, "触发失败: "+err.Error(), err)
		return
	}
	resp.OK(c, gin.H{"ok": true})
}

// GetWorkflowInputs 读取 workflow yml 文件，解析 workflow_dispatch.inputs 定义
func (h *RepoHandler) GetWorkflowInputs(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	filename := c.Query("filename")
	if filename == "" {
		resp.BadRequest(c, "缺少 filename 参数")
		return
	}
	inputs, err := h.s.GetWorkflowInputs(h.c, uint(id), filename)
	if err != nil {
		resp.OK(c, gin.H{"inputs": []any{}})
		return
	}
	resp.OK(c, gin.H{"inputs": inputs})
}
