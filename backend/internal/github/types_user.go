package github

import (
	"encoding/json"
	"net/http"
	"strings"
	"time"
)

// User GitHub /user 返回
type User struct {
	ID        int64  `json:"id"`
	Login     string `json:"login"`
	Name      string `json:"name"`
	AvatarURL string `json:"avatar_url"`
	HTMLURL   string `json:"html_url"`
	Suspended bool   `json:"suspended"`
	Flagged   bool   `json:"flagged"`
	Type      string `json:"type"`
	CreatedAt string `json:"created_at"` // GitHub 账号注册时间 RFC3339
	Message   string `json:"message"`
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
