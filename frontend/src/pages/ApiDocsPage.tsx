import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { CopyButton } from '@/components/ui/copy-button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { KeyRound, FileText, List, Terminal, ChevronDown, ChevronRight, Play, Loader2, AlertTriangle, Search, ArrowUp } from 'lucide-react'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ParamRef {
  name: string // URL 占位符名
  key: string // i18n 说明键（apiDocs.p.<key>）
  sample?: string
}

interface Endpoint {
  key: string // i18n 键（apiDocs.ep.<key>）
  method: Method
  path: string
  danger?: string // apiDocs.danger.<danger> 
  pp?: ParamRef[]
  q?: ParamRef[]
  body?: unknown
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

const ACC_ID: ParamRef = { name: 'id', key: 'p_id_account', sample: '1' }
const REPO_ID: ParamRef = { name: 'id', key: 'p_id_repo', sample: '1' }
const TASK_ID: ParamRef = { name: 'id', key: 'p_id_task', sample: '1' }
const KEY_ID: ParamRef = { name: 'id', key: 'p_id_key', sample: '1' }
const RUN_ID: ParamRef = { name: 'runId', key: 'p_run_id', sample: '1234567890' }
const JOB_ID: ParamRef = { name: 'jobId', key: 'p_job_id', sample: '12345678901' }

// 与 backend/internal/api/router.go 及各 Register*Routes 保持一致；文案在 i18n apiDocs.ep.<key>
const GROUPS: EndpointGroup[] = [
  {
    key: 'groupHealth',
    endpoints: [
      { key: 'healthz', method: 'GET', path: '/healthz' },
      { key: 'health_alias', method: 'GET', path: '/api/health' },
    ],
  },
  {
    key: 'groupAuth',
    endpoints: [
      { key: 'auth_status', method: 'GET', path: '/api/auth/status' },
      { key: 'auth_setup', method: 'POST', path: '/api/auth/setup', body: { masterPassword: 'your-password-at-least-12-chars' } },
      { key: 'auth_login', method: 'POST', path: '/api/auth/login', body: { masterPassword: 'your-master-password' } },
      { key: 'auth_change_password', method: 'POST', path: '/api/auth/change-password', danger: 'd_change_password', body: { oldPassword: 'old-password', newPassword: 'new-password-at-least-12' } },
    ],
  },
  {
    key: 'groupAccounts',
    endpoints: [
      { key: 'accounts_list', method: 'GET', path: '/api/accounts', q: [{ name: 'group', key: 'p_group', sample: '' }] },
      { key: 'accounts_get', method: 'GET', path: '/api/accounts/:id', pp: [ACC_ID] },
      { key: 'accounts_secrets', method: 'GET', path: '/api/accounts/:id/secrets', pp: [ACC_ID] },
      { key: 'accounts_import', method: 'POST', path: '/api/accounts/import', body: { token: 'ghp_xxxxxxxxxxxxxxxxxxxx', password: '', recovery_email: '', note: '', group: '' } },
      { key: 'accounts_update', method: 'PUT', path: '/api/accounts/:id', pp: [ACC_ID], body: { note: '', group: '' } },
      { key: 'accounts_delete', method: 'DELETE', path: '/api/accounts/:id', pp: [ACC_ID], danger: 'd_account_delete' },
      { key: 'accounts_restore', method: 'POST', path: '/api/accounts/:id/restore', pp: [ACC_ID] },
      { key: 'accounts_check', method: 'POST', path: '/api/accounts/:id/check', pp: [ACC_ID] },
      { key: 'accounts_batch_check', method: 'POST', path: '/api/accounts/batch-check', body: { ids: [1, 2, 3] } },
      { key: 'accounts_batch_check_group', method: 'POST', path: '/api/accounts/batch-check-group', body: { group: '' } },
      { key: 'accounts_groups', method: 'GET', path: '/api/accounts/groups' },
      { key: 'accounts_repos', method: 'GET', path: '/api/accounts/:id/repos', pp: [ACC_ID] },
      { key: 'accounts_repos_refresh', method: 'POST', path: '/api/accounts/:id/repos/refresh', pp: [ACC_ID] },
      { key: 'accounts_scan_workflows', method: 'POST', path: '/api/accounts/:id/scan-workflows', pp: [ACC_ID] },
      { key: 'accounts_recycle_bin', method: 'GET', path: '/api/accounts/recycle-bin' },
      { key: 'accounts_recycle_bin_delete', method: 'DELETE', path: '/api/accounts/recycle-bin/:id', pp: [ACC_ID], danger: 'd_recycle_delete' },
      { key: 'accounts_recycle_bin_clean', method: 'POST', path: '/api/accounts/recycle-bin/clean', danger: 'd_recycle_clean' },
    ],
  },
  {
    key: 'groupRepos',
    endpoints: [
      { key: 'repos_contents', method: 'GET', path: '/api/repos/:id/contents', pp: [REPO_ID], q: [{ name: 'path', key: 'p_path', sample: '' }, { name: 'ref', key: 'p_ref', sample: '' }] },
      { key: 'repos_file_get', method: 'GET', path: '/api/repos/:id/file', pp: [REPO_ID], q: [{ name: 'path', key: 'p_path', sample: 'README.md' }, { name: 'ref', key: 'p_ref', sample: '' }] },
      { key: 'repos_file_put', method: 'PUT', path: '/api/repos/:id/file', pp: [REPO_ID], danger: 'd_file_put', body: { path: 'README.md', content: 'IyBIZWxsbwo=', message: 'docs: update readme' } },
      { key: 'repos_workflows_list', method: 'GET', path: '/api/repos/:id/workflows', pp: [REPO_ID] },
      { key: 'repos_workflows_create', method: 'POST', path: '/api/repos/:id/workflows', pp: [REPO_ID], danger: 'd_workflow_create', body: { filename: 'keepalive.yml', content: 'bmFtZTogS2VlcCBBbGl2ZQo=', commit_message: 'ci: add keepalive' } },
      { key: 'repos_dispatch', method: 'POST', path: '/api/repos/:id/dispatch', pp: [REPO_ID], danger: 'd_dispatch', body: { filename: 'keepalive.yml', ref: 'main', inputs: {} } },
      { key: 'repos_workflow_inputs', method: 'GET', path: '/api/repos/:id/workflow-inputs', pp: [REPO_ID], q: [{ name: 'filename', key: 'p_filename', sample: 'keepalive.yml' }] },
    ],
  },
  {
    key: 'groupRuns',
    endpoints: [
      { key: 'runs_list', method: 'GET', path: '/api/repos/:id/runs', pp: [REPO_ID], q: [{ name: 'per_page', key: 'p_per_page', sample: '20' }] },
      { key: 'runs_jobs', method: 'GET', path: '/api/repos/:id/runs/:runId/jobs', pp: [REPO_ID, RUN_ID] },
      { key: 'runs_logs_url', method: 'GET', path: '/api/repos/:id/runs/:runId/logs', pp: [REPO_ID, RUN_ID] },
      { key: 'runs_job_logs', method: 'GET', path: '/api/repos/:id/runs/:runId/jobs/:jobId/logs', pp: [REPO_ID, RUN_ID, JOB_ID] },
      { key: 'runs_cancel', method: 'POST', path: '/api/repos/:id/runs/:runId/cancel', pp: [REPO_ID, RUN_ID], danger: 'd_run_cancel' },
    ],
  },
  {
    key: 'groupTasks',
    endpoints: [
      { key: 'tasks_list', method: 'GET', path: '/api/tasks' },
      { key: 'tasks_create', method: 'POST', path: '/api/tasks', body: { account_id: 1, repository_id: 1, workflow_filename: 'keepalive.yml', ref: 'main', cron_expr: '0 */6 * * *', enabled: true } },
      { key: 'tasks_update', method: 'PUT', path: '/api/tasks/:id', pp: [TASK_ID], body: { cron_expr: '0 0 * * *' } },
      { key: 'tasks_delete', method: 'DELETE', path: '/api/tasks/:id', pp: [TASK_ID], danger: 'd_tasks_delete' },
      { key: 'tasks_toggle', method: 'POST', path: '/api/tasks/:id/toggle', pp: [TASK_ID], body: { enabled: false } },
      { key: 'tasks_run', method: 'POST', path: '/api/tasks/:id/run', pp: [TASK_ID] },
    ],
  },
  {
    key: 'groupBatch',
    endpoints: [
      { key: 'batch_create_workflows', method: 'POST', path: '/api/batch/create-workflows', danger: 'd_batch_create_workflows', body: { repo_ids: [1, 2], filename: 'keepalive.yml', content: 'bmFtZTogS2VlcCBBbGl2ZQo=', commit_message: 'ci: add keepalive' } },
      { key: 'batch_dispatch', method: 'POST', path: '/api/batch/dispatch', danger: 'd_batch_dispatch', body: { repo_ids: [1, 2, 3], filename: 'keepalive.yml', ref: 'main', inputs: {} } },
      { key: 'batch_create_repos', method: 'POST', path: '/api/batch/create-repos', danger: 'd_batch_create_repos', body: { account_ids: [1, 2], repo_name: 'my-repo', description: '', private: true, count: 1, files: [{ path: 'README.md', content: 'aGVsbG8=' }], secrets: [] } },
      { key: 'batch_fetch_template', method: 'POST', path: '/api/batch/fetch-template', body: { account_id: 1, owner: 'some-user', repo: 'template-repo', ref: '' } },
      { key: 'batch_update_repos', method: 'POST', path: '/api/batch/update-repos', danger: 'd_batch_update_repos', body: { repo_ids: [1, 2], template_owner: 'some-user', template_repo: 'template-repo', template_ref: '' } },
      { key: 'batch_toggle_visibility', method: 'POST', path: '/api/batch/toggle-visibility', danger: 'd_batch_toggle_visibility', body: { repo_ids: [1, 2], is_private: true } },
    ],
  },
  {
    key: 'groupAutoTask',
    endpoints: [
      { key: 'autotask_get', method: 'GET', path: '/api/autotask' },
      { key: 'autotask_update', method: 'PUT', path: '/api/autotask', body: { auto_check_enabled: true, auto_check_interval: 60, auto_sync_enabled: true, auto_sync_interval: 60, auto_check_groups: '', auto_sync_groups: '', recycle_bin_enabled: true, recycle_bin_days: 30 } },
      { key: 'autotask_check_now', method: 'POST', path: '/api/autotask/check-now' },
      { key: 'autotask_sync_now', method: 'POST', path: '/api/autotask/sync-now' },
      { key: 'autotask_logs', method: 'GET', path: '/api/autotask/logs', q: [{ name: 'limit', key: 'p_limit', sample: '20' }] },
      { key: 'autotask_running', method: 'GET', path: '/api/autotask/running' },
    ],
  },
  {
    key: 'groupStats',
    endpoints: [{ key: 'stats_overview', method: 'GET', path: '/api/stats/overview' }],
  },
  {
    key: 'groupApiKeys',
    endpoints: [
      { key: 'apikeys_list', method: 'GET', path: '/api/apikeys' },
      { key: 'apikeys_create', method: 'POST', path: '/api/apikeys', body: { name: 'CI', expires_in_days: 0 } },
      { key: 'apikeys_delete', method: 'DELETE', path: '/api/apikeys/:id', pp: [KEY_ID], danger: 'd_apikeys_delete' },
      { key: 'apikeys_toggle', method: 'PUT', path: '/api/apikeys/:id/toggle', pp: [KEY_ID] },
    ],
  },
  {
    key: 'groupSystem',
    endpoints: [
      { key: 'system_version', method: 'GET', path: '/api/system/version' },
      { key: 'system_check_update', method: 'GET', path: '/api/system/check-update' },
      { key: 'system_update', method: 'POST', path: '/api/system/update', danger: 'd_system_update' },
    ],
  },
]

const EXAMPLES: { key: string; code: string }[] = [
  { key: 'ex_stats', code: 'curl -s "http://localhost:19527/api/stats/overview" \\\n  -H "X-API-Key: gam_xxxxxxxxxxxxxxxx"' },
  { key: 'ex_import', code: 'curl -X POST "http://localhost:19527/api/accounts/import" \\\n  -H "X-API-Key: gam_xxxxxxxxxxxxxxxx" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"token":"ghp_xxx","group":"备用","note":"备注"}\'' },
  { key: 'ex_dispatch', code: 'curl -X POST "http://localhost:19527/api/batch/dispatch" \\\n  -H "X-API-Key: gam_xxxxxxxxxxxxxxxx" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"repo_ids":[1,2,3],"filename":"keepalive.yml"}\'' },
  { key: 'ex_create_repos', code: 'curl -X POST "http://localhost:19527/api/batch/create-repos" \\\n  -H "X-API-Key: gam_xxxxxxxxxxxxxxxx" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"account_ids":[1,2],"repo_name":"my-repo","private":true,\n       "files":[{"path":"README.md","content":"aGVsbG8="}],\n       "secrets":[{"name":"TOKEN","value":"xxx"}]}\'' },
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

interface TestResult {
  status: number
  statusText: string
  ms: number
  text: string
}

function EndpointTester({ ep }: { ep: Endpoint }) {
  const { t } = useTranslation()
  const [pp, setPp] = useState<Record<string, string>>(() =>
    Object.fromEntries((ep.pp || []).map((f) => [f.name, f.sample || '']))
  )
  const [qp, setQp] = useState<Record<string, string>>({})
  const [bodyText, setBodyText] = useState<string>(() =>
    ep.body !== undefined ? JSON.stringify(ep.body, null, 2) : ''
  )
  const [result, setResult] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const missingParam = (ep.pp || []).some((f) => !(pp[f.name] ?? '').trim())

  const buildUrl = () => {
    let p = ep.path
    for (const f of ep.pp || []) {
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
    if (missingParam) {
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
    const dangerText = ep.danger ? t(`apiDocs.danger.${ep.danger}`) : ''
    if (dangerText && !confirm(`${t('apiDocs.dangerConfirm')}\n\n${dangerText}\n\n${ep.method} ${buildUrl()}`)) return

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
      try { pretty = JSON.stringify(JSON.parse(raw), null, 2) } catch { /* 非 JSON（如日志文本）保留原文 */ }
      setResult({ status: res.status, statusText: res.statusText, ms: Math.round(performance.now() - started), text: pretty || '(empty)' })
    } catch (e: unknown) {
      setError((e as Error)?.message || 'request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-3 space-y-3 rounded-lg border border-primary/20 bg-primary/[0.03] p-3">
      <div className="flex items-center gap-2 rounded-md border bg-background px-2.5 py-1.5">
        <MethodBadge method={ep.method} />
        <code className="flex-1 truncate font-mono text-xs">{buildUrl()}</code>
        <CopyButton value={`${location.origin}${buildUrl()}`} variant="ghost" size="icon" className="h-6 w-6" onCopy={() => toast.success('已复制')} />
      </div>

      {(ep.pp || []).length > 0 && (
        <div className="grid gap-2 sm:grid-cols-2">
          {ep.pp!.map((f) => (
            <div key={f.name} className="space-y-1">
              <label className="font-mono text-xs font-medium">:{f.name}<span className="ml-2 font-sans font-normal text-muted-foreground">{t(`apiDocs.p.${f.key}`)}</span></label>
              <Input value={pp[f.name] ?? ''} onChange={(e) => setPp((prev) => ({ ...prev, [f.name]: e.target.value }))} placeholder={f.sample || f.name} className="h-8 font-mono text-xs" />
            </div>
          ))}
        </div>
      )}
      {(ep.q || []).length > 0 && (
        <div className="grid gap-2 sm:grid-cols-2">
          {ep.q!.map((f) => (
            <div key={f.name} className="space-y-1">
              <label className="font-mono text-xs font-medium">?{f.name}<span className="ml-2 font-sans font-normal text-muted-foreground">{t(`apiDocs.p.${f.key}`)}</span></label>
              <Input value={qp[f.name] ?? ''} onChange={(e) => setQp((prev) => ({ ...prev, [f.name]: e.target.value }))} placeholder={f.sample || f.name} className="h-8 font-mono text-xs" />
            </div>
          ))}
        </div>
      )}

      {ep.method !== 'GET' && (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium">{t('apiDocs.bodyParams')}</label>
            {ep.body !== undefined && (
              <button className="text-xs text-primary hover:underline" onClick={() => setBodyText(JSON.stringify(ep.body, null, 2))}>reset</button>
            )}
          </div>
          <Textarea rows={6} value={bodyText} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBodyText(e.target.value)} className="font-mono text-xs" />
        </div>
      )}

      {error && <p className="text-xs font-medium text-destructive">{error}</p>}

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={send} disabled={loading}>
          {loading ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Play className="mr-1.5 h-3.5 w-3.5" />}
          {loading ? t('apiDocs.sending') : t('apiDocs.send')}
        </Button>
        {ep.danger && (
          <span className="flex items-center gap-1 text-xs font-medium text-warning">
            <AlertTriangle className="h-3.5 w-3.5" /> {t(`apiDocs.danger.${ep.danger}`)}
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

function EndpointItem({ ep, query }: { ep: Endpoint; query: string }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const isOpen = query ? true : open
  return (
    <div className={cn('border-b last:border-0 transition-colors', isOpen && 'bg-muted/20')}>
      <button onClick={() => setOpen(!open)} className="flex w-full flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2 text-left transition-colors hover:bg-accent/50">
        <MethodBadge method={ep.method} />
        <code className="font-mono text-xs">{ep.path}</code>
        <span className="text-xs text-muted-foreground">{t(`apiDocs.ep.${ep.key}.summary`)}</span>
        <span className="ml-auto flex items-center gap-1.5">
          {ep.danger && <AlertTriangle className="h-3.5 w-3.5 text-warning" />}
          {isOpen ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
        </span>
      </button>
      {isOpen && (
        <div className="space-y-1.5 px-3 pb-3">
          <p className="border-l-2 border-primary/30 pl-3 text-xs leading-relaxed text-muted-foreground">
            {t(`apiDocs.ep.${ep.key}.detail`)}
          </p>
          <EndpointTester ep={ep} />
        </div>
      )}
    </div>
  )
}

export default function ApiDocsPage() {
  const { t, i18n } = useTranslation()
  const [search, setSearch] = useState('')
  const [activeGroup, setActiveGroup] = useState(GROUPS[0].key)
  const contentRef = useRef<HTMLDivElement>(null)

  const q = search.trim().toLowerCase()
  const filteredGroups = useMemo(() => {
    if (!q) return GROUPS.map((g) => ({ group: g, items: g.endpoints }))
    return GROUPS
      .map((g) => ({
        group: g,
        items: g.endpoints.filter((ep) => {
          const summary = t(`apiDocs.ep.${ep.key}.summary`).toLowerCase()
          return ep.path.toLowerCase().includes(q) || summary.includes(q) || ep.method.toLowerCase().includes(q)
        }),
      }))
      .filter((g) => g.items.length > 0)
  }, [q, i18n.language, t])

  // 滚动高亮当前分组
  useEffect(() => {
    if (q) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveGroup(e.target.id.replace('group-', ''))
        }
      },
      { rootMargin: '-15% 0px -70% 0px' }
    )
    for (const g of GROUPS) {
      const el = document.getElementById(`group-${g.key}`)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [q])

  const jump = (key: string) => {
    setActiveGroup(key)
    document.getElementById(`group-${key}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="flex items-start gap-6">
      {/* 左侧锚点目录（桌面） */}
      <aside className="sticky top-16 hidden max-h-[calc(100vh-5rem)] w-52 shrink-0 flex-col gap-1 overflow-auto py-1 xl:flex">
        {GROUPS.map((g) => (
          <button
            key={g.key}
            onClick={() => jump(g.key)}
            className={cn(
              'flex items-center justify-between rounded-md px-3 py-1.5 text-left text-xs transition-colors',
              activeGroup === g.key ? 'bg-primary/10 font-medium text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            )}
          >
            <span className="truncate">{t(`apiDocs.${g.key}`)}</span>
            <span className="ml-1 shrink-0 font-mono text-[10px] opacity-60">{g.endpoints.length}</span>
          </button>
        ))}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-2 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <ArrowUp className="h-3 w-3" /> {t('apiDocs.toTop')}
        </button>
      </aside>

      <div ref={contentRef} className="min-w-0 flex-1 space-y-6">
        <PageHeader title={t('apiDocs.title')} description={t('apiDocs.description')} />

        {/* 移动端分组快速跳转 */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 xl:hidden">
          {GROUPS.map((g) => (
            <button
              key={g.key}
              onClick={() => jump(g.key)}
              className="shrink-0 rounded-full border px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {t(`apiDocs.${g.key}`)}
              <span className="ml-1 font-mono text-[10px] opacity-60">{g.endpoints.length}</span>
            </button>
          ))}
        </div>

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
          <CardHeader className="space-y-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <List className="h-4 w-4" /> {t('apiDocs.endpointsTitle')}
              <Badge variant="secondary" className="text-[10px]">
                {filteredGroups.reduce((n, g) => n + g.items.length, 0)} / {GROUPS.reduce((n, g) => n + g.endpoints.length, 0)}
              </Badge>
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('apiDocs.search')} className="h-9 pl-8 text-sm" />
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {filteredGroups.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">{t('common.notFound')}</p>
            )}
            {filteredGroups.map(({ group, items }) => (
              <div key={group.key} id={`group-${group.key}`} className="scroll-mt-24">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-sm font-semibold">{t(`apiDocs.${group.key}`)}</h3>
                  <Badge variant="secondary" className="text-[10px]">{items.length}</Badge>
                </div>
                <div className="overflow-hidden rounded-lg border">
                  {items.map((ep) => (
                    <EndpointItem key={`${ep.method} ${ep.path}`} ep={ep} query={q} />
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
              <div key={ex.key}>
                <p className="mb-1.5 text-xs font-medium text-muted-foreground">{t(`apiDocs.ex.${ex.key}`)}</p>
                <CodeBlock code={ex.code} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
