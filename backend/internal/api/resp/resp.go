package resp

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// APIError 标准错误结构
type APIError struct {
	Code    int    `json:"code"`
	Error   string `json:"error"`
	Message string `json:"message"`
	Detail  any    `json:"detail,omitempty"`
}

// OK 成功返回
func OK(c *gin.Context, data any) {
	c.JSON(http.StatusOK, gin.H{"ok": true, "data": data})
}

// Created 资源创建成功
func Created(c *gin.Context, data any) {
	c.JSON(http.StatusCreated, gin.H{"ok": true, "data": data})
}

// Fail 失败返回
func Fail(c *gin.Context, status int, errType, msg string, detail ...any) {
	d := any(nil)
	if len(detail) > 0 {
		d = detail[0]
	}
	c.AbortWithStatusJSON(status, APIError{
		Code:    status,
		Error:   errType,
		Message: msg,
		Detail:  d,
	})
}

// Abort 直接中止并返回错误（用于中间件）
func Abort(c *gin.Context, status int, errType, msg string) {
	c.AbortWithStatusJSON(status, APIError{
		Code: status, Error: errType, Message: msg,
	})
}

// BadRequest 400
func BadRequest(c *gin.Context, msg string, detail ...any) {
	Fail(c, http.StatusBadRequest, "bad_request", msg, detail...)
}

// Unauthorized 401
func Unauthorized(c *gin.Context, msg string) {
	Fail(c, http.StatusUnauthorized, "unauthorized", msg)
}

// NotFound 404
func NotFound(c *gin.Context, msg string) {
	Fail(c, http.StatusNotFound, "not_found", msg)
}

// Internal 500
func Internal(c *gin.Context, msg string, detail ...any) {
	Fail(c, http.StatusInternalServerError, "internal", msg, detail...)
}
