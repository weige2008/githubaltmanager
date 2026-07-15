package handlers

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"githubaltmanager/internal/api/resp"
	"githubaltmanager/internal/service"
)

type RunsHandler struct {
	c *service.Container
	s *service.RepoService
}

func NewRunsHandler(c *service.Container) *RunsHandler {
	return &RunsHandler{c: c, s: service.NewRepoService(c.DB)}
}

func RegisterRunsRoutes(g *gin.RouterGroup, c *service.Container) {
	h := NewRunsHandler(c)
	grp := g.Group("/repos/:id/runs")
	{
		grp.GET("", h.ListRuns)
		grp.GET("/:runId/jobs", h.ListJobs)
		grp.GET("/:runId/logs", h.GetLogsURL)
		grp.GET("/:runId/jobs/:jobId/logs", h.GetJobLogs)
		grp.POST("/:runId/cancel", h.CancelRun)
	}
}

func (h *RunsHandler) ListRuns(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	perPage, _ := strconv.Atoi(c.DefaultQuery("per_page", "10"))
	if perPage <= 0 || perPage > 100 {
		perPage = 10
	}
	runs, err := h.s.ListWorkflowRuns(h.c, uint(id), perPage)
	if err != nil {
		resp.Internal(c, "获取运行记录失败: "+err.Error(), err)
		return
	}
	resp.OK(c, runs)
}

func (h *RunsHandler) ListJobs(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	runId, _ := strconv.ParseInt(c.Param("runId"), 10, 64)
	jobs, err := h.s.ListWorkflowJobs(h.c, uint(id), runId)
	if err != nil {
		resp.Internal(c, "获取任务详情失败: "+err.Error(), err)
		return
	}
	resp.OK(c, jobs)
}

func (h *RunsHandler) GetLogsURL(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	runId, _ := strconv.ParseInt(c.Param("runId"), 10, 64)
	url, err := h.s.GetWorkflowRunLogsURL(h.c, uint(id), runId)
	if err != nil {
		resp.Internal(c, "获取日志失败: "+err.Error(), err)
		return
	}
	resp.OK(c, gin.H{"url": url})
}

func (h *RunsHandler) GetJobLogs(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	jobId, _ := strconv.ParseInt(c.Param("jobId"), 10, 64)
	logs, err := h.s.GetJobLogs(h.c, uint(id), jobId)
	if err != nil {
		resp.Internal(c, "获取Job日志失败: "+err.Error(), err)
		return
	}
	resp.OK(c, gin.H{"logs": logs})
}

func (h *RunsHandler) CancelRun(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 64)
	runId, _ := strconv.ParseInt(c.Param("runId"), 10, 64)
	err := h.s.CancelWorkflowRun(h.c, uint(id), runId)
	if err != nil {
		resp.Internal(c, "取消失败: "+err.Error(), err)
		return
	}
	resp.OK(c, gin.H{"ok": true})
}
