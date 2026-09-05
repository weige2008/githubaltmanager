# GitHub Alt Manager — 维护约定

## HANDOFF.md 同步规则（每次更新必做）

`HANDOFF.md`（工作区根目录）是本项目的交接/运维文档，包含部署服务器信息和 GitHub Token 等明文凭据。

每次更新本项目（改代码、发版、改部署、换服务器、换 Token）时，必须同步更新 `HANDOFF.md`：

1. **§2 凭据与访问**：服务器 IP/端口/密码、GitHub Token 有任何变化立即更新；新 Token 替换旧 Token 时，同时更新 §6.3 发布脚本示例中的 Token。
2. **文档头部**：更新「更新时间」和「当前版本」（发版时）。
3. **§8 版本历史**：每次发版追加一行。
4. **§5 陷阱清单 / §7 安全审查**：踩到新坑或做了安全加固时补充。

## 安全红线

- `HANDOFF.md` 含明文凭据，已被 `.gitignore` 排除：**严禁 `git add` / `commit` / `push`**，严禁粘贴到 issue、PR、聊天记录等任何公开场所。
- 本仓库的 GitHub 端（weige2008/githubaltmanager）是公开仓库，任何凭据进入 git 历史即视为泄露，需要立即轮换。

## 项目要点速查

- 版本唯一源：`frontend/package.json` 的 `version`；发版走 GitHub API 建 release（勿用 gh CLI），Actions 自动构建 5 平台 + SHA256SUMS.txt。
- 部署/构建在服务器上进行（详见 HANDOFF.md §6.2）。
- 详细的陷阱清单、架构说明、操作手册以 `HANDOFF.md` 为准，动当前先读它。
