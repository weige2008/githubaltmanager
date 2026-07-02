import { useState, useMemo, useCallback } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { accountApi, repoApi, batchApi, type Repo, type Account } from '@/api'
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
import { Users, GitBranch, FileCode, Play, Loader2, CircleCheck, CircleX, Search } from 'lucide-react'
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
  const [results, setResults] = useState<{ success: any[]; failed: any[] } | null>(null)

  const { data: accounts, isLoading: accLoading, isError: accError, refetch: accRefetch } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => accountApi.list(),
  })

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
    if (!accounts) return
    setSelectedAccounts((prev) => prev.length === accounts.length ? [] : accounts.map((a) => a.id))
    setSelectedRepoIds([])
    setResults(null)
  }

  const toggleRepo = (id: number) => {
    setSelectedRepoIds((prev) => prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id])
  }

  const selectAllMatched = () => setSelectedRepoIds(matchedRepos.map((r) => r.id))

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
      toast.success(`完成：${data.success?.length || 0} 成功，${data.failed?.length || 0} 失败`)
    },
    onError: (e: any) => toast.error(e?.message || '批量创建失败'),
  })

  const dispatchMut = useMutation({
    mutationFn: () => batchApi.dispatch({
      repo_ids: selectedRepoIds,
      filename: dispatchFilename,
    }),
    onSuccess: (data) => {
      setResults(data)
      toast.success(`完成：${data.success?.length || 0} 成功，${data.failed?.length || 0} 失败`)
    },
    onError: (e: any) => toast.error(e?.message || '批量触发失败'),
  })

  const canExecute = selectedRepoIds.length > 0 && (mode === 'dispatch' ? !!dispatchFilename.trim() : !!wfFilename.trim())
  const isExecuting = createMut.isPending || dispatchMut.isPending

  if (accLoading) return <LoadingState />
  if (accError) return <ErrorState retry={accRefetch} />

  return (
    <div className="space-y-6">
      <PageHeader title="批量工作流操作" description="跨多个账户的同名仓库，批量创建或触发同一份 GitHub Actions 工作流" />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* 左侧：账户选择 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2"><Users className="h-4 w-4" /> 选择账户</span>
              <Button variant="ghost" size="sm" onClick={toggleAllAccounts}>
                {selectedAccounts.length === (accounts?.length || 0) ? '取消全选' : '全选'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-[400px] space-y-1 overflow-y-auto">
            {accounts?.map((acc) => {
              const checked = selectedAccounts.includes(acc.id)
              return (
                <label key={acc.id} className="flex cursor-pointer items-center gap-2.5 rounded-md p-2 hover:bg-accent">
                  <Checkbox checked={checked} onCheckedChange={() => toggleAccount(acc.id)} />
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[10px]">{acc.github_login.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="flex-1 truncate text-sm">{acc.github_login}</span>
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

        {/* 右侧：仓库匹配 + 操作 */}
        <div className="space-y-6">
          {/* 仓库筛选 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <GitBranch className="h-4 w-4" /> 仓库匹配
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedAccounts.length === 0 ? (
                <EmptyState icon={Users} title="请先选择账户" description="在左侧选择需要操作的账户，然后筛选同名仓库" />
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
                        placeholder="输入仓库名称（如 keep-alive）"
                        className="pl-9"
                      />
                    </div>
                    <Button variant="outline" size="sm" onClick={selectAllMatched}>
                      全选匹配
                    </Button>
                  </div>

                  {availableRepoNames.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-xs text-muted-foreground">跨账户同名仓库：</span>
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
                    共匹配 <span className="font-bold text-foreground">{matchedRepos.length}</span> 个仓库，
                    已选 <span className="font-bold text-primary">{selectedRepoIds.length}</span> 个
                  </p>

                  {/* 匹配结果表 */}
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
                            {r.private && <Badge variant="warning" className="text-xs">私有</Badge>}
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

          {/* 工作流操作 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileCode className="h-4 w-4" /> 工作流操作
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={mode} onValueChange={(v) => setMode(v as 'create' | 'dispatch')}>
                <TabsList className="mb-4">
                  <TabsTrigger value="create"><FileCode className="mr-2 h-4 w-4" />创建/覆盖工作流</TabsTrigger>
                  <TabsTrigger value="dispatch"><Play className="mr-2 h-4 w-4" />触发工作流</TabsTrigger>
                </TabsList>

                <TabsContent value="create" className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">工作流文件名</label>
                      <Input value={wfFilename} onChange={(e) => setWfFilename(e.target.value)} placeholder="keepalive.yml" className="font-mono text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Commit Message</label>
                      <Input value={commitMsg} onChange={(e) => setCommitMsg(e.target.value)} placeholder="Batch create workflow" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">工作流内容（YAML）</label>
                    <Textarea
                      value={wfContent}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setWfContent(e.target.value)}
                      rows={12}
                      className="font-mono text-xs leading-relaxed"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="dispatch" className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">要触发的工作流文件名</label>
                    <Input value={dispatchFilename} onChange={(e) => setDispatchFilename(e.target.value)} placeholder="keepalive.yml" className="font-mono text-sm" />
                  </div>
                  <Alert>
                    <AlertDescription>
                      将对选中的 {selectedRepoIds.length} 个仓库发送 <code className="rounded bg-muted px-1 font-mono">workflow_dispatch</code> 请求。
                      确保工作流文件中包含 <code className="rounded bg-muted px-1 font-mono">on: workflow_dispatch</code> 触发器。
                    </AlertDescription>
                  </Alert>
                </TabsContent>
              </Tabs>

              {/* 执行结果 */}
              {results && (
                <Alert className="mt-4">
                  <AlertTitle>执行结果</AlertTitle>
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

              {/* 执行按钮 */}
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => { setResults(null); setSelectedRepoIds([]) }}>
                  重置
                </Button>
                <Button
                  size="lg"
                  disabled={!canExecute || isExecuting}
                  onClick={() => mode === 'create' ? createMut.mutate() : dispatchMut.mutate()}
                >
                  {isExecuting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> 执行中...</>
                  ) : mode === 'create' ? (
                    <><FileCode className="mr-2 h-4 w-4" /> 为 {selectedRepoIds.length} 个仓库创建工作流</>
                  ) : (
                    <><Play className="mr-2 h-4 w-4" /> 触发 {selectedRepoIds.length} 个仓库的工作流</>
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
