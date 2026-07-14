package service

import (
	"encoding/base64"
	"errors"
	"fmt"
	"strings"
	"sync"
	"time"

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

	// 同步完仓库后，自动扫描 workflow
	s.scanWorkflowsInternal(c, accountID)

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
	}
	return s.scanWorkflowsInternal(c, accountID)
}

// scanWorkflowsInternal 实际扫描逻辑（被 RefreshRepos 和 ScanWorkflows 共用）
func (s *RepoService) scanWorkflowsInternal(c *Container, accountID uint) (int, error) {
	repos, err := s.ListByAccount(accountID)
	if err != nil || len(repos) == 0 {
		return 0, err
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

			if repo.Archived || repo.Disabled {
				return
			}
			list, code, err := ghc.ListWorkflows(repo.OwnerLogin, repo.Name)
			if err != nil || code >= 400 {
				return
			}
			runs, _, _ := ghc.ListWorkflowRuns(repo.OwnerLogin, repo.Name, 5)

			for _, w := range list.Workflows {
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
	if strings.Contains(filename, "/") || strings.Contains(filename, "\\") || strings.Contains(filename, "..") {
		return "", errors.New("文件名不能包含路径分隔符或 .. ")
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

// WorkflowInputParam 定义一个 workflow_dispatch input 参数
type WorkflowInputParam struct {
	Name         string `json:"name"`
	Description  string `json:"description"`
	Required     bool   `json:"required"`
	Default      string `json:"default"`
	Type         string `json:"type"`         // string / choice / boolean / environment
	Options      []string `json:"options"`    // choice 类型的选项
}

// GetWorkflowInputs 读取 workflow yml 文件并解析 workflow_dispatch.inputs
func (s *RepoService) GetWorkflowInputs(c *Container, repoID uint, filename string) ([]WorkflowInputParam, error) {
	r, ghc, err := s.loadClient(c, repoID)
	if err != nil {
		return nil, err
	}
	path := ".github/workflows/" + filename
	fc, code, err := ghc.GetFile(r.OwnerLogin, r.Name, path, "")
	if err != nil {
		return nil, fmt.Errorf("api %d: %w", code, err)
	}

	// 解码文件内容
	var yamlContent string
	if fc.Encoding == "base64" {
		yamlContent = decodeBase64(fc.Content)
	} else {
		yamlContent = fc.Content
	}

	// 用 GitHub API 获取 workflow 定义（更准确）
	wf, wcode, werr := ghc.GetWorkflowByID(r.OwnerLogin, r.Name, filename)
	if werr == nil && wcode < 400 && wf.Path != "" {
		// 重新读正确的路径
		path = wf.Path
		fc2, _, ferr := ghc.GetFile(r.OwnerLogin, r.Name, path, "")
		if ferr == nil {
			if fc2.Encoding == "base64" {
				yamlContent = decodeBase64(fc2.Content)
			} else {
				yamlContent = fc2.Content
			}
		}
	}

	return parseWorkflowInputs(yamlContent), nil
}

// decodeBase64 base64 解码
func decodeBase64(b64 string) string {
	data, err := base64.StdEncoding.DecodeString(strings.ReplaceAll(b64, "\n", ""))
	if err != nil {
		return b64
	}
	return string(data)
}

// parseWorkflowInputs 从 YAML 内容中解析 workflow_dispatch.inputs
// 不用 yaml 库，用简单字符串匹配（兼容各种 YAML 缩进）
func parseWorkflowInputs(yamlContent string) []WorkflowInputParam {
	var params []WorkflowInputParam
	lines := strings.Split(yamlContent, "\n")

	inDispatch := false
	inInputs := false
	inputIndent := 0
	var current *WorkflowInputParam

	flush := func() {
		if current != nil {
			params = append(params, *current)
			current = nil
		}
	}

	for _, line := range lines {
		trimmed := strings.TrimSpace(line)
		if trimmed == "" || strings.HasPrefix(trimmed, "#") {
			continue
		}

		indent := len(line) - len(strings.TrimLeft(line, " \t"))

		// 检测 workflow_dispatch
		if strings.Contains(trimmed, "workflow_dispatch:") {
			inDispatch = true
			inInputs = false
			continue
		}

		// 在 dispatch 块内找 inputs:
		if inDispatch && !inInputs {
			if strings.Contains(trimmed, "inputs:") {
				inInputs = true
				continue
			}
			// 如果遇到其他同级 key，说明 dispatch 块结束了
			if !strings.HasPrefix(trimmed, "#") && !strings.HasPrefix(trimmed, "-") {
				parts := strings.SplitN(trimmed, ":", 2)
				if len(parts) == 2 {
					key := strings.TrimSpace(parts[0])
					if key != "inputs" && indent <= 4 {
						flush()
						inDispatch = false
						inInputs = false
					}
				}
			}
		}

		if !inInputs {
			continue
		}

		// 在 inputs 块内
		// 检测新的 input 参数（格式: "  PARAM_NAME:"）
		colonIdx := strings.Index(trimmed, ":")
		if colonIdx < 0 {
			continue
		}
		key := strings.TrimSpace(trimmed[:colonIdx])
		value := strings.TrimSpace(trimmed[colonIdx+1:])

		// 判断是参数名还是属性
		isParamName := false
		lowerKey := strings.ToLower(key)
		if lowerKey == "description" || lowerKey == "required" || lowerKey == "default" ||
			lowerKey == "type" || lowerKey == "options" {
			isParamName = false
		} else if indent == inputIndent && value == "" {
			// 同级且有冒号无值 → 新参数
			isParamName = true
		} else if current == nil {
			// 第一个参数
			isParamName = true
		}

		if isParamName {
			flush()
			if inputIndent == 0 {
				inputIndent = indent
			}
			current = &WorkflowInputParam{
				Name:    key,
				Default: "",
				Type:    "string",
			}
			if value != "" {
				current.Default = strings.Trim(value, `"'`)
			}
		} else if current != nil {
			switch lowerKey {
			case "description":
				current.Description = strings.Trim(value, `"'`)
			case "required":
				current.Required = value == "true"
			case "default":
				current.Default = strings.Trim(value, `"'`)
			case "type":
				current.Type = strings.Trim(value, `"'`)
			case "options":
				// 多行 options 列表
				opts := []string{}
				if value != "" {
					// 单行: [a, b, c]
					v := strings.Trim(value, "[]")
					for _, o := range strings.Split(v, ",") {
						opts = append(opts, strings.Trim(strings.TrimSpace(o), `"'`))
					}
				}
				if len(opts) > 0 {
					current.Options = opts
				}
			}
		}
	}
	flush()
	return params
}

// TemplateFile 模板文件
type TemplateFile struct {
	Path    string `json:"path"`
	Content string `json:"content"` // base64
}

// SecretEntry secret 键值对
type SecretEntry struct {
	Name  string `json:"name"`
	Value string `json:"value"`
}

// FetchTemplateFiles 从源仓库读取所有文件
func (s *RepoService) FetchTemplateFiles(c *Container, accountID uint, owner, repo, ref string) ([]TemplateFile, error) {
	ghc, _, err := s.GetClient(c, accountID)
	if err != nil {
		return nil, err
	}
	tree, code, err := ghc.GetTreeRecursive(owner, repo, ref)
	if err != nil {
		return nil, fmt.Errorf("获取文件树失败: %w (code=%d)", err, code)
	}
	if tree.Truncated {
		return nil, fmt.Errorf("源仓库文件过多，tree 被截断")
	}
	var files []TemplateFile
	for _, entry := range tree.Tree {
		if entry.Type != "blob" {
			continue
		}
		if entry.Size > 1024*1024 {
			continue
		}
		fc, _, err := ghc.GetFile(owner, repo, entry.Path, ref)
		if err != nil {
			continue
		}
		files = append(files, TemplateFile{Path: entry.Path, Content: fc.Content})
	}
	if len(files) == 0 {
		return nil, fmt.Errorf("源仓库没有可读取的文件")
	}
	return files, nil
}

// CreateRepoForAccount 为指定账户创建仓库并推送文件和 secrets
func (s *RepoService) CreateRepoForAccount(c *Container, accountID uint, repoName, description string, private bool, files []TemplateFile, secrets []SecretEntry) (*github.Repo, error) {
	ghc, acc, err := s.GetClient(c, accountID)
	if err != nil {
		return nil, err
	}
	repo, code, err := ghc.CreateRepo(github.CreateRepoPayload{
		Name:        repoName,
		Description: description,
		Private:     private,
		AutoInit:    true,
	})
	if err != nil {
		return nil, fmt.Errorf("创建仓库失败: %w (code=%d)", err, code)
	}
	time.Sleep(2 * time.Second)
	failedFiles := []string{}
	for _, f := range files {
		_, _, fErr := ghc.CreateOrUpdateFile(acc.GithubLogin, repoName, f.Path, github.UpdateFilePayload{
			Message: "Initial commit: " + f.Path,
			Content: f.Content,
		})
		if fErr != nil {
			failedFiles = append(failedFiles, f.Path)
		}
	}
	if len(failedFiles) > 0 {
		return repo, fmt.Errorf("仓库已创建，但 %d 个文件推送失败: %s", len(failedFiles), strings.Join(failedFiles, ", "))
	}
	failedSecrets := []string{}
	for _, sec := range secrets {
		if sec.Name == "" {
			continue
		}
		sc, sErr := ghc.CreateSecret(acc.GithubLogin, repoName, sec.Name, sec.Value)
		if sErr != nil {
			failedSecrets = append(failedSecrets, fmt.Sprintf("%s (HTTP %d: %s)", sec.Name, sc, sErr.Error()))
		}
	}
	if len(failedSecrets) > 0 {
		return repo, fmt.Errorf("仓库已创建，但 %d 个 secret 设置失败: %s", len(failedSecrets), strings.Join(failedSecrets, "; "))
	}
	model := &model.Repository{
		AccountID:     accountID,
		GithubID:      repo.ID,
		OwnerLogin:    acc.GithubLogin,
		Name:          repo.Name,
		FullName:      acc.GithubLogin + "/" + repo.Name,
		Private:       repo.Private,
		DefaultBranch: repo.DefaultBranch,
	}
	s.DB.Where("github_id = ?", repo.ID).Assign(model).FirstOrCreate(model)
	return repo, nil
}

// UpdateRepoFromTemplate 清空目标仓库所有文件，然后从模板仓库拉取所有文件写入
func (s *RepoService) UpdateRepoFromTemplate(c *Container, repoID uint, templateOwner, templateRepo, templateRef string) error {
	r, ghc, err := s.loadClient(c, repoID)
	if err != nil {
		return err
	}
	owner := r.OwnerLogin
	repoName := r.Name
	branch := r.DefaultBranch
	if branch == "" {
		branch = "main"
	}

	// Step 1: Get current file tree of target repo
	currentTree, _, err := ghc.GetTreeRecursive(owner, repoName, branch)
	if err != nil {
		return fmt.Errorf("获取目标仓库文件树失败: %w", err)
	}

	// Step 2: Delete all existing files (skip .github if needed, but we clear everything)
	deletedCount := 0
	for _, entry := range currentTree.Tree {
		if entry.Type != "blob" {
			continue
		}
		// Get file SHA for deletion
		fc, _, gErr := ghc.GetFile(owner, repoName, entry.Path, branch)
		if gErr != nil {
			continue
		}
		_, dErr := ghc.DeleteFile(owner, repoName, entry.Path, fc.SHA, branch)
		if dErr == nil {
			deletedCount++
		}
		time.Sleep(100 * time.Millisecond) // avoid rate limit
	}

	// Step 3: Fetch template files
	templateFiles, err := s.FetchTemplateFiles(c, r.AccountID, templateOwner, templateRepo, templateRef)
	if err != nil {
		return fmt.Errorf("获取模板文件失败: %w", err)
	}

	// Step 4: Push all template files
	failedFiles := []string{}
	for _, f := range templateFiles {
		_, _, fErr := ghc.CreateOrUpdateFile(owner, repoName, f.Path, github.UpdateFilePayload{
			Message: "Update from template: " + f.Path,
			Content: f.Content,
			Branch:  branch,
		})
		if fErr != nil {
			failedFiles = append(failedFiles, f.Path)
		}
		time.Sleep(100 * time.Millisecond)
	}

	if len(failedFiles) > 0 {
		return fmt.Errorf("更新完成但 %d 个文件失败: %s", len(failedFiles), strings.Join(failedFiles, ", "))
	}
	return nil
}
