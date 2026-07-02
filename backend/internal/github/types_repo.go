package github

import (
	"encoding/json"
	"fmt"
	"net/url"
	"strconv"
	"strings"
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
