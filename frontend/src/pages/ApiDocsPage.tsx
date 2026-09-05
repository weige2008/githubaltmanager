import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/input'
import { CopyButton } from '@/components/ui/copy-button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { KeyRound, FileText, List, Terminal, ChevronDown, ChevronRight, Play, Loader2, AlertTriangle } from 'lucide-react'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ParamField {
  name: string
  desc: string
  sample?: string
}

interface Endpoint {
  method: Method
  path: string
  summary: string
  detail: string
  danger?: string
  pathParams?: ParamField[]
  query?: ParamField[]
  bodyExample?: unknown
}

interface EndpointGroup {
  key: string
  endpoints: Endpoint[]
}

const methodStyle: Record<Method, string> = {
  GET: 'bg-success/10 text-success',
  POST: 'bg-primary/10 text-primary',
  PUT: 'bg-warning/10 text-warning',
  DELETE: 'bg-destructive/10 text-destructive',
}

// 与 backend/internal/api/router.go 及各 Register*Routes 保持一致
const GROUPS: EndpointGroup[] = [
  {
    key: 'groupHealth',
    endpoints: [
      {
        method: 'GET', path: '/healthz', summary: '健康检查',
        detail: '无需认证。返回 {ok:true, service:"githubaltmanager", ts:服务器时间戳}。适合做探活、监控与 systemd/Docker 健康检查。',
      },
      {
        method: 'GET', path: '/api/health', summary: '健康检查（别名）',
        detail: '与 /healthz 完全相同，仅是历史别名。',
      },
    ],
  },
  {
    key: 'groupAuth',
    endpoints: [
      {
        method: 'GET', path: '/api/auth/status', summary: '是否已初始化',
        detail: '无需认证。返回 {isInitialized:boolean}：false 表示首次部署尚未设置主密码，应先调用 /auth/setup；true 则走 /auth/login。',
      },
      {
        method: 'POST', path: '/api/auth/setup', summary: '首次初始化设置主密码',
        detail: '仅在系统未初始化时可用（重复调用返回 400）。主密码 ≥12 位，以 Argon2id 哈希存库；成功后自动登录并返回 JWT。受限流保护（每 IP 每分钟 10 次）。',
        bodyExample: { masterPassword: 'your-password-at-least-12-chars' },
      },
      {
        method: 'POST', path: '/api/auth/login', summary: '登录获取 JWT',
        detail: '校验主密码，成功则派生 AES-256 密钥解锁数据库中的加密字段，并签发 7 天有效的 JWT（HS256）。后续请求放 Authorization: Bearer <token>。密码错误返回 401。限流同上。',
        bodyExample: { masterPassword: 'your-master-password' },
      },
      {
        method: 'POST', path: '/api/auth/change-password', summary: '修改主密码',
        detail: '验证旧密码后更换主密码；所有账户的 token/密码/恢复邮箱会用新密钥重新加密，任一账户失败则整体回滚、不落任何写入。需要认证。新密码 ≥12 位。',
        danger: '将立即更换主密码，且所有加密字段会重新加密',
        bodyExample: { oldPassword: 'old-password', newPassword: 'new-password-at-least-12' },
      },
    ],
  },
  {
    key: 'groupAccounts',
    endpoints: [
      {
        method: 'GET', path: '/api/accounts', summary: '账户列表',
        detail: '返回全部未删除账户。敏感字段已掩码：token/密码/邮箱不会出现在响应中，仅有 token_masked/recovery_masked/has_password。?group= 可按分组过滤；排序、置顶由前端本地处理。',
        query: [{ name: 'group', desc: '按分组名过滤，缺省返回全部', sample: '' }],
      },
      {
        method: 'GET', path: '/api/accounts/:id', summary: '账户详情',
        detail: '返回单个账户（敏感字段掩码）。与列表接口字段一致。',
        pathParams: [{ name: 'id', desc: '账户 ID（列表接口返回的 id）', sample: '1' }],
      },
      {
        method: 'GET', path: '/api/accounts/:id/secrets', summary: '解密查看账户密钥',
        detail: '解密并返回该账户的明文 GitHub token、密码、恢复邮箱，用于复制导出。服务重启后主密钥未解锁时返回错误。请勿把此接口暴露给不受信的脚本。',
        pathParams: [{ name: 'id', desc: '账户 ID', sample: '1' }],
      },
      {
        method: 'POST', path: '/api/accounts/import', summary: '导入账户（GitHub token）',
        detail: '提交 personal access token，后端先调 GitHub /user 验证有效性并读取用户名/头像/scope，再加密入库。若同名账户正在回收站中，则直接恢复并更新 token。password/recovery_email/note/group 均可选。',
        bodyExample: { token: 'ghp_xxxxxxxxxxxxxxxxxxxx', password: '', recovery_email: '', note: '备注名', group: '备用' },
      },
      {
        method: 'PUT', path: '/api/accounts/:id', summary: '更新账户信息',
        detail: '局部更新：note 与 group 传空字符串表示清空；password 与 recovery_email 仅在传入非空值时更新（不支持置空，需清空请走数据库）。任意字段省略则不修改。',
        pathParams: [{ name: 'id', desc: '账户 ID', sample: '1' }],
        bodyExample: { note: '新备注', group: '主号' },
      },
      {
        method: 'DELETE', path: '/api/accounts/:id', summary: '删除账户（进回收站）',
        detail: '软删除：deleted_at 置位进入回收站，并同时停用该账户名下的全部定时任务。保留期内可在回收站恢复（恢复会重新启用任务）。超过保留期后由清理任务永久删除。',
        pathParams: [{ name: 'id', desc: '账户 ID', sample: '1' }],
        danger: '该账户将进入回收站，其定时任务立即停用',
      },
      {
        method: 'POST', path: '/api/accounts/:id/restore', summary: '从回收站恢复',
        detail: '清除 deleted_at，并重新启用该账户名下全部定时任务。',
        pathParams: [{ name: 'id', desc: '账户 ID', sample: '1' }],
      },
      {
        method: 'POST', path: '/api/accounts/:id/check', summary: '检测账户封禁状态',
        detail: '对该账户执行封禁检测：并发请求 GitHub API /user 与抓取 github.com/<login> 主页，任一判定异常即为 banned；401 bad credentials 判为 token_expired。结果与原因写库并返回。每次检测消耗上游 API 配额。',
        pathParams: [{ name: 'id', desc: '账户 ID', sample: '1' }],
      },
      {
        method: 'POST', path: '/api/accounts/batch-check', summary: '批量检测（按 ID）',
        detail: '对 ids（最多 100 个）逐个同步执行封禁检测并返回逐条结果。账户较多时整个请求可能耗时数分钟（前端 300 秒超时后后端仍会跑完）。',
        bodyExample: { ids: [1, 2, 3] },
      },
      {
        method: 'POST', path: '/api/accounts/batch-check-group', summary: '批量检测（按分组）',
        detail: '对某分组内全部账户执行封禁检测；group 留空 = 全部账户。返回 results 与 total。',
        bodyExample: { group: '备用' },
      },
      {
        method: 'GET', path: '/api/accounts/groups', summary: '分组列表',
        detail: '返回全部已使用的分组名（去重、排除空字符串），供分组筛选使用。',
      },
      {
        method: 'GET', path: '/api/accounts/:id/repos', summary: '账户的仓库缓存',
        detail: '返回该账户的仓库本地缓存列表，不会实时请求 GitHub。需要最新数据请先调用 repos/refresh。',
        pathParams: [{ name: 'id', desc: '账户 ID', sample: '1' }],
      },
      {
        method: 'POST', path: '/api/accounts/:id/repos/refresh', summary: '同步 GitHub 仓库',
        detail: '从 GitHub 拉取该 token 可见的全部仓库（个人 + 组织 + 协作，自动翻页）并 upsert 入库，完成后自动扫描各仓库 workflow。返回同步总数。',
        pathParams: [{ name: 'id', desc: '账户 ID', sample: '1' }],
      },
      {
        method: 'POST', path: '/api/accounts/:id/scan-workflows', summary: '扫描 workflow',
        detail: '遍历该账户全部（跳过 archived/disabled）仓库，拉取 workflow 定义与最近一次运行状态并入库。仓库多时耗时较长。',
        pathParams: [{ name: 'id', desc: '账户 ID', sample: '1' }],
      },
      {
        method: 'GET', path: '/api/accounts/recycle-bin', summary: '回收站列表',
        detail: '返回全部软删除的账户。',
      },
      {
        method: 'DELETE', path: '/api/accounts/recycle-bin/:id', summary: '永久删除（回收站）',
        detail: '连同该账户的仓库/workflow/定时任务记录一起物理删除。不可恢复。',
        pathParams: [{ name: 'id', desc: '账户 ID', sample: '1' }],
        danger: '账户及其关联数据将被物理删除，不可恢复',
      },
      {
        method: 'POST', path: '/api/accounts/recycle-bin/clean', summary: '清理过期回收站',
        detail: '立即永久删除 deleted_at 早于保留期（默认 30 天，设置页可改）的全部账户。返回清理截止日期。',
        danger: '超过保留期的账户将被物理删除，不可恢复',
      },
    ],
  },
  {
    key: 'groupRepos',
    endpoints: [
      {
        method: 'GET', path: '/api/repos/:id/contents', summary: '浏览仓库目录',
        detail: '列出目录内容。path 为相对仓库根的路径（留空 = 根目录），ref 缺省使用仓库默认分支。:id 是本地仓库记录 ID（accounts/:id/repos 返回的 id，非 GitHub ID）。',
        pathParams: [{ name: 'id', desc: '仓库记录 ID', sample: '1' }],
        query: [
          { name: 'path', desc: '目录路径，留空为根目录', sample: '' },
          { name: 'ref', desc: '分支/标签，留空为默认分支', sample: '' },
        ],
      },
      {
        method: 'GET', path: '/api/repos/:id/file', summary: '读取文件',
        detail: '读取单个文件，返回 GitHub contents 对象：path、sha、content（base64）、encoding。前端在线编辑即基于此。',
        pathParams: [{ name: 'id', desc: '仓库记录 ID', sample: '1' }],
        query: [
          { name: 'path', desc: '文件路径（必填）', sample: 'README.md' },
          { name: 'ref', desc: '分支/标签，留空为默认分支', sample: '' },
        ],
      },
      {
        method: 'PUT', path: '/api/repos/:id/file', summary: '创建/修改文件',
        detail: '通过 Contents API 提交文件。content 为 base64 编码；message 为 commit message（必填）；branch 缺省默认分支。文件已存在时后端自动取当前 sha 完成更新。返回新的 commit sha。',
        pathParams: [{ name: 'id', desc: '仓库记录 ID', sample: '1' }],
        danger: '会向真实仓库提交一次 commit',
        bodyExample: { path: 'README.md', content: 'IyBIZWxsbwo=', message: 'docs: update readme' },
      },
      {
        method: 'GET', path: '/api/repos/:id/workflows', summary: 'workflow 列表（缓存）',
        detail: '返回本地缓存的 workflow 列表（path/filename/name/state/最近运行状态）。数据来自 repos/refresh 或 scan-workflows。',
        pathParams: [{ name: 'id', desc: '仓库记录 ID', sample: '1' }],
      },
      {
        method: 'POST', path: '/api/repos/:id/workflows', summary: '创建 workflow 文件',
        detail: '在仓库 .github/workflows/ 下创建新文件。filename 只能是纯文件名（必须 .yml/.yaml 结尾，不允许路径分隔符与 ..）；content 为 base64；commit_message 缺省自动生成。',
        pathParams: [{ name: 'id', desc: '仓库记录 ID', sample: '1' }],
        danger: '会向真实仓库提交 workflow 文件',
        bodyExample: { filename: 'keepalive.yml', content: 'bmFtZTogS2VlcCBBbGl2ZQo=', commit_message: 'ci: add keepalive' },
      },
      {
        method: 'POST', path: '/api/repos/:id/dispatch', summary: '触发 workflow',
        detail: '触发 workflow_dispatch 事件。filename 为 workflow 文件名；ref 缺省默认分支；inputs 键值对需与 workflow 定义的 inputs 匹配（可先用 workflow-inputs 接口查询定义）。workflow 必须包含 workflow_dispatch 触发器。',
        pathParams: [{ name: 'id', desc: '仓库记录 ID', sample: '1' }],
        danger: '将真实触发一次 GitHub Actions 运行',
        bodyExample: { filename: 'keepalive.yml', ref: 'main', inputs: {} },
      },
      {
        method: 'GET', path: '/api/repos/:id/workflow-inputs', summary: '解析 workflow 参数定义',
        detail: '读取 workflow yml 并解析 workflow_dispatch.inputs 定义（名称/描述/required/default/type/choice 选项），用于动态生成触发表单。解析失败时返回空数组。',
        pathParams: [{ name: 'id', desc: '仓库记录 ID', sample: '1' }],
        query: [{ name: 'filename', desc: 'workflow 文件名（必填）', sample: 'keepalive.yml' }],
      },
    ],
  },
  {
    key: 'groupRuns',
    endpoints: [
      {
        method: 'GET', path: '/api/repos/:id/runs', summary: '运行记录列表',
        detail: '返回该仓库最近的 workflow 运行记录（total_count + workflow_runs）。status：queued/in_progress/completed；conclusion：success/failure/cancelled/skipped。前端每 10 秒轮询。',
        pathParams: [{ name: 'id', desc: '仓库记录 ID', sample: '1' }],
        query: [{ name: 'per_page', desc: '条数，缺省 10，上限 100', sample: '20' }],
      },
      {
        method: 'GET', path: '/api/repos/:id/runs/:runId/jobs', summary: '运行的 job 列表',
        detail: '返回某次运行的全部 job，含每个 step 的 name/status/conclusion，用于渲染运行详情视图。',
        pathParams: [
          { name: 'id', desc: '仓库记录 ID', sample: '1' },
          { name: 'runId', desc: '运行 ID（runs 列表返回）', sample: '1234567890' },
        ],
      },
      {
        method: 'GET', path: '/api/repos/:id/runs/:runId/logs', summary: '运行日志下载地址',
        detail: '返回该次运行完整日志（zip）的下载 URL。该 URL 来自 GitHub 302 重定向，为有时效的签名地址，请获取后尽快使用。',
        pathParams: [
          { name: 'id', desc: '仓库记录 ID', sample: '1' },
          { name: 'runId', desc: '运行 ID', sample: '1234567890' },
        ],
      },
      {
        method: 'GET', path: '/api/repos/:id/runs/:runId/jobs/:jobId/logs', summary: '单个 job 日志',
        detail: '返回单个 job 的完整文本日志（后端已跟随 GitHub 重定向）。日志较大时响应体也较大，前端按 step 名称启发式切分展示。',
        pathParams: [
          { name: 'id', desc: '仓库记录 ID', sample: '1' },
          { name: 'runId', desc: '运行 ID', sample: '1234567890' },
          { name: 'jobId', desc: 'Job ID（jobs 列表返回）', sample: '12345678901' },
        ],
      },
      {
        method: 'POST', path: '/api/repos/:id/runs/:runId/cancel', summary: '取消运行',
        detail: '请求 GitHub 取消该次运行。只有 queued/in_progress/waiting 状态可取消，已完成运行返回错误。',
        pathParams: [
          { name: 'id', desc: '仓库记录 ID', sample: '1' },
          { name: 'runId', desc: '运行 ID', sample: '1234567890' },
        ],
        danger: '将真实取消一次运行中的 Actions 运行',
      },
    ],
  },
  {
    key: 'groupTasks',
    endpoints: [
      {
        method: 'GET', path: '/api/tasks', summary: '定时任务列表',
        detail: '返回全部定时任务：cron 表达式、下次执行时间（next_run_at）、最近执行结果（success/failed/running）与错误信息。',
      },
      {
        method: 'POST', path: '/api/tasks', summary: '创建定时任务',
        detail: '创建 workflow_dispatch 定时触发任务。cron_expr 为 5 段表达式（分 时 日 月 周）；ref 缺省 main；inputs_json 为 {"参数名":"值"} 的 JSON 字符串。后端调度器每 30 秒扫描一次，到期即触发，创建后立即计算 next_run_at。',
        bodyExample: { account_id: 1, repository_id: 1, workflow_filename: 'keepalive.yml', ref: 'main', cron_expr: '0 */6 * * *', enabled: true },
      },
      {
        method: 'PUT', path: '/api/tasks/:id', summary: '更新定时任务',
        detail: '局部更新 ref/cron_expr/inputs_json/enabled/workflow_filename；修改 cron 或 enabled 后自动重算 next_run_at（禁用时清空）。',
        pathParams: [{ name: 'id', desc: '任务 ID', sample: '1' }],
        bodyExample: { cron_expr: '0 0 * * *' },
      },
      {
        method: 'DELETE', path: '/api/tasks/:id', summary: '删除定时任务',
        detail: '物理删除任务记录。',
        pathParams: [{ name: 'id', desc: '任务 ID', sample: '1' }],
        danger: '任务记录将被删除，不可恢复',
      },
      {
        method: 'POST', path: '/api/tasks/:id/toggle', summary: '启用/禁用任务',
        detail: '切换 enabled；禁用时清空 next_run_at，重新启用时立即重算。请求体 {"enabled": true|false}。',
        pathParams: [{ name: 'id', desc: '任务 ID', sample: '1' }],
        bodyExample: { enabled: false },
      },
      {
        method: 'POST', path: '/api/tasks/:id/run', summary: '立即执行一次',
        detail: '异步触发一次执行（不等结果）。执行状态可在任务列表的 last_run_result 看到：running → success/failed。需要认证与密钥已解锁。',
        pathParams: [{ name: 'id', desc: '任务 ID', sample: '1' }],
      },
    ],
  },
  {
    key: 'groupBatch',
    endpoints: [
      {
        method: 'POST', path: '/api/batch/create-workflows', summary: '批量创建 workflow',
        detail: '对 repo_ids（≤100）逐个提交同一 workflow 文件，同步串行执行；content 为 base64。返回 success/failed 明细，failed 中的 repo_id 可单独重试。',
        danger: '将向选中的每个仓库真实提交文件',
        bodyExample: { repo_ids: [1, 2], filename: 'keepalive.yml', content: 'bmFtZTogS2VlcCBBbGl2ZQo=', commit_message: 'ci: add keepalive' },
      },
      {
        method: 'POST', path: '/api/batch/dispatch', summary: '批量触发 workflow',
        detail: '对 repo_ids 逐个触发 workflow_dispatch。注意 repo_ids 数组总长 ≤100：前端"每个仓库触发次数"就是把 ids 重复 N 份传入实现多次触发。',
        danger: '将真实触发最多 100 次 Actions 运行',
        bodyExample: { repo_ids: [1, 2, 3], filename: 'keepalive.yml', ref: 'main', inputs: {} },
      },
      {
        method: 'POST', path: '/api/batch/create-repos', summary: '批量创建仓库',
        detail: '为 account_ids（≤100 个账户）各创建 count（1-50，缺省 1）个仓库，count>1 时仓库名追加 -1、-2…。files 为 [{path, content(base64)}]，secrets 为 [{name, value}]（用 repo public key 加密后写入）。全部同步串行执行，量大时耗时数分钟。',
        danger: '将在每个账户名下真实创建仓库并写入文件/secrets',
        bodyExample: { account_ids: [1, 2], repo_name: 'my-repo', description: '', private: true, count: 1, files: [{ path: 'README.md', content: 'aGVsbG8=' }], secrets: [] },
      },
      {
        method: 'POST', path: '/api/batch/fetch-template', summary: '拉取模板仓库文件',
        detail: '通过 git tree 递归接口拉取模板仓库全部 blob（上限 500 个文件，单文件 ≤1MB，超出直接报错），返回 base64 内容。通常先调本接口预览，再把 files 传给 create-repos。',
        bodyExample: { account_id: 1, owner: 'some-user', repo: 'template-repo', ref: '' },
      },
      {
        method: 'POST', path: '/api/batch/update-repos', summary: '批量同步模板（清空重写）',
        detail: '对 repo_ids（≤100）逐个执行：拉取目标仓库文件树 → 逐个删除全部现有文件 → 从模板仓库复制全部文件。每个文件 2 次上游请求且删除逐个进行，仓库大时非常慢。目标仓库原内容不可恢复。',
        danger: '目标仓库的全部现有文件将被删除并用模板覆盖，不可恢复',
        bodyExample: { repo_ids: [1, 2], template_owner: 'some-user', template_repo: 'template-repo', template_ref: '' },
      },
      {
        method: 'POST', path: '/api/batch/toggle-visibility', summary: '批量切换可见性',
        detail: '把 repo_ids 全部切换为 is_private 指定的状态（public ↔ private），并同步本地缓存。不修改任何文件。',
        danger: '将真实修改仓库的公有/私有状态',
        bodyExample: { repo_ids: [1, 2], is_private: true },
      },
    ],
  },
  {
    key: 'groupAutoTask',
    endpoints: [
      {
        method: 'GET', path: '/api/autotask', summary: '读取自动任务配置',
        detail: '返回自动检测/自动同步的开关与间隔（分钟）、分组过滤、回收站配置，以及各项上次执行时间。未初始化时返回默认值。',
      },
      {
        method: 'PUT', path: '/api/autotask', summary: '更新自动任务配置',
        detail: '更新配置。间隔单位为分钟（缺省/非法值回落 1440）；auto_check_groups / auto_sync_groups 为逗号分隔的分组名，留空 = 全部分组；recycle_bin_days 为回收站保留天数。修改由 30 秒轮询的调度器在下一轮生效。',
        bodyExample: { auto_check_enabled: true, auto_check_interval: 60, auto_sync_enabled: true, auto_sync_interval: 60, auto_check_groups: '', auto_sync_groups: '', recycle_bin_enabled: true, recycle_bin_days: 30 },
      },
      {
        method: 'POST', path: '/api/autotask/check-now', summary: '立即自动检测',
        detail: '异步触发一轮全量（或分组内）封禁检测，立即返回 ok。包级锁防并发：上一轮未跑完时本次跳过。执行进度看 /autotask/running 与 /autotask/logs。',
      },
      {
        method: 'POST', path: '/api/autotask/sync-now', summary: '立即自动同步',
        detail: '异步触发一轮仓库同步，行为同 check-now（互不阻塞，但同类任务防并发）。',
      },
      {
        method: 'GET', path: '/api/autotask/logs', summary: '自动任务执行日志',
        detail: '返回最近的执行日志（task_type: check/sync，status: running/success/failed，含总数/成功/失败/耗时/明细文本）。limit ≤200，缺省 50。',
        query: [{ name: 'limit', desc: '返回条数，缺省 50', sample: '20' }],
      },
      {
        method: 'GET', path: '/api/autotask/running', summary: '正在运行的自动任务',
        detail: '返回 {running:boolean, task?:日志对象}，前端用 5 秒轮询展示进行中的检测/同步。',
      },
    ],
  },
  {
    key: 'groupStats',
    endpoints: [
      {
        method: 'GET', path: '/api/stats/overview', summary: '仪表盘统计',
        detail: '返回汇总：账户总数与各状态数（active/banned/token_expired/error/unknown，均排除回收站）、仓库数、workflow 数、任务数与启用任务数。无参数。',
      },
    ],
  },
  {
    key: 'groupApiKeys',
    endpoints: [
      {
        method: 'GET', path: '/api/apikeys', summary: 'API Key 列表',
        detail: '返回全部密钥，但只含 key_prefix（前 14 位），不含完整密钥与哈希。',
      },
      {
        method: 'POST', path: '/api/apikeys', summary: '创建 API Key',
        detail: '生成 gam_ + 64 位 hex 的密钥。完整明文只在本次响应中返回一次，服务端仅存 SHA-256 哈希。expires_in_days 为 0 或缺省表示永不过期。创建后无法再次查看完整密钥。',
        bodyExample: { name: 'CI 脚本', expires_in_days: 0 },
      },
      {
        method: 'DELETE', path: '/api/apikeys/:id', summary: '删除 API Key',
        detail: '物理删除密钥记录。正在使用该密钥的脚本会立即收到 401。',
        pathParams: [{ name: 'id', desc: '密钥 ID', sample: '1' }],
        danger: '密钥立即失效，使用它的脚本将 401',
      },
      {
        method: 'PUT', path: '/api/apikeys/:id/toggle', summary: '启用/禁用 API Key',
        detail: '切换 enabled 状态。禁用后该密钥立即无法通过认证（验证时过滤 enabled=true），可随时重新启用。',
        pathParams: [{ name: 'id', desc: '密钥 ID', sample: '1' }],
      },
    ],
  },
  {
    key: 'groupSystem',
    endpoints: [
      {
        method: 'GET', path: '/api/system/version', summary: '当前版本',
        detail: '返回 current（构建时由 -ldflags 注入，本地 go run 为 dev）、runtime.GOOS 与 GOARCH。',
      },
      {
        method: 'GET', path: '/api/system/check-update', summary: '检查更新',
        detail: '查询 GitHub latest release，与当前版本做字符串比较（非语义化比较）返回 has_update、release 页面地址与 release notes。网络不可达时返回 has_update:false 与 error。',
      },
      {
        method: 'POST', path: '/api/system/update', summary: '自更新',
        detail: '下载与本机平台匹配的 release 二进制（≤200MB）→ SHA256SUMS.txt 校验 → 写临时文件并原子替换当前二进制（保留 .old）→ 进程退出，由 systemd 自动拉起新版本。服务会中断数秒；Docker/裸跑场景不建议使用。',
        danger: '服务将下载新二进制并自动重启，期间短暂中断',
      },
    ],
  },
]

