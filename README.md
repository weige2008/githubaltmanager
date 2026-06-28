# GitHub Alt Manager

> 前后端独立的 GitHub 账户管理器：通过 token 导入账号、查看账户状态、浏览仓库、修改仓库文件、创建/批量创建/定时执行 GitHub Actions。

## 技术栈

| 层 | 选型 |
|----|------|
| 前端 | Vue 3 + Vite + Element Plus + Pinia + Vue Router |
| 后端 | Go 1.21+ + Gin + GORM |
| 数据库 | SQLite (WAL 模式) |
| 加密 | AES-256-GCM + Argon2id (master 密码派生) |
| 调度 | robfig/cron (后端触发 workflow_dispatch) |
| 部署 | Ubuntu + Nginx + systemd / Docker |

## 功能路线

- [x] **P1** 基础骨架（Gin + GORM + Vue 脚手架 + Nginx/systemd/Docker）
- [x] **P2** 鉴权加密（master 密码、AES-256-GCM、JWT 中间件）
- [x] **P3** 账户管理（token 导入、CRUD、多方案封禁检测）
- [x] **P4** GitHub 数据（全量仓库拉取、文件浏览/编辑、workflow 自动扫描）
- [x] **P5** 调度批处理（cron 定时、workflow_dispatch、批量创建）
- [x] **P6** 打磨（统计概览、改密重加密、限流感知、错误处理）

---

## 目录结构

```
githubaltmanager/
├── backend/                # Go 后端
│   ├── cmd/server/         # 程序入口
│   ├── internal/
│   │   ├── api/            # Gin 路由 + 响应封装
│   │   ├── auth/           # JWT + master 密码 (P2)
│   │   ├── config/         # 配置加载
│   │   ├── crypto/         # AES-256-GCM (P2)
│   │   ├── github/         # GitHub API 客户端 (P3/P4)
│   │   ├── model/          # GORM 数据模型
│   │   ├── scheduler/      # cron 调度器 (P5)
│   │   ├── service/        # 业务逻辑 (P3+)
│   │   └── store/          # 数据库初始化
│   ├── config.example.env
│   └── go.mod
├── frontend/               # Vue 3 前端
│   ├── src/
│   │   ├── api/            # axios 封装 + 接口模块
│   │   ├── layouts/        # 主布局
│   │   ├── router/         # 路由
│   │   ├── stores/         # Pinia
│   │   ├── styles/         # 全局样式
│   │   └── views/          # 页面
│   ├── vite.config.ts
│   └── package.json
├── deploy/                 # 部署配置
│   ├── nginx.conf          # Ubuntu Nginx 配置
│   ├── nginx-docker.conf   # Docker 内 Nginx 配置
│   └── githubaltmanager.service  # systemd 单元
├── Dockerfile              # 多阶段构建
├── docker-compose.yml
└── README.md
```

---

## 本地开发

### 前置依赖

- Go 1.21+
- Node.js 18+ (推荐 20+)
- SQLite (CGO 编译需要 gcc，Ubuntu: `sudo apt install build-essential`)

### 启动后端

```bash
cd backend

# 生成密钥并写入 .env
cp config.example.env .env
# 生成随机密钥
sed -i "s|change-me-to-a-random-64-char-hex-string|$(openssl rand -hex 32)|" .env
sed -i "s|change-me-to-a-random-32-char-hex-string|$(openssl rand -hex 16)|" .env

# 下载依赖并启动（监听 :8080）
go mod tidy
go run ./cmd/server
```

健康检查: `curl http://127.0.0.1:8080/healthz`

### 启动前端

```bash
cd frontend
npm install
npm run dev      # 启动 dev server (http://localhost:5173，自动代理 /api → :8080)
```

---

## Ubuntu 生产部署

### 方式一：原生 systemd

```bash
# 1. 创建专用账户与目录
sudo useradd -r -m -d /opt/githubaltmanager -s /usr/sbin/nologin gam
sudo mkdir -p /opt/githubaltmanager/{backend/data,frontend/dist}

# 2. 编译后端
cd backend && CGO_ENABLED=1 go build -ldflags="-s -w" -o bin/server ./cmd/server
sudo cp bin/server /opt/githubaltmanager/backend/
sudo cp -r ../frontend/dist/* /opt/githubaltmanager/frontend/dist/

# 3. 配置环境变量
cd /opt/githubaltmanager/backend
sudo cp config.example.env .env
# 编辑 .env，务必修改 GAM_JWT_SECRET 与 GAM_MASTER_SALT
sudo chown gam:gam -R /opt/githubaltmanager

# 4. 安装 systemd 服务
sudo cp deploy/githubaltmanager.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now githubaltmanager
sudo systemctl status githubaltmanager
journalctl -u githubaltmanager -f        # 查看日志

# 5. 配置 Nginx 反代
sudo cp deploy/nginx.conf /etc/nginx/sites-available/githubaltmanager
sudo ln -s /etc/nginx/sites-available/githubaltmanager /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 方式二：Docker

```bash
# 生成密钥
export GAM_JWT_SECRET=$(openssl rand -hex 32)
export GAM_MASTER_SALT=$(openssl rand -hex 16)

# 构建并启动
docker compose up -d --build
docker compose logs -f
```

访问 `http://<服务器IP>:8080`（首次会进入 master 密码初始化界面）。

---

## 安全说明

- 所有 token / 密码 / 密保邮箱入库前使用 **AES-256-GCM** 加密
- 加密密钥由 **master 密码 + Argon2id** 派生，仅在服务运行时驻留内存
- **master 密码忘记后无法找回**，请务必妥善保管（建议使用密码管理器保存）
- GitHub API 调用带速率限制感知，遇 403/429 自动退避

## License

MIT
