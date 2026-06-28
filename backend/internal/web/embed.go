package web

import "embed"

// Dist 嵌入前端构建产物。
// 构建前需把 frontend/dist 的内容复制到本目录下的 dist/ 子目录。
// 由于 dist 目录可能为空（未构建），使用 embed.FS 占位；构建后自动包含。
//
//go:embed all:dist
var Dist embed.FS
