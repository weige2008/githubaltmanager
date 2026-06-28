@echo off
REM ============================================================
REM GitHub Alt Manager - Windows 快速部署脚本
REM
REM 用法：在 PowerShell 或 CMD 中执行
REM    powershell -ExecutionPolicy Bypass -File deploy.ps1
REM ============================================================
$ErrorActionPreference = "Stop"

$AppName = "githubaltmanager"
$AppDir  = "$PWD\githubaltmanager"
$Port    = if ($env:GAM_PORT) { $env:GAM_PORT } else { "19527" }
$Repo    = "weige2008/githubaltmanager"

# 检测架构
$Arch = if ([Environment]::Is64BitOperatingSystem) { "amd64" } else { "amd64" }
Write-Host "[INFO] 检测到系统: windows/$Arch"

# 创建目录
Write-Host "==== 1/4 准备目录 ===="
New-Item -ItemType Directory -Path "$AppDir\data" -Force | Out-Null
Set-Location $AppDir
Write-Host "[INFO] 安装目录: $AppDir"

# 下载二进制
Write-Host "==== 2/4 下载预编译二进制 ===="
$Binary = "$AppName-windows-$Arch.exe"
$Url = "https://github.com/$Repo/releases/latest/download/$Binary"
try {
    Invoke-WebRequest -Uri $Url -OutFile "$AppName.exe" -UseBasicParsing
    Write-Host "[INFO] 下载完成"
} catch {
    Write-Host "[ERROR] 下载失败: $($_.Exception.Message)"
    Write-Host "[WARN] 请改为源码构建，参考 README 的『源码构建』章节"
    exit 1
}

# 生成配置
Write-Host "==== 3/4 生成配置 ===="
if (-not (Test-Path "$AppDir\.env")) {
    $Jwt  = -join ((1..64) | ForEach-Object { '{0:x}' -f (Get-Random -Max 16) })
    $Salt = -join ((1..32) | ForEach-Object { '{0:x}' -f (Get-Random -Max 16) })
    @"
GAM_HOST=0.0.0.0
GAM_PORT=$Port
GAM_ENV=prod
GAM_DB_PATH=$AppDir\data\githubaltmanager.db
GAM_JWT_SECRET=$Jwt
GAM_MASTER_SALT=$Salt
GAM_GH_API=https://api.github.com
GAM_GH_TIMEOUT=20
GAM_GH_CONCURRENCY=8
GAM_TZ=Asia/Shanghai
"@ | Out-File -FilePath "$AppDir\.env" -Encoding ascii
    Write-Host "[INFO] .env 已生成（端口 $Port）"
} else {
    Write-Host "[INFO] .env 已存在，跳过生成"
}

# 启动
Write-Host "==== 4/4 启动服务 ===="
Write-Host "[INFO] 前台启动（按 Ctrl+C 退出）"
Write-Host ""
Write-Host "========================================================" -ForegroundColor Green
Write-Host "  部署完成！" -ForegroundColor Green
Write-Host "  访问: http://localhost:$Port" -ForegroundColor Green
Write-Host "  首次打开需设置主密码" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
Write-Host ""
& "$AppDir\$AppName.exe"
