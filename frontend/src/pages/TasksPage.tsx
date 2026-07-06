import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { accountApi, taskApi, type Task } from '@/api'
import { displayName } from '@/lib/account'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, THead, TH, TBody, TR, TD } from '@/components/ui/table'
import { LegacyDialog as Dialog, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Plus, Play, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/page-header'
import { LoadingState } from '@/components/ui/loading-state'
import { ErrorState } from '@/components/ui/error-state'
import { EmptyState } from '@/components/ui/empty-state'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useTranslation } from 'react-i18next'

const intervals = [
  { value: 5, labelKey: 'tasks.interval5min' },
  { value: 15, labelKey: 'tasks.interval15min' },
  { value: 30, labelKey: 'tasks.interval30min' },
  { value: 60, labelKey: 'tasks.interval1hour' },
  { value: 360, labelKey: 'tasks.interval6hour' },
  { value: 720, labelKey: 'tasks.interval12hour' },
  { value: 1440, labelKey: 'tasks.interval24hour' },
]

function toCron(min: number): string {
  if (min < 60) return `*/${min} * * * *`
  if (min < 1440) return `0 */${min / 60} * * *`
  if (min === 1440) return '0 0 * * *'
  return `0 0 */${min / 1440} * *`
}

function fromCron(cron: string): number {
  const p = cron.trim().split(/\s+/)
  if (p[0]?.startsWith('*/')) return parseInt(p[0].slice(2))
  if (p[1]?.startsWith('*/')) return parseInt(p[1].slice(2)) * 60
  if (p[2]?.startsWith('*/')) return parseInt(p[2].slice(2)) * 1440
  return 1440
}

export default function TasksPage() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { data: tasks, isLoading, isError, refetch } = useQuery({ queryKey: ['tasks'], queryFn: taskApi.list })
  const { data: accounts } = useQuery({ queryKey: ['accounts'], queryFn: () => accountApi.list() })
  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [form, setForm] = useState({ account_id: 0, repository_id: 0, workflow_filename: '', ref: 'main', interval: 1440, inputs_json: '' })

  const createMut = useMutation({
    mutationFn: () => taskApi.create({ account_id: form.account_id, repository_id: form.repository_id, workflow_filename: form.workflow_filename, ref: form.ref, cron_expr: toCron(form.interval), inputs_json: form.inputs_json, enabled: true }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['tasks'] }); toast.success(t('common.create')); setOpen(false) },
    onError: () => toast.error(t('common.error')),
  })

  const toggleMut = useMutation({ mutationFn: ({ id, enabled }: { id: number; enabled: boolean }) => taskApi.toggle(id, enabled), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }) })
  const runMut = useMutation({ mutationFn: (id: number) => taskApi.runNow(id), onSuccess: () => toast.success(t('common.refresh')) })
  const delMut = useMutation({ mutationFn: (id: number) => taskApi.remove(id), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['tasks'] }); toast.success(t('common.delete')) } })

  const openCreate = () => { setForm({ account_id: 0, repository_id: 0, workflow_filename: '', ref: 'main', interval: 1440, inputs_json: '' }); setOpen(true) }

  return (
    <div className="space-y-4">
      <PageHeader
        title={t('tasks.title')}
        description={t('tasks.description')}
        actions={<Button className="gap-2" onClick={openCreate}><Plus className="h-4 w-4" /> {t('tasks.create')}</Button>}
      />

      <Card><CardContent className="p-0">
        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <ErrorState retry={refetch} />
        ) : tasks && tasks.length > 0 ? (
          <Table>
            <THead>
              <TR>
                <TH>{t('tasks.taskName')}</TH>
                <TH>{t('tasks.interval')}</TH>
                <TH>{t('common.status')}</TH>
                <TH>{t('tasks.nextRun')}</TH>
                <TH className="text-right">{t('common.actions')}</TH>
              </TR>
            </THead>
            <TBody>
              {tasks.map((task: Task) => {
                const iv = intervals.find((i) => i.value === fromCron(task.cron_expr))
                return (
                  <TR key={task.id}>
                    <TD>
                      <div className="font-medium text-sm">{task.owner_repo}</div>
                      <div className="text-xs text-muted-foreground">{task.workflow_filename} @ {task.ref}</div>
                    </TD>
                    <TD><Badge variant="secondary">{iv ? t(iv.labelKey) : task.cron_expr}</Badge></TD>
                    <TD><Badge variant={task.enabled ? 'success' : 'secondary'}>{task.enabled ? t('tasks.enabled') : t('tasks.disabled')}</Badge></TD>
                    <TD className="text-sm">{task.next_run_at ? new Date(task.next_run_at).toLocaleString() : '—'}</TD>
                    <TD>
                      <div className="flex items-center justify-end gap-2">
                        <Switch checked={task.enabled} onCheckedChange={(checked) => toggleMut.mutate({ id: task.id, enabled: checked })} />
                        <Button variant="ghost" size="sm" onClick={() => runMut.mutate(task.id)}><Play className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setDeleteId(task.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TD>
                  </TR>
                )
              })}
            </TBody>
          </Table>
        ) : (
          <EmptyState
            title={t('tasks.noTasks')}
            description={t('tasks.noTasksDescription')}
            action={<Button className="gap-2" onClick={openCreate}><Plus className="h-4 w-4" /> {t('tasks.create')}</Button>}
          />
        )}
      </CardContent></Card>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t('tasks.create')}</DialogTitle>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">{t('tasks.account')}</label>
            <Select value={form.account_id ? String(form.account_id) : ''} onValueChange={(v) => setForm({ ...form, account_id: Number(v) })}>
              <SelectTrigger><SelectValue placeholder={t('tasks.account')} /></SelectTrigger>
              <SelectContent>
                {accounts?.map((a) => <SelectItem key={a.id} value={String(a.id)}>{displayName(a)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">{t('common.name')}</label>
            <Input type="number" value={form.repository_id} onChange={(e) => setForm({ ...form, repository_id: Number(e.target.value) })} placeholder={t('common.name')} />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">{t('repos.fileName')}</label>
            <Input value={form.workflow_filename} onChange={(e) => setForm({ ...form, workflow_filename: e.target.value })} placeholder="deploy.yml" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">{t('repos.filePath')}</label>
            <Input value={form.ref} onChange={(e) => setForm({ ...form, ref: e.target.value })} placeholder="main" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">{t('tasks.interval')}</label>
            <Select value={String(form.interval)} onValueChange={(v) => setForm({ ...form, interval: Number(v) })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {intervals.map((i) => <SelectItem key={i.value} value={String(i.value)}>{t(i.labelKey)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>{t('common.cancel')}</Button>
          <Button onClick={() => createMut.mutate()}>{t('common.create')}</Button>
        </DialogFooter>
      </Dialog>

      <ConfirmDialog
        open={deleteId !== null}
        title={t('common.delete')}
        description={t('tasks.deleteConfirm')}
        confirmText={t('common.confirm')}
        cancelText={t('common.cancel')}
        onConfirm={() => { if (deleteId !== null) delMut.mutate(deleteId); setDeleteId(null) }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
