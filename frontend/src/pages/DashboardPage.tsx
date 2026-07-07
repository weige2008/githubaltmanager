import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { statsApi, accountApi } from '@/api'
import { displayName, sortAccounts } from '@/lib/account'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingState } from '@/components/ui/loading-state'
import { ErrorState } from '@/components/ui/error-state'
import { PageHeader } from '@/components/page-header'
import { AnimatedNumber } from '@/components/AnimatedNumber'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { Users, CheckCircle, FolderGit2, Zap, ArrowRight, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } } }

export default function DashboardPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { data: stats, isLoading, isError, refetch } = useQuery({ queryKey: ['stats'], queryFn: statsApi.overview })
  const { data: accounts } = useQuery({ queryKey: ['accounts'], queryFn: () => accountApi.list() })

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState retry={refetch} />

  const cards = [
    { label: t('dashboard.totalAccounts'), value: stats?.total ?? 0, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: t('dashboard.totalRepos'), value: stats?.repos ?? 0, icon: FolderGit2, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: t('dashboard.totalTasks'), value: stats?.tasks ?? 0, icon: CheckCircle, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: t('dashboard.autoTasks'), value: stats?.tasks_enabled ?? 0, icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ]

  const pieData = [
    { name: t('dashboard.activeAccounts'), value: stats?.active ?? 0, color: '#22c55e' },
    { name: t('dashboard.inactiveAccounts'), value: (stats?.banned ?? 0) + (stats?.error ?? 0) + (stats?.unknown ?? 0), color: '#a3a3a3' },
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

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <Card><CardHeader><CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="h-4 w-4" /> {t('dashboard.accountDistribution')}</CardTitle></CardHeader>
            <CardContent className="h-64">
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
          <Card><CardHeader><CardTitle className="text-base">{t('nav.accounts')}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {sortAccounts(accounts).slice(0, 9).map((acc) => (
                  <div key={acc.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                    <span>{displayName(acc)}</span>
                    <span className={cn('text-xs font-medium',
                      acc.status === 'active' ? 'text-green-500' : acc.status === 'banned' ? 'text-red-500' : 'text-muted-foreground')}>
                      {acc.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
