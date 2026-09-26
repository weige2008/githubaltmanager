package handlers

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"githubaltmanager/internal/api/resp"
	"githubaltmanager/internal/model"
	"githubaltmanager/internal/service"
)

type BatchTaskHandler struct {
	c *service.Container
	s *service.BatchTaskService
}

func NewBatchTaskHandler(c *service.Container) *BatchTaskHandler {
	return &BatchTaskHandler{c: c, s: service.NewBatchTaskService(c.DB)}
}

func RegisterBatchTaskRoutes(g *gin.RouterGroup, c *service.Container) {
	h := NewBatchTaskHandler(c)
	grp := g.Group("/batch-tasks")
	{
		grp.GET("", h.List)
		grp.POST("", h.Create)
		grp.PUT("/:id", h.Update)
		grp.DELETE("/:id", h.Delete)
		grp.POST("/:id/toggle", h.Toggle)
		grp.POST("/:id/run", h.RunNow)
	}
}

// List GET /api/batch-tasks
func (h *BatchTaskHandler) List(c *gin.Context) {
	tasks, err := h.s.List()
	if err != nil {
		resp.Internal(c, "查询失败", err)
		return
	}
	resp.OK(c, tasks)
}

type CreateBatchTaskPayload struct {
	Name        string `json:"name" binding:"required"`
	Type        string `json:"type" binding:"required"`
	CronExpr    string `json:"cron_expr" binding:"required"`
	PayloadJSON string `json:"payload_json" binding:"required"`
}

// Create POST /api/batch-tasks
func (h *BatchTaskHandler) Create(c *gin.Context) {
	var p CreateBatchTaskPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	t := &model.BatchTask{
		Name:        p.Name,
		Type:        p.Type,
		CronExpr:    p.CronExpr,
		PayloadJSON: p.PayloadJSON,
		Enabled:     true,
	}
	if err := h.s.Create(t); err != nil {
		resp.BadRequest(c, "创建失败: "+err.Error(), err)
		return
	}
	resp.Created(c, t)
}

type UpdateBatchTaskPayload struct {
	Name        *string `json:"name"`
	CronExpr    *string `json:"cron_expr"`
	PayloadJSON *string `json:"payload_json"`
	Enabled     *bool   `json:"enabled"`
}

// Update PUT /api/batch-tasks/:id
func (h *BatchTaskHandler) Update(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	var p UpdateBatchTaskPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		resp.BadRequest(c, "参数错误", err)
		return
	}
	updates := map[string]any{}
	if p.Name != nil {
		updates["name"] = *p.Name
	}
	if p.CronExpr != nil {
		updates["cron_expr"] = *p.CronExpr
	}
	if p.PayloadJSON != nil {
		updates["payload_json"] = *p.PayloadJSON
	}
	if p.Enabled != nil {
		updates["enabled"] = *p.Enabled
	}
	t, err := h.s.Update(uint(id), updates)
	if err != nil {
		resp.Internal(c, "更新失败: "+err.Error(), err)
		return
	}
	resp.OK(c, t)
}

// Delete DELETE /api/batch-tasks/:id
func (h *BatchTaskHandler) Delete(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	if err := h.s.Delete(uint(id)); err != nil {
		resp.Internal(c, "删除失败", err)
		return
	}
	resp.OK(c, gin.H{"ok": true})
}

type ToggleBatchTaskPayload struct {
	Enabled bool `json:"enabled"`
}

// Toggle POST /api/batch-tasks/:id/toggle
func (h *BatchTaskHandler) Toggle(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	var p ToggleBatchTaskPayload
	_ = c.ShouldBindJSON(&p)
	t, err := h.s.Toggle(uint(id), p.Enabled)
	if err != nil {
		resp.Internal(c, "操作失败", err)
		return
	}
	resp.OK(c, t)
}

// RunNow POST /api/batch-tasks/:id/run
func (h *BatchTaskHandler) RunNow(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	if err := h.s.RunNow(h.c, uint(id)); err != nil {
		resp.Internal(c, "触发失败: "+err.Error(), err)
		return
	}
	resp.OK(c, gin.H{"ok": true})
}
