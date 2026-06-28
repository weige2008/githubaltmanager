package service

import (
	"errors"
	"fmt"
	"strings"
	"sync"
	"time"

	"githubaltmanager/internal/crypto"
	"githubaltmanager/internal/github"
	"githubaltmanager/internal/model"

	"gorm.io/gorm"
)

type RepoService struct {
	DB *gorm.DB
}

func NewRepoService(db *gorm.DB) *RepoService { return &RepoService{DB: db} }

// GetClient 用某账户的 token 构造 GitHub 客户端
func (s *RepoService) GetClient(c *Container, accountID uint) (*github.Client, *model.Account, error) {
	accSvc := NewAccountService(s.DB)
	token, acc, err := accSvc.GetDecryptedToken(accountID)
	if err != nil {
		return nil, nil, err
	}
	return github.New(c.CFG.GitHub.APIBaseURL, token, c.CFG.GitHub.RequestTimeout), acc, nil
}

// RefreshRepos 拉取账户 token 可见的所有仓库（个人+组织+协作者），upsert 到本地
func (s *RepoService) RefreshRepos(c *Container, accountID uint) (int, error) {
	ghc, _, err := s.GetClient(c, accountID)
	if err != nil {
		return 0, err
	}
	repos, err := ghc.ListAllRepos()
	if err != nil {
		return 0, fmt.Errorf("拉取仓库失败: %w", err)
	}

	// 并发限流
	sem := make(chan struct{}, 4)
	var wg sync.WaitGroup
	var mu sync.Mutex
	count := 0

	for _, r := range repos {
		wg.Add(1)
		sem <- struct{}{}
		go func(r github.Repo) {
			defer wg.Done()
			defer func() { <-sem }()
			perm := "read"
			switch {
			case r.Permissions.Admin:
				perm = "admin"
			case r.Permissions.Push:
				perm = "write"
			}
			rec := model.Repository{
				AccountID:     accountID,
				GithubID:      r.ID,
				OwnerLogin:    r.Owner.Login,
				Name:          r.Name,
				FullName:      r.FullName,
				Private:       r.Private,
				Fork:          r.Fork,
				Archived:      r.Archived,
				Disabled:      r.Disabled,
				DefaultBranch: r.DefaultBranch,
				HTMLURL:       r.HTMLURL,
				CloneURL:      r.CloneURL,
				Permission:    perm,
			}
			// upsert
			var found model.Repository
			err := s.DB.Where("owner_login = ? AND name = ?", r.Owner.Login, r.Name).First(&found).Error
			if errors.Is(err, gorm.ErrRecordNotFound) {
				if err := s.DB.Create(&rec).Error; err == nil {
					mu.Lock()
					count++
					mu.Unlock()
				}
			} else if err == nil {
				s.DB.Model(&found).Updates(map[string]any{
					"private": rec.Private, "fork": rec.Fork, "archived": rec.Archived,
					"disabled": rec.Disabled, "default_branch": rec.DefaultBranch,
					"html_url": rec.HTMLURL, "permission": rec.Permission, "github_id": rec.GithubID,
				})
				mu.Lock()
				count++
				mu.Unlock()
			}
		}(r)
	}
	wg.Wait()
	return count, nil
}

// ListByAccount 列出某账户的仓库
func (s *RepoService) ListByAccount(accountID uint) ([]model.Repository, error) {
	var repos []model.Repository
	err := s.DB.Where("account_id = ?", accountID).Order("updated_at DESC").Find(&repos).Error
	return repos, err
}

// GetRepo 获取仓库记录
func (s *RepoService) GetRepo(repoID uint) (*model.Repository, error) {
	var r model.Repository
	err := s.DB.First(&r, repoID).Error
	return &r, err
}

// ListContents 浏览目录
func (s *RepoService) ListContents(c *Container, repoID uint, path, ref string) ([]github.ContentEntry, error) {
	r, ghc, err := s.loadClient(c, repoID)
	if err != nil {
		return nil, err
	}
	br := ref
	if br == "" {
		br = r.DefaultBranch
	}
	entries, code, err := ghc.ListContents(r.OwnerLogin, r.Name, path, br)
	if err != nil {
		return nil, fmt.Errorf("api %d: %w", code, err)
	}
	return entries, nil
}

// GetFile 读文件
func (s *RepoService) GetFile(c *Container, repoID uint, path, ref string) (*github.FileContent, error) {
	r, ghc, err := s.loadClient(c, repoID)
	if err != nil {
		return nil, err
	}
	br := ref
	if br == "" {
		br = r.DefaultBranch
	}
	fc, code, err := ghc.GetFile(r.OwnerLogin, r.Name, path, br)
	if err != nil {
		return nil, fmt.Errorf("api %d: %w", code, err)
	}
	return fc, nil
}

