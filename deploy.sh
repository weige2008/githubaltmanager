#!/bin/bash
# GitHub Alt Manager - 一键部署脚本
# 在服务器上以 root 运行：bash deploy.sh
# 监听端口 19527（不常用端口）

set -e
APP_DIR=/opt/githubaltmanager
PORT=19527

echo "==== 1. 安装依赖 ===="
apt-get update -qq
apt-get install -y -qq build-essential >/dev/null

# Go
if ! command -v go >/dev/null 2>&1; then
  if [ ! -x /usr/local/go/bin/go ]; then
    echo "安装 Go 1.21..."
    cd /tmp
    curl -fsSL -o go.tgz https://go.dev/dl/go1.21.13.linux-amd64.tar.gz
    tar -C /usr/local -xzf go.tgz && rm go.tgz
  fi
  ln -sf /usr/local/go/bin/go /usr/local/bin/go
fi
echo "Go: $(go version)"

# Node
if ! command -v node >/dev/null 2>&1; then
  echo "安装 Node 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - >/dev/null
  apt-get install -y -qq nodejs >/dev/null
fi
echo "Node: $(node --version)"

echo "==== 2. 准备目录 ===="
mkdir -p $APP_DIR/backend $APP_DIR/frontend/dist
cd $APP_DIR

echo "==== 3. 上传源码后执行（见下方说明） ===="
echo "请在此处放置 backend/ 和 frontend/ 源码，然后重新运行此脚本的后续步骤"
echo ""
echo "==== 部署完成脚本（源码就绪后执行）===="
cat <<'POSTDEPLOY'
#!/bin/bash
set -e
APP_DIR=/opt/githubaltmanager
PORT=19527
cd $APP_DIR

# 生成密钥
if [ ! -f $APP_DIR/backend/.env ]; then
  JWT=$(openssl rand -hex 32)
  SALT=$(openssl rand -hex 16)
  cat > $APP_DIR/backend/.env <<EOF
GAM_HOST=0.0.0.0
GAM_PORT=$PORT
GAM_ENV=prod
GAM_DB_PATH=$APP_DIR/data/githubaltmanager.db
GAM_JWT_SECRET=$JWT
GAM_MASTER_SALT=$SALT
GAM_GH_API=https://api.github.com
GAM_GH_TIMEOUT=20
GAM_GH_CONCURRENCY=8
GAM_TZ=Asia/Shanghai
GAM_STATIC_DIR=$APP_DIR/frontend/dist
EOF
  mkdir -p $APP_DIR/data
  echo "已生成 .env"
fi

# 编译后端
cd $APP_DIR/backend
export GOPROXY=https://goproxy.cn,direct
CGO_ENABLED=1 go build -ldflags="-s -w" -o bin/server ./cmd/server

# 构建前端
cd $APP_DIR/frontend
npm ci || npm install
npm run build

# 安装 systemd 服务
cat > /etc/systemd/system/githubaltmanager.service <<EOF
[Unit]
Description=GitHub Alt Manager
After=network.target
[Service]
Type=simple
WorkingDirectory=$APP_DIR/backend
EnvironmentFile=$APP_DIR/backend/.env
ExecStart=$APP_DIR/backend/bin/server
Restart=on-failure
RestartSec=5
[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable --now githubaltmanager
sleep 2

echo "==== 部署完成 ===="
echo "访问: http://$(curl -s ifconfig.me):$PORT"
systemctl status githubaltmanager --no-pager | head -15
POSTDEPLOY
