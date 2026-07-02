# GitHub Alt Manager - Dockerfile
# CGO-free pure Go binary with embedded frontend
#
# Build: docker build -t githubaltmanager:latest .
# Run:   docker run -d --name gam -p 8080:8080 -v gam-data:/app/data githubaltmanager:latest

# ============ Stage 1: Build frontend ============
FROM node:20-alpine AS frontend-builder
WORKDIR /build
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci --no-fund --no-audit || npm install --no-fund --no-audit
COPY frontend/ ./
RUN npm run build

# ============ Stage 2: Build backend ============
FROM golang:1.21-alpine AS backend-builder
WORKDIR /build
COPY backend/go.mod backend/go.sum* ./
RUN go mod download
COPY backend/ ./
# Copy frontend dist into embed directory
COPY --from=frontend-builder /build/dist ./internal/web/dist
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -trimpath -o /out/server ./cmd/server

# ============ Stage 3: Runtime ============
FROM alpine:3.20
RUN apk add --no-cache ca-certificates tzdata
WORKDIR /app

COPY --from=backend-builder /out/server /app/server

ENV GAM_HOST=0.0.0.0 \
    GAM_PORT=8080 \
    GAM_DB_PATH=/app/data/githubaltmanager.db \
    GAM_ENV=prod \
    GAM_TZ=Asia/Shanghai

RUN mkdir -p /app/data
VOLUME /app/data

EXPOSE 8080

CMD ["/app/server"]
