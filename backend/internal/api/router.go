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

	// CORS: 默认同源不需要 CORS；如果用户在 GAM_CORS_ORIGINS 中配置了允许的来源，则启用
	corsOrigins := cfg.Security.CORSOrigins
	if len(corsOrigins) == 0 {
		corsOrigins = []string{"*"} // 默认允许（无凭证，仅 Authorization 头部）
	}
	r.Use(cors.New(cors.Config{
		AllowOrigins:     corsOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "X-Requested-With", "X-API-Key"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	}))

	r.Use(func(c *gin.Context) {
		c.Header("X-Content-Type-Options", "nosniff")
		c.Header("X-Frame-Options", "DENY")
		c.Header("Referrer-Policy", "strict-origin-when-cross-origin")
		c.Header("Permissions-Policy", "geolocation=(), microphone=(), camera=(), payment=()")
		c.Header("X-XSS-Protection", "1; mode=block")
		// CSP: same-origin scripts/styles/fonts, GitHub API + img/connection only
		c.Header("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.github.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'")
		if cfg.IsProd() {
			c.Header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
		}
		c.Next()
	})

	r.GET("/healthz", healthz)
	r.GET("/api/health", healthz)

	api := r.Group("/api")

	// Auth routes (public)
	authH := handlers.NewAuthHandler(c)
	authGrp := api.Group("/auth")
	{
		authGrp.GET("/status", authH.Status)
		authGrp.POST("/setup", handlers.AuthRateLimit(), authH.Setup)
		authGrp.POST("/login", handlers.AuthRateLimit(), authH.Login)
	}

	// Protected routes: JWT or API Key
	protected := api.Group("")
	protected.Use(handlers.DualAuthMiddleware(cfg.Security.JWTSecret, c.DB))
	protected.Use(handlers.UnlockGuard())
	{
		protected.POST("/auth/change-password", handlers.AuthRateLimit(), authH.ChangePassword)
	}

	handlers.RegisterAccountRoutes(protected, c)
	handlers.RegisterRepoRoutes(protected, c)
	handlers.RegisterTaskRoutes(protected, c)
	handlers.RegisterBatchRoutes(protected, c)
	handlers.RegisterStatsRoutes(protected, c)
	handlers.RegisterAutoTaskRoutes(protected, c)
	handlers.RegisterAPIKeyRoutes(protected, c)
	handlers.RegisterSystemRoutes(protected, c)
	handlers.RegisterRunsRoutes(protected, c)

	registerSPA(r, staticDir)
	return r
}

func registerSPA(r *gin.Engine, staticDir string) {
	embedded := hasEmbeddedIndex()
	if embedded {
		r.NoRoute(func(c *gin.Context) {
			p := strings.TrimPrefix(c.Request.URL.Path, "/")
			c.Header("Cache-Control", "no-cache, no-store, must-revalidate")
			c.Header("Pragma", "no-cache")
			c.Header("Expires", "0")
			if p == "" { serveEmbeddedIndex(c); return }
			if data, err := web.Dist.ReadFile("dist/" + p); err == nil { c.Data(http.StatusOK, mimeByExt(p), data); return }
			if !strings.HasPrefix(c.Request.URL.Path, "/api") { serveEmbeddedIndex(c); return }
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		})
		return
	}
	if staticDir != "" {
		fs := http.FileServer(http.Dir(staticDir))
		r.NoRoute(func(c *gin.Context) {
			if strings.HasPrefix(c.Request.URL.Path, "/api") { c.JSON(http.StatusNotFound, gin.H{"error": "not found"}); return }
			http.StripPrefix("/", fs).ServeHTTP(c.Writer, c.Request)
		})
	} else {
		r.NoRoute(func(c *gin.Context) { c.JSON(http.StatusNotFound, gin.H{"error": "not found", "path": c.Request.URL.Path}) })
	}
}

func hasEmbeddedIndex() bool { f, err := web.Dist.Open("dist/index.html"); if err != nil { return false }; f.Close(); return true }
func serveEmbeddedIndex(c *gin.Context) {
	data, err := web.Dist.ReadFile("dist/index.html")
	if err != nil { c.JSON(http.StatusInternalServerError, gin.H{"error": "index.html not embedded"}); return }
	c.Header("Cache-Control", "no-cache")
	c.Data(http.StatusOK, "text/html; charset=utf-8", data)
}
func mimeByExt(p string) string {
	switch {
	case strings.HasSuffix(p, ".html"): return "text/html; charset=utf-8"
	case strings.HasSuffix(p, ".css"): return "text/css; charset=utf-8"
	case strings.HasSuffix(p, ".js"): return "application/javascript; charset=utf-8"
	case strings.HasSuffix(p, ".svg"): return "image/svg+xml"
	case strings.HasSuffix(p, ".png"): return "image/png"
	case strings.HasSuffix(p, ".json"): return "application/json; charset=utf-8"
	case strings.HasSuffix(p, ".ico"): return "image/x-icon"
	case strings.HasSuffix(p, ".woff"), strings.HasSuffix(p, ".woff2"): return "font/woff2"
	}
	return "application/octet-stream"
}
func healthz(c *gin.Context) {
	c.JSON(200, gin.H{"ok": true, "service": "githubaltmanager", "ts": time.Now().Unix()})
}
