package handlers

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"githubaltmanager/internal/api/resp"
	"githubaltmanager/internal/model"
	"githubaltmanager/internal/service"
)

type TaskHandler struct {
	c *service.Container
	s *service.TaskService
}

func NewTaskHandler(c *service.Container) *TaskHandler {
	return &TaskHandler{c: c, s: service.NewTaskService(c.DB)}
}

func RegisterTaskRoutes(g *gin.RouterGroup, c *service.Container) {
	h := NewTaskHandler(c)
	grp := g.Group("/tasks")
	{
		grp.GET("", h.List)
		grp.POST("", h.Create)
		grp.PUT("/:id", h.Update)
		grp.DELETE("/:id", h.Delete)
		grp.POST("/:id/toggle", h.Toggle)
		grp.POST("/:id/run", h.RunNow)
	}
}

func (h *TaskHandler) List(c *gin.Context) {
	tasks, err := h.s.List()
	if err != nil {
		resp.Internal(c, "查询失败", err)
		return
	}
	resp.OK(c, tasks)
}

type CreateTaskPayload struct {
	AccountID        uint   `json:"account_id" binding:"required"`
	RepositoryID     uint   `json:"repository_id" binding:"required"`
	WorkflowFilename string `json:"workflow_filename" binding:"required"`
	Ref              string `json:"ref"`
	CronExpr         string `json:"cron_expr" binding:"required"`
	InputsJSON       string `json:"inputs_json"`
	Enabled          *bool  `json:"enabled"`
}

func (h *TaskHandler) Create(c *gin.Context) {
	var p CreateTaskPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	t := &model.ScheduledTask{
		AccountID:        p.AccountID,
		RepositoryID:     p.RepositoryID,
		WorkflowFilename: p.WorkflowFilename,
		Ref:              p.Ref,
		CronExpr:         p.CronExpr,
		InputsJSON:       p.InputsJSON,
		Enabled:          true,
	}
	if p.Enabled != nil {
		t.Enabled = *p.Enabled
	}
	if err := h.s.Create(t); err != nil {
		resp.BadRequest(c, "创建失败: "+err.Error(), err)
		return
	}
	resp.Created(c, t)
}

type UpdateTaskPayload struct {
	Ref              *string `json:"ref"`
	CronExpr         *string `json:"cron_expr"`
	InputsJSON       *string `json:"inputs_json"`
	Enabled          *bool   `json:"enabled"`
	WorkflowFilename *string `json:"workflow_filename"`
}

func (h *TaskHandler) Update(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	var p UpdateTaskPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	updates := map[string]any{}
	if p.Ref != nil {
		updates["ref"] = *p.Ref
	}
	if p.CronExpr != nil {
		updates["cron_expr"] = *p.CronExpr
	}
	if p.InputsJSON != nil {
		updates["inputs_json"] = *p.InputsJSON
	}
	if p.Enabled != nil {
		updates["enabled"] = *p.Enabled
	}
	if p.WorkflowFilename != nil {
		updates["workflow_filename"] = *p.WorkflowFilename
	}
	t, err := h.s.Update(uint(id), updates)
	if err != nil {
		resp.Internal(c, "更新失败: "+err.Error(), err)
		return
	}
	resp.OK(c, t)
}

func (h *TaskHandler) Delete(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	if err := h.s.Delete(uint(id)); err != nil {
		resp.Internal(c, "删除失败", err)
		return
	}
	resp.OK(c, gin.H{"ok": true})
}

type TogglePayload struct {
	Enabled bool `json:"enabled"`
}

func (h *TaskHandler) Toggle(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	var p TogglePayload
	_ = c.ShouldBindJSON(&p)
	t, err := h.s.Toggle(uint(id), p.Enabled)
	if err != nil {
		resp.Internal(c, "操作失败", err)
		return
	}
	resp.OK(c, t)
}

func (h *TaskHandler) RunNow(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	if err := h.s.RunNow(h.c, uint(id)); err != nil {
		resp.Internal(c, "触发失败: "+err.Error(), err)
		return
	}
	resp.OK(c, gin.H{"ok": true})
}
