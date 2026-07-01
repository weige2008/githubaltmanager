import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { autoTaskApi, type AutoTaskLog } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, THead, TH, TBody, TR, TD } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorState } from '@/components/ui/error-state'
import { PageHeader } from '@/components/page-header'
import { Play, Activity, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function AutomationPage() {
  const { t } = useTranslation()
  const { data: logs, isLoading, isError, refetch } = useQuery({ queryKey: ['autotask-logs'], queryFn: () => autoTaskApi.logs(100), refetchInterval: 5000 })
  const { data: config } = useQuery({ queryKey: ['autotask-config'], queryFn: autoTaskApi.get })

  const stats = {
    total: logs?.length ?? 0,
    success: logs?.filter((l) => l.status === 'success').length ?? 0,
    failed: logs?.filter((l) => l.status === 'failed').length ?? 0,
    running: logs?.filter((l) => l.status === 'running').length ?? 0,
  }

  const cards = [
    { key: 'total', label: t('automation.statTotal'), value: stats.total, icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { key: 'success', label: t('automation.statSuccess'), value: stats.success, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
    { key: 'failed', label: t('automation.statFailed'), value: stats.failed, icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
    { key: 'running', label: t('automation.statRunning'), value: stats.running, icon: Loader2, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  ]

  if (isError) return <ErrorState retry={refetch} />

  return (
    <div className="space-y-6">
      <PageHeader title={t('automation.title')} description={t('automation.description')} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24" />) :
          cards.map((c) => { const Icon = c.icon; return (
            <Card key={c.key}><CardContent className="flex items-center gap-3 p-4">
              <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', c.bg)}><Icon className={cn('h-5 w-5', c.color, c.key === 'running' && stats.running > 0 && 'animate-spin')} /></div>
              <div><div className="text-2xl font-bold">{c.value}</div><div className="text-xs text-muted-foreground">{c.label}</div></div>
            </CardContent></Card>
          )})}
      </div>

      <Card><CardHeader className="flex-row items-center justify-between">
        <CardTitle>{t('automation.taskStatus')}</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => { autoTaskApi.checkNow(); toast.success(t('automation.checkTriggered')) }}>{t('automation.checkNow')}</Button>
          <Button variant="outline" size="sm" onClick={() => { autoTaskApi.syncNow(); toast.success(t('automation.syncTriggered')) }}>{t('automation.syncNow')}</Button>
        </div>
      </CardHeader><CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div><div className="text-sm font-medium">{t('automation.autoCheck')}</div><div className="text-xs text-muted-foreground">{config?.auto_check_enabled ? t('automation.everyMinutes', { count: config.auto_check_interval }) : t('automation.intervalDisabled')}</div></div>
            <Badge variant={config?.auto_check_enabled ? 'success' : 'secondary'}>{config?.auto_check_enabled ? t('automation.enabled') : t('automation.disabled')}</Badge>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div><div className="text-sm font-medium">{t('automation.autoSync')}</div><div className="text-xs text-muted-foreground">{config?.auto_sync_enabled ? t('automation.everyMinutes', { count: config.auto_sync_interval }) : t('automation.intervalDisabled')}</div></div>
            <Badge variant={config?.auto_sync_enabled ? 'success' : 'secondary'}>{config?.auto_sync_enabled ? t('automation.enabled') : t('automation.disabled')}</Badge>
          </div>
        </div>
      </CardContent></Card>

      <Card><CardHeader><CardTitle>{t('automation.logs')}</CardTitle></CardHeader><CardContent className="p-0">
        {logs && logs.length > 0 ? (
          <Table><THead><TR><TH>{t('automation.logType')}</TH><TH>{t('automation.logStatus')}</TH><TH>{t('automation.logResult')}</TH><TH>{t('automation.logDuration')}</TH><TH>{t('automation.logTime')}</TH></TR></THead>
            <TBody>{logs.map((l: AutoTaskLog) => (
              <TR key={l.id}>
                <TD><Badge variant={l.task_type === 'check' ? 'default' : 'secondary'}>{l.task_type === 'check' ? t('automation.taskCheck') : t('automation.taskSync')}</Badge></TD>
                <TD><Badge variant={l.status === 'success' ? 'success' : l.status === 'failed' ? 'destructive' : 'warning'}>{l.status === 'success' ? t('automation.statusSuccess') : l.status === 'failed' ? t('automation.statusFailed') : t('automation.statusRunning')}</Badge></TD>
                <TD className="text-sm">{l.success_cnt}/{l.total_count}</TD>
                <TD className="text-sm">{l.duration_ms ? `${(l.duration_ms / 1000).toFixed(1)}s` : '—'}</TD>
                <TD className="text-sm text-muted-foreground">{new Date(l.created_at).toLocaleString()}</TD>
              </TR>))}</TBody></Table>
        ) : <div className="p-8 text-center text-muted-foreground">{t('automation.noLogs')}</div>}
      </CardContent></Card>
    </div>
  )
}