const EXAMPLES: { title: string; code: string }[] = [
  {
    title: '查看统计',
    code: `curl -s "http://localhost:19527/api/stats/overview" \\\n  -H "X-API-Key: gam_xxxxxxxxxxxxxxxx"`,
  },
  {
    title: '导入账户',
    code: `curl -X POST "http://localhost:19527/api/accounts/import" \\\n  -H "X-API-Key: gam_xxxxxxxxxxxxxxxx" \\\n  -H "Content-Type: application/json" \\\n  -d '{"token":"ghp_xxx","group":"备用","note":"备注"}'`,
  },
  {
    title: '批量触发工作流',
    code: `curl -X POST "http://localhost:19527/api/batch/dispatch" \\\n  -H "X-API-Key: gam_xxxxxxxxxxxxxxxx" \\\n  -H "Content-Type: application/json" \\\n  -d '{"repo_ids":[1,2,3],"filename":"keepalive.yml"}'`,
  },
  {
    title: '批量创建仓库',
    code: `curl -X POST "http://localhost:19527/api/batch/create-repos" \\\n  -H "X-API-Key: gam_xxxxxxxxxxxxxxxx" \\\n  -H "Content-Type: application/json" \\\n  -d '{"account_ids":[1,2],"repo_name":"my-repo","private":true,\n       "files":[{"path":"README.md","content":"aGVsbG8="}],\n       "secrets":[{"name":"TOKEN","value":"xxx"}]}'`,
  },
]

