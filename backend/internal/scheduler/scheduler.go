package scheduler

import (
	"log"
	"sync"
	"time"

	"github.com/robfig/cron/v3"
)

type TaskRunner interface {
	RunDueTasks()
}

// AutoTaskScheduler 可动态调度的自动任务运行器
type AutoTaskRunner interface {
	GetAutoConfig() (checkEnabled bool, checkCron string, syncEnabled bool, syncCron string)
	RunAutoCheck()
	RunAutoSync()
}

type Scheduler struct {
	cron    *cron.Cron
	mu      sync.Mutex
	running bool
	runner  TaskRunner
}

var global *Scheduler

func Init() {
	if global != nil {
		return
	}
	global = &Scheduler{
		cron: cron.New(cron.WithSeconds(), cron.WithLocation(time.Local)),
	}
}

func Start(runner TaskRunner) {
	Init()
	global.mu.Lock()
	defer global.mu.Unlock()
	if global.running {
		return
	}
	global.runner = runner
	if _, err := global.cron.AddFunc("*/30 * * * * *", func() {
		if global.runner != nil {
			global.runner.RunDueTasks()
		}
	}); err != nil {
		log.Printf("[scheduler] add func failed: %v", err)
		return
	}
	global.cron.Start()
	global.running = true
	log.Printf("[scheduler] started, scanning due tasks every 30s")
}

func Stop() {
	if global == nil {
		return
	}
	global.mu.Lock()
	defer global.mu.Unlock()
	if !global.running {
		return
	}
	ctx := global.cron.Stop()
	<-ctx.Done()
	global.running = false
	log.Printf("[scheduler] stopped")
}

// === 自动任务调度（独立 cron 实例，支持动态更新） ===

var (
	autoCron    *cron.Cron
	autoMu      sync.Mutex
	autoRunning bool
	autoEntryID cron.EntryID
)

// StartAutoScheduler 启动自动任务调度器（每分钟检查配置变化）
func StartAutoScheduler(runner AutoTaskRunner) {
	autoMu.Lock()
	defer autoMu.Unlock()
	if autoRunning {
		return
	}
	autoCron = cron.New(cron.WithLocation(time.Local))
	autoCron.Start()
	autoRunning = true
	log.Printf("[auto-scheduler] started")

	// 每 60 秒检查一次配置，按需添加/移除任务
	go func() {
		ticker := time.NewTicker(60 * time.Second)
		defer ticker.Stop()
		// 启动后立即执行一次
		syncAutoTasks(runner)
		for range ticker.C {
			syncAutoTasks(runner)
		}
	}()
}

func StopAutoScheduler() {
	autoMu.Lock()
	defer autoMu.Unlock()
	if !autoRunning || autoCron == nil {
		return
	}
	autoCron.Stop()
	autoRunning = false
	log.Printf("[auto-scheduler] stopped")
}

// syncAutoTasks 根据当前配置动态注册自动检测/同步任务
func syncAutoTasks(runner AutoTaskRunner) {
	checkEnabled, checkCron, syncEnabled, syncCron := runner.GetAutoConfig()

	autoMu.Lock()
	defer autoMu.Unlock()
	if autoCron == nil {
		return
	}

	// 先移除旧的
	for _, e := range autoCron.Entries() {
		autoCron.Remove(e.ID)
	}

	if checkEnabled && checkCron != "" {
		cr := checkCron
		if _, err := autoCron.AddFunc(cr, func() {
			log.Printf("[auto-scheduler] 触发自动检测 (cron=%s)", cr)
			runner.RunAutoCheck()
		}); err != nil {
			log.Printf("[auto-scheduler] 注册自动检测失败 (cron=%s): %v", cr, err)
		} else {
			log.Printf("[auto-scheduler] 已注册自动检测 (cron=%s)", cr)
		}
	}

	if syncEnabled && syncCron != "" {
		cr := syncCron
		if _, err := autoCron.AddFunc(cr, func() {
			log.Printf("[auto-scheduler] 触发自动同步 (cron=%s)", cr)
			runner.RunAutoSync()
		}); err != nil {
			log.Printf("[auto-scheduler] 注册自动同步失败 (cron=%s): %v", cr, err)
		} else {
			log.Printf("[auto-scheduler] 已注册自动同步 (cron=%s)", cr)
		}
	}
}
