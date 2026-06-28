package handlers

import (
	"github.com/gin-gonic/gin"
	"githubaltmanager/internal/service"
)

// RegisterAccountRoutes 账户相关路由（P3 阶段实现）
func RegisterAccountRoutes(g *gin.RouterGroup, c *service.Container) {}

// RegisterRepoRoutes 仓库/文件/workflow 路由（P4 阶段实现）
func RegisterRepoRoutes(g *gin.RouterGroup, c *service.Container) {}

// RegisterTaskRoutes 定时任务路由（P5 阶段实现）
func RegisterTaskRoutes(g *gin.RouterGroup, c *service.Container) {}

// RegisterBatchRoutes 批量操作路由（P5 阶段实现）
func RegisterBatchRoutes(g *gin.RouterGroup, c *service.Container) {}

// RegisterStatsRoutes 统计路由（P6 阶段实现）
func RegisterStatsRoutes(g *gin.RouterGroup, c *service.Container) {}