function MethodBadge({ method }: { method: Method }) {
  return (
    <span className={cn('inline-flex w-16 shrink-0 justify-center rounded px-1.5 py-0.5 font-mono text-[11px] font-bold', methodStyle[method])}>
      {method}
    </span>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="group relative rounded-md border bg-muted/30">
      <pre className="overflow-x-auto p-3 pr-12 text-xs leading-relaxed">{code}</pre>
      <CopyButton
        value={code}
        variant="ghost"
        size="icon"
        className="absolute right-1.5 top-1.5 h-7 w-7"
        onCopy={() => toast.success('已复制')}
      />
    </div>
  )
}

function ParamInputs({
  fields,
  values,
  onChange,
}: {
  fields: ParamField[]
  values: Record<string, string>
  onChange: (name: string, v: string) => void
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {fields.map((f) => (
        <div key={f.name} className="space-y-1">
          <label className="font-mono text-xs font-medium">
            {f.name}
            <span className="ml-2 font-sans font-normal text-muted-foreground">{f.desc}</span>
          </label>
          <Input
            value={values[f.name] ?? ''}
            onChange={(e) => onChange(f.name, e.target.value)}
            placeholder={f.sample || f.name}
            className="h-8 font-mono text-xs"
          />
        </div>
      ))}
    </div>
  )
}

