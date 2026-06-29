package handlers

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"githubaltmanager/internal/api/resp"
	"githubaltmanager/internal/config"
	"githubaltmanager/internal/service"
)

type AutoTaskHandler struct {
	c *service.Container
	s *service.AutoTaskService
}

func NewAutoTaskHandler(c *service.Container) *AutoTaskHandler {
	return &AutoTaskHandler{c: c, s: service.NewAutoTaskService(c.DB)}
}

func RegisterAutoTaskRoutes(g *gin.RouterGroup, c *service.Container) {
	h := NewAutoTaskHandler(c)
	grp := g.Group("/autotask")
	{
		grp.GET("", h.Get)
		grp.PUT("", h.Update)
		grp.POST("/check-now", h.RunCheckNow)
		grp.POST("/sync-now", h.RunSyncNow)
		grp.GET("/logs", h.GetLogs)
		grp.GET("/running", h.GetRunning)
	}
}

func (h *AutoTaskHandler) Get(c *gin.Context) {
	cfg, err := h.s.GetAutoTaskConfig()
	if err != nil {
		resp.Internal(c, "read config failed", err)
		return
	}
	resp.OK(c, cfg)
}

func (h *AutoTaskHandler) Update(c *gin.Context) {
	var req config.AutoTaskConfig
	if err := c.ShouldBindJSON(&req); err != nil {
		resp.BadRequest(c, "bad params", err)
		return
	}
	if req.AutoCheckInterval < 1 {
		req.AutoCheckInterval = 1440
	}
	if req.AutoSyncInterval < 1 {
		req.AutoSyncInterval = 1440
	}
	if err := h.s.UpdateAutoTaskConfig(req); err != nil {
		resp.Internal(c, "update failed", err)
		return
	}
	resp.OK(c, req)
}

func (h *AutoTaskHandler) RunCheckNow(c *gin.Context) {
	go h.s.RunAutoCheck(h.c)
	resp.OK(c, gin.H{"ok": true, "msg": "auto check started"})
}

func (h *AutoTaskHandler) RunSyncNow(c *gin.Context) {
	go h.s.RunAutoSync(h.c)
	resp.OK(c, gin.H{"ok": true, "msg": "auto sync started"})
}

func (h *AutoTaskHandler) GetLogs(c *gin.Context) {
	limit := 50
	if l, err := strconv.Atoi(c.Query("limit")); err == nil && l > 0 {
		limit = l
	}
	logs, err := h.s.GetLogs(limit)
	if err != nil {
		resp.Internal(c, "query logs failed", err)
		return
	}
	resp.OK(c, logs)
}

func (h *AutoTaskHandler) GetRunning(c *gin.Context) {
	task, err := h.s.GetRunningTask()
	if err != nil {
		resp.OK(c, gin.H{"running": false})
		return
	}
	resp.OK(c, gin.H{"running": true, "task": task})
}
