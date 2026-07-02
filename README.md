# GitHub Alt Manager

> 安全的 GitHub 多账户管理工具：加密存储 Token、自动检测封禁、批量创建仓库与工作流、定时触发 Actions。

[![Go](https://img.shields.io/badge/Go-1.21+-00ADD8?logo=go)](https://go.dev/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![Release](https://img.shields.io/github/v/release/weige2008/githubaltmanager)](https://github.com/weige2008/githubaltmanager/releases)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

---

## 功能

- **账户管理** — Token 加密导入、密码/邮箱安全存储、多方案封禁检测
- **批量建仓** — 跨账户同名仓库创建、从公开仓库克隆文件、Repository Secrets 设置
- **批量工作流** — 跨账户筛选同名仓库、批量创建/触发同一份 GitHub Actions 工作流
- **仓库浏览** — 文件树、在线编辑、Workflow 扫描与触发
- **定时任务** — cron 表达式定时触发 workflow_dispatch（后端持续运行）
- **自动检测/同步** — 可配置间隔自动检测封禁状态、自动同步仓库列表
- **安全加密** — AES-256-GCM + Argon2id + NaCl，零配置启动

## 快速开始

### 下载即用（推荐）

到 [Releases](https://github.com/weige2008/githubaltmanager/releases) 下载对应平台的二进制：

```bash
# Linux/macOS
chmod +x githubaltmanager-linux-amd64
./githubaltmanager-linux-amd64
```

```powershell
# Windows - 双击 exe 即可
githubaltmanager-windows-amd64.exe
```

首次运行自动生成 `.env` 配置文件（含随机密钥），浏览器访问 `http://localhost:8080`。

### Docker

```bash
docker run -d --name gam -p 8080:8080 -v gam-data:/app/data githubaltmanager:latest
```

或使用 docker-compose：

```bash
docker compose up -d
```

### 从源码构建

```bash
git clone https://github.com/weige2008/githubaltmanager.git
cd githubaltmanager

# 前端
cd frontend && npm install && npm run build && cd ..

# 后端
cd backend
cp .env.example .env  # 编辑密钥
go mod tidy
go build -o server ./cmd/server
./server
```

## 支持平台

| 平台 | 架构 | 文件 |
|------|------|------|
| Linux | amd64 | `githubaltmanager-linux-amd64` |
| Linux | arm64 | `githubaltmanager-linux-arm64` |
| Windows | amd64 | `githubaltmanager-windows-amd64.exe` |
| macOS (Intel) | amd64 | `githubaltmanager-darwin-amd64` |
| macOS (Apple Silicon) | arm64 | `githubaltmanager-darwin-arm64` |

内存：64MB+ | 磁盘：~30MB + 数据库 | 无需外部依赖

## 技术栈

| 层 | 技术 |
|----|------|
| 前端 | React 19 + Tailwind v3 + Radix UI + TanStack Query + Zustand + framer-motion |
| 后端 | Go 1.21 + Gin + GORM |
| 数据库 | SQLite（glebarez/sqlite，纯 Go，无 CGO） |
| 加密 | AES-256-GCM + Argon2id + NaCl box（Repository Secrets） |
| 前端嵌入 | go:embed（单二进制，无需 Nginx） |
| i18n | react-i18next（中文 + 英文） |
| 主题 | 10 套预设 + color-mix 语义桥接 + Public Sans / Lora 字体 |

## 项目结构

```
githubaltmanager/
├── backend/
│   ├── cmd/server/main.go       # 入口（含 .env 自动加载）
│   ├── internal/
│   │   ├── api/handlers/         # REST API 处理器
│   │   ├── auth/                 # JWT + Argon2id
│   │   ├── config/               # 环境变量配置
│   │   ├── crypto/               # AES-256-GCM 加密
│   │   ├── github/               # GitHub API 客户端
│   │   ├── model/                # 数据模型
│   │   ├── scheduler/            # 定时任务调度器
│   │   ├── service/              # 业务逻辑
│   │   ├── store/                # SQLite 初始化
│   │   └── web/                  # go:embed 前端资源
│   ├── .env.example
│   └── go.mod
├── frontend/
│   ├── src/
│   │   ├── components/ui/        # 40+ Radix UI 组件
│   │   ├── components/data-table/ # DataTable 系统
│   │   ├── pages/                # 11 个页面
│   │   ├── hooks/                # 12 个自定义 Hook
│   │   ├── i18n/                 # 中文 + 英文翻译
│   │   ├── store/                # Zustand 状态管理
│   │   └── lib/                  # 工具函数
│   └── package.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## 配置项

通过 `.env` 文件或环境变量配置（首次运行自动生成）：

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `GAM_PORT` | `8080` | 监听端口 |
| `GAM_JWT_SECRET` | 自动生成 | JWT 签名密钥 |
| `GAM_MASTER_SALT` | 自动生成 | Argon2id 加密盐 |
| `GAM_DB_PATH` | `data/githubaltmanager.db` | 数据库路径 |
| `GAM_GH_API` | `https://api.github.com` | GitHub API 地址 |
| `GAM_TZ` | `Asia/Shanghai` | 时区 |

## 安全

- Token / 密码 / 邮箱用 AES-256-GCM 加密存储
- 主密码通过 Argon2id 派生加密密钥，仅运行时驻留内存
- `.env` 文件权限 0600，密钥首次自动生成
- Repository Secrets 使用 NaCl 加密传输
- 修改主密码自动重新加密所有数据
- 安全响应头（X-Frame-Options / X-Content-Type-Options）

## License

MIT