interface TestResult {
  status: number
  statusText: string
  ms: number
  text: string
}

function EndpointTester({ ep }: { ep: Endpoint }) {
  const { t } = useTranslation()
  const [pp, setPp] = useState<Record<string, string>>(() =>
    Object.fromEntries((ep.pathParams || []).map((f) => [f.name, f.sample || '']))
  )
  const [qp, setQp] = useState<Record<string, string>>({})
  const [bodyText, setBodyText] = useState<string>(() =>
    ep.bodyExample !== undefined ? JSON.stringify(ep.bodyExample, null, 2) : ''
  )
  const [result, setResult] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const hasPathParams = (ep.pathParams || []).length > 0
  const missingParam = (ep.pathParams || []).some((f) => !(pp[f.name] ?? '').trim())

  const buildUrl = () => {
    let p = ep.path
    for (const f of ep.pathParams || []) {
      const v = (pp[f.name] || '').trim()
      p = p.replace(`:${f.name}`, v ? encodeURIComponent(v) : `:${f.name}`)
    }
    const qs = Object.entries(qp)
      .filter(([, v]) => v.trim() !== '')
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&')
    return p + (qs ? `?${qs}` : '')
  }

  const buildCurl = () => {
    const url = `${location.origin}${buildUrl()}`
    const lines = [`curl -X ${ep.method} "${url}"`]
    if (ep.method !== 'GET') lines.push(`  -H "Content-Type: application/json"`)
    lines.push(`  -H "Authorization: Bearer <jwt_token>"   # 或 -H "X-API-Key: gam_xxx"`)
    if (ep.method !== 'GET' && bodyText.trim()) lines.push(`  -d '${bodyText.replace(/\n\s*/g, ' ')}'`)
    return lines.join(' \\\n')
  }

  const send = async () => {
    setError('')
    if (hasPathParams && missingParam) {
      setError(t('apiDocs.fillPathParams'))
      return
    }
    let body: string | undefined
    if (ep.method !== 'GET' && bodyText.trim()) {
      try { JSON.parse(bodyText) } catch {
        setError(t('apiDocs.invalidJson'))
        return
      }
      body = bodyText
    }
    if (ep.danger && !confirm(`${t('apiDocs.dangerConfirm')}\n\n${ep.danger}\n\n${ep.method} ${buildUrl()}`)) return

    const token = localStorage.getItem('gam_token') || ''
    const headers: Record<string, string> = {}
    if (token) headers['Authorization'] = `Bearer ${token}`
    if (body !== undefined) headers['Content-Type'] = 'application/json'

    setLoading(true)
    setResult(null)
    const started = performance.now()
    try {
      const res = await fetch(buildUrl(), { method: ep.method, headers, body })
      const raw = await res.text()
      let pretty = raw
      try { pretty = JSON.stringify(JSON.parse(raw), null, 2) } catch { /* 保留原文（如日志文本） */ }
      setResult({ status: res.status, statusText: res.statusText, ms: Math.round(performance.now() - started), text: pretty || '(empty)' })
    } catch (e: unknown) {
      setError((e as Error)?.message || 'request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3 rounded-md border border-primary/20 bg-primary/[0.03] p-3">
      <p className="text-xs text-muted-foreground">{t('apiDocs.realCallNote')}</p>

      {/* URL 预览 */}
      <div className="flex items-center gap-2 rounded-md border bg-muted/30 px-2.5 py-1.5">
        <MethodBadge method={ep.method} />
        <code className="flex-1 truncate font-mono text-xs">{buildUrl()}</code>
        <CopyButton value={`${location.origin}${buildUrl()}`} variant="ghost" size="icon" className="h-6 w-6" onCopy={() => toast.success('已复制')} />
      </div>

      {hasPathParams && (
        <ParamInputs fields={ep.pathParams!} values={pp} onChange={(n, v) => setPp((prev) => ({ ...prev, [n]: v }))} />
      )}
      {(ep.query || []).length > 0 && (
        <ParamInputs fields={ep.query!} values={qp} onChange={(n, v) => setQp((prev) => ({ ...prev, [n]: v }))} />
      )}

      {ep.method !== 'GET' && (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium">{t('apiDocs.bodyParams')}</label>
            {ep.bodyExample !== undefined && (
              <button className="text-xs text-primary hover:underline" onClick={() => setBodyText(JSON.stringify(ep.bodyExample, null, 2))}>
                reset
              </button>
            )}
          </div>
          <Textarea rows={6} value={bodyText} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBodyText(e.target.value)} className="font-mono text-xs" />
        </div>
      )}

      {error && <p className="text-xs font-medium text-destructive">{error}</p>}

      <div className="flex items-center gap-2">
        <Button size="sm" onClick={send} disabled={loading}>
          {loading ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Play className="mr-1.5 h-3.5 w-3.5" />}
          {loading ? t('apiDocs.sending') : t('apiDocs.send')}
        </Button>
        {ep.danger && (
          <span className="flex items-center gap-1 text-xs font-medium text-warning">
            <AlertTriangle className="h-3.5 w-3.5" /> {ep.danger}
          </span>
        )}
      </div>

      {result && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium">{t('apiDocs.response')}:</span>
            <Badge variant={result.status < 300 ? 'success' : result.status < 500 ? 'warning' : 'destructive'} className="font-mono text-[10px]">
              {result.status} {result.statusText}
            </Badge>
            <span className="text-[10px] text-muted-foreground">{result.ms}ms</span>
          </div>
          <CodeBlock code={result.text} />
        </div>
      )}

      <details>
        <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">{t('apiDocs.curlLabel')}</summary>
        <div className="pt-1.5">
          <CodeBlock code={buildCurl()} />
        </div>
      </details>
    </div>
  )
}

