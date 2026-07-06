package service

import (
	"fmt"
	"log"
	"os"
	"time"

	"githubaltmanager/internal/auth"
	"githubaltmanager/internal/config"
	"githubaltmanager/internal/crypto"
	"githubaltmanager/internal/model"

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
	c.ensureUnlockedForAuto()
	if !crypto.IsUnlocked() {
		return
	}
	NewTaskService(c.DB).RunDueTasks(c)
}

// === AutoTaskRunner 接口实现（间隔模式） ===

func (c *Container) GetAutoConfig() (checkEnabled bool, checkInterval int, syncEnabled bool, syncInterval int) {
	var cfg model.AppConfig
	result := c.DB.Where("id = 1").Limit(1).Find(&cfg)
	if result.Error != nil || result.RowsAffected == 0 {
		return false, 30, true, 30
	}
	return cfg.AutoCheckEnabled, cfg.AutoCheckInterval, cfg.AutoSyncEnabled, cfg.AutoSyncInterval
}

func (c *Container) RunAutoCheck() {
	c.ensureUnlockedForAuto()
	if !crypto.IsUnlocked() {
		return
	}
	NewAutoTaskService(c.DB).RunAutoCheck(c)
}

func (c *Container) RunAutoSync() {
	c.ensureUnlockedForAuto()
	if !crypto.IsUnlocked() {
		return
	}
	NewAutoTaskService(c.DB).RunAutoSync(c)
}

func (c *Container) CleanRecycleBin() {
	var cfg model.AppConfig
	c.DB.First(&cfg, 1)
	if !cfg.RecycleBinEnabled { return }
	days := cfg.RecycleBinDays
	if days <= 0 { days = 30 }
	threshold := time.Now().AddDate(0, 0, -days)
	result := c.DB.Where("deleted_at IS NOT NULL AND deleted_at < ?", threshold).Delete(&model.Account{})
	if result.RowsAffected > 0 {
		log.Printf("[recycle-bin] cleaned %d accounts older than %d days", result.RowsAffected, days)
	}
	now := time.Now()
	c.DB.Model(&model.AppConfig{}).Where("id = 1").Update("recycle_bin_last_clean", &now)
}

// ensureUnlockedForAuto 尝试用配置的 master 密码自动解锁 keystore
// 支持 GAM_MASTER_PASSWORD 环境变量
func (c *Container) ensureUnlockedForAuto() {
	if crypto.IsUnlocked() {
		return
	}
	// 方式1：环境变量 GAM_MASTER_PASSWORD
	masterPwd := os.Getenv("GAM_MASTER_PASSWORD")
	if masterPwd == "" {
		return
	}
	params := c.KeyParams()
	key, err := crypto.DeriveKey(masterPwd, c.CFG.Security.MasterSalt, params)
	if err != nil {
		return
	}
	// 验证密码是否正确
	var cfg model.AppConfig
	if err := c.DB.First(&cfg, 1).Error; err != nil {
		return
	}
	ok, _ := auth.VerifyMasterPassword(masterPwd, cfg.MasterPasswordHash, c.CFG.Security.MasterSalt, params)
	if ok {
		crypto.SetMasterKey(key)
		log.Printf("[auto] keystore auto-unlocked via GAM_MASTER_PASSWORD")
	}
}
