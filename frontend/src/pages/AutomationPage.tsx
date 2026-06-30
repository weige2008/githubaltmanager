import { useQuery } from '@tanstack/react-query'
import { autoTaskApi, type AutoTaskLog } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, THead, TH, TBody, TR, TD } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Play, Activity, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function AutomationPage() {
  const { data: logs, isLoading } = useQuery({ queryKey: ['autotask-logs'], queryFn: () => autoTaskApi.logs(100), refetchInterval: 5000 })
  const { data: config } = useQuery({ queryKey: ['autotask-config'], queryFn: autoTaskApi.get })

  const stats = {
    total: logs?.length ?? 0,
    success: logs?.filter((l) => l.status === 'success').length ?? 0,
    failed: logs?.filter((l) => l.status === 'failed').length ?? 0,
    running: logs?.filter((l) => l.status === 'running').length ?? 0,
  }

  const cards = [
    { label: '总执行', value: stats.total, icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: '成功', value: stats.success, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: '失败', value: stats.failed, icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: '执行中', value: stats.running, icon: Loader2, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24" />) :
          cards.map((c) => { const Icon = c.icon; return (
            <Card key={c.label}><CardContent className="flex items-center gap-3 p-4">
              <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', c.bg)}><Icon className={cn('h-5 w-5', c.color, c.label === '执行中' && stats.running > 0 && 'animate-spin')} /></div>
              <div><div className="text-2xl font-bold">{c.value}</div><div className="text-xs text-muted-foreground">{c.label}</div></div>
            </CardContent></Card>
          )})}
      </div>

      <Card><CardHeader className="flex-row items-center justify-between">
        <CardTitle>任务状态</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => { autoTaskApi.checkNow(); toast.success('已触发检测') }}>立即检测</Button>
          <Button variant="outline" size="sm" onClick={() => { autoTaskApi.syncNow(); toast.success('已触发同步') }}>立即同步</Button>
        </div>
      </CardHeader><CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div><div className="text-sm font-medium">自动检测</div><div className="text-xs text-muted-foreground">{config?.auto_check_enabled ? `每 ${config.auto_check_interval} 分钟` : '已禁用'}</div></div>
            <Badge variant={config?.auto_check_enabled ? 'success' : 'secondary'}>{config?.auto_check_enabled ? '启用' : '禁用'}</Badge>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div><div className="text-sm font-medium">自动同步</div><div className="text-xs text-muted-foreground">{config?.auto_sync_enabled ? `每 ${config.auto_sync_interval} 分钟` : '已禁用'}</div></div>
            <Badge variant={config?.auto_sync_enabled ? 'success' : 'secondary'}>{config?.auto_sync_enabled ? '启用' : '禁用'}</Badge>
          </div>
        </div>
      </CardContent></Card>

      <Card><CardHeader><CardTitle>执行日志</CardTitle></CardHeader><CardContent className="p-0">
        {logs && logs.length > 0 ? (
          <Table><THead><TR><TH>类型</TH><TH>状态</TH><TH>结果</TH><TH>耗时</TH><TH>时间</TH></TR></THead>
            <TBody>{logs.map((l: AutoTaskLog) => (
              <TR key={l.id}>
                <TD><Badge variant={l.task_type === 'check' ? 'default' : 'secondary'}>{l.task_type === 'check' ? '检测' : '同步'}</Badge></TD>
                <TD><Badge variant={l.status === 'success' ? 'success' : l.status === 'failed' ? 'destructive' : 'warning'}>{l.status === 'success' ? '成功' : l.status === 'failed' ? '失败' : '执行中'}</Badge></TD>
                <TD className="text-sm">{l.success_cnt}/{l.total_count}</TD>
                <TD className="text-sm">{l.duration_ms ? `${(l.duration_ms / 1000).toFixed(1)}s` : '—'}</TD>
                <TD className="text-sm text-muted-foreground">{new Date(l.created_at).toLocaleString()}</TD>
              </TR>))}</TBody></Table>
        ) : <div className="p-8 text-center text-muted-foreground">暂无日志</div>}
      </CardContent></Card>
    </div>
  )
}