function EndpointItem({ ep }: { ep: Endpoint }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={cn('border-b last:border-0', open && 'bg-muted/10')}>
      <button onClick={() => setOpen(!open)} className="flex w-full flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2 text-left text-sm transition-colors hover:bg-accent/40">
        <MethodBadge method={ep.method} />
        <code className="font-mono text-xs">{ep.path}</code>
        <span className="text-xs text-muted-foreground">{ep.summary}</span>
        <span className="ml-auto flex items-center gap-1.5">
          {ep.danger && <AlertTriangle className="h-3.5 w-3.5 text-warning" />}
          {open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
        </span>
      </button>
      {open && (
        <div className="space-y-3 px-3 pb-3">
          <p className="whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">{ep.detail}</p>
          <EndpointTester ep={ep} />
        </div>
      )}
    </div>
  )
}

export default function ApiDocsPage() {
  const { t } = useTranslation()
  const total = useMemo(() => GROUPS.reduce((n, g) => n + g.endpoints.length, 0), [])

  return (
    <div className="space-y-6">
      <PageHeader title={t('apiDocs.title')} description={t('apiDocs.description')} />

      {/* 认证方式 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <KeyRound className="h-4 w-4" /> {t('apiDocs.authTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">{t('apiDocs.authDesc')}</p>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="mb-1 text-xs font-medium">{t('apiDocs.apiKeyLabel')}</p>
              <CodeBlock code="X-API-Key: gam_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
            </div>
            <div>
              <p className="mb-1 text-xs font-medium">{t('apiDocs.jwtLabel')}</p>
              <CodeBlock code="Authorization: Bearer <jwt_token>" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {t('apiDocs.createKeyHint')} <a href="/settings" className="text-primary hover:underline">{t('nav.settings')} → API Keys →</a>
          </p>
        </CardContent>
      </Card>

      {/* 通用约定 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4" /> {t('apiDocs.conventionsTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="mb-1 text-xs font-medium">{t('apiDocs.successFormat')}</p>
              <CodeBlock code={'{\n  "ok": true,\n  "data": { ... }\n}'} />
            </div>
            <div>
              <p className="mb-1 text-xs font-medium">{t('apiDocs.errorFormat')}</p>
              <CodeBlock code={'{\n  "code": 400,\n  "error": "bad_request",\n  "message": "..."\n}'} />
            </div>
          </div>
          <p className="rounded-md border border-warning/30 bg-warning/5 p-3 text-xs text-muted-foreground">
            {t('apiDocs.rateLimitNote')}
          </p>
        </CardContent>
      </Card>

      {/* 接口列表（可展开 + 在线测试） */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <List className="h-4 w-4" /> {t('apiDocs.endpointsTitle')}
            <Badge variant="secondary" className="text-[10px]">{total}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {GROUPS.map((group) => (
            <div key={group.key}>
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-sm font-semibold">{t(`apiDocs.${group.key}`)}</h3>
                <Badge variant="secondary" className="text-[10px]">{group.endpoints.length}</Badge>
              </div>
              <div className="overflow-hidden rounded-md border">
                {group.endpoints.map((ep) => (
                  <EndpointItem key={`${ep.method} ${ep.path}`} ep={ep} />
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 调用示例 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Terminal className="h-4 w-4" /> {t('apiDocs.examplesTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {EXAMPLES.map((ex) => (
            <div key={ex.title}>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">{ex.title}</p>
              <CodeBlock code={ex.code} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
