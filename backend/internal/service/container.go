package service

import (
	"fmt"

	"githubaltmanager/internal/config"
	"githubaltmanager/internal/crypto"

	"gorm.io/gorm"
)

// Container 是依赖注入容器，持有 db / cfg，供 handler 调用
type Container struct {
	DB  *gorm.DB
	CFG *config.Config
}

func NewContainer(db *gorm.DB, cfg *config.Config) *Container {
	return &Container{DB: db, CFG: cfg}
}

// KeyParams 返回 Argon2id 参数
func (c *Container) KeyParams() crypto.KeyParams {
	return crypto.KeyParams{
		Iterations: c.CFG.Security.TokenIterations,
		Memory:     c.CFG.Security.TokenMemory,
		Parallel:   c.CFG.Security.TokenParallel,
		KeyLen:     32,
	}
}

// EnsureUnlocked 确保密钥已解锁（已登录），否则返回错误
func (c *Container) EnsureUnlocked() error {
	if !crypto.IsUnlocked() {
		return fmt.Errorf("keystore locked: please login first")
	}
	return nil
}

// RunDueTasks 实现 scheduler.TaskRunner 接口：执行到期定时任务
func (c *Container) RunDueTasks() {
	if !crypto.IsUnlocked() {
		// 未登录态下不执行（无法解密 token）
		return
	}
	NewTaskService(c.DB).RunDueTasks(c)
}
