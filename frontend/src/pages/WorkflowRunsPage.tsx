import { useState, useMemo, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { accountApi, repoApi, runsApi, type WorkflowRun, type WorkflowJob } from '@/api'
import { displayName } from '@/lib/account'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LoadingState } from '@/components/ui/loading-state'
import { EmptyState } from '@/components/ui/empty-state'
import { Search, Activity, Clock, CheckCircle2, XCircle, Loader2, GitBranch, ChevronDown, ChevronRight, Terminal, Ban, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'

const conclusionConfig: Record<string, { icon: typeof CheckCircle2; color: string; label: string }> = {
  success: { icon: CheckCircle2, color: 'text-success', label: '成功' },
  failure: { icon: XCircle, color: 'text-destructive', label: '失败' },
  cancelled: { icon: Ban, color: 'text-muted-foreground', label: '已取消' },
  skipped: { icon: Clock, color: 'text-muted-foreground', label: '已跳过' },
}
const statusConfig: Record<string, { icon: typeof CheckCircle2; color: string; label: string }> = {
  completed: { icon: CheckCircle2, color: 'text-success', label: '完成' },
  in_progress: { icon: Loader2, color: 'text-primary', label: '运行中' },
  queued: { icon: Clock, color: 'text-warning', label: '排队中' },
  waiting: { icon: Clock, color: 'text-muted-foreground', label: '等待中' },
}

function RunBadge({ run }: { run: WorkflowRun }) {
  if (run.status === 'completed' && run.conclusion) {
    const cfg = conclusionConfig[run.conclusion] || conclusionConfig.cancelled
    return <Badge variant={run.conclusion === 'success' ? 'success' : run.conclusion === 'failure' ? 'destructive' : 'secondary'} className="gap-1"><cfg.icon className={cn('h-3 w-3', cfg.color)} />{cfg.label}</Badge>
  }
  const cfg = statusConfig[run.status] || statusConfig.queued
  return <Badge variant="secondary" className="gap-1"><cfg.icon className={cn('h-3 w-3', cfg.color, run.status === 'in_progress' && 'animate-spin')} />{cfg.label}</Badge>
}

function StepItem({ step, fullLog }: { step: { name: string; status: string; conclusion: string | null; number: number }; fullLog?: string }) {
  const [showLog, setShowLog] = useState(false)
  const cfg = step.conclusion ? (conclusionConfig[step.conclusion] || conclusionConfig.cancelled) : (statusConfig[step.status] || statusConfig.queued)
  const Icon = cfg.icon

  // Extract this step's log lines from full job log
  const myLog = useMemo(() => {
    if (!fullLog) return ''
    const lines = fullLog.split('\n')

    // Strategy 1: Find lines containing the step name as a section marker
    // GitHub logs often have the step name appearing as a standalone line or with ##[group]
    const matches: number[] = []
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i]
      if (l.includes(`##[group]`) && l.includes(step.name)) matches.push(i)
      else if (l.trim() === step.name) matches.push(i)
      else if (l.match(new RegExp(`^${step.number}[\\s\\t]+`)) && l.includes(step.name)) matches.push(i)
      else if (l.includes(step.name) && (l.includes('Run ') || l.includes('Complete ') || l.includes('Post '))) matches.push(i)
    }

    if (matches.length > 0) {
      const start = matches[0]
      // Find end: next ##[group] or ##[endgroup] or next step marker
      let end = lines.length
      for (let i = start + 1; i < lines.length; i++) {
        if (lines[i].includes('##[endgroup]') || lines[i].includes('##[group]')) { end = i + 1; break }
      }
      return lines.slice(start, end).join('\n')
    }

    // Strategy 2: Search for step number in timestamps
    // Log format: "2024-01-15T10:30:00.000Z Step Name"
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].match(/^\d{4}-\d{2}-\d{2}T[\d:.]+Z\s+/)) {
        const afterTimestamp = lines[i].replace(/^\d{4}-\d{2}-\d{2}T[\d:.]+Z\s+/, '')
        if (afterTimestamp.includes(step.name) || afterTimestamp === step.name) {
          let end = lines.length
          for (let j = i + 1; j < lines.length; j++) {
            const tMatch = lines[j].match(/^\d{4}-\d{2}-\d{2}T[\d:.]+Z\s+/)
            if (tMatch) {
              const after = lines[j].replace(tMatch[0], '')
              // Check if this is a new step header
              if (after.includes('##[group]') || after.match(/^\d+\s/)) { end = j; break }
            }
          }
          return lines.slice(i, end).join('\n')
        }
      }
    }

    // Strategy 3: Just grep all lines mentioning the step name
    const grepLines = lines.filter(l => l.includes(step.name))
    return grepLines.length > 0 ? grepLines.join('\n') : ''
  }, [fullLog, step.name, step.number])

  const hasLog = myLog.trim().length > 0

  return (
    <div>
      <button onClick={() => setShowLog(!showLog)} className={cn('flex w-full items-center gap-2 px-6 py-1.5 text-xs hover:bg-accent/30 text-left', !hasLog && !fullLog && 'cursor-default')}>
        <Icon className={cn('h-3 w-3 shrink-0', cfg.color, step.status === 'in_progress' && 'animate-spin')} />
        <span className="font-mono text-muted-foreground">{step.number}</span>
        <span className="flex-1 truncate">{step.name}</span>
        <span className={cn('text-xs', cfg.color)}>{cfg.label}</span>
        {hasLog && <FileText className={cn('h-3 w-3 shrink-0', showLog ? 'text-primary' : 'text-muted-foreground')} />}
      </button>
      {showLog && hasLog && (
        <pre className="mx-6 mb-2 max-h-[300px] overflow-auto rounded border bg-muted/50 p-2 text-[10px] font-mono leading-tight whitespace-pre-wrap">{myLog}</pre>
      )}
      {showLog && !hasLog && fullLog && (
        <p className="px-6 py-1 text-[10px] text-muted-foreground italic">未找到此步骤的独立日志，请在下方完整日志中搜索</p>
      )}
    </div>
  )
}

