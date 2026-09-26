package service

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"strings"
	"sync"
	"time"

	"githubaltmanager/internal/model"

	"gorm.io/gorm"
)

// 批量定时任务支持的类型
const (
	BatchTaskDispatch  = "dispatch"  // 批量触发工作流（repo 定位见 payload）
	BatchTaskStar      = "star"      // 批量 Star 仓库
	BatchTaskUnstar    = "unstar"    // 批量取消 Star
	BatchTaskFollow    = "follow"    // 批量关注用户
	BatchTaskUnfollow  = "unfollow"  // 批量取消关注
)

var batchTaskTypes = map[string]bool{
	BatchTaskDispatch: true, BatchTaskStar: true, BatchTaskUnstar: true,
	BatchTaskFollow: true, BatchTaskUnfollow: true,
}

// BatchTaskPayload 任务参数（dispatch: account_ids + repo_name/repo_ids + filename/ref/inputs；
// star/unstar: account_ids + owner + repo；follow/unfollow: account_ids + username）
type BatchTaskPayload struct {
	AccountIDs []uint            `json:"account_ids"`
	RepoName   string            `json:"repo_name,omitempty"`  // dispatch: 按账户缓存解析仓库（空=用 repo_ids）
	RepoIDs    []uint            `json:"repo_ids,omitempty"`   // dispatch: 直接指定仓库记录 ID
	Filename   string            `json:"filename,omitempty"`   // dispatch
	Ref        string            `json:"ref,omitempty"`        // dispatch
	Inputs     map[string]string `json:"inputs,omitempty"`     // dispatch
	Owner      string            `json:"owner,omitempty"`      // star/unstar
	Repo       string            `json:"repo,omitempty"`       // star/unstar
	Username   string            `json:"username,omitempty"`   // follow/unfollow
}

type BatchTaskService struct {
	DB *gorm.DB
}

func NewBatchTaskService(db *gorm.DB) *BatchTaskService { return &BatchTaskService{DB: db} }

func (s *BatchTaskService) List() ([]model.BatchTask, error) {
	var out []model.BatchTask
	err := s.DB.Order("id DESC").Find(&out).Error
	return out, err
}

func (s *BatchTaskService) Get(id uint) (*model.BatchTask, error) {
	var t model.BatchTask
	err := s.DB.First(&t, id).Error
	return &t, err
}

func (s *BatchTaskService) Create(t *model.BatchTask) error {
	if !batchTaskTypes[t.Type] {
		return errors.New("不支持的任务类型")
	}
	if strings.TrimSpace(t.Name) == "" {
		return errors.New("任务名称不能为空")
	}
	if _, err := parseBatchPayload(t.Type, t.PayloadJSON); err != nil {
		return err
	}
	if err := s.DB.Create(t).Error; err != nil {
		return err
	}
	return s.UpdateNextRun(t)
}

func (s *BatchTaskService) Update(id uint, updates map[string]any) (*model.BatchTask, error) {
	if err := s.DB.Model(&model.BatchTask{}).Where("id = ?", id).Updates(updates).Error; err != nil {
		return nil, err
	}
	t, err := s.Get(id)
	if err != nil {
		return nil, err
	}
	if _, ok := updates["cron_expr"]; ok || updates["enabled"] != nil {
		if err := s.UpdateNextRun(t); err != nil {
			return nil, err
		}
	}
	return t, nil
}

func (s *BatchTaskService) Delete(id uint) error {
	return s.DB.Delete(&model.BatchTask{}, id).Error
}

func (s *BatchTaskService) Toggle(id uint, enabled bool) (*model.BatchTask, error) {
	updates := map[string]any{"enabled": enabled}
	if !enabled {
		updates["next_run_at"] = nil
	}
	if err := s.DB.Model(&model.BatchTask{}).Where("id = ?", id).Updates(updates).Error; err != nil {
		return nil, err
	}
	t, err := s.Get(id)
	if err != nil {
		return nil, err
	}
	if enabled {
		if err := s.UpdateNextRun(t); err != nil {
			return nil, err
		}
	}
	return t, nil
}

