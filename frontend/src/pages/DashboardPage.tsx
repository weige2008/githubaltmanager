import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { statsApi, accountApi } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { AnimatedNumber } from '@/components/AnimatedNumber'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { Users, CheckCircle, AlertTriangle, Clock, FolderGit2, Zap, ArrowRight, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } } }

export default function DashboardPage() {
  const navigate = useNavigate()
  const { data: stats, isLoading } = useQuery({ queryKey: ['stats'], queryFn: statsApi.overview })
  const { data: accounts } = useQuery({ queryKey: ['accounts'], queryFn: accountApi.list })

  const cards = [
    { label: '账户总数', value: stats?.total ?? 0, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: '正常', value: stats?.active ?? 0, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: '封禁/异常', value: (stats?.banned ?? 0) + (stats?.error ?? 0), icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: '定时任务', value: stats?.tasks_enabled ?? 0, icon: Clock, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ]

  const pieData = [
    { name: '正常', value: stats?.active ?? 0, color: '#22c55e' },
    { name: '封禁', value: stats?.banned ?? 0, color: '#ef4444' },
    { name: '异常', value: stats?.error ?? 0, color: '#f59e0b' },
    { name: '未知', value: stats?.unknown ?? 0, color: '#a3a3a3' },
  ].filter((d) => d.value > 0)

  const barData = [
    { name: '仓库', value: stats?.repos ?? 0, fill: '#3b82f6' },
    { name: 'Workflow', value: stats?.workflows ?? 0, fill: '#8b5cf6' },
    { name: '任务', value: stats?.tasks ?? 0, fill: '#f59e0b' },
  ]

  const actions = [
    { label: '导入账户', to: '/accounts', icon: Users },
    { label: '浏览仓库', to: '/repos', icon: FolderGit2 },
    { label: '定时任务', to: '/tasks', icon: Clock },
    { label: '批量操作', to: '/batch', icon: Zap },
  ]

  return (
    <motion.div className="space-y-6" initial="hidden" animate="visible" variants={stagger}>
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-lg" />)
          : cards.map((c) => { const Icon = c.icon; return (
            <motion.div key={c.label} variants={fadeUp} whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300 }}>
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
        {/* Pie chart */}
        <motion.div variants={fadeUp}>
          <Card><CardHeader><CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="h-4 w-4" /> 账户状态分布</CardTitle></CardHeader>
            <CardContent className="h-64">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3}>
                      {pieData.map((d) => <Cell key={d.name} fill={d.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : <div className="flex h-full items-center justify-center text-sm text-muted-foreground">暂无数据</div>}
            </CardContent>
          </Card>
        </motion.div>

        {/* Bar chart */}
        <motion.div variants={fadeUp}>
          <Card><CardHeader><CardTitle className="text-base">数据概览</CardTitle></CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} cursor={{ fill: 'hsl(var(--muted))' }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick actions */}
        <motion.div variants={fadeUp}>
          <Card><CardHeader><CardTitle className="text-base">快捷操作</CardTitle></CardHeader>
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

      {/* Account list */}
      {accounts && accounts.length > 0 && (
        <motion.div variants={fadeUp}>
          <Card><CardHeader><CardTitle className="text-base">账户列表</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {accounts.slice(0, 9).map((acc) => (
                  <div key={acc.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                    <span>{acc.note?.trim() ? `${acc.note.trim()}(${acc.github_login})` : acc.github_login}</span>
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
    </motion.div>
  )
}
