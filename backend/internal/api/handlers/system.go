package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"runtime"
	"time"

	"github.com/gin-gonic/gin"
	"githubaltmanager/internal/api/resp"
	"githubaltmanager/internal/service"
)

type SystemHandler struct {
	c *service.Container
}

func NewSystemHandler(c *service.Container) *SystemHandler {
	return &SystemHandler{c: c}
}

func RegisterSystemRoutes(g *gin.RouterGroup, c *service.Container) {
	h := NewSystemHandler(c)
	grp := g.Group("/system")
	{
		grp.GET("/version", h.GetVersion)
		grp.GET("/check-update", h.CheckUpdate)
		grp.POST("/update", h.SelfUpdate)
	}
}

var appVersion = "2.8.1"

type VersionInfo struct {
	Current       string `json:"current"`
	Latest        string `json:"latest"`
	HasUpdate     bool   `json:"has_update"`
	DownloadURL   string `json:"download_url"`
	ReleaseNotes  string `json:"release_notes"`
}

func (h *SystemHandler) GetVersion(c *gin.Context) {
	resp.OK(c, gin.H{
		"current": appVersion,
		"os":      runtime.GOOS,
		"arch":    runtime.GOARCH,
	})
}

func (h *SystemHandler) CheckUpdate(c *gin.Context) {
	latest, releaseURL, body, err := fetchLatestRelease()
	if err != nil {
		resp.OK(c, gin.H{
			"current":    appVersion,
			"latest":     appVersion,
			"has_update": false,
			"error":      err.Error(),
		})
		return
	}
	resp.OK(c, VersionInfo{
		Current:      appVersion,
		Latest:       latest,
		HasUpdate:    latest != appVersion,
		DownloadURL:  releaseURL,
		ReleaseNotes: body,
	})
}

func (h *SystemHandler) SelfUpdate(c *gin.Context) {
	goos := runtime.GOOS
	goarch := runtime.GOARCH
	suffix := ""
	if goos == "windows" {
		suffix = ".exe"
	}
	assetName := fmt.Sprintf("githubaltmanager-%s-%s%s", goos, goarch, suffix)

	// Get latest release asset download URL
	_, releaseURL, _, err := fetchLatestRelease()
	if err != nil {
		resp.Internal(c, "获取最新版本失败: "+err.Error(), err)
		return
	}

	// Download the binary
	downloadURL := fmt.Sprintf("https://github.com/weige2008/githubaltmanager/releases/latest/download/%s", assetName)
	client := &http.Client{Timeout: 5 * time.Minute}
	resp2, err := client.Get(downloadURL)
	if err != nil {
		resp.Internal(c, "下载二进制失败: "+err.Error(), err)
		return
	}
	defer resp2.Body.Close()

	if resp2.StatusCode != 200 {
		resp.Internal(c, fmt.Sprintf("下载失败: HTTP %d", resp2.StatusCode), nil)
		return
	}

	// Write to temp file
	tmpPath := os.Args[0] + ".new"
	out, err := os.Create(tmpPath)
	if err != nil {
		resp.Internal(c, "创建临时文件失败: "+err.Error(), err)
		return
	}
	if _, err := io.Copy(out, resp2.Body); err != nil {
		out.Close()
		resp.Internal(c, "写入文件失败: "+err.Error(), err)
		return
	}
	out.Close()

	// Make executable
	if goos != "windows" {
		os.Chmod(tmpPath, 0755)
	}

	// Replace current binary
	oldPath := os.Args[0] + ".old"
	os.Remove(oldPath)
	if err := os.Rename(os.Args[0], oldPath); err != nil {
		resp.Internal(c, "备份旧版本失败: "+err.Error(), err)
		return
	}
	if err := os.Rename(tmpPath, os.Args[0]); err != nil {
		os.Rename(oldPath, os.Args[0]) // rollback
		resp.Internal(c, "替换二进制失败: "+err.Error(), err)
		return
	}

	resp.OK(c, gin.H{
		"ok":      true,
		"message": "更新成功，服务即将重启",
		"release": releaseURL,
	})

	// Self restart after response
	go func() {
		time.Sleep(2 * time.Second)
		os.Exit(0) // systemd will auto-restart
	}()
}

func fetchLatestRelease() (version, releaseURL, body string, err error) {
	client := &http.Client{Timeout: 10 * time.Second}
	req, _ := http.NewRequest("GET", "https://api.github.com/repos/weige2008/githubaltmanager/releases/latest", nil)
	req.Header.Set("Accept", "application/vnd.github+json")
	req.Header.Set("User-Agent", "githubaltmanager")
	resp, err := client.Do(req)
	if err != nil {
		return "", "", "", err
	}
	defer resp.Body.Close()

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", "", "", err
	}

	var release struct {
		TagName     string `json:"tag_name"`
		HTMLURL     string `json:"html_url"`
		Body        string `json:"body"`
	}
	if err := json.Unmarshal(data, &release); err != nil {
		return "", "", "", err
	}

	return release.TagName, release.HTMLURL, release.Body, nil
}
