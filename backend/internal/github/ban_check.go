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
	Status      string // active / banned / token_expired / restricted / unknown / error
	Reason      string // 详细原因
	Methods     []string // 命中的检测方法
	WebNotFound bool // 仅网页探测：主页 404
}

// CheckBanStatus 多方案并发检测账户是否被封禁
// 方案1: API /user 错误码 + 响应体关键字（suspended/flagged/invalid token）
// 方案2: 抓取 github.com/<user> 主页，404 判异常（始终执行，与 API 探测互为印证，
//       缺少任一路将无法识别受限等状态；注意无认证网页请求出自服务器 IP，大量账户时留意频率）
// 方案3: token 验证失败信号
func CheckBanStatus(token, apiBaseURL, login string, timeoutSec int) AccountStatus {
	client := New(apiBaseURL, token, timeoutSec)
	type probe struct {
		src string
		st  AccountStatus
	}
	results := make(chan probe, 2)

	// 方案1：API /user
	go func() {
		s := checkViaAPI(client, login)
		results <- probe{src: "api", st: s}
	}()

	// 方案2：网页主页
	wantCount := 1
	if login != "" {
		wantCount = 2
		go func() {
			results <- probe{src: "web", st: checkViaWebProfile(login, timeoutSec)}
		}()
	}

	var apiRes, webRes *AccountStatus
	collected := 0
	for collected < wantCount {
		select {
		case r := <-results:
			collected++
			s := r.st
			if r.src == "api" {
				apiRes = &s
			} else {
				webRes = &s
			}
		case <-time.After(time.Duration(timeoutSec+5) * time.Second):
			collected = wantCount
			if apiRes == nil {
				apiRes = &AccountStatus{Status: "error", Reason: "detection timeout"}
			}
		}
	}

	return aggregateStatus(apiRes, webRes)
}

// aggregateStatus 汇总两路探测结果：
//   - API 正常(active) + 网页 404 → restricted（token 有效但主页不可访问，可能受限/风控或已改名）
//   - 其余维持 banned > token_expired > active > error 的既有优先级
func aggregateStatus(apiRes, webRes *AccountStatus) AccountStatus {
	aggregated := AccountStatus{}
	if apiRes != nil {
		aggregated.Methods = append(aggregated.Methods, "api_user")
	}
	if webRes != nil {
		aggregated.Methods = append(aggregated.Methods, "web_profile")
	}
	if apiRes == nil {
		apiRes = &AccountStatus{Status: "error", Reason: "detection timeout"}
	}

	// 新规则：token 有效但网页主页 404 → 受限
	if apiRes.Status == "active" && webRes != nil && webRes.WebNotFound {
		aggregated.Status = "restricted"
		aggregated.Reason = "API 探测正常但 " + webRes.Reason
		return aggregated
	}

	bannedReasons := []string{}
	hasExpired := false
	hasActive := false
	activeReason := ""
	errReason := ""
	for _, r := range []*AccountStatus{apiRes, webRes} {
		if r == nil {
			continue
		}
		switch r.Status {
		case "banned":
			bannedReasons = append(bannedReasons, r.Reason)
		case "token_expired":
			hasExpired = true
		case "active":
			hasActive = true
			if activeReason == "" {
				activeReason = r.Reason
			}
		case "error":
			if errReason == "" {
				errReason = r.Reason
			}
		}
	}

	switch {
	case len(bannedReasons) > 0:
		aggregated.Status = "banned"
		aggregated.Reason = strings.Join(bannedReasons, "; ")
	case hasExpired:
		aggregated.Status = "token_expired"
		aggregated.Reason = apiRes.Reason
	case hasActive:
		aggregated.Status = "active"
		aggregated.Reason = activeReason
	case errReason != "":
		aggregated.Status = "error"
		aggregated.Reason = errReason
	default:
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
			return AccountStatus{Status: "token_expired", Reason: "token 无效或已过期: " + msg}
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
		return AccountStatus{Status: "banned", Reason: "github.com/" + login + " 返回 404（账户可能被封禁或改名）", WebNotFound: true}
	case resp.StatusCode >= 400:
		return AccountStatus{Status: "error", Reason: fmt.Sprintf("web profile %d", resp.StatusCode)}
	}
	if strings.Contains(low, "suspended account") || strings.Contains(low, "account suspended") {
		return AccountStatus{Status: "banned", Reason: "网页检测到 suspended account 标记"}
	}
	return AccountStatus{Status: "active", Reason: "github.com/" + login + " 正常可访问"}
}