// UpdateNextRun 依据 cron 计算下次执行时间
func (s *BatchTaskService) UpdateNextRun(t *model.BatchTask) error {
	if !t.Enabled {
		return s.DB.Model(t).Update("next_run_at", nil).Error
	}
	next, err := nextRunTimeImpl(t.CronExpr)
	if err != nil {
		return s.DB.Model(t).Update("next_run_at", nil).Error
	}
	return s.DB.Model(t).Update("next_run_at", next).Error
}

// RunDueTasks 执行所有到期的批量定时任务（由调度器周期调用）
func (s *BatchTaskService) RunDueTasks(c *Container) {
	now := time.Now()
	var due []model.BatchTask
	if err := s.DB.Where("enabled = ? AND next_run_at <= ?", true, now).Find(&due).Error; err != nil {
		log.Printf("[batch-task] 查询到期任务失败: %v", err)
		return
	}
	for i := range due {
		go s.execute(c, &due[i])
	}
}

var batchRunMu sync.Mutex // 防止同一 tick 重入

// RunDueTasksSafe 序列化入口（Container 调度用）
func (s *BatchTaskService) RunDueTasksSafe(c *Container) {
	if !batchRunMu.TryLock() {
		return
	}
	defer batchRunMu.Unlock()
	s.RunDueTasks(c)
}

// execute 执行单个任务并记录结果
func (s *BatchTaskService) execute(c *Container, t *model.BatchTask) {
	now := time.Now()
	s.DB.Model(t).Updates(map[string]any{"last_run_at": now, "last_run_result": "running"})

	payload, err := parseBatchPayload(t.Type, t.PayloadJSON)
	if err != nil {
		s.finish(t, "failed", err.Error())
		return
	}

	var ok, fail int
	var errMsgs []string
	switch t.Type {
	case BatchTaskDispatch:
		repoIDs, err := s.resolveRepoIDs(c, payload)
		if err != nil {
			s.finish(t, "failed", err.Error())
			return
		}
		if len(repoIDs) == 0 {
			s.finish(t, "failed", "没有匹配的仓库")
			return
		}
		sem := make(chan struct{}, 3)
		var wg sync.WaitGroup
		var mu sync.Mutex
		for _, rid := range repoIDs {
			wg.Add(1)
			sem <- struct{}{}
			go func(rid uint) {
				defer wg.Done()
				defer func() { <-sem }()
				if err := NewRepoService(s.DB).DispatchWorkflow(c, rid, payload.Filename, payload.Ref, payload.Inputs); err != nil {
					mu.Lock()
					fail++
					errMsgs = append(errMsgs, fmt.Sprintf("repo#%d: %v", rid, err))
					mu.Unlock()
				} else {
					mu.Lock()
					ok++
					mu.Unlock()
				}
			}(rid)
		}
		wg.Wait()
	case BatchTaskStar, BatchTaskUnstar, BatchTaskFollow, BatchTaskUnfollow:
		accSvc := NewAccountService(s.DB)
		sem := make(chan struct{}, 5)
		var wg sync.WaitGroup
		var mu sync.Mutex
		for _, aid := range payload.AccountIDs {
			wg.Add(1)
			sem <- struct{}{}
			go func(aid uint) {
				defer wg.Done()
				defer func() { <-sem }()
				var err error
				switch t.Type {
				case BatchTaskStar:
					err = accSvc.StarRepo(c, aid, payload.Owner, payload.Repo)
				case BatchTaskUnstar:
					err = accSvc.UnstarRepo(c, aid, payload.Owner, payload.Repo)
				case BatchTaskFollow:
					err = accSvc.FollowUser(c, aid, payload.Username)
				case BatchTaskUnfollow:
					err = accSvc.UnfollowUser(c, aid, payload.Username)
				}
				mu.Lock()
				if err != nil {
					fail++
					errMsgs = append(errMsgs, fmt.Sprintf("account#%d: %v", aid, err))
				} else {
					ok++
				}
				mu.Unlock()
			}(aid)
		}
		wg.Wait()
	}

	result, summary := "success", fmt.Sprintf("%d 个全部成功", ok)
	if fail > 0 && ok > 0 {
		result = "partial"
		summary = fmt.Sprintf("%d 成功 / %d 失败", ok, fail)
	} else if fail > 0 {
		result = "failed"
		summary = fmt.Sprintf("%d 个全部失败", fail)
	}
	if len(errMsgs) > 0 {
		summary += "；" + strings.Join(errMsgs[:min(len(errMsgs), 3)], "；")
	}
	s.finish(t, result, summary)
}

