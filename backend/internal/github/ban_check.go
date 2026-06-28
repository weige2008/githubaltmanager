package github

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

// AccountStatus 封禁检测结果
type AccountStatus struct {
	Status  string // active / banned / unknown / error
	Reason  string // 详细原因
	Methods []string // 命中的检测方法
}

// CheckBanStatus 多方案并发检测账户是否被封禁
// 方案1: API /user 错误码 + 响应体关键字（suspended/flagged/invalid token）
// 方案2: 抓取 github.com/<user> 主页，404 判异常
// 方案3: token 验证失败信号
func CheckBanStatus(token, apiBaseURL, login string, timeoutSec int) AccountStatus {
	client := New(apiBaseURL, token, timeoutSec)
	results := make(chan AccountStatus, 3)

	// 方案1：API /user
	go func() {
		s := checkViaAPI(client, login)
		s.Methods = append(s.Methods, "api_user")
		results <- s
	}()

	// 方案2：网页主页（可选，封禁可能 404）
	if login != "" {
		go func() {
			s := checkViaWebProfile(login, timeoutSec)
			s.Methods = append(s.Methods, "web_profile")
			results <- s
		}()
	} else {
		results <- AccountStatus{Status: "unknown"}
	}

	// 收集结果（至少方案1）
	var aggregated AccountStatus
	count := 0
	wantCount := 2
	if login == "" {
		wantCount = 1
	}
	for count < wantCount {
		select {
		case r := <-results:
			count++
			aggregated.Methods = append(aggregated.Methods, r.Methods...)
			// 任一判异常 → banned
			if r.Status == "banned" {
				aggregated.Status = "banned"
				if aggregated.Reason == "" {
					aggregated.Reason = r.Reason
				} else {
					aggregated.Reason = aggregated.Reason + "; " + r.Reason
				}
			} else if r.Status == "active" && aggregated.Status == "" {
				aggregated.Status = "active"
				if aggregated.Reason == "" {
					aggregated.Reason = r.Reason
				}
			} else if r.Status == "error" && aggregated.Status == "" {
				aggregated.Status = "error"
				aggregated.Reason = r.Reason
			}
		case <-time.After(time.Duration(timeoutSec+5) * time.Second):
			count = wantCount
			if aggregated.Status == "" {
				aggregated.Status = "error"
				aggregated.Reason = "detection timeout"
			}
		}
	}

	if aggregated.Status == "" {
		aggregated.Status = "unknown"
	}
	return aggregated
}

// checkViaAPI 通过 /user 端点判断
func checkViaAPI(c *Client, login string) AccountStatus {
	u, header, code, err := c.GetAuthenticatedUserWithHeader()
	if err != nil {
		return AccountStatus{Status: "error", Reason: "api error: " + err.Error()}
	}

	// 401/403 → token 失效或账户问题
	body := ""
	if u != nil {
		b, _ := json.Marshal(u)
		body = string(b)
	}
	_ = header

	switch {
	case code == 401:
		msg := u.Message
		if msg == "" {
			msg = "401 Unauthorized"
		}
		low := strings.ToLower(msg + " " + body)
		if strings.Contains(low, "bad credentials") || strings.Contains(low, "invalid token") {
			return AccountStatus{Status: "error", Reason: "token 无效或已吊销: " + msg}
		}
		return AccountStatus{Status: "banned", Reason: "API 返回 401: " + msg}
	case code == 403:
		msg := u.Message
		if msg == "" {
			msg = "403 Forbidden"
		}
		low := strings.ToLower(msg + " " + body)
		if strings.Contains(low, "suspended") || strings.Contains(low, "flagged") {
			return AccountStatus{Status: "banned", Reason: "账户被暂停/标记: " + msg}
		}
		return AccountStatus{Status: "error", Reason: "403: " + msg}
	case code >= 400:
		return AccountStatus{Status: "error", Reason: fmt.Sprintf("API %d: %s", code, u.Message)}
	}

	// 显式字段
	if u != nil {
		if u.Suspended || u.Flagged {
			return AccountStatus{Status: "banned", Reason: "账户 suspended/flagged 标记为 true"}
		}
		if u.Login != "" {
			return AccountStatus{Status: "active", Reason: "API /user 正常返回，login=" + u.Login}
		}
	}
	if login == "" && u != nil && u.Login != "" {
		login = u.Login
	}
	return AccountStatus{Status: "active", Reason: "API /user 正常"}
}

// checkViaWebProfile 抓取 github.com/<login> 主页判断
func checkViaWebProfile(login string, timeoutSec int) AccountStatus {
	if login == "" {
		return AccountStatus{Status: "unknown"}
	}
	hc := &http.Client{Timeout: time.Duration(timeoutSec) * time.Second}
	url := "https://github.com/" + login
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("User-Agent", "Mozilla/5.0 (githubaltmanager)")
	resp, err := hc.Do(req)
	if err != nil {
		return AccountStatus{Status: "error", Reason: "web profile error: " + err.Error()}
	}
	defer resp.Body.Close()
	bodyBytes, _ := io.ReadAll(resp.Body)
	body := string(bodyBytes)
	low := strings.ToLower(body)

	switch {
	case resp.StatusCode == 404:
		return AccountStatus{Status: "banned", Reason: "github.com/" + login + " 返回 404（账户可能被封禁或改名）"}
	case resp.StatusCode >= 400:
		return AccountStatus{Status: "error", Reason: fmt.Sprintf("web profile %d", resp.StatusCode)}
	}
	if strings.Contains(low, "suspended account") || strings.Contains(low, "account suspended") {
		return AccountStatus{Status: "banned", Reason: "网页检测到 suspended account 标记"}
	}
	return AccountStatus{Status: "active", Reason: "github.com/" + login + " 正常可访问"}
}
