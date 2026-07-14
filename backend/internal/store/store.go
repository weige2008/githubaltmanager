package store

import (
	"fmt"
	"log"
	"time"

	"githubaltmanager/internal/config"
	"githubaltmanager/internal/model"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// Open 打开 SQLite 数据库并自动迁移。
// 使用纯 Go SQLite 驱动（github.com/glebarez/sqlite，基于 modernc.org/sqlite），
// 无需 CGO，支持交叉编译到任意平台。
func Open(cfg *config.Config) (*gorm.DB, error) {
	gormLogLevel := logger.Error
	if !cfg.IsProd() {
		gormLogLevel = logger.Info
	}
	db, err := gorm.Open(sqlite.Open(cfg.Database.Path+"?_pragma=journal_mode(WAL)&_pragma=busy_timeout(5000)&_pragma=foreign_keys(on)"), &gorm.Config{
		Logger:      logger.Default.LogMode(gormLogLevel),
		PrepareStmt: true,
	})
	if err != nil {
		return nil, fmt.Errorf("open sqlite: %w", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("get *sql.DB: %w", err)
	}
	sqlDB.SetMaxOpenConns(1) // SQLite 写串行，避免锁竞争
	sqlDB.SetMaxIdleConns(1)
	sqlDB.SetConnMaxLifetime(time.Hour)

	if err := autoMigrate(db); err != nil {
		return nil, fmt.Errorf("migrate: %w", err)
	}
	log.Printf("[store] sqlite ready at %s", cfg.Database.Path)
	return db, nil
}

func autoMigrate(db *gorm.DB) error {
	return db.AutoMigrate(
		&model.AppConfig{},
		&model.Account{},
		&model.Repository{},
		&model.Workflow{},
		&model.ScheduledTask{},
		&model.AuditLog{},
		&model.AutoTaskLog{},
		&model.APIKey{},
	)
}
