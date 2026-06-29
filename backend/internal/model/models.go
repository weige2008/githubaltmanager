package model

import "time"

// BaseModel 公共字段
type BaseModel struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// AppConfig 存储 master 密码哈希等系统配置（单行记录，ID=1）
type AppConfig struct {
	BaseModel
	MasterPasswordHash string `gorm:"column:master_password_hash;type:text;not null" json:"-"`
	IsInitialized      bool   `gorm:"column:is_initialized;not null;default:false" json:"is_initialized"`

	// 自动任务设置
	AutoCheckEnabled bool   `gorm:"column:auto_check_enabled;not null;default:false" json:"auto_check_enabled"`
	AutoCheckCron    string `gorm:"column:auto_check_cron;size:100;default:'0 8 * * *'" json:"auto_check_cron"`
	AutoSyncEnabled  bool   `gorm:"column:auto_sync_enabled;not null;default:true" json:"auto_sync_enabled"`
	AutoSyncCron     string `gorm:"column:auto_sync_cron;size:100;default:'0 0 * * *'" json:"auto_sync_cron"`
	AutoSyncLastAt   *time.Time `gorm:"column:auto_sync_last_at" json:"auto_sync_last_at"`
	AutoCheckLastAt  *time.Time `gorm:"column:auto_check_last_at" json:"auto_check_last_at"`
}

// Account GitHub 账户
type Account struct {
	BaseModel
	GithubID      int64  `gorm:"column:github_id;index" json:"github_id"`
	GithubLogin   string `gorm:"column:github_login;size:100;not null;uniqueIndex" json:"github_login"`
	DisplayName   string `gorm:"column:display_name;size:200" json:"display_name"`
	AvatarURL     string `gorm:"column:avatar_url;size:500" json:"avatar_url"`
	TokenEnc      string `gorm:"column:token_enc;type:text;not null" json:"-"`
	PasswordEnc   string `gorm:"column:password_enc;type:text" json:"-"`
	RecoveryEmail string `gorm:"column:recovery_email;type:text" json:"-"` // 加密存储
	Status        string `gorm:"column:status;size:32;not null;default:'unknown';index" json:"status"` // active / banned / unknown / error
	StatusReason  string `gorm:"column:status_reason;type:text" json:"status_reason"`
	TokenScopes   string `gorm:"column:token_scopes;type:text" json:"token_scopes"`
	LastCheckedAt *time.Time `gorm:"column:last_checked_at" json:"last_checked_at"`
	Note          string `gorm:"column:note;type:text" json:"note"`
}

func (Account) TableName() string { return "accounts" }

// Repository 缓存仓库元数据
type Repository struct {
	BaseModel
	AccountID  uint   `gorm:"column:account_id;not null;index:idx_repo_account,priority:1" json:"account_id"`
	GithubID   int64  `gorm:"column:github_id;index" json:"github_id"`
	OwnerLogin string `gorm:"column:owner_login;size:100;not null;index:idx_repo_unique,priority:1" json:"owner_login"`
	Name       string `gorm:"column:name;size:200;not null;index:idx_repo_unique,priority:2" json:"name"`
	FullName   string `gorm:"column:full_name;size:300;not null" json:"full_name"`
	Private    bool   `gorm:"column:private;not null;default:false" json:"private"`
	Fork       bool   `gorm:"column:fork;not null;default:false" json:"fork"`
	Archived   bool   `gorm:"column:archived;not null;default:false" json:"archived"`
	Disabled   bool   `gorm:"column:disabled;not null;default:false" json:"disabled"`
	DefaultBranch string `gorm:"column:default_branch;size:100" json:"default_branch"`
	HTMLURL    string `gorm:"column:html_url;size:500" json:"html_url"`
	CloneURL   string `gorm:"column:clone_url;size:500" json:"-"`
	Permission string `gorm:"column:permission;size:20" json:"permission"` // admin / maintain / write / read
}

func (Repository) TableName() string { return "repositories" }

// Workflow 扫描到的现有 action
type Workflow struct {
	BaseModel
	AccountID      uint   `gorm:"column:account_id;not null;index" json:"account_id"`
	RepositoryID   uint   `gorm:"column:repository_id;not null;index" json:"repository_id"`
	Path           string `gorm:"column:path;size:500;not null" json:"path"`           // .github/workflows/xxx.yml
	Filename       string `gorm:"column:filename;size:200;not null" json:"filename"`
	Name           string `gorm:"column:name;size:200" json:"name"`
	State          string `gorm:"column:state;size:32" json:"state"` // active / disabled_manually / disabled_inactivity
	Triggers       string `gorm:"column:triggers;type:text" json:"triggers"`
	LastRunStatus  string `gorm:"column:last_run_status;size:32" json:"last_run_status"`
	LastRunAt      *time.Time `gorm:"column:last_run_at" json:"last_run_at"`
}

func (Workflow) TableName() string { return "workflows" }

// ScheduledTask 后端定时任务
type ScheduledTask struct {
	BaseModel
	AccountID       uint   `gorm:"column:account_id;not null;index" json:"account_id"`
	RepositoryID    uint   `gorm:"column:repository_id;not null;index" json:"repository_id"`
	OwnerRepo       string `gorm:"column:owner_repo;size:300;not null" json:"owner_repo"` // owner/repo 冗余
	WorkflowFilename string `gorm:"column:workflow_filename;size:200;not null" json:"workflow_filename"`
	Ref             string `gorm:"column:ref;size:100;not null;default:'main'" json:"ref"`
	CronExpr        string `gorm:"column:cron_expr;size:100;not null" json:"cron_expr"`
	InputsJSON      string `gorm:"column:inputs_json;type:text" json:"inputs_json"`
	Enabled         bool   `gorm:"column:enabled;not null;default:true" json:"enabled"`
	NextRunAt       *time.Time `gorm:"column:next_run_at;index" json:"next_run_at"`
	LastRunAt       *time.Time `gorm:"column:last_run_at" json:"last_run_at"`
	LastRunResult   string `gorm:"column:last_run_result;size:32" json:"last_run_result"` // success / failed / running
	LastError       string `gorm:"column:last_error;type:text" json:"last_error"`
}

func (ScheduledTask) TableName() string { return "scheduled_tasks" }

// AuditLog 操作审计
type AuditLog struct {
	BaseModel
	Action    string `gorm:"column:action;size:64;not null;index" json:"action"`
	Target    string `gorm:"column:target;size:200" json:"target"`
	Detail    string `gorm:"column:detail;type:text" json:"detail"`
	IP        string `gorm:"column:ip;size:64" json:"ip"`
	Success   bool   `gorm:"column:success;not null;default:true" json:"success"`
}

func (AuditLog) TableName() string { return "audit_logs" }
