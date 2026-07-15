package github

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/url"
	"strings"

	"golang.org/x/crypto/nacl/box"
)

// Repo GitHub 仓库
type Repo struct {
	ID            int64  `json:"id"`
	Name          string `json:"name"`
	FullName      string `json:"full_name"`
	Owner         Owner  `json:"owner"`
	Private       bool   `json:"private"`
	Fork          bool   `json:"fork"`
	Archived      bool   `json:"archived"`
	Disabled      bool   `json:"disabled"`
	DefaultBranch string `json:"default_branch"`
	HTMLURL       string `json:"html_url"`
	CloneURL      string `json:"clone_url"`
	Permissions   Permissions `json:"permissions"`
}

type Owner struct {
	Login string `json:"login"`
	Type  string `json:"type"`
}

type Permissions struct {
	Admin bool `json:"admin"`
	Push  bool `json:"push"`
	Pull  bool `json:"pull"`
}

// ListAllRepos 列出 token 可见所有仓库（个人 + 协作者 + 组织 + 公开仓库的 fork）。
// 使用 type=all 确保最大化覆盖范围。自动分页。
func (c *Client) ListAllRepos() ([]Repo, error) {
	var all []Repo
	page := 1
	perPage := 100
	for {
		path := fmt.Sprintf("/user/repos?per_page=%d&page=%d&sort=updated&type=all", perPage, page)
		var batch []Repo
		code, err := c.Get(path, &batch)
		if err != nil {
			return all, err
		}
		if code >= 400 {
			return all, &APIError{Status: code, Body: fmt.Sprintf("list repos page %d failed", page)}
		}
		all = append(all, batch...)
		if len(batch) < perPage {
			break
		}
		page++
		if page > 50 {
			break
		}
	}
	return all, nil
}

// ContentEntry 目录条目
type ContentEntry struct {
	Name string `json:"name"`
	Path string `json:"path"`
	Type string `json:"type"` // file / dir / symlink / submodule
	Size int    `json:"size"`
	SHA  string `json:"sha"`
}

// ListContents 列出目录。空仓库返回 404 + "This repository is empty."，此时返回空数组而非错误。
func (c *Client) ListContents(owner, repo, path, ref string) ([]ContentEntry, int, error) {
	q := url.Values{}
	if ref != "" {
		q.Set("ref", ref)
	}
	qstr := ""
	if enc := q.Encode(); enc != "" {
		qstr = "?" + enc
	}
	p := fmt.Sprintf("/repos/%s/%s/contents/%s%s", owner, repo, path, qstr)
	var entries []ContentEntry
	code, err := c.Get(p, &entries)
	if err != nil {
		// 检查是否是空仓库的 404
		if apiErr, ok := err.(*APIError); ok && apiErr.Status == 404 {
			body := apiErr.Body
			if strings.Contains(body, "empty") || strings.Contains(body, "Not Found") {
				return []ContentEntry{}, 404, nil
			}
		}
		return nil, code, err
	}
	return entries, code, nil
}

// FileContent 单个文件
type FileContent struct {
	Name      string `json:"name"`
	Path      string `json:"path"`
	SHA       string `json:"sha"`
	Content   string `json:"content"` // base64
	Encoding  string `json:"encoding"`
	Size      int    `json:"size"`
	HTMLURL   string `json:"html_url"`
	Type      string `json:"type"`
}

// GetFile 获取单个文件
func (c *Client) GetFile(owner, repo, path, ref string) (*FileContent, int, error) {
	q := url.Values{}
	if ref != "" {
		q.Set("ref", ref)
	}
	qstr := ""
	if enc := q.Encode(); enc != "" {
		qstr = "?" + enc
	}
	p := fmt.Sprintf("/repos/%s/%s/contents/%s%s", owner, repo, path, qstr)
	var fc FileContent
	code, err := c.Get(p, &fc)
	return &fc, code, err
}

// UpdateFilePayload 修改/创建文件请求体
type UpdateFilePayload struct {
	Message string `json:"message"`
	Content string `json:"content"` // base64
	SHA     string `json:"sha,omitempty"`
	Branch  string `json:"branch,omitempty"`
}

// CommitResult 提交结果
type CommitResult struct {
	Content *struct {
		SHA string `json:"sha"`
	} `json:"content"`
	Commit *struct {
		SHA string `json:"sha"`
	} `json:"commit"`
}

// CreateOrUpdateFile 创建或更新文件
func (c *Client) CreateOrUpdateFile(owner, repo, path string, payload UpdateFilePayload) (*CommitResult, int, error) {
	p := fmt.Sprintf("/repos/%s/%s/contents/%s", owner, repo, path)
	var res CommitResult
	code, err := c.PutJSON(p, payload, &res)
	return &res, code, err
}

// DeleteFilePayload 删除文件请求体
type DeleteFilePayload struct {
	Message string `json:"message"`
	Sha     string `json:"sha"`
	Branch  string `json:"branch,omitempty"`
}

