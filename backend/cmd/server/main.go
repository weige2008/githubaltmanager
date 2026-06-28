package main

import (
	"context"
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

func main() {
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

	// 启动定时调度器
	scheduler.Start(container)
	defer scheduler.Stop()

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
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %v", err)
		}
	}()

	// 优雅关闭
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("[server] shutting down...")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Printf("[server] forced shutdown: %v", err)
	}
	log.Println("[server] exited")
}
