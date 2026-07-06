package handlers

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"githubaltmanager/internal/api/resp"
	"githubaltmanager/internal/config"
	"githubaltmanager/internal/model"
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
	var cfg model.AppConfig
	if err := h.c.DB.First(&cfg, 1).Error; err != nil {
		resp.OK(c, gin.H{
			"auto_check_enabled":  false,
			"auto_check_interval": 30,
			"auto_sync_enabled":   true,
			"auto_sync_interval":  30,
			"auto_check_groups":   "",
			"auto_sync_groups":    "",
			"recycle_bin_enabled":  true,
			"recycle_bin_days":    30,
		})
		return
	}
	resp.OK(c, gin.H{
		"auto_check_enabled":  cfg.AutoCheckEnabled,
		"auto_check_interval": cfg.AutoCheckInterval,
		"auto_sync_enabled":   cfg.AutoSyncEnabled,
		"auto_sync_interval":  cfg.AutoSyncInterval,
		"auto_check_last_at":  cfg.AutoCheckLastAt,
		"auto_sync_last_at":   cfg.AutoSyncLastAt,
		"auto_check_groups":   cfg.AutoCheckGroups,
		"auto_sync_groups":    cfg.AutoSyncGroups,
		"recycle_bin_enabled": cfg.RecycleBinEnabled,
		"recycle_bin_days":    cfg.RecycleBinDays,
		"recycle_bin_last_clean": cfg.RecycleBinLastClean,
	})
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
