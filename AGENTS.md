# GitHub Alt Manager — 维护约定

## 更新发布规则（每次代码更新必做，两条腿缺一不可）

代码更新后必须**同时**完成：

1. **推送到 GitHub**：`git push` 到 `origin`（weige2008/githubaltmanager）。origin 存的是干净 URL，推送时临时使用内嵌 PAT 的 URL（沿用历史推送方式，PAT 见 HANDOFF.md §2 / 源仓库 remote 配置），不要把 PAT 写回 .git/config。
2. **同步部署到服务器**：按 `HANDOFF.md` §6.2 流程更新服务器 `/opt/githubaltmanager` 并重启验证 `/healthz`。**红线：绝不触碰用户数据**——`backend/.env`、`backend/data/`（SQLite 数据库）、账户/token 一律不动；只同步代码与构建配置文件。

远端同步完成后，如代码变更影响行为，再按需走 HANDOFF.md §6.3 发版（GitHub API 建 release）。

## 服务器操作方式（Windows 本机）

本机无 sshpass，密码 SSH 用仓库内的助手脚本：

```bash
GAM_SSH_HOST=198.44.182.98 GAM_SSH_USER=root GAM_SSH_PW='<见 HANDOFF.md §2>' \
  python scripts/remote_exec.py "命令1" "命令2"
```

- 脚本本身不含任何凭据，可提交；密码只经环境变量传入。
- SSH 会话易超时（HANDOFF.md §5.3），命令拆短、分步执行。

## HANDOFF.md 同步规则

`HANDOFF.md`（工作区根目录）是交接/运维文档，含明文凭据。以下情况必须同步更新它：

- 服务器 IP/端口/密码、GitHub Token 变化 → 更新 §2（Token 变化同时更新 §6.3 脚本示例）
- 发版 → 更新文档头部「当前版本/更新时间」+ §8 版本历史
- 踩新坑 / 安全加固 → 更新 §5 陷阱清单 / §7 安全审查

## 安全红线

- `HANDOFF.md` 已被 `.gitignore` 排除：**严禁 git add / commit / push**，严禁粘贴到 issue、PR 等公开场所。
- GitHub 端是公开仓库，任何凭据进入 git 历史即视为泄露，须立即轮换。

## 项目要点速查

- 版本唯一源：`frontend/package.json` 的 `version`；发版走 GitHub API 建 release（勿用 gh CLI），Actions 自动构建 5 平台 + SHA256SUMS.txt。
- 部署/构建在服务器上进行；本地无 Go。
- 陷阱清单、架构、操作手册以 `HANDOFF.md` 为准，动手前先读它。
