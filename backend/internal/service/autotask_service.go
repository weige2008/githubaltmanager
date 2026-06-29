package service

import (
	"log"
	"time"

	"githubaltmanager/internal/config"
	"githubaltmanager/internal/model"

	"gorm.io/gorm"
)

// AutoTaskService 管理自动检测+自动同步
type AutoTaskService struct {
	DB *gorm.DB
}

func NewAutoTaskService(db *gorm.DB) *AutoTaskService {
	return &AutoTaskService{DB: db}
}

// GetAutoTaskConfig 读取自动任务配置
func (s *AutoTaskService) GetAutoTaskConfig() (*config.AutoTaskConfig, error) {
	var cfg model.AppConfig
	if err := s.DB.First(&cfg, 1).Error; err != nil {
		return nil, err
	}
	return &config.AutoTaskConfig{
		AutoCheckEnabled: cfg.AutoCheckEnabled,
		AutoCheckCron:    cfg.AutoCheckCron,
		AutoSyncEnabled:  cfg.AutoSyncEnabled,
		AutoSyncCron:     cfg.AutoSyncCron,
	}, nil
}

// UpdateAutoTaskConfig 更新自动任务配置
func (s *AutoTaskService) UpdateAutoTaskConfig(req config.AutoTaskConfig) error {
	return s.DB.Model(&model.AppConfig{}).Where("id = 1").Updates(map[string]any{
		"auto_check_enabled": req.AutoCheckEnabled,
		"auto_check_cron":    req.AutoCheckCron,
		"auto_sync_enabled":  req.AutoSyncEnabled,
		"auto_sync_cron":     req.AutoSyncCron,
	}).Error
}

// RunAutoSync 对所有账户执行仓库同步
func (s *AutoTaskService) RunAutoSync(c *Container) {
	var accs []model.Account
	if err := s.DB.Find(&accs).Error; err != nil {
		log.Printf("[auto-sync] 查询账户失败: %v", err)
		return
	}
	if len(accs) == 0 {
		return
	}

	log.Printf("[auto-sync] 开始同步 %d 个账户的仓库...", len(accs))
	repoSvc := NewRepoService(s.DB)
	totalRepos := 0
	for _, acc := range accs {
		count, err := repoSvc.RefreshRepos(c, acc.ID)
		if err != nil {
			log.Printf("[auto-sync] 账户 %s 同步失败: %v", acc.GithubLogin, err)
			continue
		}
		totalRepos += count
	}
	now := time.Now()
	s.DB.Model(&model.AppConfig{}).Where("id = 1").Update("auto_sync_last_at", now)
	log.Printf("[auto-sync] 完成，共同步 %d 个仓库", totalRepos)
}

// RunAutoCheck 对所有账户执行封禁检测
func (s *AutoTaskService) RunAutoCheck(c *Container) {
	var accs []model.Account
	if err := s.DB.Find(&accs).Error; err != nil {
		log.Printf("[auto-check] 查询账户失败: %v", err)
		return
	}
	if len(accs) == 0 {
		return
	}

	log.Printf("[auto-check] 开始检测 %d 个账户状态...", len(accs))
	accSvc := NewAccountService(s.DB)
	for _, acc := range accs {
		_, err := accSvc.CheckStatus(c, acc.ID)
		if err != nil {
			log.Printf("[auto-check] 账户 %s 检测失败: %v", acc.GithubLogin, err)
		}
	}
	now := time.Now()
	s.DB.Model(&model.AppConfig{}).Where("id = 1").Update("auto_check_last_at", now)
	log.Printf("[auto-check] 完成，共检测 %d 个账户", len(accs))
}
