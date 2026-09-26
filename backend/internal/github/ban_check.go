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

// webCooldown 网页探测的包级冷却：收到 429 后 60 秒内的后续探测直接跳过
// （429 是 IP 级限流，单账户等待解决不了，继续撞只会延长限流）
var (
	webCooldownMu       sync.Mutex
	webCooldownUntil    time.Time
	webCooldownRetries  int // 冷却期内被跳过的探测数（用于日志观测）
)

const webCooldownDuration = time.Minute

func webProbeBlocked() bool {
	webCooldownMu.Lock()
	defer webCooldownMu.Unlock()
	return time.Now().Before(webCooldownUntil)
}

func webProbeMarkRateLimited() {
	webCooldownMu.Lock()
	defer webCooldownMu.Unlock()
	webCooldownUntil = time.Now().Add(webCooldownDuration)
}

// AccountStatus 封禁检测结果
type AccountStatus struct {
	Status      string // active / banned / token_expired / restricted / unknown / error
	Reason      string // 详细原因
	Methods     []string // 命中的检测方法
	WebNotFound bool // 仅网页探测：主页 404
	WebRateLimited bool // 仅网页探测：429 限流（IP 级被 GitHub 网页侧限流）
	GithubCreatedAt *time.Time // API 探测返回的 GitHub 账号注册时间
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

	// 方案2：网页主页（IP 冷却期内跳过，避免继续撞 429）
	wantCount := 1
	if login != "" {
		wantCount = 2
		if webProbeBlocked() {
			results <- probe{src: "web", st: AccountStatus{Status: "error", Reason: "网页探测冷却中（此前 429），本轮跳过", WebRateLimited: true}}
		} else {
			go func() {
				results <- probe{src: "web", st: checkViaWebProfile(login, timeoutSec)}
			}()
		}
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

	// 单账户冷却重试：API 正常但网页 429 时，等冷却结束后原地重试一次网页探测，
	// 拿到真实结论（404=受限/200=正常），避免把限流误判成 unknown
	if apiRes != nil && apiRes.Status == "active" && webRes != nil && webRes.WebRateLimited {
		time.Sleep(webCooldownDuration + 2*time.Second)
		retry := checkViaWebProfile(login, timeoutSec)
		retry.Methods = append(retry.Methods, "web_retry")
		webRes = &retry
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
		aggregated.GithubCreatedAt = apiRes.GithubCreatedAt
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
		// 网页探测失败（错误/429 限流）时不再给出确定的"正常"——
		// 只有一路探测的结论不足以排除受限，保守判 unknown 并在原因中说明
		if webRes != nil && webRes.Status == "error" {
			aggregated.Status = "unknown"
			aggregated.Reason = activeReason + "；⚠️ 网页探测失败（" + webRes.Reason + "），无法识别受限，判为未知"
			return aggregated
		}
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
	githubCreated := ParseGitHubTime(u.CreatedAt)

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
			return AccountStatus{Status: "active", Reason: "API /user 正常返回，login=" + u.Login, GithubCreatedAt: githubCreated}
		}
	}
	if login == "" && u != nil && u.Login != "" {
		login = u.Login
	}
	return AccountStatus{Status: "active", Reason: "API /user 正常", GithubCreatedAt: githubCreated}
}

// checkViaWebProfile 抓取 github.com/<login> 主页判断（失败自动重试一次：
// 新账户主页与被限流场景偶发瞬时失败；若运行环境根本无法访问 github.com 网页，
// 两连败后返回 error——汇总时会退化为仅按 API 结果判定，并在原因中注明）
func checkViaWebProfile(login string, timeoutSec int) AccountStatus {
	if login == "" {
		return AccountStatus{Status: "unknown"}
	}
	hc := &http.Client{Timeout: time.Duration(timeoutSec) * time.Second}
	target := "https://github.com/" + login
	var lastErr error
	for attempt := 0; attempt < 2; attempt++ {
		if attempt > 0 {
			time.Sleep(500 * time.Millisecond)
		}
		req, _ := http.NewRequest("GET", target, nil)
		req.Header.Set("User-Agent", "Mozilla/5.0 (githubaltmanager)")
		resp, err := hc.Do(req)
		if err != nil {
			lastErr = err
			continue
		}
		defer resp.Body.Close()
		bodyBytes, _ := io.ReadAll(resp.Body)
		body := string(bodyBytes)
		low := strings.ToLower(body)

		switch {
		case resp.StatusCode == 404:
			return AccountStatus{Status: "banned", Reason: "github.com/" + login + " 返回 404（账户可能被封禁或改名）", WebNotFound: true}
		case resp.StatusCode == 429:
			// IP 级限流信号：标记包级冷却，让后续账户的网页探测暂停 60 秒
			webProbeMarkRateLimited()
			return AccountStatus{Status: "error", Reason: "web profile 429（网页探测被限流，探测冷却 1 分钟）", WebRateLimited: true}
		case resp.StatusCode >= 400:
			return AccountStatus{Status: "error", Reason: fmt.Sprintf("web profile %d", resp.StatusCode)}
		}
		if strings.Contains(low, "suspended account") || strings.Contains(low, "account suspended") {
			return AccountStatus{Status: "banned", Reason: "网页检测到 suspended account 标记"}
		}
		return AccountStatus{Status: "active", Reason: "github.com/" + login + " 正常可访问"}
	}
	return AccountStatus{Status: "error", Reason: "web profile error（2 次尝试均失败，当前网络可能无法访问 github.com 主页）: " + lastErr.Error()}
}
