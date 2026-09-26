import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { statsApi, accountApi } from '@/api'
import { displayName, sortAccounts } from '@/lib/account'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LoadingState } from '@/components/ui/loading-state'
import { ErrorState } from '@/components/ui/error-state'
import { PageHeader } from '@/components/page-header'
import { AnimatedNumber } from '@/components/AnimatedNumber'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { Users, CheckCircle, FolderGit2, Zap, ArrowRight, TrendingUp, ArrowLeftRight, ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { accountApi as _accountApi, statsApi as _statsApi, type StatusChangeDetail } from '@/api'

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } } }

export default function DashboardPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data: stats, isLoading, isError, refetch } = useQuery({ queryKey: ['stats'], queryFn: statsApi.overview })
  const { data: accounts } = useQuery({ queryKey: ['accounts'], queryFn: () => accountApi.list() })
  const { data: flux } = useQuery({ queryKey: ['status-flux'], queryFn: statsApi.statusFlux, refetchInterval: 60000 })
  const [fluxOpen, setFluxOpen] = useState(false)
  const [fluxDetail, setFluxDetail] = useState<{ from: string; to: string; label: string } | null>(null)
  // 主页账户卡片：只显示正常账户（偏好持久化在 localStorage）
  const [activeOnly, setActiveOnly] = useState(() => localStorage.getItem('gam-dash-active-only') === 'true')
  useEffect(() => { localStorage.setItem('gam-dash-active-only', String(activeOnly)) }, [activeOnly])
  const displayAccounts = sortAccounts(activeOnly ? (accounts || []).filter(a => a.status === 'active') : (accounts || [])).slice(0, 9)

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState retry={refetch} />

  const cards = [
    { label: t('dashboard.totalAccounts'), value: stats?.total ?? 0, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: t('dashboard.totalRepos'), value: stats?.repos ?? 0, icon: FolderGit2, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: t('dashboard.totalTasks'), value: stats?.tasks ?? 0, icon: CheckCircle, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: t('dashboard.autoTasks'), value: stats?.tasks_enabled ?? 0, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ]

  const pieData = [
    { name: '正常', value: stats?.active ?? 0, color: '#22c55e' },
    { name: '封禁', value: stats?.banned ?? 0, color: '#ef4444' },
    { name: '受限', value: stats?.restricted ?? 0, color: '#eab308' },
    { name: 'Token过期', value: stats?.token_expired ?? 0, color: '#f97316' },
    { name: '错误', value: stats?.error ?? 0, color: '#f59e0b' },
    { name: '未知', value: stats?.unknown ?? 0, color: '#a3a3a3' },
  ].filter((d) => d.value > 0)

  const barData = [
    { name: t('dashboard.totalRepos'), value: stats?.repos ?? 0, fill: '#3b82f6' },
    { name: 'Workflow', value: stats?.workflows ?? 0, fill: '#8b5cf6' },
    { name: t('dashboard.totalTasks'), value: stats?.tasks ?? 0, fill: '#f59e0b' },
  ]

  const actions = [
    { label: t('nav.accounts'), to: '/accounts', icon: Users },
    { label: t('nav.repos'), to: '/repos', icon: FolderGit2 },
    { label: t('nav.tasks'), to: '/tasks', icon: CheckCircle },
    { label: t('nav.batch'), to: '/batch', icon: Zap },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title={t('dashboard.title')} description={t('dashboard.description')} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => { const Icon = c.icon; return (
          <motion.div key={c.label} initial="hidden" animate="visible" variants={fadeUp} whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Card><CardContent className="flex items-center gap-4 p-5">
              <div className={cn('flex h-12 w-12 items-center justify-center rounded-lg', c.bg)}><Icon className={cn('h-6 w-6', c.color)} /></div>
              <div>
                <div className="text-3xl font-bold"><AnimatedNumber value={c.value} /></div>
                <div className="text-sm text-muted-foreground">{c.label}</div>
              </div>
            </CardContent></Card>
          </motion.div>
        )})}
      </div>

      {/* 近 24 小时状态转换（即使为 0 也显示，避免误以为功能缺失） */}
      {flux && (
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><ArrowLeftRight className="h-4 w-4" /> 近 24 小时状态转换 <Badge variant="secondary" className="text-[10px]">{flux.total}</Badge></CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {([
                { from: 'active', to: 'restricted', label: '正常 → 受限', value: flux.active_to_restricted, icon: ShieldAlert, cls: 'text-yellow-500 bg-yellow-500/10' },
                { from: 'active', to: 'banned', label: '正常 → 封禁', value: flux.active_to_banned, icon: ShieldX, cls: 'text-red-500 bg-red-500/10' },
                { from: 'restricted', to: 'active', label: '受限 → 正常', value: flux.restricted_to_active, icon: ShieldCheck, cls: 'text-green-500 bg-green-500/10' },
                { from: 'banned', to: 'active', label: '封禁 → 正常', value: flux.banned_to_active, icon: ShieldCheck, cls: 'text-green-500 bg-green-500/10' },
              ] as const).map(({ from, to, label, value, icon: Icon, cls }) => (
                <button
                  key={label}
                  className="flex items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:border-primary/40 hover:bg-accent/40 disabled:cursor-default disabled:opacity-60"
                  disabled={value === 0}
                  onClick={() => { setFluxDetail({ from, to, label }); setFluxOpen(true) }}
                >
                  <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', cls)}><Icon className="h-4 w-4" /></div>
                  <div className="min-w-0">
                    <div className="text-lg font-bold tabular-nums leading-none">{value}</div>
                    <div className="mt-0.5 truncate text-xs text-muted-foreground">{label}{value > 0 && ' · 点击查看'}</div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      <FluxDetailDialog open={fluxOpen} onOpenChange={setFluxOpen} detail={fluxDetail} />

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Card><CardHeader><CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="h-4 w-4" /> {t('dashboard.accountDistribution')}</CardTitle></CardHeader>
            <CardContent>
              <div className="h-56">
                {pieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3}>
                        {pieData.map((d) => <Cell key={d.name} fill={d.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : <div className="flex h-full items-center justify-center text-sm text-muted-foreground">{t('dashboard.noChartData')}</div>}
              </div>
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                {pieData.map((d) => (
                  <span key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                    {d.name} <span className="font-bold text-foreground">{d.value}</span>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Card><CardHeader><CardTitle className="text-base">{t('dashboard.repoActivity')}</CardTitle></CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} cursor={{ fill: 'var(--muted)' }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Card><CardHeader><CardTitle className="text-base">{t('common.actions')}</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {actions.map((a) => { const Icon = a.icon; return (
                <button key={a.to} onClick={() => navigate(a.to)}
                  className="group flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm font-medium transition-colors hover:bg-accent">
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="flex-1">{a.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              )})}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {accounts && accounts.length > 0 && (
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Card><CardHeader><CardTitle className="flex items-center justify-between text-base">
            <span>{t('nav.accounts')}</span>
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground">
                <Checkbox checked={activeOnly} onCheckedChange={(v) => setActiveOnly(v === true)} />
                {t('accounts.filterActiveOnly')}
              </label>
              <a href="/accounts" className="text-xs text-muted-foreground hover:text-primary transition-colors">全部 {accounts.length} 个 →</a>
            </div>
          </CardTitle></CardHeader>
            <CardContent>
              {displayAccounts.length > 0 ? (
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {displayAccounts.map((acc) => {
                  const statusMap: Record<string, { color: string; label: string }> = {
                    active: { color: 'text-green-500', label: '正常' },
                    banned: { color: 'text-red-500', label: '封禁' },
                    restricted: { color: 'text-yellow-500', label: '受限' },
                    token_expired: { color: 'text-orange-500', label: 'Token过期' },
                    error: { color: 'text-yellow-500', label: '错误' },
                    unknown: { color: 'text-muted-foreground', label: '未知' },
                  }
                  const s = statusMap[acc.status] || statusMap.unknown
                  return (
                    <a key={acc.id} href={`/accounts/${acc.id}`} className="flex items-center justify-between rounded-lg border p-3 text-sm transition-colors hover:bg-accent">
                      <span className="truncate">{displayName(acc)}</span>
                      <span className={cn('ml-2 shrink-0 text-xs font-medium', s.color)}>{s.label}</span>
                    </a>
                  )
                })}
              </div>
            ) : (
              <div className="py-6 text-center text-sm text-muted-foreground">没有正常状态的账户</div>
            )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}


function FluxDetailDialog({ open, onOpenChange, detail }: { open: boolean; onOpenChange: (v: boolean) => void; detail: { from: string; to: string; label: string } | null }) {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ['flux-details', detail?.from, detail?.to],
    queryFn: () => statsApi.statusFluxDetails(detail!.from, detail!.to),
    enabled: open && !!detail,
  })

  const statusLabel = (s: string) => ({ active: '正常', banned: '封禁', restricted: '受限', token_expired: 'Token过期', error: '错误', unknown: '未知' }[s] || s)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {detail?.label} · 近 24 小时
            {data && <span className="ml-2 text-sm font-normal text-muted-foreground">{data.count} 条</span>}
          </DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="py-8 text-center text-sm text-muted-foreground">加载中…</div>
        ) : data && data.details.length > 0 ? (
          <div className="max-h-[420px] space-y-1 overflow-y-auto">
            {data.details.map((d: StatusChangeDetail) => (
              <button
                key={d.id}
                onClick={() => { onOpenChange(false); navigate(`/accounts/${d.account_id}`) }}
                className="flex w-full items-center gap-3 rounded-md border px-3 py-2 text-left text-sm transition-colors hover:bg-accent"
              >
                <span className="font-medium">{d.login || `#${d.account_id}`}</span>
                <span className="ml-auto text-xs text-muted-foreground">{new Date(d.created_at).toLocaleString()}</span>
                {d.reason && <span className="hidden max-w-[220px] truncate text-xs text-muted-foreground md:block" title={d.reason}>{d.reason}</span>}
              </button>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-sm text-muted-foreground">暂无记录</div>
        )}
        <p className="text-xs text-muted-foreground">点击任意账户行可直接打开其详情页</p>
      </DialogContent>
    </Dialog>
  )
}
