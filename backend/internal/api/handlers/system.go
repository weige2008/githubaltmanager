package handlers

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"runtime"
	"strings"
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

func getCurrentVersion() string {
	if appVersion != "dev" {
		return appVersion
	}
	// Fallback: try reading from embedded frontend package.json
	return "2.8.2"
}

var appVersion = "dev"

type VersionInfo struct {
	Current       string `json:"current"`
	Latest        string `json:"latest"`
	HasUpdate     bool   `json:"has_update"`
	DownloadURL   string `json:"download_url"`
	ReleaseNotes  string `json:"release_notes"`
}

func (h *SystemHandler) GetVersion(c *gin.Context) {
	resp.OK(c, gin.H{
		"current": getCurrentVersion(),
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
	current := getCurrentVersion()
	resp.OK(c, VersionInfo{
		Current:      current,
		Latest:       latest,
		HasUpdate:    latest != current,
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

	// Get latest release info (version + assets + checksums)
	latest, releaseURL, _, assets, err := fetchLatestReleaseAssets()
	if err != nil {
		resp.Internal(c, "获取最新版本失败: "+err.Error(), err)
		return
	}
	binaryURL := ""
	checksumsURL := ""
	for _, a := range assets {
		switch a.Name {
		case assetName:
			binaryURL = a.BrowserDownloadURL
		case "checksums.txt":
			checksumsURL = a.BrowserDownloadURL
		}
	}
	if binaryURL == "" {
		resp.Internal(c, fmt.Sprintf("找不到平台二进制: %s", assetName), nil)
		return
	}

	// Download the binary (capped at 200MB)
	client := &http.Client{Timeout: 5 * time.Minute}
	req, err := http.NewRequest("GET", binaryURL, nil)
	if err != nil {
		resp.Internal(c, "构造下载请求失败: "+err.Error(), err)
		return
	}
	req.Header.Set("User-Agent", "githubaltmanager-selfupdate")
	resp2, err := client.Do(req)
	if err != nil {
		resp.Internal(c, "下载二进制失败: "+err.Error(), err)
		return
	}
	defer resp2.Body.Close()

	if resp2.StatusCode != 200 {
		resp.Internal(c, fmt.Sprintf("下载失败: HTTP %d", resp2.StatusCode), nil)
		return
	}

	const maxBinarySize = 200 << 20 // 200 MB
	bodyReader := io.LimitReader(resp2.Body, maxBinarySize+1)
	binData, err := io.ReadAll(bodyReader)
	if err != nil {
		resp.Internal(c, "读取下载内容失败: "+err.Error(), err)
		return
	}
	if int64(len(binData)) > maxBinarySize {
		resp.Internal(c, "下载文件超过 200MB 上限，已中止", nil)
		return
	}

	// SHA-256 checksum verification (if checksums.txt available)
	if checksumsURL != "" {
		wantHash, ok := fetchChecksumForAsset(checksumsURL, assetName)
		if ok {
			gotSum := sha256.Sum256(binData)
			gotHash := hex.EncodeToString(gotSum[:])
			if !strings.EqualFold(gotHash, wantHash) {
				resp.Internal(c, fmt.Sprintf("校验失败：期望 %s 实际 %s", wantHash, gotHash), nil)
				return
			}
		}
	}

	// Write to temp file
	tmpPath := os.Args[0] + ".new"
	out, err := os.OpenFile(tmpPath, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0700)
	if err != nil {
		resp.Internal(c, "创建临时文件失败: "+err.Error(), err)
		return
	}
	if _, err := out.Write(binData); err != nil {
		out.Close()
		os.Remove(tmpPath)
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
		os.Remove(tmpPath)
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
		"message": "更新成功（v" + latest + "），服务即将重启",
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

	// Strip 'v' prefix from tag name (v2.8.2 -> 2.8.2)
	version = release.TagName
	if len(version) > 0 && version[0] == 'v' {
		version = version[1:]
	}
	return version, release.HTMLURL, release.Body, nil
}

// releaseAsset represents a GitHub release asset
type releaseAsset struct {
	Name               string `json:"name"`
	BrowserDownloadURL string `json:"browser_download_url"`
}

// fetchLatestReleaseAssets returns version, html_url, body, and assets for the latest release
func fetchLatestReleaseAssets() (version, releaseURL, body string, assets []releaseAsset, err error) {
	client := &http.Client{Timeout: 10 * time.Second}
	req, _ := http.NewRequest("GET", "https://api.github.com/repos/weige2008/githubaltmanager/releases/latest", nil)
	req.Header.Set("Accept", "application/vnd.github+json")
	req.Header.Set("User-Agent", "githubaltmanager")
	resp, err := client.Do(req)
	if err != nil {
		return "", "", "", nil, err
	}
	defer resp.Body.Close()

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", "", "", nil, err
	}

	var release struct {
		TagName string          `json:"tag_name"`
		HTMLURL string          `json:"html_url"`
		Body    string          `json:"body"`
		Assets  []releaseAsset  `json:"assets"`
	}
	if err := json.Unmarshal(data, &release); err != nil {
		return "", "", "", nil, err
	}

	version = release.TagName
	if len(version) > 0 && version[0] == 'v' {
		version = version[1:]
	}
	return version, release.HTMLURL, release.Body, release.Assets, nil
}

// fetchChecksumForAsset downloads checksums.txt and returns the hex SHA-256 for the given asset name.
// Returns ("", false) on any error or if the asset is not listed.
func fetchChecksumForAsset(checksumsURL, assetName string) (string, bool) {
	client := &http.Client{Timeout: 30 * time.Second}
	req, _ := http.NewRequest("GET", checksumsURL, nil)
	req.Header.Set("User-Agent", "githubaltmanager-selfupdate")
	resp, err := client.Do(req)
	if err != nil {
		return "", false
	}
	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		return "", false
	}
	// Limit size to prevent abuse
	data, err := io.ReadAll(io.LimitReader(resp.Body, 64<<10))
	if err != nil {
		return "", false
	}
	// Lines: "<hex>  <filename>" or "<hex>  *<filename>"
	for _, line := range strings.Split(string(data), "\n") {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		fields := strings.Fields(line)
		if len(fields) < 2 {
			continue
		}
		hash := fields[0]
		name := strings.TrimPrefix(strings.TrimPrefix(fields[1], "*"), "./")
		if name == assetName && len(hash) == 64 {
			return strings.ToLower(hash), true
		}
	}
	return "", false
}
