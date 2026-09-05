import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CopyButton } from '@/components/ui/copy-button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { KeyRound, FileText, List, Terminal } from 'lucide-react'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface Endpoint {
  method: Method
  path: string
  desc: string
  auth?: boolean // false = 无需认证
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
      { method: 'GET', path: '/healthz', desc: '健康检查', auth: false },
      { method: 'GET', path: '/api/health', desc: '同上（别名）', auth: false },
    ],
  },
  {
    key: 'groupAuth',
    endpoints: [
      { method: 'GET', path: '/api/auth/status', desc: '是否已初始化（isInitialized）', auth: false },
      { method: 'POST', path: '/api/auth/setup', desc: '首次初始化，设置主密码（≥12 位）', auth: false },
      { method: 'POST', path: '/api/auth/login', desc: '登录，返回 JWT（7 天有效）', auth: false },
      { method: 'POST', path: '/api/auth/change-password', desc: '修改主密码（所有加密字段自动重加密）' },
    ],
  },
  {
    key: 'groupAccounts',
    endpoints: [
      { method: 'GET', path: '/api/accounts', desc: '账户列表（?group= 按分组过滤）' },
      { method: 'GET', path: '/api/accounts/:id', desc: '账户详情' },
      { method: 'GET', path: '/api/accounts/:id/secrets', desc: '解密查看 token / 密码 / 恢复邮箱' },
      { method: 'POST', path: '/api/accounts/import', desc: '通过 GitHub token 导入账户（自动验证）' },
      { method: 'PUT', path: '/api/accounts/:id', desc: '更新备注 / 分组 / 密码 / 邮箱' },
      { method: 'DELETE', path: '/api/accounts/:id', desc: '删除（进入回收站，同时停用其定时任务）' },
      { method: 'POST', path: '/api/accounts/:id/restore', desc: '从回收站恢复（重新启用定时任务）' },
      { method: 'POST', path: '/api/accounts/:id/check', desc: '检测单个账户封禁状态' },
      { method: 'POST', path: '/api/accounts/batch-check', desc: '批量检测（ids 最多 100）' },
      { method: 'POST', path: '/api/accounts/batch-check-group', desc: '按分组批量检测（group 为空 = 全部）' },
      { method: 'GET', path: '/api/accounts/groups', desc: '分组名列表' },
      { method: 'GET', path: '/api/accounts/:id/repos', desc: '该账户的仓库缓存' },
      { method: 'POST', path: '/api/accounts/:id/repos/refresh', desc: '从 GitHub 同步仓库' },
      { method: 'POST', path: '/api/accounts/:id/scan-workflows', desc: '扫描所有仓库的 workflow' },
      { method: 'GET', path: '/api/accounts/recycle-bin', desc: '回收站列表' },
      { method: 'DELETE', path: '/api/accounts/recycle-bin/:id', desc: '永久删除（连同仓库/任务）' },
      { method: 'POST', path: '/api/accounts/recycle-bin/clean', desc: '清理超过保留期的账户' },
    ],
  },
  {
    key: 'groupRepos',
    endpoints: [
      { method: 'GET', path: '/api/repos/:id/contents', desc: '浏览目录（?path=&ref=）' },
      { method: 'GET', path: '/api/repos/:id/file', desc: '读取文件（?path=&ref=）' },
      { method: 'PUT', path: '/api/repos/:id/file', desc: '创建/修改文件（content 为 base64）' },
      { method: 'GET', path: '/api/repos/:id/workflows', desc: 'workflow 列表（本地缓存）' },
      { method: 'POST', path: '/api/repos/:id/workflows', desc: '创建 workflow 文件（.yml/.yaml）' },
      { method: 'POST', path: '/api/repos/:id/dispatch', desc: '触发 workflow_dispatch' },
      { method: 'GET', path: '/api/repos/:id/workflow-inputs', desc: '解析 workflow inputs 定义（?filename=）' },
    ],
  },
  {
    key: 'groupRuns',
    endpoints: [
      { method: 'GET', path: '/api/repos/:id/runs', desc: '运行记录（?per_page= ≤ 100）' },
      { method: 'GET', path: '/api/repos/:id/runs/:runId/jobs', desc: '运行的 job 列表（含 steps）' },
      { method: 'GET', path: '/api/repos/:id/runs/:runId/logs', desc: '运行日志下载 URL' },
      { method: 'GET', path: '/api/repos/:id/runs/:runId/jobs/:jobId/logs', desc: '单个 job 的完整日志' },
      { method: 'POST', path: '/api/repos/:id/runs/:runId/cancel', desc: '取消运行' },
    ],
  },
  {
    key: 'groupTasks',
    endpoints: [
      { method: 'GET', path: '/api/tasks', desc: '定时任务列表' },
      { method: 'POST', path: '/api/tasks', desc: '创建（5 段 cron 表达式）' },
      { method: 'PUT', path: '/api/tasks/:id', desc: '更新 ref / cron / inputs / 启用状态' },
      { method: 'DELETE', path: '/api/tasks/:id', desc: '删除任务' },
      { method: 'POST', path: '/api/tasks/:id/toggle', desc: '启用 / 禁用' },
      { method: 'POST', path: '/api/tasks/:id/run', desc: '立即执行一次' },
    ],
  },
  {
    key: 'groupBatch',
    endpoints: [
      { method: 'POST', path: '/api/batch/create-workflows', desc: '批量创建 workflow（repo_ids ≤ 100）' },
      { method: 'POST', path: '/api/batch/dispatch', desc: '批量触发 workflow' },
      { method: 'POST', path: '/api/batch/create-repos', desc: '批量创建仓库（账户 × 数量，可带文件与 secrets）' },
      { method: 'POST', path: '/api/batch/fetch-template', desc: '拉取模板仓库全部文件' },
      { method: 'POST', path: '/api/batch/update-repos', desc: '批量清空并从模板同步（不可撤销）' },
      { method: 'POST', path: '/api/batch/toggle-visibility', desc: '批量切换公有 / 私有' },
    ],
  },
  {
    key: 'groupAutoTask',
    endpoints: [
      { method: 'GET', path: '/api/autotask', desc: '读取自动任务配置' },
      { method: 'PUT', path: '/api/autotask', desc: '更新自动检测 / 同步 / 回收站配置' },
      { method: 'POST', path: '/api/autotask/check-now', desc: '立即执行一轮封禁检测' },
      { method: 'POST', path: '/api/autotask/sync-now', desc: '立即执行一轮仓库同步' },
      { method: 'GET', path: '/api/autotask/logs', desc: '执行日志（?limit= ≤ 200）' },
      { method: 'GET', path: '/api/autotask/running', desc: '当前运行中的自动任务' },
    ],
  },
  {
    key: 'groupStats',
    endpoints: [
      { method: 'GET', path: '/api/stats/overview', desc: '仪表盘统计（账户状态 / 仓库 / 任务数）' },
    ],
  },
  {
    key: 'groupApiKeys',
    endpoints: [
      { method: 'GET', path: '/api/apikeys', desc: '密钥列表（只含前缀）' },
      { method: 'POST', path: '/api/apikeys', desc: '创建密钥（完整密钥仅返回这一次）' },
      { method: 'DELETE', path: '/api/apikeys/:id', desc: '删除密钥' },
      { method: 'PUT', path: '/api/apikeys/:id/toggle', desc: '启用 / 禁用' },
    ],
  },
  {
    key: 'groupSystem',
    endpoints: [
      { method: 'GET', path: '/api/system/version', desc: '当前版本与运行平台' },
      { method: 'GET', path: '/api/system/check-update', desc: '检查 GitHub 最新 Release' },
      { method: 'POST', path: '/api/system/update', desc: '自更新（下载 → SHA-256 校验 → 重启）' },
    ],
  },
]

