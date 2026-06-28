package api

import (
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"githubaltmanager/internal/api/handlers"
	"githubaltmanager/internal/config"
	"githubaltmanager/internal/service"
)

// NewRouter 构造 Gin 引擎并注册所有路由。
// staticDir 非空时（生产部署），同时托管前端 SPA 静态文件。
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

	// 健康检查（无需鉴权）
	r.GET("/healthz", healthz)
	r.GET("/api/health", healthz)

	api := r.Group("/api")

	// ---- 鉴权组（无需 token，无需解锁）----
	authH := handlers.NewAuthHandler(c)
	authGrp := api.Group("/auth")
	{
		authGrp.GET("/status", authH.Status)
		authGrp.POST("/setup", authH.Setup)
		authGrp.POST("/login", authH.Login)
	}

	// ---- 受保护接口（需 JWT + 解锁）----
	protected := api.Group("")
	protected.Use(handlers.AuthMiddleware(cfg.Security.JWTSecret))
	protected.Use(handlers.UnlockGuard())
	{
		authGrp2 := protected.Group("/auth")
		authGrp2.POST("/change-password", authH.ChangePassword)
	}

	handlers.RegisterAccountRoutes(protected, c)
	handlers.RegisterRepoRoutes(protected, c)
	handlers.RegisterTaskRoutes(protected, c)
	handlers.RegisterBatchRoutes(protected, c)
	handlers.RegisterStatsRoutes(protected, c)

	// 前端 SPA 静态托管（生产部署用单端口）
	if staticDir != "" {
		if _, err := os.Stat(staticDir); err == nil {
			r.Use(spaStatic(staticDir))
		}
	}

	return r
}

// spaStatic 托管前端 SPA：先尝试静态文件，找不到则回退到 index.html
func spaStatic(root string) gin.HandlerFunc {
	fs := http.FileServer(http.Dir(root))
	indexFile := filepath.Join(root, "index.html")
	return func(c *gin.Context) {
		// API 路径不走静态
		if len(c.Request.URL.Path) >= 4 && c.Request.URL.Path[:4] == "/api" {
			c.Next()
			return
		}
		full := filepath.Join(root, c.Request.URL.Path)
		if _, err := os.Stat(full); err == nil {
			fs.ServeHTTP(c.Writer, c.Request)
			c.Abort()
			return
		}
		// SPA fallback
		http.ServeFile(c.Writer, c.Request, indexFile)
		c.Abort()
	}
}

func healthz(c *gin.Context) {
	c.JSON(200, gin.H{
		"ok":      true,
		"service": "githubaltmanager",
		"ts":      time.Now().Unix(),
	})
}
