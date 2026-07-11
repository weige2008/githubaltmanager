package service

import (
	"encoding/json"
	"errors"
	"log"
	"time"

	"githubaltmanager/internal/model"

	"gorm.io/gorm"
)

type TaskService struct {
	DB *gorm.DB
}

func NewTaskService(db *gorm.DB) *TaskService { return &TaskService{DB: db} }

// List 列出全部定时任务
func (s *TaskService) List() ([]model.ScheduledTask, error) {
	var tasks []model.ScheduledTask
	err := s.DB.Order("id DESC").Find(&tasks).Error
	return tasks, err
}

// Create 创建任务
func (s *TaskService) Create(t *model.ScheduledTask) error {
	if t.CronExpr == "" {
		return errors.New("cron 表达式不能为空")
	}
	if t.OwnerRepo == "" {
		// 自动填充
		var repo model.Repository
		if err := s.DB.First(&repo, t.RepositoryID).Error; err == nil {
			t.OwnerRepo = repo.FullName
		}
	}
	if t.Ref == "" {
		t.Ref = "main"
	}
	if err := s.DB.Create(t).Error; err != nil {
		return err
	}
	return s.UpdateNextRun(t)
}

// Update 更新
func (s *TaskService) Update(id uint, updates map[string]any) (*model.ScheduledTask, error) {
	if err := s.DB.Model(&model.ScheduledTask{}).Where("id = ?", id).Updates(updates).Error; err != nil {
		return nil, err
	}
	var t model.ScheduledTask
	if err := s.DB.First(&t, id).Error; err != nil {
		return nil, err
	}
	if _, ok := updates["cron_expr"]; ok || updates["enabled"] != nil {
		if err := s.UpdateNextRun(&t); err != nil {
			return nil, err
		}
	}
	return &t, nil
}

// Delete 删除
func (s *TaskService) Delete(id uint) error {
	return s.DB.Delete(&model.ScheduledTask{}, id).Error
}

// Toggle 启用/禁用
func (s *TaskService) Toggle(id uint, enabled bool) (*model.ScheduledTask, error) {
	var t model.ScheduledTask
	if err := s.DB.First(&t, id).Error; err != nil {
		return nil, err
	}
	t.Enabled = enabled
	updates := map[string]any{"enabled": enabled}
	if !enabled {
		updates["next_run_at"] = nil
	}
	if err := s.DB.Model(&t).Updates(updates).Error; err != nil {
		return nil, err
	}
	if enabled {
		s.UpdateNextRun(&t)
	}
	return &t, nil
}

// UpdateNextRun 根据 cron 表达式计算下次执行时间
func (s *TaskService) UpdateNextRun(t *model.ScheduledTask) error {
	if !t.Enabled {
		s.DB.Model(t).Update("next_run_at", nil)
		return nil
	}
	next, err := nextRunTimeImpl(t.CronExpr)
	if err != nil {
		s.DB.Model(t).Update("next_run_at", nil)
		return err
	}
	return s.DB.Model(t).Update("next_run_at", next).Error
}

// RunDueTasks 执行所有到期任务（由调度器周期调用）
func (s *TaskService) RunDueTasks(c *Container) {
	now := time.Now()
	var due []model.ScheduledTask
	if err := s.DB.Joins("LEFT JOIN accounts ON accounts.id = scheduled_tasks.account_id").Where("scheduled_tasks.enabled = ? AND scheduled_tasks.next_run_at <= ? AND accounts.deleted_at IS NULL", true, now).Find(&due).Error; err != nil {
		log.Printf("[scheduler] query due tasks: %v", err)
		return
	}
	for i := range due {
		go s.executeTask(c, &due[i])
	}
}

// executeTask 执行单个任务
func (s *TaskService) executeTask(c *Container, t *model.ScheduledTask) {
	// 标记为运行中
	now := time.Now()
	s.DB.Model(t).Updates(map[string]any{
		"last_run_at":     now,
		"last_run_result": "running",
		"last_error":      "",
	})

	// 解析 inputs
	var inputs map[string]string
	if t.InputsJSON != "" {
		_ = json.Unmarshal([]byte(t.InputsJSON), &inputs)
	}

	repoSvc := NewRepoService(s.DB)
	err := repoSvc.DispatchWorkflow(c, t.RepositoryID, t.WorkflowFilename, t.Ref, inputs)
	result := "success"
	errMsg := ""
	if err != nil {
		result = "failed"
		errMsg = err.Error()
		log.Printf("[scheduler] task %d failed: %v", t.ID, err)
	}

	// 记录结果 & 计算下次
	s.DB.Model(t).Updates(map[string]any{
		"last_run_result": result,
		"last_error":      errMsg,
	})
	if err := s.UpdateNextRun(t); err != nil {
		log.Printf("[scheduler] task %d update next run: %v", t.ID, err)
	}
}

// RunNow 立即执行一次
func (s *TaskService) RunNow(c *Container, id uint) error {
	var t model.ScheduledTask
	if err := s.DB.First(&t, id).Error; err != nil {
		return err
	}
	go s.executeTask(c, &t)
	return nil
}