func (s *BatchTaskService) finish(t *model.BatchTask, result, summary string) {
	updates := map[string]any{"last_run_result": result, "last_summary": summary}
	if result == "failed" && len(summary) > 0 {
		updates["last_error"] = summary
	} else {
		updates["last_error"] = ""
	}
	if err := s.DB.Model(t).Updates(updates).Error; err != nil {
		log.Printf("[batch-task] 记录结果失败: %v", err)
	}
	if err := s.UpdateNextRun(t); err != nil {
		log.Printf("[batch-task] 计算下次执行失败: %v", err)
	}
	log.Printf("[batch-task] 任务 %s(id=%d) 执行完成: %s (%s)", t.Name, t.ID, result, summary)
}

// resolveRepoIDs 解析 dispatch 的目标仓库：
// payload.RepoName 非空时按账户缓存的仓库名精确匹配（账户被删除/回收站则跳过）；
// 否则使用 payload.RepoIDs。
func (s *BatchTaskService) resolveRepoIDs(c *Container, p *BatchTaskPayload) ([]uint, error) {
	if p.RepoName == "" {
		return p.RepoIDs, nil
	}
	var ids []uint
	for _, aid := range p.AccountIDs {
		var repos []model.Repository
		if err := s.DB.Where("account_id = ? AND name = ?", aid, p.RepoName).Find(&repos).Error; err != nil {
			continue
		}
		for _, r := range repos {
			ids = append(ids, r.ID)
		}
	}
	return ids, nil
}

// RunNow 立即执行一次（异步）
func (s *BatchTaskService) RunNow(c *Container, id uint) error {
	t, err := s.Get(id)
	if err != nil {
		return err
	}
	go s.execute(c, t)
	return nil
}

func parseBatchPayload(taskType, raw string) (*BatchTaskPayload, error) {
	var p BatchTaskPayload
	if err := json.Unmarshal([]byte(raw), &p); err != nil {
		return nil, fmt.Errorf("payload JSON 无效: %w", err)
	}
	switch taskType {
	case BatchTaskDispatch:
		if len(p.AccountIDs) == 0 && len(p.RepoIDs) == 0 {
			return nil, errors.New("dispatch 需要提供 account_ids 或 repo_ids")
		}
		if strings.TrimSpace(p.Filename) == "" {
			return nil, errors.New("dispatch 需要提供 filename")
		}
	case BatchTaskStar, BatchTaskUnstar:
		if strings.TrimSpace(p.Owner) == "" || strings.TrimSpace(p.Repo) == "" {
			return nil, errors.New("star/unstar 需要提供 owner 与 repo")
		}
	case BatchTaskFollow, BatchTaskUnfollow:
		if strings.TrimSpace(p.Username) == "" {
			return nil, errors.New("follow/unfollow 需要提供 username")
		}
	}
	if len(p.AccountIDs) == 0 && len(p.RepoIDs) == 0 && taskType != BatchTaskDispatch {
		return nil, errors.New("account_ids 不能为空")
	}
	return &p, nil
}
