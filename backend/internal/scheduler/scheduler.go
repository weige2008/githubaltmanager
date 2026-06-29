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

// AutoTaskRunner 间隔模式接口
type AutoTaskRunner interface {
	GetAutoConfig() (checkEnabled bool, checkInterval int, syncEnabled bool, syncInterval int)
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

// === 自动任务调度（间隔模式） ===

var (
	lastCheckTime   time.Time
	lastSyncTime    time.Time
	autoRunning     bool
	autoMu          sync.Mutex
	autoStopChan    chan struct{}
)

// StartAutoScheduler 启动自动任务调度（间隔模式，每 30 秒检查是否该执行）
func StartAutoScheduler(runner AutoTaskRunner) {
	autoMu.Lock()
	defer autoMu.Unlock()
	if autoRunning {
		return
	}
	autoStopChan = make(chan struct{})
	autoRunning = true
	log.Printf("[auto-scheduler] started (interval mode)")

	go func() {
		ticker := time.NewTicker(30 * time.Second)
		defer ticker.Stop()
		for {
			select {
			case <-ticker.C:
				checkEnabled, checkInterval, syncEnabled, syncInterval := runner.GetAutoConfig()
				now := time.Now()

				if checkEnabled && checkInterval > 0 {
					next := lastCheckTime.Add(time.Duration(checkInterval) * time.Minute)
					if now.After(next) || lastCheckTime.IsZero() {
						lastCheckTime = now
						go runner.RunAutoCheck()
					}
				}

				if syncEnabled && syncInterval > 0 {
					next := lastSyncTime.Add(time.Duration(syncInterval) * time.Minute)
					if now.After(next) || lastSyncTime.IsZero() {
						lastSyncTime = now
						go runner.RunAutoSync()
					}
				}

			case <-autoStopChan:
				return
			}
		}
	}()
}

func StopAutoScheduler() {
	autoMu.Lock()
	defer autoMu.Unlock()
	if !autoRunning {
		return
	}
	close(autoStopChan)
	autoRunning = false
	log.Printf("[auto-scheduler] stopped")
}
