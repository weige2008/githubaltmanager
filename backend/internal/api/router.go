package api

import (
	"net/http"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"githubaltmanager/internal/api/handlers"
	"githubaltmanager/internal/config"
	"githubaltmanager/internal/service"
	"githubaltmanager/internal/web"
)

func NewRouter(cfg *config.Config, c *service.Container, staticDir string) *gin.Engine {
	if cfg.IsProd() {
		gin.SetMode(gin.ReleaseMode)
	}
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	corsConfig := cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "X-Requested-With"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	}
	r.Use(cors.New(corsConfig))

	r.GET("/healthz", healthz)
	r.GET("/api/health", healthz)

	api := r.Group("/api")

	authH := handlers.NewAuthHandler(c)
	authGrp := api.Group("/auth")
	{
		authGrp.GET("/status", authH.Status)
		authGrp.POST("/setup", authH.Setup)
		authGrp.POST("/login", authH.Login)
	}

	protected := api.Group("")
	protected.Use(handlers.AuthMiddleware(cfg.Security.JWTSecret))
	protected.Use(handlers.UnlockGuard())
	{
		protected.POST("/auth/change-password", authH.ChangePassword)
	}

	handlers.RegisterAccountRoutes(protected, c)
	handlers.RegisterRepoRoutes(protected, c)
	handlers.RegisterTaskRoutes(protected, c)
	handlers.RegisterBatchRoutes(protected, c)
	handlers.RegisterStatsRoutes(protected, c)
	handlers.RegisterAutoTaskRoutes(protected, c)

	registerSPA(r, staticDir)

	return r
}

// registerSPA 注册前端 SPA 处理器。优先用 go:embed 内嵌资源，其次外部目录。
func registerSPA(r *gin.Engine, staticDir string) {
	embedded := hasEmbeddedIndex()

	if embedded {
		r.NoRoute(func(c *gin.Context) {
			p := strings.TrimPrefix(c.Request.URL.Path, "/")
			// 强制不缓存所有响应
			c.Header("Cache-Control", "no-cache, no-store, must-revalidate")
			c.Header("Pragma", "no-cache")
			c.Header("Expires", "0")
			if p == "" {
				serveEmbeddedIndex(c)
				return
			}
			if data, err := web.Dist.ReadFile("dist/" + p); err == nil {
				c.Data(http.StatusOK, mimeByExt(p), data)
				return
			}
			// SPA fallback: 所有非 /api 路径返回 index.html
			if !strings.HasPrefix(c.Request.URL.Path, "/api") {
				serveEmbeddedIndex(c)
				return
			}
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		})
		return
	}

	if staticDir != "" {
		fs := http.FileServer(http.Dir(staticDir))
		r.NoRoute(func(c *gin.Context) {
			if strings.HasPrefix(c.Request.URL.Path, "/api") {
				c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
				return
			}
			http.StripPrefix("/", fs).ServeHTTP(c.Writer, c.Request)
		})
	} else {
		r.NoRoute(func(c *gin.Context) {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found", "path": c.Request.URL.Path})
		})
	}
}

func hasEmbeddedIndex() bool {
	f, err := web.Dist.Open("dist/index.html")
	if err != nil {
		return false
	}
	f.Close()
	return true
}

func serveEmbeddedIndex(c *gin.Context) {
	data, err := web.Dist.ReadFile("dist/index.html")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "index.html not embedded"})
		return
	}
	c.Header("Cache-Control", "no-cache")
	c.Data(http.StatusOK, "text/html; charset=utf-8", data)
}

func mimeByExt(p string) string {
	switch {
	case strings.HasSuffix(p, ".html"):
		return "text/html; charset=utf-8"
	case strings.HasSuffix(p, ".css"):
		return "text/css; charset=utf-8"
	case strings.HasSuffix(p, ".js"):
		return "application/javascript; charset=utf-8"
	case strings.HasSuffix(p, ".svg"):
		return "image/svg+xml"
	case strings.HasSuffix(p, ".png"):
		return "image/png"
	case strings.HasSuffix(p, ".jpg"), strings.HasSuffix(p, ".jpeg"):
		return "image/jpeg"
	case strings.HasSuffix(p, ".json"):
		return "application/json; charset=utf-8"
	case strings.HasSuffix(p, ".ico"):
		return "image/x-icon"
	case strings.HasSuffix(p, ".woff"), strings.HasSuffix(p, ".woff2"):
		return "font/woff2"
	}
	return "application/octet-stream"
}

func healthz(c *gin.Context) {
	c.JSON(200, gin.H{
		"ok":      true,
		"service": "githubaltmanager",
		"ts":      time.Now().Unix(),
	})
}
