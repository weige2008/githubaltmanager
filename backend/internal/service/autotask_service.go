package service

import (
	"fmt"
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
		AutoCheckEnabled:  cfg.AutoCheckEnabled,
		AutoCheckInterval: cfg.AutoCheckInterval,
		AutoSyncEnabled:   cfg.AutoSyncEnabled,
		AutoSyncInterval:  cfg.AutoSyncInterval,
	}, nil
}

// UpdateAutoTaskConfig 更新自动任务配置
func (s *AutoTaskService) UpdateAutoTaskConfig(req config.AutoTaskConfig) error {
	if req.AutoCheckInterval < 1 {
		req.AutoCheckInterval = 30
	}
	if req.AutoSyncInterval < 1 {
		req.AutoSyncInterval = 30
	}
	return s.DB.Model(&model.AppConfig{}).Where("id = 1").Updates(map[string]any{
		"auto_check_enabled":  req.AutoCheckEnabled,
		"auto_check_interval": req.AutoCheckInterval,
		"auto_sync_enabled":   req.AutoSyncEnabled,
		"auto_sync_interval":  req.AutoSyncInterval,
	}).Error
}

// startLog 创建一条 running 日志，返回 logID
func (s *AutoTaskService) startLog(taskType string) uint {
	entry := model.AutoTaskLog{
		TaskType: taskType,
		Status:   "running",
	}
	s.DB.Create(&entry)
	return entry.ID
}

// finishLog 更新日志为完成/失败
func (s *AutoTaskService) finishLog(logID uint, status string, total, success, failed int, durationMs int64, detail string) {
	s.DB.Model(&model.AutoTaskLog{}).Where("id = ?", logID).Updates(map[string]any{
		"status":      status,
		"total_count": total,
		"success_cnt": success,
		"failed_cnt":  failed,
		"duration":    durationMs,
		"detail":      detail,
	})
}

// RunAutoSync 对所有账户执行仓库同步（带日志）
func (s *AutoTaskService) RunAutoSync(c *Container) {
	var accs []model.Account
	if err := s.DB.Find(&accs).Error; err != nil {
		log.Printf("[auto-sync] 查询账户失败: %v", err)
		return
	}
	if len(accs) == 0 {
		return
	}

	logID := s.startLog("sync")
	start := time.Now()
	log.Printf("[auto-sync] 开始同步 %d 个账户的仓库...", len(accs))

	repoSvc := NewRepoService(s.DB)
	totalRepos := 0
	successCnt := 0
	failedCnt := 0
	details := ""

	for _, acc := range accs {
		count, err := repoSvc.RefreshRepos(c, acc.ID)
		if err != nil {
			failedCnt++
			details += fmt.Sprintf("%s: 失败 (%v)\n", acc.GithubLogin, err)
			log.Printf("[auto-sync] 账户 %s 同步失败: %v", acc.GithubLogin, err)
			continue
		}
		successCnt++
		totalRepos += count
		details += fmt.Sprintf("%s: %d 个仓库\n", acc.GithubLogin, count)
	}

	duration := time.Since(start).Milliseconds()
	now := time.Now()
	s.DB.Model(&model.AppConfig{}).Where("id = 1").Update("auto_sync_last_at", now)
	status := "success"
	if failedCnt > 0 && successCnt == 0 {
		status = "failed"
	}
	s.finishLog(logID, status, len(accs), successCnt, failedCnt, duration, details)
	log.Printf("[auto-sync] 完成: %d 成功, %d 失败, %d 仓库, 耗时 %dms", successCnt, failedCnt, totalRepos, duration)
}

// RunAutoCheck 对所有账户执行封禁检测（带日志）
func (s *AutoTaskService) RunAutoCheck(c *Container) {
	var accs []model.Account
	if err := s.DB.Find(&accs).Error; err != nil {
		log.Printf("[auto-check] 查询账户失败: %v", err)
		return
	}
	if len(accs) == 0 {
		return
	}

	logID := s.startLog("check")
	start := time.Now()
	log.Printf("[auto-check] 开始检测 %d 个账户状态...", len(accs))

	accSvc := NewAccountService(s.DB)
	successCnt := 0
	failedCnt := 0
	details := ""

	for _, acc := range accs {
		result, err := accSvc.CheckStatus(c, acc.ID)
		if err != nil {
			failedCnt++
			details += fmt.Sprintf("%s: 检测失败 (%v)\n", acc.GithubLogin, err)
			continue
		}
		successCnt++
		details += fmt.Sprintf("%s: %s\n", acc.GithubLogin, result.Status)
	}

	duration := time.Since(start).Milliseconds()
	now := time.Now()
	s.DB.Model(&model.AppConfig{}).Where("id = 1").Update("auto_check_last_at", now)
	status := "success"
	if failedCnt > 0 && successCnt == 0 {
		status = "failed"
	}
	s.finishLog(logID, status, len(accs), successCnt, failedCnt, duration, details)
	log.Printf("[auto-check] 完成: %d 成功, %d 失败, 耗时 %dms", successCnt, failedCnt, duration)
}

// GetLogs 查询日志
func (s *AutoTaskService) GetLogs(limit int) ([]model.AutoTaskLog, error) {
	var logs []model.AutoTaskLog
	if limit <= 0 || limit > 200 {
		limit = 50
	}
	err := s.DB.Order("id DESC").Limit(limit).Find(&logs).Error
	return logs, err
}

// GetRunningTask 获取当前正在运行的任务
func (s *AutoTaskService) GetRunningTask() (*model.AutoTaskLog, error) {
	var logEntry model.AutoTaskLog
	err := s.DB.Where("status = ?", "running").Order("id DESC").First(&logEntry).Error
	if err != nil {
		return nil, err
	}
	return &logEntry, nil
}
