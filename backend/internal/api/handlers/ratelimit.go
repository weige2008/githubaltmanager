package handlers

import (
	"net/http"
	"strconv"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"githubaltmanager/internal/api/resp"
)

// rateLimiter in-memory per-IP sliding-window rate limiter.
// Suitable for single-instance deployments. For multi-instance, use Redis-backed.
type rateLimiter struct {
	mu       sync.Mutex
	visitors map[string]*visitorEntry
	limit    int           // max hits in window
	window   time.Duration // sliding window length
}

type visitorEntry struct {
	count    int
	lastSeen time.Time
}

func newRateLimiter(limit int, window time.Duration) *rateLimiter {
	rl := &rateLimiter{
		visitors: make(map[string]*visitorEntry),
		limit:    limit,
		window:   window,
	}
	go rl.cleanup()
	return rl
}

func (rl *rateLimiter) allow(key string) bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()
	v, ok := rl.visitors[key]
	now := time.Now()
	if !ok || now.Sub(v.lastSeen) > rl.window {
		rl.visitors[key] = &visitorEntry{count: 1, lastSeen: now}
		return true
	}
	v.count++
	v.lastSeen = now
	return v.count <= rl.limit
}

func (rl *rateLimiter) cleanup() {
	t := time.NewTicker(5 * time.Minute)
	defer t.Stop()
	for range t.C {
		rl.mu.Lock()
		now := time.Now()
		for k, v := range rl.visitors {
			if now.Sub(v.lastSeen) > rl.window*2 {
				delete(rl.visitors, k)
			}
		}
		rl.mu.Unlock()
	}
}

// auth limiter: 10 attempts per minute per IP (covers login + setup + change-password)
var authLimiter = newRateLimiter(10, time.Minute)

// clientIPKey extracts client IP, preferring X-Forwarded-For first entry if present
func clientIPKey(c *gin.Context) string {
	if xff := c.GetHeader("X-Forwarded-For"); xff != "" {
		for i := 0; i < len(xff); i++ {
			if xff[i] == ',' {
				return xff[:i]
			}
		}
		return xff
	}
	return c.ClientIP()
}

// AuthRateLimit middleware - apply to sensitive auth endpoints
func AuthRateLimit() gin.HandlerFunc {
	return func(c *gin.Context) {
		key := clientIPKey(c)
		if !authLimiter.allow(key) {
			c.Header("Retry-After", strconv.Itoa(60))
			resp.Abort(c, http.StatusTooManyRequests, "rate_limited", "请求过于频繁，请稍后再试")
			return
		}
		c.Next()
	}
}
