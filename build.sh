#!/usr/bin/env bash
# ============================================================
# GitHub Alt Manager - 构建脚本（在 Linux 服务器上执行）
#
# 用途：
#   1. 构建前端
#   2. 把前端产物嵌入后端（go:embed）
#   3. 交叉编译 5 个平台的单文件二进制（含前端，无需外部依赖）
#
# 产物：放到 dist-release/ 目录，文件名格式：
#   githubaltmanager-<os>-<arch>[.exe]
# ============================================================
set -e

ROOT=$(cd "$(dirname "$0")" && pwd)
FRONTEND_DIR="$ROOT/frontend"
BACKEND_DIR="$ROOT/backend"
EMBED_DIR="$BACKEND_DIR/internal/web/dist"
RELEASE_DIR="$ROOT/dist-release"
VERSION="${1:-dev}"

echo -e "\033[36m==== [1/4] 准备 ====\033[0m"
rm -rf "$RELEASE_DIR"
mkdir -p "$RELEASE_DIR"
echo "VERSION=$VERSION"

echo -e "\033[36m==== [2/4] 构建前端 ====\033[0m"
cd "$FRONTEND_DIR"
if [ ! -d node_modules ]; then
  npm ci --no-fund --no-audit --registry=https://registry.npmmirror.com || npm install --no-fund --no-audit
fi
npm run build
echo "前端构建完成: $(ls $FRONTEND_DIR/dist/index.html && echo OK)"

echo -e "\033[36m==== [3/4] 嵌入前端到后端 ====\033[0m"
rm -rf "$EMBED_DIR"
mkdir -p "$EMBED_DIR"
cp -r "$FRONTEND_DIR/dist/." "$EMBED_DIR/"
echo "已复制到 $EMBED_DIR"
ls "$EMBED_DIR" | head

echo -e "\033[36m==== [4/4] 交叉编译多平台二进制 ====\033[0m"
cd "$BACKEND_DIR"
export GOPROXY=https://goproxy.cn,direct
export CGO_ENABLED=0  # 纯 Go，无需 C 工具链

LDFLAGS="-s -w"
TARGETS=(
  "linux/amd64"
  "linux/arm64"
  "windows/amd64"
  "darwin/amd64"
  "darwin/arm64"
)

for target in "${TARGETS[@]}"; do
  GOOS="${target%%/*}"
  GOARCH="${target##*/}"
  suffix=""
  [ "$GOOS" = "windows" ] && suffix=".exe"
  out="$RELEASE_DIR/githubaltmanager-$GOOS-$GOARCH$suffix"
  echo "  → 构建 $GOOS/$GOARCH ..."
  GOOS=$GOOS GOARCH=$GOARCH go build -ldflags="$LDFLAGS" -trimpath -o "$out" ./cmd/server
  size=$(du -h "$out" | cut -f1)
  echo "    产出: $(basename $out) ($size)"
done

echo -e "\033[36m==== 生成校验和 ====\033[0m"
cd "$RELEASE_DIR"
sha256sum * > SHA256SUMS.txt
cat SHA256SUMS.txt

echo ""
echo -e "\033[32m========================================================\033[0m"
echo -e "\033[32m  构建完成！所有产物在: $RELEASE_DIR\033[0m"
ls -lh "$RELEASE_DIR"
echo -e "\033[32m========================================================\033[0m"
