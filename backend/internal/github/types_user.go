package github

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"
)

// User GitHub /user 返回
type User struct {
	ID              int64  `json:"id"`
	Login           string `json:"login"`
	Name            string `json:"name"`
	Email           string `json:"email"`
	Blog            string `json:"blog"`
	Company         string `json:"company"`
	Location        string `json:"location"`
	Bio             string `json:"bio"`
	TwitterUsername string `json:"twitter_username"`
	AvatarURL       string `json:"avatar_url"`
	HTMLURL         string `json:"html_url"`
	Suspended       bool   `json:"suspended"`
	Flagged         bool   `json:"flagged"`
	Type            string `json:"type"`
	CreatedAt       string `json:"created_at"` // GitHub 账号注册时间 RFC3339
	Message         string `json:"message"`
}

// UpdateUserProfilePayload PATCH /user 请求体（指针为 nil 表示不修改该字段）
type UpdateUserProfilePayload struct {
	Name            *string `json:"name,omitempty"`
	Email           *string `json:"email,omitempty"`
	Blog            *string `json:"blog,omitempty"`
	Company         *string `json:"company,omitempty"`
	Location        *string `json:"location,omitempty"`
	Bio             *string `json:"bio,omitempty"`
	TwitterUsername *string `json:"twitter_username,omitempty"`
}

// GetUserProfile 获取当前 token 用户的完整公开资料
func (c *Client) GetUserProfile() (*User, int, error) {
	var u User
	code, err := c.Get("/user", &u)
	if err != nil {
		return nil, code, err
	}
	return &u, code, nil
}

// UpdateUserProfile 更新当前 token 用户的公开资料（同名返回更新后的资料）
func (c *Client) UpdateUserProfile(payload UpdateUserProfilePayload) (*User, int, error) {
	var u User
	code, err := c.PatchJSON("/user", payload, &u)
	if err != nil {
		return nil, code, err
	}
	return &u, code, nil
}

// EmailEntry GET /user/emails 条目
type EmailEntry struct {
	Email      string `json:"email"`
	Primary    bool   `json:"primary"`
	Verified   bool   `json:"verified"`
	Visibility string `json:"visibility"` // public / private（未设公开邮箱时可能为空）
}

// ListEmails 列出当前 token 用户的全部邮箱（需 user:email 权限）
func (c *Client) ListEmails() ([]EmailEntry, int, error) {
	var out []EmailEntry
	code, err := c.Get("/user/emails?per_page=100", &out)
	if err != nil {
		return nil, code, err
	}
	return out, code, nil
}

// SetEmailVisibility 设置主邮箱公开可见性（public / private）
func (c *Client) SetEmailVisibility(visibility string) ([]EmailEntry, int, error) {
	var out []EmailEntry
	code, err := c.PatchJSON("/user/email/visibility", map[string]string{"visibility": visibility}, &out)
	if err != nil {
		return nil, code, err
	}
	return out, code, nil
}

// StarRepo 给仓库点 Star（幂等：已 star 再次调用仍为 204）
func (c *Client) StarRepo(owner, repo string) (int, error) {
	return c.PutJSON(fmt.Sprintf("/user/starred/%s/%s", owner, repo), nil, nil)
}

// UnstarRepo 取消 Star（未 star 时 GitHub 返回 404，与成功同样处理）
func (c *Client) UnstarRepo(owner, repo string) (int, error) {
	return c.Delete(fmt.Sprintf("/user/starred/%s/%s", owner, repo))
}

// FollowUser 关注用户
func (c *Client) FollowUser(username string) (int, error) {
	return c.PutJSON("/user/following/"+username, nil, nil)
}

// UnfollowUser 取消关注（未关注时 404，与成功同样处理）
func (c *Client) UnfollowUser(username string) (int, error) {
	return c.Delete("/user/following/" + username)
}

// ParseGitHubTime 解析 GitHub RFC3339 时间（失败返回 nil）
func ParseGitHubTime(s string) *time.Time {
	if s == "" {
		return nil
	}
	if t, err := time.Parse(time.RFC3339, s); err == nil {
		return &t
	}
	return nil
}

// GetAuthenticatedUserWithHeader 返回 user + 完整 header（含 X-OAuth-Scopes）
func (c *Client) GetAuthenticatedUserWithHeader() (*User, http.Header, int, error) {
	code, data, header, err := c.GetRaw("/user")
	if err != nil {
		return nil, nil, code, err
	}
	var u User
	if len(data) > 0 {
		_ = json.Unmarshal(data, &u)
	}
	return &u, header, code, nil
}

// ParseScopes 从 X-OAuth-Scopes 头解析 scope 列表
func ParseScopes(h http.Header) []string {
	raw := h.Get("X-OAuth-Scopes")
	if raw == "" {
		return nil
	}
	parts := strings.Split(raw, ",")
	out := make([]string, 0, len(parts))
	for _, p := range parts {
		if s := strings.TrimSpace(p); s != "" {
			out = append(out, s)
		}
	}
	return out
}
