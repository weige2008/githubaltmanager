import { useState, useMemo, useEffect, useCallback } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { accountApi, repoApi, batchApi, type Repo, type Account, type Workflow, type WorkflowInput } from '@/api'
import { displayName, sortAccounts } from '@/lib/account'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { PageHeader } from '@/components/page-header'
import { LoadingState } from '@/components/ui/loading-state'
import { ErrorState } from '@/components/ui/error-state'
import { EmptyState } from '@/components/ui/empty-state'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Users, GitBranch, FileCode, Play, Loader2, CircleCheck, CircleX, Search, Zap } from 'lucide-react'
import { toast } from 'sonner'

interface MatchedRepo extends Repo {
  accountLogin: string
}

const DEFAULT_WORKFLOW = `name: Keep Alive
on:
  workflow_dispatch:
  schedule:
    - cron: '0 0 * * *'
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - run: echo "keep alive $(date)"
`

export default function BatchPage() {
  const { t } = useTranslation()

  const [selectedAccounts, setSelectedAccounts] = useState<number[]>([])
  const [repoName, setRepoName] = useState('')
  const [selectedRepoIds, setSelectedRepoIds] = useState<number[]>([])
  const [mode, setMode] = useState<'create' | 'dispatch'>('create')

  const [wfFilename, setWfFilename] = useState('keepalive.yml')
  const [wfContent, setWfContent] = useState(DEFAULT_WORKFLOW)
  const [commitMsg, setCommitMsg] = useState('Batch create workflow')
  const [dispatchFilename, setDispatchFilename] = useState('keepalive.yml')
  const [dispatchRef, setDispatchRef] = useState('')
  const [dispatchInputs, setDispatchInputs] = useState<Record<string, string>>({})
  const [workflowInputs, setWorkflowInputs] = useState<WorkflowInput[]>([])
  const [loadingInputs, setLoadingInputs] = useState(false)
  const [results, setResults] = useState<{ success: any[]; failed: any[] } | null>(null)

  const { data: accounts, isLoading: accLoading, isError: accError, refetch: accRefetch } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => accountApi.list(),
  })
  const { data: groups } = useQuery({ queryKey: ['accounts', 'groups'], queryFn: () => accountApi.listGroups() })

  const [groupFilter, setGroupFilter] = useState<string>('')

  const { data: allRepos, isLoading: reposLoading } = useQuery({
    queryKey: ['batch-repos', selectedAccounts],
    queryFn: async () => {
      const results = await Promise.all(
        selectedAccounts.map(async (accId) => {
          try {
            const repos = await repoApi.listByAccount(accId)
            return repos
          } catch {
            return [] as Repo[]
          }
        })
      )
      return results.flat()
    },
    enabled: selectedAccounts.length > 0,
  })

  const sortedAccountsList = useMemo(() => {
    if (!accounts) return []
    let list = sortAccounts(accounts)
    if (groupFilter === '__ungrouped__') list = list.filter(a => !a.group)
    else if (groupFilter) list = list.filter(a => (a.group || '') === groupFilter)
    return list
  }, [accounts, groupFilter])
  const accMap = useMemo(() => {
    const m = new Map<number, Account>()
    accounts?.forEach((a) => m.set(a.id, a))
    return m
  }, [accounts])

  const matchedRepos = useMemo<MatchedRepo[]>(() => {
    if (!allRepos) return []
    const filtered = repoName.trim()
      ? allRepos.filter((r) => r.name.toLowerCase() === repoName.trim().toLowerCase())
      : allRepos
    return filtered.map((r) => ({
      ...r,
      accountLogin: accMap.get(r.account_id)?.github_login || '?',
    }))
  }, [allRepos, repoName, accMap])

  const availableRepoNames = useMemo(() => {
    if (!allRepos) return []
    const names = new Set<string>()
    allRepos.forEach((r) => {
      const count = allRepos.filter((r2) => r2.name === r.name).length
      if (count > 1) names.add(r.name)
    })
    return Array.from(names).sort()
  }, [allRepos])

  const toggleAccount = (id: number) => {
    setSelectedAccounts((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id])
    setSelectedRepoIds([])
    setResults(null)
  }

  const toggleAllAccounts = () => {
    setSelectedAccounts((prev) => prev.length === sortedAccountsList.length ? [] : sortedAccountsList.map((a) => a.id))
    setSelectedRepoIds([])
  }

  const toggleRepo = (id: number) => {
    setSelectedRepoIds((prev) => prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id])
  }

  const selectAllMatched = () => setSelectedRepoIds(matchedRepos.map((r) => r.id))

  // Auto-scan workflows from selected repos
  const [scanningWf, setScanningWf] = useState(false)
  const [commonWorkflows, setCommonWorkflows] = useState<{ filename: string; count: number }[]>([])

  const scanWorkflows = async () => {
    if (selectedRepoIds.length === 0) return
    setScanningWf(true)
    try {
      const results = await Promise.all(
        selectedRepoIds.map(async (rid) => {
          try {
            const wfs = await repoApi.listWorkflows(rid)
            return wfs.map(w => w.filename)
          } catch {
            return [] as string[]
          }
        })
      )
      // Count how many repos have each workflow filename
      const countMap = new Map<string, number>()
      for (const filenames of results) {
        const unique = new Set(filenames)
        for (const fn of unique) {
          countMap.set(fn, (countMap.get(fn) || 0) + 1)
        }
      }
      // Sort: most common first, then by name
      const sorted = Array.from(countMap.entries())
        .map(([filename, count]) => ({ filename, count }))
        .sort((a, b) => b.count - a.count || a.filename.localeCompare(b.filename))
      setCommonWorkflows(sorted)
    } catch {
      toast.error('扫描工作流失败')
    } finally {
      setScanningWf(false)
    }
  }

  // Auto-scan when repo selection changes
  useEffect(() => {
    if (selectedRepoIds.length === 0) {
      setCommonWorkflows([])
      return
    }
    const timer = setTimeout(() => scanWorkflows(), 500)
    return () => clearTimeout(timer)
  }, [selectedRepoIds])

  // Fetch workflow inputs when dispatch filename changes
  useEffect(() => {
    if (mode !== 'dispatch' || !dispatchFilename.trim() || selectedRepoIds.length === 0) {
      setWorkflowInputs([])
      setDispatchInputs({})
      return
    }
    const timer = setTimeout(async () => {
      setLoadingInputs(true)
      try {
        const res = await repoApi.getWorkflowInputs(selectedRepoIds[0], dispatchFilename.trim())
        setWorkflowInputs(res.inputs || [])
        // Pre-fill defaults
        const defaults: Record<string, string> = {}
        ;(res.inputs || []).forEach(inp => {
          if (inp.default) defaults[inp.name] = inp.default
        })
        setDispatchInputs(defaults)
      } catch {
        setWorkflowInputs([])
      } finally {
        setLoadingInputs(false)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [dispatchFilename, mode, selectedRepoIds])

  const b64 = useCallback((s: string) => btoa(unescape(encodeURIComponent(s))), [])

  const createMut = useMutation({
    mutationFn: () => batchApi.createWorkflows({
      repo_ids: selectedRepoIds,
      filename: wfFilename,
      content: b64(wfContent),
      commit_message: commitMsg,
    }),
    onSuccess: (data) => {
      setResults(data)
      toast.success(t('batchWorkflow.partialMsg', { success: data.success?.length || 0, failed: data.failed?.length || 0 }))
    },
    onError: (e: any) => toast.error(e?.message || t('batchWorkflow.createFailed')),
  })

  const dispatchMut = useMutation({
    mutationFn: () => batchApi.dispatch({
      repo_ids: selectedRepoIds,
      filename: dispatchFilename,
      ref: dispatchRef || undefined,
      inputs: Object.keys(dispatchInputs).length > 0 ? dispatchInputs : undefined,
    }),
    onSuccess: (data) => {
      setResults(data)
      toast.success(t('batchWorkflow.partialMsg', { success: data.success?.length || 0, failed: data.failed?.length || 0 }))
    },
    onError: (e: any) => toast.error(e?.message || t('batchWorkflow.dispatchFailed')),
  })

  const canExecute = selectedRepoIds.length > 0 && (mode === 'dispatch' ? !!dispatchFilename.trim() : !!wfFilename.trim())
  const isExecuting = createMut.isPending || dispatchMut.isPending

  if (accLoading) return <LoadingState />
  if (accError) return <ErrorState retry={accRefetch} />

  return (
    <div className="space-y-6">
      <PageHeader title={t('batchWorkflow.title')} description={t('batchWorkflow.description')} />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Left: account selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2"><Users className="h-4 w-4" /> {t('batchRepo.selectAccount')}</span>
              <Button variant="ghost" size="sm" onClick={toggleAllAccounts}>
                {selectedAccounts.length === sortedAccountsList.length && sortedAccountsList.length > 0 ? t('batchRepo.deselectAll') : t('batchRepo.selectAll')}
              </Button>
            </CardTitle>
            {(groups || []).filter(g => g).length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                <button onClick={() => setGroupFilter('')} className={cn('rounded-md px-2 py-0.5 text-xs transition-colors', !groupFilter ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}>全部</button>
                <button onClick={() => setGroupFilter('__ungrouped__')} className={cn('rounded-md px-2 py-0.5 text-xs transition-colors', groupFilter === '__ungrouped__' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}>未分组</button>
                {(groups || []).filter(g => g).map(g => (
                  <button key={g} onClick={() => setGroupFilter(g)} className={cn('rounded-md px-2 py-0.5 text-xs transition-colors', groupFilter === g ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}>{g}</button>
                ))}
              </div>
            )}
          </CardHeader>
          <CardContent className="max-h-[400px] space-y-1 overflow-y-auto">
            {sortedAccountsList.map((acc) => {
              const checked = selectedAccounts.includes(acc.id)
              return (
                <label key={acc.id} className="flex cursor-pointer items-center gap-2.5 rounded-md p-2 hover:bg-accent">
                  <Checkbox checked={checked} onCheckedChange={() => toggleAccount(acc.id)} />
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[10px]">{acc.github_login.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="flex-1 truncate text-sm">{displayName(acc)}</span>
                  {checked && (
                    <Badge variant="secondary" className="text-xs">
                      {(allRepos || []).filter((r) => r.account_id === acc.id).length || '...'}
                    </Badge>
                  )}
                </label>
              )
            })}
          </CardContent>
        </Card>

        {/* Right: repo match + operations */}
        <div className="space-y-6">
          {/* Repo filter */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <GitBranch className="h-4 w-4" /> {t('batchWorkflow.repoMatch')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedAccounts.length === 0 ? (
                <EmptyState icon={Users} title={t('batchWorkflow.selectAccountFirst')} description={t('batchWorkflow.selectAccountHint')} />
              ) : reposLoading ? (
                <LoadingState variant="skeleton" skeletonRows={3} />
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={repoName}
                        onChange={(e) => { setRepoName(e.target.value); setSelectedRepoIds([]); setResults(null) }}
                        placeholder={t('batchWorkflow.repoNamePlaceholder')}
                        className="pl-9"
                      />
                    </div>
                    <Button variant="outline" size="sm" onClick={selectAllMatched}>
                      {t('batchWorkflow.selectAllMatched')}
                    </Button>
                  </div>

                  {availableRepoNames.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs text-muted-foreground">{t('batchWorkflow.crossAccountRepos')}</span>
                      {availableRepoNames.map((name) => (
                        <button
                          key={name}
                          onClick={() => { setRepoName(name); setSelectedRepoIds([]); setResults(null) }}
                          className={`rounded-md border px-2 py-0.5 text-xs transition-colors ${
                            repoName === name ? 'border-primary bg-primary/10 text-primary' : 'hover:bg-accent'
                          }`}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground">
                    {t('batchWorkflow.matchedCount', { count: matchedRepos.length })}
                    ，{t('batchWorkflow.selectedCount', { count: selectedRepoIds.length })}
                  </p>

                  {/* Matched results table */}
                  {matchedRepos.length > 0 && (
                    <div className="max-h-[300px] overflow-y-auto rounded-md border">
                      {matchedRepos.map((r) => {
                        const checked = selectedRepoIds.includes(r.id)
                        return (
                          <label
                            key={r.id}
                            className="flex cursor-pointer items-center gap-3 border-b px-3 py-2 last:border-0 hover:bg-accent"
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={() => toggleRepo(r.id)}
                            />
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-[10px]">{r.accountLogin.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{r.accountLogin}</span>
                            <span className="text-sm text-muted-foreground">/</span>
                            <span className="flex-1 truncate text-sm font-mono">{r.name}</span>
                            {r.private && <Badge variant="warning" className="text-xs">{t('ui.private')}</Badge>}
                            {r.fork && <Badge variant="secondary" className="text-xs">Fork</Badge>}
                          </label>
                        )
                      })}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Common workflows quick-select (shows when repos selected) */}
          {selectedRepoIds.length > 0 && commonWorkflows.length > 0 && (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-3">
                <div className="mb-2 flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium text-primary">
                    发现 {commonWorkflows.length} 个共有工作流（{selectedRepoIds.length} 个仓库）— 点击直接触发
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {commonWorkflows.map((wf) => {
                    const isFull = wf.count === selectedRepoIds.length
                    return (
                      <button
                        key={wf.filename}
                        onClick={() => {
                          setDispatchFilename(wf.filename)
                          setMode('dispatch')
                          toast.info(`已选择「${wf.filename}」，切换到触发模式`)
                        }}
                        className={cn(
                          'inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium transition-all hover:scale-105',
                          dispatchFilename === wf.filename && mode === 'dispatch'
                            ? 'border-primary bg-primary text-primary-foreground'
                            : isFull
                            ? 'border-success/40 bg-success/10 text-success hover:bg-success/20'
                            : 'border-border bg-background hover:bg-accent'
                        )}
                        title={`${wf.count}/${selectedRepoIds.length} 个仓库有此工作流`}
                      >
                        {isFull && <CircleCheck className="h-3 w-3" />}
                        {wf.filename}
                        <span className={cn(
                          'ml-0.5 text-[10px]',
                          dispatchFilename === wf.filename && mode === 'dispatch' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        )}>
                          {wf.count}/{selectedRepoIds.length}
                        </span>
                      </button>
                    )
                  })}
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  绿色 = 全部仓库都有 · 点击后自动填充文件名并切换到触发模式
                </p>
              </CardContent>
            </Card>
          )}

          {/* Workflow operations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileCode className="h-4 w-4" /> {t('batchWorkflow.workflowOps')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={mode} onValueChange={(v) => setMode(v as 'create' | 'dispatch')}>
                <TabsList className="mb-4">
                  <TabsTrigger value="create"><FileCode className="mr-2 h-4 w-4" />{t('batchWorkflow.createWorkflow')}</TabsTrigger>
                  <TabsTrigger value="dispatch"><Play className="mr-2 h-4 w-4" />{t('batchWorkflow.dispatchWorkflow')}</TabsTrigger>
                </TabsList>

                <TabsContent value="create" className="space-y-3">
                  {commonWorkflows.length > 0 && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">已有工作流（点击填充文件名）</label>
                      <div className="flex flex-wrap gap-1.5">
                        {commonWorkflows.map((wf) => (
                          <button
                            key={wf.filename}
                            onClick={() => setWfFilename(wf.filename)}
                            className={cn(
                              'rounded-md border px-2 py-0.5 text-xs transition-colors',
                              wfFilename === wf.filename ? 'border-primary bg-primary/10 text-primary' : 'hover:bg-accent'
                            )}
                            title={`${wf.count}/${selectedRepoIds.length} 个仓库有此工作流`}
                          >
                            {wf.filename}
                            <span className="ml-1 text-muted-foreground">{wf.count}/{selectedRepoIds.length}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">{t('batchWorkflow.workflowFilename')}</label>
                      <Input value={wfFilename} onChange={(e) => setWfFilename(e.target.value)} placeholder="keepalive.yml" className="font-mono text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Commit Message</label>
                      <Input value={commitMsg} onChange={(e) => setCommitMsg(e.target.value)} placeholder="Batch create workflow" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">{t('batchWorkflow.workflowContent')}</label>
                    <Textarea
                      value={wfContent}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setWfContent(e.target.value)}
                      rows={12}
                      className="font-mono text-xs leading-relaxed"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="dispatch" className="space-y-3">
                  {commonWorkflows.length > 0 && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">已有工作流（点击填充文件名）</label>
                      <div className="flex flex-wrap gap-1.5">
                        {commonWorkflows.map((wf) => (
                          <button
                            key={wf.filename}
                            onClick={() => setDispatchFilename(wf.filename)}
                            className={cn(
                              'rounded-md border px-2 py-0.5 text-xs transition-colors',
                              dispatchFilename === wf.filename ? 'border-primary bg-primary/10 text-primary' : 'hover:bg-accent'
                            )}
                            title={`${wf.count}/${selectedRepoIds.length} 个仓库有此工作流`}
                          >
                            {wf.filename}
                            <span className="ml-1 text-muted-foreground">{wf.count}/{selectedRepoIds.length}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">{t('batchWorkflow.dispatchFilename')}</label>
                    <Input value={dispatchFilename} onChange={(e) => setDispatchFilename(e.target.value)} placeholder="keepalive.yml" className="font-mono text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">分支 Ref（可选，默认 main）</label>
                    <Input value={dispatchRef} onChange={(e) => setDispatchRef(e.target.value)} placeholder="main" className="font-mono text-sm" />
                  </div>
                  {/* Workflow inputs */}
                  {loadingInputs && <p className="text-xs text-muted-foreground animate-pulse">正在获取工作流参数...</p>}
                  {workflowInputs.length > 0 && (
                    <div className="space-y-2 rounded-md border border-primary/20 bg-primary/5 p-3">
                      <p className="text-xs font-medium text-primary">工作流参数（workflow_dispatch inputs）</p>
                      <p className="text-[11px] text-muted-foreground">参数将应用于所有选中的仓库。已自动填充默认值。</p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {workflowInputs.map((inp) => (
                          <div key={inp.name} className="space-y-1">
                            <label className="flex items-center gap-1 text-xs font-medium">
                              {inp.name}
                              {inp.required && <span className="text-destructive">*</span>}
                              {inp.type === 'choice' && <Badge variant="secondary" className="px-1 text-[10px]">{inp.type}</Badge>}
                            </label>
                            {inp.description && <p className="text-[10px] text-muted-foreground">{inp.description}</p>}
                            {inp.type === 'choice' && inp.options ? (
                              <Select
                                value={dispatchInputs[inp.name] || ''}
                                onValueChange={(v) => setDispatchInputs(prev => ({ ...prev, [inp.name]: v }))}
                              >
                                <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="选择..." /></SelectTrigger>
                                <SelectContent>
                                  {inp.options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                </SelectContent>
                              </Select>
                            ) : inp.type === 'boolean' ? (
                              <Select
                                value={dispatchInputs[inp.name] || 'false'}
                                onValueChange={(v) => setDispatchInputs(prev => ({ ...prev, [inp.name]: v }))}
                              >
                                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="true">true</SelectItem>
                                  <SelectItem value="false">false</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                value={dispatchInputs[inp.name] || ''}
                                onChange={(e) => setDispatchInputs(prev => ({ ...prev, [inp.name]: e.target.value }))}
                                placeholder={inp.default || `输入 ${inp.name}`}
                                className="h-8 text-xs"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <Alert>
                    <AlertDescription className="space-y-1">
                      <p>{t('batchWorkflow.dispatchHint')}</p>
                      <p>{t('batchWorkflow.dispatchHint2')}</p>
                    </AlertDescription>
                  </Alert>
                </TabsContent>
              </Tabs>

              {/* Execution results */}
              {results && (
                <Alert className="mt-4">
                  <AlertTitle>{t('ui.results')}</AlertTitle>
                  <AlertDescription>
                    <div className="mt-2 max-h-[200px] space-y-1 overflow-y-auto">
                      {results.success.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CircleCheck className="h-4 w-4 shrink-0 text-success" />
                          <span>repo_id: {s.repo_id}</span>
                        </div>
                      ))}
                      {results.failed.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CircleX className="h-4 w-4 shrink-0 text-destructive" />
                          <span>repo_id: {f.repo_id} — {f.error}</span>
                        </div>
                      ))}
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Execute buttons */}
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => { setResults(null); setSelectedRepoIds([]) }}>
                  {t('ui.reset')}
                </Button>
                <Button
                  size="lg"
                  disabled={!canExecute || isExecuting}
                  onClick={() => mode === 'create' ? createMut.mutate() : dispatchMut.mutate()}
                >
                  {isExecuting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('batchWorkflow.executing')}</>
                  ) : mode === 'create' ? (
                    <><FileCode className="mr-2 h-4 w-4" /> {t('batchWorkflow.createForN', { count: selectedRepoIds.length })}</>
                  ) : (
                    <><Play className="mr-2 h-4 w-4" /> {t('batchWorkflow.dispatchForN', { count: selectedRepoIds.length })}</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
