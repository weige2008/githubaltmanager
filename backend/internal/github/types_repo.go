package github

import (
	"encoding/json"
	"fmt"
	"net/url"
	"strconv"
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

// ListAllRepos 列出 token 可见所有仓库（个人 + 协作者 + 组织），自动分页
// perPage 最大 100
func (c *Client) ListAllRepos() ([]Repo, error) {
	var all []Repo
	page := 1
	perPage := 100
	for {
		path := fmt.Sprintf("/user/repos?per_page=%d&page=%d&sort=updated&affiliation=owner,collaborator,organization_member", perPage, page)
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
		if page > 50 { // 安全上限
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

// ListContents 列出目录
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
	return entries, code, err
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

// WorkflowRun 最近一次运行
type WorkflowRun struct {
	ID         int64  `json:"id"`
	Name       string `json:"name"`
	Status     string `json:"status"`
	Conclusion string `json:"conclusion"`
	CreatedAt  string `json:"created_at"`
}

// ListWorkflowRuns 列出运行记录
func (c *Client) ListWorkflowRuns(owner, repo string, perPage int) (struct {
	TotalCount int           `json:"total_count"`
	WorkflowRuns []WorkflowRun `json:"workflow_runs"`
}, int, error) {
	var out struct {
		TotalCount int             `json:"total_count"`
		WorkflowRuns []WorkflowRun `json:"workflow_runs"`
	}
	if perPage <= 0 {
		perPage = 1
	}
	p := fmt.Sprintf("/repos/%s/%s/actions/runs?per_page=%s", owner, repo, strconv.Itoa(perPage))
	code, err := c.Get(p, &out)
	return out, code, err
}

// 避免未使用 import
var _ = json.Marshal
