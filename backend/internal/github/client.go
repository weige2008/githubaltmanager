package github

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"sync"
	"time"
)

// Client 是轻量级 GitHub REST API 客户端（不引入完整 SDK，按需实现）
type Client struct {
	BaseURL string
	Token   string
	HTTP    *http.Client
}

func New(baseURL, token string, timeoutSec int) *Client {
	if baseURL == "" {
		baseURL = "https://api.github.com"
	}
	baseURL = strings.TrimRight(baseURL, "/")
	return &Client{
		BaseURL: baseURL,
		Token:   token,
		HTTP:    &http.Client{Timeout: time.Duration(timeoutSec) * time.Second},
	}
}

// RateLimitInfo 速率限制信息
type RateLimitInfo struct {
	Remaining int
	Limit     int
	ResetAt   time.Time
}

var (
	rateMu sync.RWMutex
	rate   = RateLimitInfo{Remaining: 5000, Limit: 5000}
)

// GetRateLimit 获取最近一次记录的速率限制
func GetRateLimit() RateLimitInfo {
	rateMu.RLock()
	defer rateMu.RUnlock()
	return rate
}

func updateRateFromHeader(h http.Header) {
	rateMu.Lock()
	defer rateMu.Unlock()
	if v := h.Get("X-RateLimit-Remaining"); v != "" {
		fmt.Sscanf(v, "%d", &rate.Remaining)
	}
	if v := h.Get("X-RateLimit-Limit"); v != "" {
		fmt.Sscanf(v, "%d", &rate.Limit)
	}
	if v := h.Get("X-RateLimit-Reset"); v != "" {
		var ts int64
		fmt.Sscanf(v, "%d", &ts)
		rate.ResetAt = time.Unix(ts, 0)
	}
}

// APIError GitHub API 错误
type APIError struct {
	Status int
	Body   string
}

func (e *APIError) Error() string { return fmt.Sprintf("github api %d: %s", e.Status, e.Body) }

// rawRequest 发起请求，返回状态码、响应体、响应头
func (c *Client) rawRequest(method, path string, body io.Reader, extraHeaders map[string]string) (int, []byte, http.Header, error) {
	url := path
	if strings.HasPrefix(path, "http") {
		url = path
	} else {
		url = c.BaseURL + path
	}
	req, err := http.NewRequest(method, url, body)
	if err != nil {
		return 0, nil, nil, err
	}
	req.Header.Set("Authorization", "token "+c.Token)
	req.Header.Set("Accept", "application/vnd.github+json")
	req.Header.Set("X-GitHub-Api-Version", "2022-11-28")
	req.Header.Set("User-Agent", "githubaltmanager")
	for k, v := range extraHeaders {
		req.Header.Set(k, v)
	}

	resp, err := c.HTTP.Do(req)
	if err != nil {
		return 0, nil, nil, err
	}
	defer resp.Body.Close()
	data, _ := io.ReadAll(resp.Body)
	updateRateFromHeader(resp.Header)
	return resp.StatusCode, data, resp.Header, nil
}

// Get GET 请求并解析 JSON
func (c *Client) Get(path string, out any) (int, error) {
	code, data, _, err := c.rawRequest("GET", path, nil, nil)
	if err != nil {
		return code, err
	}
	if code >= 400 {
		return code, &APIError{Status: code, Body: string(data)}
	}
	if out != nil && len(data) > 0 {
		if err := json.Unmarshal(data, out); err != nil {
			return code, fmt.Errorf("unmarshal: %w", err)
		}
	}
	return code, nil
}

// GetRaw GET 请求返回原始 body 与 header
func (c *Client) GetRaw(path string) (int, []byte, http.Header, error) {
	return c.rawRequest("GET", path, nil, nil)
}

// PostJSON POST JSON 请求
func (c *Client) PostJSON(path string, payload any, out any) (int, error) {
	var body io.Reader
	if payload != nil {
		b, err := json.Marshal(payload)
		if err != nil {
			return 0, err
		}
		body = strings.NewReader(string(b))
	}
	code, data, _, err := c.rawRequest("POST", path, body, map[string]string{"Content-Type": "application/json"})
	if err != nil {
		return code, err
	}
	if code >= 400 {
		return code, &APIError{Status: code, Body: string(data)}
	}
	if out != nil && len(data) > 0 {
		if err := json.Unmarshal(data, out); err != nil {
			return code, fmt.Errorf("unmarshal: %w", err)
		}
	}
	return code, nil
}

// PutJSON PUT JSON 请求
func (c *Client) PutJSON(path string, payload any, out any) (int, error) {
	var body io.Reader
	if payload != nil {
		b, err := json.Marshal(payload)
		if err != nil {
			return 0, err
		}
		body = strings.NewReader(string(b))
	}
	code, data, _, err := c.rawRequest("PUT", path, body, map[string]string{"Content-Type": "application/json"})
	if err != nil {
		return code, err
	}
	if code >= 400 {
		return code, &APIError{Status: code, Body: string(data)}
	}
	if out != nil && len(data) > 0 {
		if err := json.Unmarshal(data, out); err != nil {
			return code, fmt.Errorf("unmarshal: %w", err)
		}
	}
	return code, nil
}

// Delete DELETE 请求
func (c *Client) Delete(path string) (int, error) {
	code, data, _, err := c.rawRequest("DELETE", path, nil, nil)
	if err != nil {
		return code, err
	}
	if code >= 400 && code != 404 {
		return code, &APIError{Status: code, Body: string(data)}
	}
	return code, nil
}

// PatchJSON PATCH JSON 请求
func (c *Client) PatchJSON(path string, payload any, out any) (int, error) {
	var body io.Reader
	if payload != nil {
		b, err := json.Marshal(payload)
		if err != nil {
			return 0, err
		}
		body = strings.NewReader(string(b))
	}
	code, data, _, err := c.rawRequest("PATCH", path, body, map[string]string{"Content-Type": "application/json"})
	if err != nil {
		return code, err
	}
	if code >= 400 {
		return code, &APIError{Status: code, Body: string(data)}
	}
	if out != nil && len(data) > 0 {
		if err := json.Unmarshal(data, out); err != nil {
			return code, fmt.Errorf("unmarshal: %w", err)
		}
	}
	return code, nil
}
