# GitHub Alt Manager - 多阶段构建
# 构建后端 Go 二进制 + 前端静态文件，产出单一镜像
#
# 构建: docker build -t githubaltmanager:latest .
# 运行: docker run -d --name gam \
#         -p 8080:8080 \
#         -v gam-data:/app/data \
#         -e GAM_JWT_SECRET=$(openssl rand -hex 32) \
#         -e GAM_MASTER_SALT=$(openssl rand -hex 16) \
#         githubaltmanager:latest

# ============ Stage 1: 构建后端 ============
FROM golang:1.21-alpine AS backend-builder
WORKDIR /build
RUN apk add --no-cache gcc musl-dev
COPY backend/go.mod backend/go.sum* ./
RUN go mod download
COPY backend/ ./
RUN CGO_ENABLED=1 GOOS=linux go build -ldflags="-s -w" -o /out/server ./cmd/server

# ============ Stage 2: 构建前端 ============
FROM node:20-alpine AS frontend-builder
WORKDIR /build
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci || npm install
COPY frontend/ ./
RUN npm run build

# ============ Stage 3: 运行时 ============
FROM alpine:3.20
RUN apk add --no-cache ca-certificates tzdata nginx
WORKDIR /app

# 后端二进制
COPY --from=backend-builder /out/server /app/server
# 前端构建产物（nginx 直接托管）
COPY --from=frontend-builder /build/dist /app/frontend/dist
COPY deploy/nginx-docker.conf /etc/nginx/http.d/default.conf

ENV GAM_HOST=127.0.0.1 \
    GAM_PORT=8080 \
    GAM_DB_PATH=/app/data/githubaltmanager.db \
    GAM_ENV=prod

RUN mkdir -p /app/data && adduser -D -u 1000 gam && chown -R gam:gam /app
USER gam

# nginx 监听 80，后端 8080；容器对外暴露 80
EXPOSE 80

# 启动：后端 + nginx
CMD ["sh", "-c", "/app/server & nginx -g 'daemon off;'"]
