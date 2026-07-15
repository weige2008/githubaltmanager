import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { accountApi, repoApi, runsApi, type WorkflowRun, type WorkflowJob, type Repo } from '@/api'
import { displayName, sortAccounts } from '@/lib/account'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LoadingState } from '@/components/ui/loading-state'
import { ErrorState } from '@/components/ui/error-state'
import { EmptyState } from '@/components/ui/empty-state'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, Activity, Clock, CheckCircle2, XCircle, Loader2, ExternalLink, GitBranch, ChevronDown, ChevronRight, Terminal } from 'lucide-react'
import { format } from 'date-fns'

const statusConfig: Record<string, { icon: typeof CheckCircle2; color: string; label: string }> = {
  completed: { icon: CheckCircle2, color: 'text-success', label: '完成' },
  in_progress: { icon: Loader2, color: 'text-primary', label: '运行中' },
  queued: { icon: Clock, color: 'text-warning', label: '排队中' },
  waiting: { icon: Clock, color: 'text-muted-foreground', label: '等待中' },
}

const conclusionConfig: Record<string, { icon: typeof CheckCircle2; color: string; label: string }> = {
  success: { icon: CheckCircle2, color: 'text-success', label: '成功' },
  failure: { icon: XCircle, color: 'text-destructive', label: '失败' },
  cancelled: { icon: XCircle, color: 'text-muted-foreground', label: '已取消' },
  skipped: { icon: Clock, color: 'text-muted-foreground', label: '已跳过' },
}

function RunStatusBadge({ run }: { run: WorkflowRun }) {
  if (run.status === 'completed' && run.conclusion) {
    const cfg = conclusionConfig[run.conclusion] || conclusionConfig.cancelled
    const Icon = cfg.icon
    return (
      <Badge variant={run.conclusion === 'success' ? 'success' : run.conclusion === 'failure' ? 'destructive' : 'secondary'} className="gap-1">
      <Icon className={cn('h-3 w-3', cfg.color)} />
        {cfg.label}
      </Badge>
    )
  }
  const cfg = statusConfig[run.status] || statusConfig.queued
  const Icon = cfg.icon
  return (
    <Badge variant="secondary" className="gap-1">
      <Icon className={cn('h-3 w-3', run.status === 'in_progress' && 'animate-spin')} />
      {cfg.label}
    </Badge>
  )
}

