package github

import "testing"

func TestAggregateStatus(t *testing.T) {
	tests := []struct {
		name string
		api  *AccountStatus
		web  *AccountStatus
		want string
	}{
		{"api正常+网页404 → restricted", &AccountStatus{Status: "active"}, &AccountStatus{Status: "banned", Reason: "404", WebNotFound: true}, "restricted"},
		{"api正常+网页正常 → active", &AccountStatus{Status: "active"}, &AccountStatus{Status: "active"}, "active"},
		{"api正常+网页suspended文案 → banned", &AccountStatus{Status: "active"}, &AccountStatus{Status: "banned", Reason: "suspended"}, "banned"},
		{"api停用+网页任意 → banned", &AccountStatus{Status: "banned", Reason: "suspended"}, &AccountStatus{Status: "active"}, "banned"},
		{"api过期+网页404 → banned（仅API正常才判受限）", &AccountStatus{Status: "token_expired"}, &AccountStatus{Status: "banned", WebNotFound: true}, "banned"},
		{"api过期+网页正常 → token_expired", &AccountStatus{Status: "token_expired"}, &AccountStatus{Status: "active"}, "token_expired"},
		{"api错误+网页正常 → active", &AccountStatus{Status: "error"}, &AccountStatus{Status: "active"}, "active"},
		{"api错误+网页404 → banned（网页单独信号）", &AccountStatus{Status: "error"}, &AccountStatus{Status: "banned", WebNotFound: true}, "banned"},
		{"仅api（网页关闭） → active", &AccountStatus{Status: "active"}, nil, "active"},
		{"双超时 → error", &AccountStatus{Status: "error", Reason: "detection timeout"}, nil, "error"},
		{"双nil防御 → error（真实流程中API探测必执行，超时填充error）", nil, nil, "error"},
		{"双banned理由拼接", &AccountStatus{Status: "banned", Reason: "A"}, &AccountStatus{Status: "banned", Reason: "B"}, "banned"},
	}
	for _, tt := range tests {
		got := aggregateStatus(tt.api, tt.web)
		if got.Status != tt.want {
			t.Errorf("%s: got %q, want %q (reason=%q)", tt.name, got.Status, tt.want, got.Reason)
		}
	}
	// restricted 的理由要带上网页 404 的说明
	got := aggregateStatus(&AccountStatus{Status: "active"}, &AccountStatus{Status: "banned", Reason: "github.com/x 返回 404", WebNotFound: true})
	if got.Status != "restricted" || got.Reason == "" {
		t.Errorf("restricted reason missing: %+v", got)
	}
	// 双 banned 理由拼接校验
	got = aggregateStatus(&AccountStatus{Status: "banned", Reason: "A"}, &AccountStatus{Status: "banned", Reason: "B"})
	if got.Reason != "A; B" {
		t.Errorf("banned reasons not joined: %q", got.Reason)
	}
}
