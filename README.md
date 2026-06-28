# GitHub Alt Manager

> 前后端独立的 GitHub 账户管理器：通过 token 导入账号、查看账户状态、浏览/修改仓库文件、自动扫描 Action、定时执行和批量创建 Action。

[![Go](https://img.shields.io/badge/Go-1.21+-00ADD8?logo=go)](https://go.dev/)
[![Vue](https://img.shields.io/badge/Vue-3-42b883?logo=vue.js)](https://vuejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Release](https://img.shields.io/github/v/release/weige2008/githubaltmanager?include_prereleases)](https://github.com/weige2008/githubaltmanager/releases)

---

## ✨ 功能特性

- **账户管理**：通过 GitHub Token 导入账户，存储密码和密保邮箱（AES-256-GCM 加密）
- **封禁检测**：多方案并发检测账户状态（API `/user` 响应 + 网页主页 + token 验证）
- **仓库浏览**：拉取 token 可见的所有仓库（个人 + 组织 + 协作者），查看文件树
- **文件编辑**：在线编辑仓库文件并提交（自动处理 SHA）
- **Action 扫描**：自动识别每个账户所有仓库的 workflow，展示状态和最近运行
- **定时执行**：用 cron 表达式定时触发 `workflow_dispatch`（后端 scheduler，前端关闭也运行）
- **批量操作**：批量给多个仓库创建 workflow、批量触发 dispatch
- **安全加密**：AES-256-GCM 加密敏感字段 + Argon2id 派生密钥 + JWT 鉴权

## 📸 截图

| 登录页 | 仪表盘 |
|--------|--------|
| 账户管理 | 仓库浏览 |

## 🚀 快速部署（推荐）

### Linux / macOS（一键脚本）

```bash
curl -fsSL https://raw.githubusercontent.com/weige2008/githubaltmanager/main/deploy.sh -o deploy.sh
bash deploy.sh
```

脚本会自动：
1. 检测系统架构（amd64/arm64）
2. 下载对应的预编译二进制
3. 生成随机密钥的 `.env` 配置
4. 用 systemd 安装为系统服务（root 用户）
5. 启动服务（默认端口 `19527`）

### Windows

```powershell
# PowerShell
Invoke-WebRequest https://raw.githubusercontent.com/weige2008/githubaltmanager/main/deploy.ps1 -OutFile deploy.ps1
powershell -ExecutionPolicy Bypass -File deploy.ps1
```

### 手动下载二进制

到 [Releases 页面](https://github.com/weige2008/githubaltmanager/releases) 下载对应平台的二进制文件，重命名为 `githubaltmanager`（Windows 加 `.exe`），然后：

```bash
# Linux/macOS
chmod +x githubaltmanager
# 生成配置（首次）
cat > .env <<EOF
GAM_JWT_SECRET=$(openssl rand -hex 32)
GAM_MASTER_SALT=$(openssl rand -hex 16)
GAM_PORT=19527
GAM_ENV=prod
GAM_DB_PATH=./data/githubaltmanager.db
GAM_TZ=Asia/Shanghai
EOF
mkdir -p data
./githubaltmanager
```

访问 `http://<服务器IP>:19527`，首次打开需设置主密码。

> 💡 **二进制已内嵌前端**：无需额外安装 Node.js 或 Nginx，单个可执行文件即可运行。

## 📋 系统要求

| 平台 | 架构 | 支持 |
|------|------|------|
| Linux | amd64 | ✅ |
| Linux | arm64 | ✅ |
| Windows | amd64 | ✅ |
| macOS (Intel) | amd64 | ✅ |
| macOS (Apple Silicon) | arm64 | ✅ |

- 内存：**最低 64MB**（推荐 128MB+）
- 磁盘：约 30MB（二进制） + 数据库（按账户数量增长）
- 无需数据库服务器（SQLite 单文件）
- 无需 Web 服务器（内置）

## 🔧 源码构建

### 环境要求

- Go 1.21+
- Node.js 18+ (推荐 20+)
- Git

### 步骤

```bash
git clone https://github.com/weige2008/githubaltmanager.git
cd githubaltmanager

# 方式一：构建多平台 Release 二进制（含前端嵌入）
bash build.sh

# 方式二：仅本地开发（前后端分离）
# 终端 1 - 后端
cd backend
cp config.example.env .env
# 编辑 .env，修改 GAM_JWT_SECRET 和 GAM_MASTER_SALT
go mod tidy
GAM_STATIC_DIR=../frontend/dist go run ./cmd/server

# 终端 2 - 前端
cd frontend
npm install
npm run dev   # http://localhost:5173，自动代理 /api → :19527
```

## 🏗️ 技术栈

| 层 | 技术 | 说明 |
|----|------|------|
| 前端 | Vue 3 + Vite + Element Plus + Pinia | 中文界面，响应式布局 |
| 后端 | Go 1.21 + Gin + GORM | 单二进制，启动秒级 |
| 数据库 | SQLite（modernc.org/sqlite） | 纯 Go 驱动，免 CGO，支持交叉编译 |
| 加密 | AES-256-GCM + Argon2id | master 密码派生密钥，敏感字段加密存储 |
| 鉴权 | JWT（7 天有效期）+ master 密码 | 单用户模式 |
| 调度 | robfig/cron | 后端定时触发 workflow_dispatch |
| 前端嵌入 | go:embed | 二进制内含前端，单文件部署 |

## 📂 项目结构

```
githubaltmanager/
├── backend/                  # Go 后端
│   ├── cmd/server/           # 程序入口
│   ├── internal/
│   │   ├── api/              # Gin 路由 + 响应封装 + SPA 托管
│   │   │   ├── handlers/     # 处理器（auth/accounts/repos/tasks/batch/stats）
│   │   │   └── resp/         # 统一响应封装
│   │   ├── auth/             # JWT + master 密码 Argon2id
│   │   ├── config/           # 环境变量配置
│   │   ├── crypto/           # AES-256-GCM + 内存密钥仓库
│   │   ├── github/           # GitHub API 客户端 + 多方案封禁检测
│   │   ├── model/            # GORM 数据模型
│   │   ├── scheduler/        # cron 调度器
│   │   ├── service/          # 业务逻辑（账户/仓库/workflow/任务/cron）
│   │   ├── store/            # 数据库初始化（纯 Go SQLite）
│   │   └── web/              # go:embed 前端资源
│   ├── go.mod
│   └── config.example.env
├── frontend/                 # Vue 3 前端
│   ├── src/
│   │   ├── api/              # axios 封装 + 接口模块
│   │   ├── layouts/          # 主布局（侧边栏）
│   │   ├── router/           # 路由 + 菜单
│   │   ├── stores/           # Pinia
│   │   ├── styles/           # 全局样式
│   │   └── views/            # 页面（Login/Dashboard/Accounts/Repos/Tasks/Batch/Settings）
│   └── package.json
├── deploy/                   # 部署配置（Nginx/systemd，可选）
├── build.sh                  # 多平台构建脚本
├── deploy.sh                 # Linux/macOS 一键部署脚本
├── deploy.ps1                # Windows 一键部署脚本
├── Dockerfile                # Docker 多阶段构建
├── docker-compose.yml
└── README.md
```

## 📖 使用指南

### 1. 首次设置主密码

首次访问会提示设置主密码（至少 8 位）。**主密码用于加密所有 token / 密码 / 邮箱，忘记后无法找回**，请用密码管理器保存。

### 2. 导入 GitHub 账户

到 GitHub → Settings → Developer settings → Personal access tokens 创建 token：
- **Classic token**：勾选 `repo` + `workflow` + `read:user`（或勾选全部 scope）
- **Fine-grained token**：授予 Administration 读写 + Contents 读写 + Actions 读写 + Metadata 只读

然后在"账户管理"→"导入账户"中填入 token。

### 3. 检测账户状态

点击账户的"检测"按钮，系统会并发调用：
- GitHub API `/user` 检查 401/403 错误码及 suspended/flagged 关键字
- 抓取 `github.com/<login>` 主页判断 404 或封禁标记

任一方案命中即标记为封禁，详情记录在"状态详情"字段。

### 4. 浏览仓库 & 编辑文件

进入"账户详情"→"同步仓库"，再回到"仓库浏览"选择仓库，可：
- 浏览文件树
- 在线编辑文本文件
- 提交修改（自动带 SHA）

### 5. 扫描 & 触发 Action

"账户详情"→"扫描 Workflows"会自动识别该账户所有仓库的 `.github/workflows/*.yml`，记录到本地。在"仓库浏览"中点击 Workflows 可查看并触发。

### 6. 定时任务

"定时任务"→"新建定时任务"，填入 cron 表达式（如 `0 8 * * *` 每天 8 点），选择 workflow，到点后端自动调用 `workflow_dispatch` 触发。

**即使关闭浏览器，定时任务仍会继续执行**（后端 scheduler 持续运行）。

### 7. 批量操作

"批量操作"页面可以：
- 给多个仓库批量创建同一个 workflow 文件
- 批量触发多个仓库的 workflow_dispatch

## ⚙️ 配置项

所有配置通过环境变量注入（也可用 `.env` 文件）：

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `GAM_HOST` | `0.0.0.0` | 监听地址 |
| `GAM_PORT` | `8080` | 监听端口（部署脚本默认用 19527） |
| `GAM_ENV` | `dev` | `prod` 时关闭调试日志 |
| `GAM_DB_PATH` | `data/githubaltmanager.db` | SQLite 文件路径 |
| `GAM_JWT_SECRET` | 必填 | JWT 签名密钥（随机 64 hex） |
| `GAM_MASTER_SALT` | 必填 | Argon2id 盐（随机 32 hex） |
| `GAM_GH_API` | `https://api.github.com` | GitHub API 地址（可改 Enterprise） |
| `GAM_GH_TIMEOUT` | `20` | GitHub API 超时秒数 |
| `GAM_GH_CONCURRENCY` | `8` | 并发调用 GitHub API 的 goroutine 数 |
| `GAM_TZ` | `Asia/Shanghai` | 调度器时区 |

## 🔒 安全说明

- 所有 token / 密码 / 密保邮箱入库前用 **AES-256-GCM** 加密
- 加密密钥由 **master 密码 + Argon2id** 派生，仅在运行时驻留内存，不落盘
- **master 密码忘记后无法找回**，请用密码管理器保存（建议 Bitwarden / 1Password）
- GitHub API 调用带速率限制感知（响应头 `X-RateLimit-Remaining`）
- 修改主密码时会自动用新密码重新加密所有已存储数据
- 服务重启后需要重新登录（密钥丢失），token 等加密数据仍安全

## 🐳 Docker 部署

```bash
docker compose up -d --build
# 访问 http://localhost:8080
```

详见 [`docker-compose.yml`](docker-compose.yml)。

## 📊 数据备份

SQLite 数据库是单文件，直接复制即可备份：

```bash
# 在线备份（保证一致性）
sqlite3 data/githubaltmanager.db ".backup data/backup-$(date +%Y%m%d).db"

# 或直接复制（先停服务）
cp data/githubaltmanager.db data/backup.db
```

> **注意**：备份文件包含所有加密数据，但解密仍需 master 密码。备份文件泄露但攻击者没有 master 密码也无法解密。

## ❓ FAQ

**Q：忘记 master 密码怎么办？**
A：无法找回。需要删除数据库重新初始化，并重新导入所有账户。

**Q：服务重启后为什么需要重新登录？**
A：AES 密钥由 master 密码派生，仅在登录时驻留内存。重启后密钥丢失，需重新登录解锁。

**Q：定时任务在服务重启后会丢失吗？**
A：不会。任务存储在 SQLite，重启后自动恢复，调度器会重新计算下次执行时间。

**Q：支持 GitHub Enterprise 吗？**
A：支持。设置环境变量 `GAM_GH_API=https://your-ghe.example.com/api/v3`。

**Q：会触发 GitHub 限流吗？**
A：扫描大量仓库时可能触发。系统会感知 `X-RateLimit-Remaining` 头，但当前未实现自动退避，建议合理设置 `GAM_GH_CONCURRENCY`。

## 📜 License

MIT