function JobItem({ job, repoId, runId }: { job: WorkflowJob; repoId: number; runId: number }) {
  const [expanded, setExpanded] = useState(false)
  const cfg = job.conclusion ? (conclusionConfig[job.conclusion] || conclusionConfig.cancelled) : (statusConfig[job.status] || statusConfig.queued)
  const Icon = cfg.icon

  const { data: logsData, isLoading: logsLoading } = useQuery({
    queryKey: ['job-logs', repoId, runId, job.id],
    queryFn: () => runsApi.jobLogs(repoId, runId, job.id),
    enabled: expanded,
    retry: false,
  })

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
      {expanded && (
        <div className="border-t">
          {logsLoading ? (
            <div className="flex items-center justify-center py-3"><Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /><span className="ml-2 text-xs text-muted-foreground">加载日志中...</span></div>
          ) : (
            <>
              {job.steps && job.steps.length > 0 && (
                <div className="py-1">
                  {job.steps.map((step, i) => <StepItem key={i} step={step} fullLog={logsData?.logs} />)}
                </div>
              )}
              {logsData?.logs && (
                <div className="border-t px-3 py-2">
                  <details>
                    <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">查看完整原始日志（{logsData.logs.length} 字符）</summary>
                    <pre className="mt-2 max-h-[400px] overflow-auto rounded bg-muted/50 p-3 text-[10px] font-mono leading-tight whitespace-pre-wrap">{logsData.logs}</pre>
                  </details>
                </div>
              )}
              {job.html_url && (
                <div className="border-t px-3 py-2"><a href={job.html_url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">在 GitHub 查看 ↗</a></div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default function WorkflowRunsPage() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null)
  const [repoSearch, setRepoSearch] = useState('')
  const [selectedRepo, setSelectedRepo] = useState<number | null>(null)
  const [selectedRun, setSelectedRun] = useState<number | null>(null)
  const [selectedRunIds, setSelectedRunIds] = useState<number[]>([])
  const [cancelProgress, setCancelProgress] = useState<{ current: number; total: number; name: string } | null>(null)

  const { data: accounts } = useQuery({ queryKey: ['accounts'], queryFn: () => accountApi.list() })
  const { data: repos, isLoading: reposLoading } = useQuery({ queryKey: ['repos', selectedAccount], queryFn: () => repoApi.listByAccount(selectedAccount!), enabled: !!selectedAccount })
  const { data: runsData, isLoading: runsLoading } = useQuery({ queryKey: ['runs', selectedRepo], queryFn: () => runsApi.list(selectedRepo!, 30), enabled: !!selectedRepo, refetchInterval: 10000 })
  const { data: jobsData, isLoading: jobsLoading } = useQuery({ queryKey: ['run-jobs', selectedRepo, selectedRun], queryFn: () => runsApi.jobs(selectedRepo!, selectedRun!), enabled: !!selectedRepo && !!selectedRun, refetchInterval: 5000 })
  const { data: logsUrl } = useQuery({ queryKey: ['run-logs-url', selectedRepo, selectedRun], queryFn: () => runsApi.logs(selectedRepo!, selectedRun!), enabled: !!selectedRepo && !!selectedRun, retry: false })

  const cancelMut = useMutation({
    mutationFn: (runId: number) => runsApi.cancel(selectedRepo!, runId),
    onError: (e: any) => toast.error(e?.message || '取消失败'),
  })

  const selectedRunData = runsData?.workflow_runs?.find(r => r.id === selectedRun)
  const canCancelSingle = selectedRunData && ['in_progress', 'queued', 'waiting'].includes(selectedRunData.status)

  const cancellableRuns = useMemo(() => (runsData?.workflow_runs || []).filter(r => ['in_progress', 'queued', 'waiting'].includes(r.status)), [runsData])

  const handleBatchCancel = async () => {
    const ids = selectedRunIds.filter(id => cancellableRuns.some(r => r.id === id))
    if (ids.length === 0) { toast.warning('请选择可取消的运行（运行中/排队中）'); return }
    setCancelProgress({ current: 0, total: ids.length, name: '' })
    let ok = 0, fail = 0
    for (let i = 0; i < ids.length; i++) {
      const run = runsData?.workflow_runs?.find(r => r.id === ids[i])
      setCancelProgress({ current: i + 1, total: ids.length, name: run?.name || `#${ids[i]}` })
      try { await runsApi.cancel(selectedRepo!, ids[i]); ok++ } catch { fail++ }
    }
    setCancelProgress(null)
    setSelectedRunIds([])
    queryClient.invalidateQueries({ queryKey: ['runs'] })
    queryClient.invalidateQueries({ queryKey: ['run-jobs'] })
    toast.success(`批量取消完成：${ok} 成功，${fail} 失败`)
  }

  const handleSingleCancel = async () => {
    if (!confirm('确定取消此运行？')) return
    try { await cancelMut.mutateAsync(selectedRun!); toast.success('已发送取消请求'); queryClient.invalidateQueries({ queryKey: ['run-jobs'] }) } catch {}
  }

  const toggleSelect = (id: number) => setSelectedRunIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])

  const filteredRepos = useMemo(() => {
    if (!repos) return []
    if (!repoSearch.trim()) return repos
    return repos.filter(r => r.name.toLowerCase().includes(repoSearch.toLowerCase()))
  }, [repos, repoSearch])

  return (
    <div className="space-y-4">
      <PageHeader title="工作流运行" description="查看 GitHub Actions 运行状态、步骤日志，批量取消运行" />
      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <Select value={selectedAccount ? String(selectedAccount) : ''} onValueChange={(v) => { setSelectedAccount(Number(v)); setSelectedRepo(null); setSelectedRun(null); setSelectedRunIds([]) }}>
            <SelectTrigger className="h-9 w-[200px]"><SelectValue placeholder="选择账户" /></SelectTrigger>
            <SelectContent>{(accounts || []).map(a => <SelectItem key={a.id} value={String(a.id)}>{displayName(a)}</SelectItem>)}</SelectContent>
          </Select>
          {selectedAccount && (
            <>
              <div className="relative min-w-[200px] flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={repoSearch} onChange={e => setRepoSearch(e.target.value)} placeholder="搜索仓库..." className="pl-9" /></div>
              <Select value={selectedRepo ? String(selectedRepo) : ''} onValueChange={(v) => { setSelectedRepo(Number(v)); setSelectedRun(null); setSelectedRunIds([]) }}>
                <SelectTrigger className="h-9 w-[200px]"><SelectValue placeholder="选择仓库" /></SelectTrigger>
                <SelectContent>{filteredRepos.map(r => <SelectItem key={r.id} value={String(r.id)}>{r.name}</SelectItem>)}</SelectContent>
              </Select>
            </>
          )}
        </CardContent>
      </Card>

      {!selectedAccount ? (
        <EmptyState icon={Activity} title="请选择账户" description="选择一个账户开始查看工作流运行" />
      ) : !selectedRepo ? (
        reposLoading ? <LoadingState /> : (
          <Card><CardHeader><CardTitle className="text-base">选择仓库</CardTitle></CardHeader>
            <CardContent className="space-y-1">
              {filteredRepos.map(r => (
                <button key={r.id} onClick={() => setSelectedRepo(r.id)} className="flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-accent">
                  <GitBranch className="h-4 w-4 text-muted-foreground" /><span className="flex-1 font-mono text-sm font-medium">{r.name}</span>{r.private && <Badge variant="warning" className="text-xs">私有</Badge>}
                </button>
              ))}
              {filteredRepos.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">没有匹配的仓库</p>}
            </CardContent>
          </Card>
        )
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
          {/* Runs list with checkboxes */}
          <Card>
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">运行记录 {runsData?.total_count ? `(${runsData.total_count})` : ''}</CardTitle>
                <div className="flex items-center gap-2">
                  {selectedRunIds.length > 0 && (
                    <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive" disabled={!!cancelProgress} onClick={handleBatchCancel}>
                      <Ban className="h-3.5 w-3.5" />取消选中 ({selectedRunIds.length})
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => setSelectedRunIds(selectedRunIds.length > 0 ? [] : cancellableRuns.map(r => r.id))}>
                    {selectedRunIds.length > 0 ? '取消选择' : '全选运行中'}
                  </Button>
                </div>
              </div>
              {/* Cancel progress */}
              {cancelProgress && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-medium text-destructive"><Loader2 className="h-4 w-4 animate-spin" /> 取消中：{cancelProgress.name}</span>
                    <span className="text-xs text-muted-foreground">{cancelProgress.current} / {cancelProgress.total}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-destructive transition-all duration-300" style={{ width: `${(cancelProgress.current / cancelProgress.total) * 100}%` }} />
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-0">
              {runsLoading ? <LoadingState /> : runsData?.workflow_runs?.length ? (
                <div className="max-h-[600px] overflow-y-auto">
                  {runsData.workflow_runs.map(run => {
                    const isCancellable = ['in_progress', 'queued', 'waiting'].includes(run.status)
                    const isSelected = selectedRunIds.includes(run.id)
                    return (
                      <div key={run.id} className={cn('flex items-start gap-2 border-b p-3 transition-colors hover:bg-accent/50', selectedRun === run.id && 'bg-accent', isSelected && 'bg-primary/5')}>
                        <div className="pt-1">
                          <Checkbox checked={isSelected} onCheckedChange={() => toggleSelect(run.id)} disabled={!isCancellable && !isSelected} className={!isCancellable ? 'opacity-30' : ''} />
                        </div>
                        <button onClick={() => setSelectedRun(run.id)} className="flex flex-1 items-start gap-3 text-left min-w-0">
                          <div className="mt-0.5 shrink-0"><RunBadge run={run} /></div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">{run.head_commit?.message?.split('\n')[0] || run.name}</p>
                            <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="font-mono">{run.head_branch}</span><span>·</span><span>{run.event}</span><span>·</span>
                              <span>{format(new Date(run.created_at), 'MM-dd HH:mm')}</span>
                            </div>
                          </div>
                        </button>
                      </div>
                    )
                  })}
                </div>
              ) : <EmptyState title="暂无运行记录" />}
            </CardContent>
          </Card>

          {/* Run details */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">{selectedRun ? `运行 #${selectedRun}` : '运行详情'}</CardTitle>
              <div className="flex items-center gap-2">
                {canCancelSingle && (
                  <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive" disabled={cancelMut.isPending} onClick={handleSingleCancel}>
                    {cancelMut.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Ban className="h-3.5 w-3.5" />}取消运行
                  </Button>
                )}
                {selectedRun && logsUrl?.url && (
                  <a href={logsUrl.url} target="_blank" rel="noreferrer"><Button variant="outline" size="sm" className="gap-1.5"><Terminal className="h-3.5 w-3.5" /> ZIP</Button></a>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!selectedRun ? <EmptyState icon={Activity} title="选择一个运行" description="点击左侧运行记录查看详情和日志" />
              : jobsLoading ? <LoadingState />
              : jobsData?.jobs?.length ? (
                <div className="max-h-[550px] space-y-2 overflow-y-auto pr-1">
                  {jobsData.jobs.map(job => <JobItem key={job.id} job={job} repoId={selectedRepo!} runId={selectedRun} />)}
                </div>
              ) : <EmptyState title="暂无任务信息" />}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