// UpdateFile 修改/创建文件
func (s *RepoService) UpdateFile(c *Container, repoID uint, path, content, message, branch string) (string, error) {
	r, ghc, err := s.loadClient(c, repoID)
	if err != nil {
		return "", err
	}
	br := branch
	if br == "" {
		br = r.DefaultBranch
	}
	// 查询现有 sha（若存在）
	payload := github.UpdateFilePayload{
		Message: message,
		Content: content, // 前端已 base64
		Branch:  br,
	}
	if existing, _, err := ghc.GetFile(r.OwnerLogin, r.Name, path, br); err == nil && existing != nil && existing.SHA != "" {
		payload.SHA = existing.SHA
	}
	res, code, err := ghc.CreateOrUpdateFile(r.OwnerLogin, r.Name, path, payload)
	if err != nil {
		return "", fmt.Errorf("api %d: %w", code, err)
	}
	sha := ""
	if res.Commit != nil {
		sha = res.Commit.SHA
	}
	return sha, nil
}

func (s *RepoService) loadClient(c *Container, repoID uint) (*model.Repository, *github.Client, error) {
	r, err := s.GetRepo(repoID)
	if err != nil {
		return nil, nil, err
	}
	ghc, _, err := s.GetClient(c, r.AccountID)
	return r, ghc, err
}

// ===== Workflow 扫描 =====

// ScanWorkflows 扫描账户所有仓库的现有 workflow，写入 workflow 表
func (s *RepoService) ScanWorkflows(c *Container, accountID uint) (int, error) {
	// 先确保仓库已拉取
	repos, err := s.ListByAccount(accountID)
	if err != nil {
		return 0, err
	}
	if len(repos) == 0 {
		_, err := s.RefreshRepos(c, accountID)
		if err != nil {
			return 0, err
		}
		repos, err = s.ListByAccount(accountID)
		if err != nil {
			return 0, err
		}
	}

	ghc, _, err := s.GetClient(c, accountID)
	if err != nil {
		return 0, err
	}

	sem := make(chan struct{}, c.CFG.GitHub.MaxConcurrent)
	var wg sync.WaitGroup
	var mu sync.Mutex
	count := 0

	for i := range repos {
		wg.Add(1)
		sem <- struct{}{}
		go func(repo model.Repository) {
			defer wg.Done()
			defer func() { <-sem }()

			// 跳过归档/禁用的仓库（无 actions 权限）
			if repo.Archived || repo.Disabled {
				return
			}
			list, code, err := ghc.ListWorkflows(repo.OwnerLogin, repo.Name)
			if err != nil || code >= 400 {
				return
			}
			// 获取最近一次运行状态
			runs, _, _ := ghc.ListWorkflowRuns(repo.OwnerLogin, repo.Name, 5)

			for _, w := range list.Workflows {
				// 解析 filename
				filename := w.Path
				if idx := strings.LastIndex(filename, "/"); idx >= 0 {
					filename = filename[idx+1:]
				}
				rec := model.Workflow{
					AccountID:     accountID,
					RepositoryID:  repo.ID,
					Path:          w.Path,
					Filename:      filename,
					Name:          w.Name,
					State:         w.State,
					LastRunStatus: "",
				}
				if len(runs.WorkflowRuns) > 0 {
					rec.LastRunStatus = runs.WorkflowRuns[0].Status + "/" + runs.WorkflowRuns[0].Conclusion
					if t, err := time.Parse(time.RFC3339, runs.WorkflowRuns[0].CreatedAt); err == nil {
						rec.LastRunAt = &t
					}
				}
				// upsert
				var found model.Workflow
				if e := s.DB.Where("repository_id = ? AND path = ?", repo.ID, w.Path).First(&found).Error; errors.Is(e, gorm.ErrRecordNotFound) {
					s.DB.Create(&rec)
					mu.Lock()
					count++
					mu.Unlock()
				} else if e == nil {
					s.DB.Model(&found).Updates(map[string]any{
						"name": rec.Name, "state": rec.State,
						"last_run_status": rec.LastRunStatus, "last_run_at": rec.LastRunAt,
					})
					mu.Lock()
					count++
					mu.Unlock()
				}
			}
		}(repos[i])
	}
	wg.Wait()
	return count, nil
}

// ListWorkflows 列出某仓库的 workflows
func (s *RepoService) ListWorkflows(repoID uint) ([]model.Workflow, error) {
	var wfs []model.Workflow
	err := s.DB.Where("repository_id = ?", repoID).Order("updated_at DESC").Find(&wfs).Error
	return wfs, err
}

// CreateWorkflow 在仓库 .github/workflows/ 下创建新 workflow 文件
func (s *RepoService) CreateWorkflow(c *Container, repoID uint, filename, content, commitMessage, branch string) (string, error) {
	if !strings.HasSuffix(filename, ".yml") && !strings.HasSuffix(filename, ".yaml") {
		return "", errors.New("文件名必须以 .yml 或 .yaml 结尾")
	}
	path := ".github/workflows/" + filename
	_, err := s.UpdateFile(c, repoID, path, content, commitMessage, branch)
	if err != nil {
		return "", err
	}
	return path, nil
}

// DispatchWorkflow 触发 workflow_dispatch
func (s *RepoService) DispatchWorkflow(c *Container, repoID uint, filename, ref string, inputs map[string]string) error {
	r, ghc, err := s.loadClient(c, repoID)
	if err != nil {
		return err
	}
	br := ref
	if br == "" {
		br = r.DefaultBranch
	}
	_, err = ghc.DispatchWorkflow(r.OwnerLogin, r.Name, filename, github.DispatchPayload{Ref: br, Inputs: inputs})
	return err
}

// 避免未使用
var _ = crypto.EncryptField