// DeleteFile 删除文件
func (c *Client) DeleteFile(owner, repo, path, sha, branch string) (int, error) {
	p := fmt.Sprintf("/repos/%s/%s/contents/%s", owner, repo, path)
	payload := DeleteFilePayload{
		Message: "Delete: " + path,
		Sha:     sha,
		Branch:  branch,
	}
	return c.DeleteWithBody(p, payload)
}

// DeleteWithBody 发送带 body 的 DELETE 请求
func (c *Client) DeleteWithBody(path string, body interface{}) (int, error) {
	jsonData, err := json.Marshal(body)
	if err != nil {
		return 0, err
	}
	statusCode, respBody, _, err := c.rawRequest("DELETE", path, bytes.NewReader(jsonData), map[string]string{"Content-Type": "application/json"})
	if statusCode >= 400 {
		return statusCode, &APIError{Status: statusCode, Body: string(respBody)}
	}
	return statusCode, err
}

// Workflow GitHub Actions workflow
type Workflow struct {
	ID    int64  `json:"id"`
	Name  string `json:"name"`
	Path  string `json:"path"`
	State string `json:"state"`
}

// ListWorkflows 列出仓库的 workflows
func (c *Client) ListWorkflows(owner, repo string) (struct {
	TotalCount int        `json:"total_count"`
	Workflows  []Workflow `json:"workflows"`
}, int, error) {
	var out struct {
		TotalCount int        `json:"total_count"`
		Workflows  []Workflow `json:"workflows"`
	}
	p := fmt.Sprintf("/repos/%s/%s/actions/workflows", owner, repo)
	code, err := c.Get(p, &out)
	return out, code, err
}

// DispatchPayload workflow_dispatch 触发
type DispatchPayload struct {
	Ref    string            `json:"ref"`
	Inputs map[string]string `json:"inputs,omitempty"`
}

// DispatchWorkflow 触发 workflow_dispatch
func (c *Client) DispatchWorkflow(owner, repo, filename string, payload DispatchPayload) (int, error) {
	p := fmt.Sprintf("/repos/%s/%s/actions/workflows/%s/dispatches", owner, repo, filename)
	code, err := c.PostJSON(p, payload, nil)
	return code, err
}

// GetWorkflowByID 通过 filename 获取单个 workflow 的元数据（含 path）
func (c *Client) GetWorkflowByID(owner, repo, filename string) (*Workflow, int, error) {
	p := fmt.Sprintf("/repos/%s/%s/actions/workflows/%s", owner, repo, filename)
	var wf Workflow
	code, err := c.Get(p, &wf)
	return &wf, code, err
}

// WorkflowRun 最近一次运行
type WorkflowRun struct {
	ID           int64  `json:"id"`
	Name         string `json:"name"`
	HeadBranch   string `json:"head_branch"`
	Status       string `json:"status"`       // queued / in_progress / completed
	Conclusion   string `json:"conclusion"`   // success / failure / cancelled / null
	CreatedAt    string `json:"created_at"`
	UpdatedAt    string `json:"updated_at"`
	HTMLOutputURL string `json:"html_url"`
	Event        string `json:"event"`
	HeadCommit   struct {
		Message string `json:"message"`
		ID      string `json:"id"`
	} `json:"head_commit"`
}

// ListWorkflowRuns 列出运行记录
func (c *Client) ListWorkflowRuns(owner, repo string, perPage int) (struct {
	TotalCount   int           `json:"total_count"`
	WorkflowRuns []WorkflowRun `json:"workflow_runs"`
}, int, error) {
	var out struct {
		TotalCount     int           `json:"total_count"`
		WorkflowRuns   []WorkflowRun `json:"workflow_runs"`
	}
	if perPage <= 0 {
		perPage = 10
	}
	p := fmt.Sprintf("/repos/%s/%s/actions/runs?per_page=%d", owner, repo, perPage)
	code, err := c.Get(p, &out)
	return out, code, err
}

// WorkflowJob 工作流任务
type WorkflowJob struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	Status      string `json:"status"`
	Conclusion  string `json:"conclusion"`
	StartedAt   string `json:"started_at"`
	CompletedAt string `json:"completed_at"`
	HTMLOutputURL string `json:"html_url"`
	Steps       []WorkflowStep `json:"steps"`
}

// WorkflowStep 工作流步骤
type WorkflowStep struct {
	Name       string `json:"name"`
	Status     string `json:"status"`
	Conclusion string `json:"conclusion"`
	Number     int    `json:"number"`
}

// ListWorkflowJobs 列出工作流运行的任务
func (c *Client) ListWorkflowJobs(owner, repo string, runID int64) (struct {
	TotalCount int            `json:"total_count"`
	Jobs       []WorkflowJob  `json:"jobs"`
}, int, error) {
	var out struct {
		TotalCount int            `json:"total_count"`
		Jobs       []WorkflowJob  `json:"jobs"`
	}
	p := fmt.Sprintf("/repos/%s/%s/actions/runs/%d/jobs", owner, repo, runID)
	code, err := c.Get(p, &out)
	return out, code, err
}

