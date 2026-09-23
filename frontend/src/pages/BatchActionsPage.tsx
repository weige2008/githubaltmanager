import { useMemo, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { accountApi, batchApi, type Account } from '@/api'
import { displayName, sortAccounts } from '@/lib/account'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { LoadingState } from '@/components/ui/loading-state'
import { Star, UserPlus, UserMinus, Loader2, CircleCheck, CircleX, GitBranch, Users as UsersIcon, Search, ShieldAlert, Ban } from 'lucide-react'
import { toast } from 'sonner'

type ActionResult = { success: any[]; failed: any[] }
type Action = 'star' | 'unstar' | 'follow' | 'unfollow'
// 前端并发执行：账户间互不影响配额（各用自己的 token），5 路并发在速度与礼貌之间取平衡
const CONCURRENCY = 5

export default function BatchActionsPage() {
  const { t } = useTranslation()
  const [selectedAccounts, setSelectedAccounts] = useState<number[]>([])
  const [groupFilter, setGroupFilter] = useState<string>('')
  const [accountSearch, setAccountSearch] = useState('')
  const [starTarget, setStarTarget] = useState('')
  const [followTarget, setFollowTarget] = useState('')
  const [executing, setExecuting] = useState<Action | null>(null)
  const [results, setResults] = useState<ActionResult | null>(null)
  const [progress, setProgress] = useState<{ done: number; total: number; ok: number; fail: number } | null>(null)
  const cancelRef = useRef(false)

  const { data: accounts, isLoading: accLoading, isError: accError } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => accountApi.list(),
  })
  const { data: groups } = useQuery({ queryKey: ['accounts', 'groups'], queryFn: () => accountApi.listGroups() })

  const sortedAccounts = useMemo(() => {
    if (!accounts) return []
    let list = sortAccounts(accounts)
    if (groupFilter === '__ungrouped__') list = list.filter(a => !a.group)
    else if (groupFilter) list = list.filter(a => (a.group || '') === groupFilter)
    if (accountSearch.trim()) {
      const q = accountSearch.toLowerCase()
      list = list.filter(a => a.github_login.toLowerCase().includes(q) || (a.note || '').toLowerCase().includes(q))
    }
    return list
  }, [accounts, groupFilter, accountSearch])

  const accMap = useMemo(() => {
    const m = new Map<number, Account>()
    ;(accounts || []).forEach(a => m.set(a.id, a))
    return m
  }, [accounts])

  const visibleAccountIds = useMemo(() => sortedAccounts.map(a => a.id), [sortedAccounts])
  const allVisibleSelected = visibleAccountIds.length > 0 && visibleAccountIds.every(id => selectedAccounts.includes(id))

  const toggleAccount = (id: number) => setSelectedAccounts(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])
  const toggleAllAccounts = () => {
    setSelectedAccounts(prev => allVisibleSelected ? prev.filter(id => !visibleAccountIds.includes(id)) : [...new Set([...prev, ...visibleAccountIds])])
  }
  const removeUnhealthy = () => {
    const bad = new Set((accounts || []).filter(a => a.status === 'banned' || a.status === 'restricted').map(a => a.id))
    setSelectedAccounts(prev => prev.filter(id => !bad.has(id)))
  }

  const label = (id: number) => {
    const a = accMap.get(id)
    return a ? displayName(a) : `#${id}`
  }

  const parseRepo = (): { owner: string; repo: string } | null => {
    const s = starTarget.trim()
    if (!s) return null
    const m = s.match(/github\.com\/([^/]+)\/([^/]+)/) || s.match(/^([\w.-]+)\/([\w.-]+)$/)
    if (!m) return null
    return { owner: m[1], repo: m[2].replace(/\.git$/, '') }
  }

  const execute = async (action: Action) => {
    const repo = parseRepo()
    const targetUser = followTarget.trim()
    if ((action === 'star' || action === 'unstar') && !repo) { toast.error('请输入正确的仓库地址或 owner/repo'); return }
    if ((action === 'follow' || action === 'unfollow') && !targetUser) { toast.error('请输入要操作的用户名'); return }

    const ids = [...selectedAccounts]
    const total = ids.length
    setExecuting(action)
    setResults(null)
    cancelRef.current = false
    setProgress({ done: 0, total, ok: 0, fail: 0 })

    let ok = 0, fail = 0, cursor = 0
    const allSuccess: any[] = [], allFailed: any[] = []

    const worker = async () => {
      while (!cancelRef.current) {
        const idx = cursor++
        if (idx >= ids.length) return
        const id = ids[idx]
        try {
          let data: ActionResult
          if (action === 'star') data = await batchApi.star({ account_ids: [id], owner: repo!.owner, repo: repo!.repo })
          else if (action === 'unstar') data = await batchApi.unstar({ account_ids: [id], owner: repo!.owner, repo: repo!.repo })
          else if (action === 'follow') data = await batchApi.follow({ account_ids: [id], username: targetUser })
          else data = await batchApi.unfollow({ account_ids: [id], username: targetUser })
          const f = data.failed?.[0]
          if (f) { fail++; allFailed.push({ ...f, account_id: id }) } else { ok++; allSuccess.push(...(data.success.length ? data.success : [{ account_id: id }])) }
        } catch (e: any) {
          fail++
          allFailed.push({ account_id: id, error: e?.message || '请求失败' })
        }
        const done = ok + fail
        setProgress({ done, total, ok, fail })
        setResults({ success: [...allSuccess], failed: [...allFailed] })
      }
    }
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, ids.length) }, worker))

    setExecuting(null)
    const wasCanceled = cancelRef.current
    setProgress(null)
    const canceledCount = total - ok - fail
    if (wasCanceled && canceledCount > 0) toast.info(`已取消，剩余 ${canceledCount} 个账户未执行`)
    if (fail === 0) toast.success(`全部成功：${ok} 个账户`)
    else toast.warning(`完成：${ok} 成功，${fail} 失败`)
  }

  if (accLoading) return <LoadingState />
  if (accError) return (
    <div className="space-y-4">
      <PageHeader title={t('nav.batchActions')} description={t('batchActions.description')} />
      <Card><CardContent className="p-6 text-center text-sm text-muted-foreground">账户加载失败</CardContent></Card>
    </div>
  )

  const canStar = selectedAccounts.length > 0 && !!parseRepo()

  return (
    <div className="space-y-6">
      <PageHeader title={t('nav.batchActions')} description={t('batchActions.description')} />

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* 左：账户选择 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2"><UsersIcon className="h-4 w-4" /> 选择账户</span>
              <div className="flex items-center gap-1">
                {selectedAccounts.length > 0 && (
                  <>
                    <span className="mr-1 text-xs text-muted-foreground">已选 {selectedAccounts.length}</span>
                    <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={removeUnhealthy} title="从已选中移除受限/封禁账户">
                      <ShieldAlert className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={() => setSelectedAccounts([])}>清空</Button>
                  </>
                )}
                <Button variant="ghost" size="sm" onClick={toggleAllAccounts}>
                  {allVisibleSelected ? '取消全选' : '全选'}
                </Button>
              </div>
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
          <CardContent className="space-y-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input value={accountSearch} onChange={e => setAccountSearch(e.target.value)} placeholder="搜索账户…" className="h-8 pl-8 text-sm" />
            </div>
            <div className="max-h-[480px] space-y-1 overflow-y-auto">
              {sortedAccounts.map(acc => (
                <label key={acc.id} className="flex cursor-pointer items-center gap-2.5 rounded-md p-2 hover:bg-accent">
                  <Checkbox checked={selectedAccounts.includes(acc.id)} onCheckedChange={() => toggleAccount(acc.id)} />
                  <span className="flex-1 truncate text-sm">{displayName(acc)}</span>
                  <Badge variant={acc.status === 'active' ? 'success' : acc.status === 'banned' ? 'destructive' : acc.status === 'restricted' ? 'warning' : 'secondary'} className="text-[10px]">{acc.status}</Badge>
                </label>
              ))}
              {sortedAccounts.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">该筛选下没有账户</p>}
            </div>
          </CardContent>
        </Card>

        {/* 右：动作卡片 */}
        <div className="space-y-6">
          <Alert>
            <AlertDescription>
              以每个账户自己的 token 执行（互不挤占 API 配额），数量不限、5 路并发、可随时取消。选中数：{selectedAccounts.length}
            </AlertDescription>
          </Alert>

          {/* 执行进度 */}
          {progress && (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-sm font-medium text-primary">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {executing === 'star' ? 'Star 执行中' : executing === 'unstar' ? '取消 Star 执行中' : executing === 'follow' ? '关注执行中' : '取消关注执行中'}
                    ：{progress.done} / {progress.total}
                  </span>
                  <Button size="sm" variant="outline" onClick={() => { cancelRef.current = true }}>取消剩余</Button>
                </div>
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span className="text-success">成功 {progress.ok}</span>
                  <span className="text-destructive">失败 {progress.fail}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${Math.round((progress.done / Math.max(1, progress.total)) * 100)}%` }} />
                </div>
              </CardContent>
            </Card>
          )}

          {/* 批量 Star */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><Star className="h-4 w-4" /> 批量 Star 仓库</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">目标仓库</label>
                <Input value={starTarget} onChange={e => setStarTarget(e.target.value)} placeholder="https://github.com/owner/repo 或 owner/repo" />
                {starTarget.trim() && parseRepo() && (
                  <p className="flex items-center gap-1 text-xs text-muted-foreground"><GitBranch className="h-3 w-3" />将操作：{parseRepo()!.owner}/{parseRepo()!.repo}</p>
                )}
                {starTarget.trim() && !parseRepo() && (
                  <p className="text-xs text-destructive">无法解析，请使用 github.com/owner/repo 或 owner/repo 格式</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button className="gap-2" disabled={executing !== null || selectedAccounts.length === 0 || !parseRepo()} onClick={() => execute('star')}>
                  {executing === 'star' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Star className="h-4 w-4" />}
                  批量 Star（{selectedAccounts.length} 个账户）
                </Button>
                <Button variant="outline" disabled={executing !== null || selectedAccounts.length === 0 || !parseRepo()} onClick={() => execute('unstar')}>
                  {executing === 'unstar' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Star className="h-4 w-4" />}
                  批量取消 Star
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 批量关注 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><UserPlus className="h-4 w-4" /> 批量关注用户</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">目标用户名</label>
                <Input value={followTarget} onChange={e => setFollowTarget(e.target.value)} placeholder="GitHub username（如 torvalds）" className="font-mono" />
              </div>
              <div className="flex gap-2">
                <Button className="gap-2" disabled={executing !== null || selectedAccounts.length === 0 || !followTarget.trim()} onClick={() => execute('follow')}>
                  {executing === 'follow' ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                  批量关注（{selectedAccounts.length} 个账户）
                </Button>
                <Button variant="outline" className="gap-2" disabled={executing !== null || selectedAccounts.length === 0 || !followTarget.trim()} onClick={() => execute('unfollow')}>
                  {executing === 'unfollow' ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserMinus className="h-4 w-4" />}
                  批量取消关注
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 结果（实时刷新） */}
          {results && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">执行结果（成功 {results.success.length} / 失败 {results.failed.length}）</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-[300px] space-y-1 overflow-y-auto">
                  {results.success.map((s, i) => (
                    <div key={'s' + i} className="flex items-center gap-2 text-sm">
                      <CircleCheck className="h-4 w-4 shrink-0 text-success" />
                      <span>{label(s.account_id)}</span>
                      {s.message && <span className="ml-auto text-xs text-muted-foreground">{s.message}</span>}
                    </div>
                  ))}
                  {results.failed.map((f, i) => (
                    <div key={'f' + i} className="flex items-center gap-2 rounded-md border border-destructive/20 bg-destructive/5 px-2 py-1 text-sm">
                      <CircleX className="h-4 w-4 shrink-0 text-destructive" />
                      <span className="font-medium">{label(f.account_id)}</span>
                      <span className="ml-auto text-xs text-destructive">{f.error}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