function JobItem({ job }: { job: WorkflowJob }) {
  const [expanded, setExpanded] = useState(false)
  const cfg = job.conclusion ? (conclusionConfig[job.conclusion] || conclusionConfig.cancelled) : (statusConfig[job.status] || statusConfig.queued)
  const Icon = cfg.icon

  return (
    <div className="rounded-md border">
      <button onClick={() => setExpanded(!expanded)} className="flex w-full items-center gap-2 p-3 text-left hover:bg-accent/50">
        {expanded ? <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />}
        <Icon className={cn('h-4 w-4 shrink-0', cfg.color, job.status === 'in_progress' && 'animate-spin')} />
        <span className="flex-1 text-sm font-medium">{job.name}</span>
        <span className="text-xs text-muted-foreground">
          {job.started_at && format(new Date(job.started_at), 'HH:mm:ss')}
          {job.completed_at && ` → ${format(new Date(job.completed_at), 'HH:mm:ss')}`}
        </span>
      </button>
      {expanded && job.steps && job.steps.length > 0 && (
        <div className="border-t">
          {job.steps.map((step, i) => {
            const sCfg = step.conclusion ? (conclusionConfig[step.conclusion] || conclusionConfig.cancelled) : (statusConfig[step.status] || statusConfig.queued)
            const SIcon = sCfg.icon
            return (
              <div key={i} className="flex items-center gap-2 px-6 py-1.5 text-xs hover:bg-accent/30">
                <SIcon className={cn('h-3 w-3 shrink-0', sCfg.color, step.status === 'in_progress' && 'animate-spin')} />
                <span className="font-mono text-muted-foreground">{step.number}</span>
                <span className="flex-1">{step.name}</span>
                <span className={cn('text-xs', sCfg.color)}>{sCfg.label}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function WorkflowRunsPage() {
  const { t } = useTranslation()
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null)
  const [repoSearch, setRepoSearch] = useState('')
  const [selectedRepo, setSelectedRepo] = useState<number | null>(null)
  const [selectedRun, setSelectedRun] = useState<number | null>(null)

  const { data: accounts } = useQuery({ queryKey: ['accounts'], queryFn: () => accountApi.list() })

  const { data: repos, isLoading: reposLoading } = useQuery({
    queryKey: ['repos', selectedAccount],
    queryFn: () => repoApi.listByAccount(selectedAccount!),
    enabled: !!selectedAccount,
  })

  const { data: runsData, isLoading: runsLoading } = useQuery({
    queryKey: ['runs', selectedRepo],
    queryFn: () => runsApi.list(selectedRepo!, 30),
    enabled: !!selectedRepo,
    refetchInterval: selectedRun === null ? 10000 : false,
  })

  const { data: jobsData, isLoading: jobsLoading } = useQuery({
    queryKey: ['run-jobs', selectedRepo, selectedRun],
    queryFn: () => runsApi.jobs(selectedRepo!, selectedRun!),
    enabled: !!selectedRepo && !!selectedRun,
    refetchInterval: 5000,
  })

  const { data: logsUrl } = useQuery({
    queryKey: ['run-logs-url', selectedRepo, selectedRun],
    queryFn: () => runsApi.logs(selectedRepo!, selectedRun!),
    enabled: !!selectedRepo && !!selectedRun,
    retry: false,
  })

  const filteredRepos = useMemo(() => {
    if (!repos) return []
    if (!repoSearch.trim()) return repos
    return repos.filter(r => r.name.toLowerCase().includes(repoSearch.toLowerCase()))
  }, [repos, repoSearch])

  return (
    <div className="space-y-4">
      <PageHeader title="工作流运行" description="查看仓库的 GitHub Actions 运行状态和日志" />

      {/* Top bar: account + repo selectors */}
      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <Select value={selectedAccount ? String(selectedAccount) : ''} onValueChange={(v) => { setSelectedAccount(Number(v)); setSelectedRepo(null); setSelectedRun(null) }}>
            <SelectTrigger className="h-9 w-[200px]"><SelectValue placeholder="选择账户" /></SelectTrigger>
            <SelectContent>
              {(accounts || []).map(a => <SelectItem key={a.id} value={String(a.id)}>{displayName(a)}</SelectItem>)}
            </SelectContent>
          </Select>

          {selectedAccount && (
            <>
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={repoSearch} onChange={e => setRepoSearch(e.target.value)} placeholder="搜索仓库..." className="pl-9" />
              </div>
              <Select value={selectedRepo ? String(selectedRepo) : ''} onValueChange={(v) => { setSelectedRepo(Number(v)); setSelectedRun(null) }}>
                <SelectTrigger className="h-9 w-[200px]"><SelectValue placeholder="选择仓库" /></SelectTrigger>
                <SelectContent>
                  {filteredRepos.map(r => <SelectItem key={r.id} value={String(r.id)}>{r.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </>
          )}
        </CardContent>
      </Card>

      {!selectedAccount ? (
        <EmptyState icon={Activity} title="请选择账户" description="选择一个账户开始查看工作流运行" />
      ) : !selectedRepo ? (
        reposLoading ? <LoadingState /> : (
          <Card>
            <CardHeader><CardTitle className="text-base">选择仓库</CardTitle></CardHeader>
            <CardContent className="space-y-1">
              {filteredRepos.map(r => (
                <button key={r.id} onClick={() => setSelectedRepo(r.id)} className="flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-accent">
                  <GitBranch className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1 text-sm font-medium font-mono">{r.name}</span>
                  {r.private && <Badge variant="warning" className="text-xs">私有</Badge>}
                </button>
              ))}
              {filteredRepos.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">没有匹配的仓库</p>}
            </CardContent>
          </Card>
        )
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          {/* Left: runs list */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">运行记录</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedRun(null)}>刷新</Button>
            </CardHeader>
            <CardContent className="p-0">
              {runsLoading ? <LoadingState /> : runsData && runsData.workflow_runs && runsData.workflow_runs.length > 0 ? (
                <ScrollArea className="h-[600px]">
                  <div className="divide-y">
                    {runsData.workflow_runs.map(run => (
                      <button
                        key={run.id}
                        onClick={() => setSelectedRun(run.id)}
                        className={cn('flex w-full items-start gap-3 p-3 text-left hover:bg-accent/50 transition-colors', selectedRun === run.id && 'bg-accent')}
                      >
                        <div className="mt-0.5">
                          <RunStatusBadge run={run} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{run.head_commit?.message?.split('\n')[0] || run.name}</p>
                          <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-mono">{run.head_branch}</span>
                            <span>·</span>
                            <span>{run.event}</span>
                            <span>·</span>
                            <span>{format(new Date(run.created_at), 'MM-dd HH:mm')}</span>
                          </div>
                        </div>
                        {run.html_url && <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        }
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              ) : <EmptyState title="暂无运行记录" />}
            </CardContent>
          </Card>

          {/* Right: run details */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">
                {selectedRun ? `运行 #${selectedRun}` : '运行详情'}
              </CardTitle>
              {selectedRun && logsUrl?.url && (
                <a href={logsUrl.url} target="_blank" rel="noreferrer">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Terminal className="h-3.5 w-3.5" /> 下载日志
                  </Button>
                </a>
              )}
            </CardHeader>
            <CardContent>
              {!selectedRun ? (
                <EmptyState icon={Activity} title="选择一个运行" description="点击左侧运行记录查看详情" />
              ) : jobsLoading ? <LoadingState /> : jobsData && jobsData.jobs ? (
                <ScrollArea className="h-[550px]">
                  <div className="space-y-2">
                    {jobsData.jobs.map(job => <JobItem key={job.id} job={job} />)}
                    {jobsData.jobs.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">暂无任务信息</p>}
                  </div>
                </ScrollArea>
              ) : <ErrorState title="加载失败" />}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
