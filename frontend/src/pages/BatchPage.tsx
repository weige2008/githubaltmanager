import { useState, useMemo, useCallback } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { accountApi, repoApi, batchApi, type Repo, type Account } from '@/api'
import { displayName, sortAccounts } from '@/lib/account'
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

  const sortedAccountsList = useMemo(() => accounts ? sortAccounts(accounts) : [], [accounts])
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
      toast.success(t('batchWorkflow.partialMsg', { success: data.success?.length || 0, failed: data.failed?.length || 0 }))
    },
    onError: (e: any) => toast.error(e?.message || t('batchWorkflow.createFailed')),
  })

  const dispatchMut = useMutation({
    mutationFn: () => batchApi.dispatch({
      repo_ids: selectedRepoIds,
      filename: dispatchFilename,
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
                {selectedAccounts.length === (accounts?.length || 0) ? t('batchRepo.deselectAll') : t('batchRepo.selectAll')}
              </Button>
            </CardTitle>
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
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">{t('batchWorkflow.dispatchFilename')}</label>
                    <Input value={dispatchFilename} onChange={(e) => setDispatchFilename(e.target.value)} placeholder="keepalive.yml" className="font-mono text-sm" />
                  </div>
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
