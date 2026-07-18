package handlers

import (
	"github.com/gin-gonic/gin"
	"githubaltmanager/internal/api/resp"
	"githubaltmanager/internal/service"
	"gorm.io/gorm"
)

type StatsHandler struct {
	c *service.Container
}

func NewStatsHandler(c *service.Container) *StatsHandler { return &StatsHandler{c: c} }

func RegisterStatsRoutes(g *gin.RouterGroup, c *service.Container) {
	h := NewStatsHandler(c)
	g.GET("/stats/overview", h.Overview)
}

type Overview struct {
	Total    int64 `json:"total"`
	Active   int64 `json:"active"`
	Banned   int64 `json:"banned"`
	TokenExpired int64 `json:"token_expired"`
	Error    int64 `json:"error"`
	Unknown  int64 `json:"unknown"`
	Repos    int64 `json:"repos"`
	Workflows int64 `json:"workflows"`
	Tasks    int64 `json:"tasks"`
	TasksEnabled int64 `json:"tasks_enabled"`
}

// Overview 仪表盘概览数据
func (h *StatsHandler) Overview(c *gin.Context) {
	var o Overview
	base := h.c.DB.Table("accounts").Where("deleted_at IS NULL")

	base.Session(&gorm.Session{}).Count(&o.Total)
	base.Session(&gorm.Session{}).Where("status = ?", "active").Count(&o.Active)
	base.Session(&gorm.Session{}).Where("status = ?", "banned").Count(&o.Banned)
	base.Session(&gorm.Session{}).Where("status = ?", "token_expired").Count(&o.TokenExpired)
	base.Session(&gorm.Session{}).Where("status = ?", "error").Count(&o.Error)
	base.Session(&gorm.Session{}).Where("status = ?", "unknown").Count(&o.Unknown)

	h.c.DB.Table("repositories").Count(&o.Repos)
	h.c.DB.Table("workflows").Count(&o.Workflows)
	h.c.DB.Table("scheduled_tasks").Count(&o.Tasks)
	h.c.DB.Table("scheduled_tasks").Where("enabled = ?", true).Count(&o.TasksEnabled)

	resp.OK(c, o)
}
