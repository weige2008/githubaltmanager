package main

import (
	"bufio"
	"context"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"githubaltmanager/internal/api"
	"githubaltmanager/internal/config"
	"githubaltmanager/internal/scheduler"
	"githubaltmanager/internal/service"
	"githubaltmanager/internal/store"
)

// loadDotEnv reads .env file in the current directory and sets env vars (only if not already set)
func loadDotEnv() {
	f, err := os.Open(".env")
	if err != nil {
		return
	}
	defer f.Close()
	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := scanner.Text()
		if len(line) == 0 || line[0] == '#' {
			continue
		}
		for i := 0; i < len(line); i++ {
			if line[i] == '=' {
				key := line[:i]
				val := line[i+1:]
				if os.Getenv(key) == "" {
					os.Setenv(key, val)
				}
				break
			}
		}
	}
}

// generateSecret generates a random hex string
func generateSecret(bytes int) string {
	b := make([]byte, bytes)
	rand.Read(b)
	return hex.EncodeToString(b)
}

// ensureDefaults checks required env vars and auto-generates missing ones, saving to .env
func ensureDefaults() {
	loadDotEnv()

	changed := false
	defaults := map[string]string{
		"GAM_HOST":          "0.0.0.0",
		"GAM_PORT":          "8080",
		"GAM_ENV":           "prod",
		"GAM_DB_PATH":       "data/githubaltmanager.db",
		"GAM_GH_API":        "https://api.github.com",
		"GAM_GH_TIMEOUT":    "20",
		"GAM_GH_CONCURRENCY": "8",
		"GAM_TZ":            "Asia/Shanghai",
	}

	for key, val := range defaults {
		if os.Getenv(key) == "" {
			os.Setenv(key, val)
			changed = true
		}
	}

	if os.Getenv("GAM_JWT_SECRET") == "" {
		os.Setenv("GAM_JWT_SECRET", generateSecret(32))
		changed = true
	}
	if os.Getenv("GAM_MASTER_SALT") == "" {
		os.Setenv("GAM_MASTER_SALT", generateSecret(16))
		changed = true
	}

	if changed {
		saveDotEnv()
		log.Println("[config] .env generated with auto-generated secrets")
	}
}

// saveDotEnv writes current key env vars to .env
func saveDotEnv() {
	keys := []string{
		"GAM_HOST", "GAM_PORT", "GAM_ENV", "GAM_DB_PATH",
		"GAM_JWT_SECRET", "GAM_MASTER_SALT",
		"GAM_GH_API", "GAM_GH_TIMEOUT", "GAM_GH_CONCURRENCY",
		"GAM_TZ", "GAM_MASTER_PASSWORD",
	}
	f, err := os.Create(".env")
	if err != nil {
		return
	}
	defer f.Close()
	fmt.Fprintln(f, "# GitHub Alt Manager - auto-generated configuration")
	for _, k := range keys {
		v := os.Getenv(k)
		if v != "" {
			fmt.Fprintf(f, "%s=%s\n", k, v)
		}
	}
}

func main() {
	ensureDefaults()

	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("load config: %v", err)
	}
	if err := cfg.EnsureDataDir(); err != nil {
		log.Fatalf("ensure data dir: %v", err)
	}

	// 数据库
	db, err := store.Open(cfg)
	if err != nil {
		log.Fatalf("open db: %v", err)
	}

	// 依赖注入容器
	container := service.NewContainer(db, cfg)

	// 启动定时任务调度器（用户创建的 workflow_dispatch 定时任务）
	scheduler.Start(container)
	defer scheduler.Stop()

	// 启动自动任务调度器（自动检测封禁 + 自动同步仓库）
	scheduler.StartAutoScheduler(container)
	defer scheduler.StopAutoScheduler()

	// HTTP 服务
	staticDir := os.Getenv("GAM_STATIC_DIR")
	if staticDir == "" {
		staticDir = "./frontend/dist"
	}
	r := api.NewRouter(cfg, container, staticDir)
	srv := &http.Server{
		Addr:              cfg.Addr(),
		Handler:           r,
		ReadHeaderTimeout: 10 * time.Second,
	}

	go func() {
		log.Printf("[server] listening on %s (env=%s)", cfg.Addr(), cfg.Server.Env)
		log.Printf("[server] open http://localhost:%d in your browser", cfg.Server.Port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %v", err)
		}
	}()

	// 优雅关闭
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("[server] shutting down...")

	ctx, cancel := context.WithTimeout(context.Background(), 10 * time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Printf("[server] forced shutdown: %v", err)
	}
	log.Println("[server] exited")
}
