#!/usr/bin/env bash
# ============================================================
# GitHub Alt Manager - 快速部署脚本（Linux / macOS）
#
# 用法：
#   方式一（从 Release 下载预编译二进制，推荐）：
#       curl -fsSL https://github.com/weige2008/githubaltmanager/releases/latest/download/deploy.sh -o deploy.sh
#       bash deploy.sh
#
#   方式二（本仓库根目录）：
#       bash deploy.sh
#
# 默认端口 19527，数据存到 ./data/ 目录，可被环境变量覆盖。
# ============================================================
set -e

# ---- 默认配置 ----
APP_NAME="githubaltmanager"
APP_DIR="${GAM_INSTALL_DIR:-$PWD/githubaltmanager}"
PORT="${GAM_PORT:-19527}"
VERSION="latest"
REPO="weige2008/githubaltmanager"

# ---- 颜色 ----
if [ -t 1 ]; then
  GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; CYAN='\033[0;36m'; NC='\033[0m'
else
  GREEN=''; YELLOW=''; RED=''; CYAN=''; NC=''
fi
info()  { echo -e "${GREEN}[INFO]${NC}  $1"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $1"; }
err()   { echo -e "${RED}[ERROR]${NC} $1"; }
step()  { echo -e "${CYAN}==== $1 ====${NC}"; }

# ---- 检测系统 ----
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)
case "$ARCH" in
  x86_64|amd64) ARCH="amd64" ;;
  aarch64|arm64) ARCH="arm64" ;;
  *) err "不支持的架构: $ARCH"; exit 1 ;;
esac
case "$OS" in
  linux)  OS="linux" ;;
  darwin) OS="darwin" ;;
  *) err "不支持的系统: $OS (仅支持 linux / macOS)"; exit 1 ;;
esac
info "检测到系统: $OS/$ARCH"

# ---- 检测是否有预编译二进制 ----
BINARY_NAME="$APP_NAME-$OS-$ARCH"
if [ "$OS" = "darwin" ] || [ "$OS" = "linux" ]; then
  BINARY_NAME="$BINARY_NAME"
fi

step "1/4 准备目录"
mkdir -p "$APP_DIR/data"
cd "$APP_DIR"
info "安装目录: $APP_DIR"

step "2/4 下载预编译二进制"
URL="https://github.com/$REPO/releases/latest/download/$BINARY_NAME"
if curl -fsSL --head "$URL" 2>&1 | grep -q "HTTP/2 200\|HTTP/1.1 200\|HTTP/2 302"; then
  info "下载: $URL"
  curl -fsSL -o "$APP_NAME" "$URL"
  chmod +x "$APP_NAME"
  info "下载完成"
else
  err "未找到预编译二进制 ($BINARY_NAME)"
  warn "请改为源码构建：参考 README 的『源码构建』章节"
  exit 1
fi

step "3/4 生成配置"
if [ ! -f "$APP_DIR/.env" ]; then
  JWT=$(openssl rand -hex 32 2>/dev/null || cat /dev/urandom | tr -dc 'a-f0-9' | head -c 64)
  SALT=$(openssl rand -hex 16 2>/dev/null || cat /dev/urandom | tr -dc 'a-f0-9' | head -c 32)
  cat > "$APP_DIR/.env" <<EOF
# GitHub Alt Manager 配置（首次生成，请勿泄露）
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
EOF
  info ".env 已生成（端口 $PORT）"
else
  info ".env 已存在，跳过生成"
fi

step "4/4 启动服务"
# 尝试用 systemd
if command -v systemctl >/dev/null 2>&1 && [ "$(id -u)" = "0" ]; then
  info "检测到 systemd，安装为系统服务..."
  cat > /etc/systemd/system/$APP_NAME.service <<EOF
[Unit]
Description=GitHub Alt Manager
After=network.target

[Service]
Type=simple
WorkingDirectory=$APP_DIR
EnvironmentFile=$APP_DIR/.env
ExecStart=$APP_DIR/$APP_NAME
Restart=on-failure
RestartSec=5
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
EOF
  systemctl daemon-reload
  systemctl enable --now $APP_NAME
  sleep 2
  info "服务已启动（systemd）"
  systemctl status $APP_NAME --no-pager -l | head -12
else
  warn "未检测到 systemd 或非 root，以前台方式运行（建议用 nohup/screen/tmux 守护）"
  warn "示例: cd $APP_DIR && nohup ./$APP_NAME > app.log 2>&1 &"
  echo ""
  info "现在前台启动（按 Ctrl+C 退出）..."
  source ./.env 2>/dev/null || true
  exec ./$APP_NAME
fi

echo ""
PUBLIC_IP=$(curl -s --max-time 3 ifconfig.me 2>/dev/null || echo "SERVER_IP")
echo -e "${GREEN}========================================================${NC}"
echo -e "${GREEN}  部署完成！${NC}"
echo -e "${GREEN}  访问: http://$PUBLIC_IP:$PORT${NC}"
echo -e "${GREEN}  首次打开需设置主密码（用于加密 token/密码）${NC}"
echo -e "${GREEN}========================================================${NC}"
