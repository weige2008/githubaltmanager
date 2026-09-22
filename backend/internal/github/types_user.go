package github

import (
	"encoding/json"
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
