import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { accountApi, repoApi, batchApi, type Repo } from '@/api'
import { displayName, sortAccounts } from '@/lib/account'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { LoadingState } from '@/components/ui/loading-state'
import { Search, Download, RefreshCw, Lock, Globe, Loader2, CircleCheck, CircleX } from 'lucide-react'
import { toast } from 'sonner'

function BatchUpdateRepos() {
  const { t } = useTranslation()
  const { data: accounts } = useQuery({ queryKey: ['accounts'], queryFn: () => accountApi.list() })
  const { data: groups } = useQuery({ queryKey: ['accounts', 'groups'], queryFn: () => accountApi.listGroups() })
  const [selectedAccounts, setSelectedAccounts] = useState<number[]>([])
  const [groupFilter, setGroupFilter] = useState('')
  const [repoName, setRepoName] = useState('')
  const [selectedRepoIds, setSelectedRepoIds] = useState<number[]>([])
  const [subMode, setSubMode] = useState<'update' | 'visibility'>('update')

  // Update mode
  const [templateUrl, setTemplateUrl] = useState('')
  // Visibility mode
  const [targetPrivate, setTargetPrivate] = useState(true)

  const [executing, setExecuting] = useState(false)
  const [progress, setProgress] = useState<{ current: number; total: number; currentName: string } | null>(null)
  const [results, setResults] = useState<{ success: any[]; failed: any[] } | null>(null)

  const { data: allRepos, isLoading: reposLoading } = useQuery({
    queryKey: ['update-repos', selectedAccounts],
    queryFn: async () => {
      const results = await Promise.all(selectedAccounts.map(async (accId) => {
        try { return await repoApi.listByAccount(accId) } catch { return [] as Repo[] }
      }))
      return results.flat()
    },
    enabled: selectedAccounts.length > 0,
  })

  const matchedRepos = useMemo(() => {
    return (allRepos || []).filter(r => !repoName.trim() || r.name.toLowerCase() === repoName.trim().toLowerCase())
  }, [allRepos, repoName])

  const availableRepoNames = useMemo(() => {
    if (!allRepos) return []
    const names = new Set<string>()
    allRepos.forEach(r => { const c = allRepos.filter(r2 => r2.name === r.name).length; if (c > 1) names.add(r.name) })
    return Array.from(names).sort()
  }, [allRepos])

  const accMap = new Map<number, string>()
  ;(accounts || []).forEach(a => accMap.set(a.id, displayName(a)))

  const sortedAccounts = accounts ? sortAccounts(accounts).filter(a => !groupFilter || groupFilter === '__ungrouped__' ? (groupFilter === '__ungrouped__' ? !a.group : true) : (a.group || '') === groupFilter) : []

  const toggleAccount = (id: number) => { setSelectedAccounts(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]); setSelectedRepoIds([]) }
  const toggleRepo = (id: number) => setSelectedRepoIds(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id])

  const executeBatch = async () => {
    setExecuting(true)
    setResults(null)
    const allSuccess: any[] = []
    const allFailed: any[] = []

    for (let i = 0; i < selectedRepoIds.length; i++) {
      const rid = selectedRepoIds[i]
      const repo = matchedRepos.find(r => r.id === rid)
      const label = repo ? `${accMap.get(repo.account_id) || '?'}/${repo.name}` : `repo ${rid}`
      setProgress({ current: i + 1, total: selectedRepoIds.length, currentName: label })

      try {
        let data: { success: any[]; failed: any[] }
        if (subMode === 'update') {
          const match = templateUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
          if (!match) throw new Error('源仓库 URL 格式错误')
          data = await batchApi.updateRepos({ repo_ids: [rid], template_owner: match[1], template_repo: match[2] })
        } else {
          data = await batchApi.toggleVisibility({ repo_ids: [rid], is_private: targetPrivate })
        }
        allSuccess.push(...data.success)
        allFailed.push(...data.failed)
      } catch (e: any) {
        allFailed.push({ repo_id: rid, error: e?.message || '请求失败' })
      }
      setResults({ success: [...allSuccess], failed: [...allFailed] })
    }

    setExecuting(false)
    setProgress(null)
    const fCount = allFailed.length
    if (fCount === 0) toast.success(`全部成功：${allSuccess.length} 项`)
    else toast.warning(`完成：${allSuccess.length} 成功，${fCount} 失败`)
  }

  const canExecute = selectedRepoIds.length > 0 && (subMode === 'visibility' || templateUrl.trim())

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Left: account selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base">
            <span>选择账户</span>
            <Button variant="ghost" size="sm" onClick={() => { setSelectedAccounts(prev => prev.length === sortedAccounts.length ? [] : sortedAccounts.map(a => a.id)); setSelectedRepoIds([]) }}>
              {selectedAccounts.length === sortedAccounts.length && sortedAccounts.length > 0 ? '取消' : '全选'}
            </Button>
          </CardTitle>
          {(groups || []).filter(g => g).length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              <button onClick={() => setGroupFilter('')} className={cn('rounded-md px-2 py-0.5 text-xs transition-colors', !groupFilter ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}>全部</button>
              {(groups || []).filter(g => g).map(g => (
                <button key={g} onClick={() => setGroupFilter(g)} className={cn('rounded-md px-2 py-0.5 text-xs transition-colors', groupFilter === g ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}>{g}</button>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent className="max-h-[500px] space-y-1 overflow-y-auto">
          {sortedAccounts.map(acc => (
            <label key={acc.id} className="flex cursor-pointer items-center gap-2.5 rounded-md p-2 hover:bg-accent">
              <Checkbox checked={selectedAccounts.includes(acc.id)} onCheckedChange={() => toggleAccount(acc.id)} />
              <span className="flex-1 truncate text-sm">{displayName(acc)}</span>
            </label>
          ))}
        </CardContent>
      </Card>

      {/* Right */}
      <div className="space-y-6">
        {/* Repo matching */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Search className="h-4 w-4" /> 匹配目标仓库</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {selectedAccounts.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">请先在左侧选择账户</div>
            ) : reposLoading ? <LoadingState variant="skeleton" skeletonRows={3} /> : (
              <>
                <div className="flex items-center gap-2">
                  <Input value={repoName} onChange={e => { setRepoName(e.target.value); setSelectedRepoIds([]) }} placeholder="输入仓库名称（精确匹配）" className="flex-1" />
                  <Button variant="outline" size="sm" onClick={() => setSelectedRepoIds(matchedRepos.map(r => r.id))} disabled={matchedRepos.length === 0}>全选匹配</Button>
                </div>
                {availableRepoNames.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs text-muted-foreground">跨账户同名：</span>
                    {availableRepoNames.map(name => (
                      <button key={name} onClick={() => { setRepoName(name); setSelectedRepoIds(matchedRepos.filter(r => r.name === name).map(r => r.id)) }} className={cn('rounded-md border px-2 py-0.5 text-xs transition-colors', repoName === name ? 'border-primary bg-primary/10 text-primary' : 'hover:bg-accent')}>{name}</button>
                    ))}
                  </div>
                )}
                {matchedRepos.length > 0 && (
                  <div className="max-h-[300px] overflow-y-auto rounded-md border">
                    {matchedRepos.map(r => {
                      const checked = selectedRepoIds.includes(r.id)
                      return (
                        <label key={r.id} className="flex cursor-pointer items-center gap-3 border-b px-3 py-2 last:border-0 hover:bg-accent">
                          <Checkbox checked={checked} onCheckedChange={() => toggleRepo(r.id)} />
                          <span className="text-sm font-medium">{accMap.get(r.account_id) || '?'}</span>
                          <span className="text-muted-foreground">/</span>
                          <span className="flex-1 truncate font-mono text-sm">{r.name}</span>
                          {r.private ? <Badge variant="warning" className="text-xs">私有</Badge> : <Badge variant="secondary" className="text-xs">公有</Badge>}
                        </label>
                      )
                    })}
                  </div>
                )}
                <p className="text-sm text-muted-foreground">匹配 {matchedRepos.length} 个，已选 {selectedRepoIds.length} 个</p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Mode tabs */}
        <Card>
          <CardHeader>
            <Tabs value={subMode} onValueChange={(v) => { setSubMode(v as 'update' | 'visibility'); setResults(null) }}>
              <TabsList>
                <TabsTrigger value="update"><RefreshCw className="mr-2 h-3.5 w-3.5" />拉取更新</TabsTrigger>
                <TabsTrigger value="visibility"><Lock className="mr-2 h-3.5 w-3.5" />切换可见性</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="space-y-4">
            {subMode === 'update' ? (
              <>
                <Alert>
                  <AlertDescription>
                    <p className="font-medium text-warning">⚠️ 此操作会清空目标仓库的所有文件，然后从源仓库复制全部文件。</p>
                    <p className="mt-1 text-sm text-muted-foreground">操作不可撤销，请确认目标仓库选择正确。</p>
                  </AlertDescription>
                </Alert>
                <div className="space-y-2">
                  <label className="text-sm font-medium">源仓库 URL</label>
                  <Input value={templateUrl} onChange={e => setTemplateUrl(e.target.value)} placeholder="https://github.com/owner/repo" />
                </div>
              </>
            ) : (
              <>
                <Alert><AlertDescription><p className="text-sm text-muted-foreground">切换仓库的公有/私有状态，不修改任何文件。</p></AlertDescription></Alert>
                <div className="space-y-2">
                  <label className="text-sm font-medium">目标状态</label>
                  <div className="flex gap-2">
                    <button onClick={() => setTargetPrivate(true)} className={cn('flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors', targetPrivate ? 'border-primary bg-primary/10 text-primary' : 'border-input hover:bg-accent')}>
                      <Lock className="h-4 w-4" /> 私有仓库
                    </button>
                    <button onClick={() => setTargetPrivate(false)} className={cn('flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors', !targetPrivate ? 'border-primary bg-primary/10 text-primary' : 'border-input hover:bg-accent')}>
                      <Globe className="h-4 w-4" /> 公有仓库
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Progress */}
            {progress && (
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium text-primary">
                    <Loader2 className="h-4 w-4 animate-spin" /> {progress.currentName}
                  </span>
                  <span className="text-xs text-muted-foreground">{progress.current} / {progress.total}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${(progress.current / progress.total) * 100}%` }} />
                </div>
              </div>
            )}

            {/* Results */}
            {results && (
              <Alert>
                <AlertTitle>执行结果（成功 {results.success.length} / 失败 {results.failed.length}）</AlertTitle>
                <AlertDescription>
                  <div className="mt-2 max-h-[250px] space-y-1 overflow-y-auto">
                    {results.success.map((s, i) => {
                      const repo = matchedRepos.find(r => r.id === s.repo_id)
                      return (
                        <div key={`s${i}`} className="flex items-center gap-2 text-sm">
                          <CircleCheck className="h-4 w-4 shrink-0 text-success" />
                          <span>{repo ? `${accMap.get(repo.account_id) || '?'}/${repo.name}` : `repo ${s.repo_id}`}</span>
                          {s.visibility && <Badge variant="secondary" className="text-xs">{s.visibility}</Badge>}
                        </div>
                      )
                    })}
                    {results.failed.map((f, i) => {
                      const repo = matchedRepos.find(r => r.id === f.repo_id)
                      return (
                        <div key={`f${i}`} className="flex items-center gap-2 rounded-md border border-destructive/20 bg-destructive/5 px-2 py-1 text-sm">
                          <CircleX className="h-4 w-4 shrink-0 text-destructive" />
                          <span className="font-medium">{repo ? `${accMap.get(repo.account_id) || '?'}/${repo.name}` : `repo ${f.repo_id}`}</span>
                          <span className="ml-auto text-xs text-destructive">{f.error}</span>
                        </div>
                      )
                    })}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => { setResults(null); setSelectedRepoIds([]) }}>重置</Button>
              <Button size="lg" disabled={!canExecute || executing} onClick={executeBatch} className="gap-2">
                {executing ? <Loader2 className="h-4 w-4 animate-spin" /> : subMode === 'update' ? <RefreshCw className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                {executing ? '执行中...' : subMode === 'update' ? `更新 ${selectedRepoIds.length} 个仓库` : `切换 ${selectedRepoIds.length} 个仓库为${targetPrivate ? '私有' : '公有'}`}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export { BatchUpdateRepos }
