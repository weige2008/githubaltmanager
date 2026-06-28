package service

import (
	"fmt"
	"time"

	"github.com/robfig/cron/v3"
)

// cronParser 5 段 cron 解析器（分 时 日 月 周）
var cronParser = cron.NewParser(cron.Minute | cron.Hour | cron.Dom | cron.Month | cron.Dow)

// parseCronSchedule 解析表达式返回 cron.Schedule
func parseCronSchedule(expr string) (cron.Schedule, error) {
	s, err := cronParser.Parse(expr)
	if err != nil {
		return nil, fmt.Errorf("invalid cron '%s': %w", expr, err)
	}
	return s, nil
}

// nextRunTime 计算下次执行时间
func nextRunTimeImpl(expr string) (time.Time, error) {
	s, err := parseCronSchedule(expr)
	if err != nil {
		return time.Time{}, err
	}
	return s.Next(time.Now()), nil
}