// GetWorkflowRunLogs 获取工作流运行日志（返回 ZIP 下载 URL）
func (c *Client) GetWorkflowRunLogsURL(owner, repo string, runID int64) (string, int, error) {
	p := fmt.Sprintf("/repos/%s/%s/actions/runs/%d/logs", owner, repo, runID)
	code, data, header, err := c.rawRequest("GET", p, nil, nil)
	if err != nil {
		return "", code, err
	}
	if code >= 400 {
		return "", code, &APIError{Status: code, Body: string(data)}
	}
	// GitHub returns 302 redirect to the logs download URL
	loc := header.Get("Location")
	if loc == "" {
		return "", code, fmt.Errorf("no redirect URL for logs")
	}
	return loc, code, nil
}

// 避免未使用 import
var _ = json.Marshal

// CreateRepoPayload 创建仓库请求
type CreateRepoPayload struct {
	Name        string `json:"name"`
	Description string `json:"description,omitempty"`
	Private     bool   `json:"private"`
	AutoInit    bool   `json:"auto_init"`
}

// CreateRepo 为当前 token 用户创建仓库
func (c *Client) CreateRepo(payload CreateRepoPayload) (*Repo, int, error) {
	var repo Repo
	code, err := c.PostJSON("/user/repos", payload, &repo)
	return &repo, code, err
}

// UpdateRepoVisibility 切换仓库公有/私有
func (c *Client) UpdateRepoVisibility(owner, repo string, isPrivate bool) (int, error) {
	p := fmt.Sprintf("/repos/%s/%s", owner, repo)
	payload := map[string]bool{"private": isPrivate}
	code, err := c.PatchJSON(p, payload, nil)
	return code, err
}

// TreeEntry Git tree 条目
type TreeEntry struct {
	Path string `json:"path"`
	Mode string `json:"mode"`
	Type string `json:"type"` // blob / tree
	SHA  string `json:"sha"`
	Size int    `json:"size"`
}

// TreeResult Git tree 递归结果
type TreeResult struct {
	SHA       string      `json:"sha"`
	Tree      []TreeEntry `json:"tree"`
	Truncated bool        `json:"truncated"`
}

// GetTreeRecursive 获取仓库完整文件树（递归）
func (c *Client) GetTreeRecursive(owner, repo, ref string) (*TreeResult, int, error) {
	if ref == "" {
		ref = "HEAD"
	}
	p := fmt.Sprintf("/repos/%s/%s/git/trees/%s?recursive=1", owner, repo, ref)
	var tree TreeResult
	code, err := c.Get(p, &tree)
	return &tree, code, err
}

// GetBlob 获取文件 blob 内容（base64）
func (c *Client) GetBlob(owner, repo, sha string) (*FileContent, int, error) {
	p := fmt.Sprintf("/repos/%s/%s/git/blobs/%s", owner, repo, sha)
	var fc FileContent
	code, err := c.Get(p, &fc)
	return &fc, code, err
}

// RepoPublicKey 仓库 Actions 公钥（用于加密 secrets）
type RepoPublicKey struct {
	KeyID string `json:"key_id"`
	Key   string `json:"key"` // base64 encoded
}

// GetRepoPublicKey 获取仓库的 Actions 公钥
func (c *Client) GetRepoPublicKey(owner, repo string) (*RepoPublicKey, int, error) {
	p := fmt.Sprintf("/repos/%s/%s/actions/secrets/public-key", owner, repo)
	var pk RepoPublicKey
	code, err := c.Get(p, &pk)
	return &pk, code, err
}

// SecretPayload 创建/更新 secret 请求体
type SecretPayload struct {
	EncryptedValue string `json:"encrypted_value"`
	KeyID          string `json:"key_id"`
}

// CreateSecret 创建或更新仓库 secret（自动加密）
func (c *Client) CreateSecret(owner, repo, name, value string) (int, error) {
	pk, code, err := c.GetRepoPublicKey(owner, repo)
	if err != nil {
		return code, fmt.Errorf("获取公钥失败: %w", err)
	}

	pubKeyBytes, err := base64.StdEncoding.DecodeString(pk.Key)
	if err != nil {
		return 0, fmt.Errorf("解码公钥失败: %w", err)
	}
	if len(pubKeyBytes) != 32 {
		return 0, fmt.Errorf("公钥长度异常: %d bytes (期望 32)", len(pubKeyBytes))
	}

	var pubKey [32]byte
	copy(pubKey[:], pubKeyBytes)

	encrypted, err := box.SealAnonymous(nil, []byte(value), &pubKey, nil)
	if err != nil {
		return 0, fmt.Errorf("加密 secret 失败: %w", err)
	}

	payload := SecretPayload{
		EncryptedValue: base64.StdEncoding.EncodeToString(encrypted),
		KeyID:          pk.KeyID,
	}

	p := fmt.Sprintf("/repos/%s/%s/actions/secrets/%s", owner, repo, name)
	code, err = c.PutJSON(p, payload, nil)
	if err != nil {
		return code, fmt.Errorf("PUT secret %s -> %w", name, err)
	}
	if code >= 400 {
		return code, fmt.Errorf("secret %s 设置失败 (HTTP %d)", name, code)
	}
	return code, nil
}
