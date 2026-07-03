package config

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

// Config 是后端运行配置
type Config struct {
	Server    ServerConfig
	Database  DatabaseConfig
	Security  SecurityConfig
	GitHub    GitHubConfig
	Scheduler SchedulerConfig
}

type ServerConfig struct {
	Host string
	Port int
	Env  string // dev / prod
}

type DatabaseConfig struct {
	Path string
}

type SecurityConfig struct {
	JWTSecret       string
	MasterSalt      string // Argon2id salt (hex) - 用于派生 master 密码哈希
	TokenIterations uint32 // Argon2id 迭代次数
	TokenMemory     uint32 // Argon2id 内存 (KB)
	TokenParallel   uint8  // Argon2id 并行度
}

type GitHubConfig struct {
	// APIBaseURL 默认 https://api.github.com，可改 GitHub Enterprise
	APIBaseURL string
	// RequestTimeout HTTP 超时秒数
	RequestTimeout int
	// MaxConcurrent 并发调用 GitHub API 的最大 goroutine 数
	MaxConcurrent int
}

type SchedulerConfig struct {
	Timezone string // 例 Asia/Shanghai
}

// AutoTaskConfig 自动任务配置（存储在数据库，前端可改）
type AutoTaskConfig struct {
	AutoCheckEnabled  bool   `json:"auto_check_enabled"`
	AutoCheckInterval int    `json:"auto_check_interval"`
	AutoSyncEnabled   bool   `json:"auto_sync_enabled"`
	AutoSyncInterval  int    `json:"auto_sync_interval"`
}

// Load 从环境变量加载配置，缺失时使用合理默认值
func Load() (*Config, error) {
	cfg := &Config{
		Server: ServerConfig{
			Host: envStr("GAM_HOST", "0.0.0.0"),
			Port: envInt("GAM_PORT", 19527),
			Env:  strings.ToLower(envStr("GAM_ENV", "dev")),
		},
		Database: DatabaseConfig{
			Path: envStr("GAM_DB_PATH", filepath.Join("data", "githubaltmanager.db")),
		},
		Security: SecurityConfig{
			JWTSecret:       envStr("GAM_JWT_SECRET", ""),
			MasterSalt:      envStr("GAM_MASTER_SALT", ""),
			TokenIterations: uint32(envInt("GAM_ARGON2_ITER", 3)),
			TokenMemory:     uint32(envInt("GAM_ARGON2_MEM", 64*1024)),
			TokenParallel:   uint8(envInt("GAM_ARGON2_PARALLEL", 2)),
		},
		GitHub: GitHubConfig{
			APIBaseURL:     envStr("GAM_GH_API", "https://api.github.com"),
			RequestTimeout: envInt("GAM_GH_TIMEOUT", 20),
			MaxConcurrent:  envInt("GAM_GH_CONCURRENCY", 8),
		},
		Scheduler: SchedulerConfig{
			Timezone: envStr("GAM_TZ", "Asia/Shanghai"),
		},
	}

	if err := cfg.validate(); err != nil {
		return nil, err
	}
	return cfg, nil
}

func (c *Config) validate() error {
	if c.Server.Port <= 0 || c.Server.Port > 65535 {
		return errors.New("invalid GAM_PORT")
	}
	if c.Security.JWTSecret == "" {
		return errors.New("GAM_JWT_SECRET must be set")
	}
	if c.Security.MasterSalt == "" {
		return errors.New("GAM_MASTER_SALT must be set")
	}
	if c.Database.Path == "" {
		return errors.New("GAM_DB_PATH must be set")
	}
	return nil
}

// EnsureDataDir 确保数据库所在目录存在
func (c *Config) EnsureDataDir() error {
	dir := filepath.Dir(c.Database.Path)
	if dir == "" {
		return nil
	}
	return os.MkdirAll(dir, 0o755)
}

// IsProd 是否为生产环境
func (c *Config) IsProd() bool { return c.Server.Env == "prod" }

// Addr 监听地址
func (c *Config) Addr() string { return fmt.Sprintf("%s:%d", c.Server.Host, c.Server.Port) }

func envStr(key, def string) string {
	if v, ok := os.LookupEnv(key); ok && v != "" {
		return v
	}
	return def
}

func envInt(key string, def int) int {
	if v, ok := os.LookupEnv(key); ok && v != "" {
		if n, err := strconv.Atoi(v); err == nil {
			return n
		}
	}
	return def
}