const EXAMPLES: { title: string; code: string }[] = [
  {
    title: '查看统计',
    code: `curl -s "http://localhost:19527/api/stats/overview" \\
  -H "X-API-Key: gam_xxxxxxxxxxxxxxxx"`,
  },
  {
    title: '导入账户',
    code: `curl -X POST "http://localhost:19527/api/accounts/import" \\
  -H "X-API-Key: gam_xxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{"token":"ghp_xxx","group":"备用","note":"备注"}'`,
  },
  {
    title: '批量触发工作流',
    code: `curl -X POST "http://localhost:19527/api/batch/dispatch" \\
  -H "X-API-Key: gam_xxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{"repo_ids":[1,2,3],"filename":"keepalive.yml"}'`,
  },
  {
    title: '批量创建仓库',
    code: `curl -X POST "http://localhost:19527/api/batch/create-repos" \\
  -H "X-API-Key: gam_xxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{"account_ids":[1,2],"repo_name":"my-repo","private":true,
       "files":[{"path":"README.md","content":"aGVsbG8="}],
       "secrets":[{"name":"TOKEN","value":"xxx"}]}'`,
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

export default function ApiDocsPage() {
  const { t } = useTranslation()

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

      {/* 接口列表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <List className="h-4 w-4" /> {t('apiDocs.endpointsTitle')}
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
                {group.endpoints.map((ep, i) => (
                  <div
                    key={`${ep.method} ${ep.path}`}
                    className={cn(
                      'flex flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2 text-sm',
                      i > 0 && 'border-t',
                      !ep.auth && 'bg-muted/20'
                    )}
                  >
                    <MethodBadge method={ep.method} />
                    <code className="font-mono text-xs">{ep.path}</code>
                    <span className="text-xs text-muted-foreground">{ep.desc}</span>
                    {ep.auth === false && <Badge variant="outline" className="ml-auto text-[10px]">public</Badge>}
                  </div>
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
