package scheduler

import (
	"log"
	"sync"
	"time"

	"github.com/robfig/cron/v3"
)

// Scheduler 定时任务调度器，每分钟扫描数据库表到点的任务
type Scheduler struct {
	cron    *cron.Cron
	mu      sync.Mutex
	running bool
	runner  TaskRunner
}

// TaskRunner 由 service 层实现，处理到期任务
type TaskRunner interface {
	RunDueTasks() // 由调度器周期调用
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

// Start 启动调度器，每 30 秒扫描一次到期任务
func Start(runner TaskRunner) {
	Init()
	global.mu.Lock()
	defer global.mu.Unlock()
	if global.running {
		return
	}
	global.runner = runner
	// 每 30 秒触发一次扫描
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
	log.Printf("[scheduler] started, will scan due tasks every 30s")
}

// Stop 停止
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
