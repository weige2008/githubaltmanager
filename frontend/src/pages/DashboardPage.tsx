import { useQuery } from '@tanstack/react-query'
import { statsApi, accountApi } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Users, CheckCircle, AlertTriangle, Clock, FolderGit2, Zap, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

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

  const overview = [
    { label: '仓库总数', value: stats?.repos ?? 0, icon: FolderGit2 },
    { label: 'Workflows', value: stats?.workflows ?? 0, icon: Zap },
  ]

  const actions = [
    { label: '导入账户', to: '/accounts', icon: Users },
    { label: '浏览仓库', to: '/repos', icon: FolderGit2 },
    { label: '定时任务', to: '/tasks', icon: Clock },
    { label: '批量操作', to: '/batch', icon: Zap },
  ]

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-lg" />)
          : cards.map((c) => {
              const Icon = c.icon
              return (
                <Card key={c.label} className="animate-fade-in-up">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className={cn('flex h-12 w-12 items-center justify-center rounded-lg', c.bg)}>
                      <Icon className={cn('h-6 w-6', c.color)} />
                    </div>
                    <div>
                      <div className="text-3xl font-bold">{c.value}</div>
                      <div className="text-sm text-muted-foreground">{c.label}</div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick actions */}
        <Card>
          <CardHeader><CardTitle>快捷操作</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {actions.map((a) => {
              const Icon = a.icon
              return (
                <button key={a.to} onClick={() => navigate(a.to)}
                  className="flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm font-medium transition-colors hover:bg-accent">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <span className="flex-1">{a.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              )
            })}
          </CardContent>
        </Card>

        {/* Overview */}
        <Card>
          <CardHeader><CardTitle>数据概览</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {overview.map((o) => {
              const Icon = o.icon
              return (
                <div key={o.label} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">{o.label}</span>
                  </div>
                  <span className="text-xl font-bold">{o.value}</span>
                </div>
              )
            })}
            {accounts && accounts.length > 0 && (
              <div className="rounded-lg border p-3">
                <div className="mb-2 text-sm font-medium">账户列表</div>
                <div className="space-y-1">
                  {accounts.slice(0, 5).map((acc) => (
                    <div key={acc.id} className="flex items-center justify-between text-sm">
                      <span>{acc.note ? `${acc.note}(${acc.github_login})` : acc.github_login}</span>
                      <span className={cn('text-xs font-medium',
                        acc.status === 'active' ? 'text-green-500' : acc.status === 'banned' ? 'text-red-500' : 'text-muted-foreground')}>
                        {acc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
