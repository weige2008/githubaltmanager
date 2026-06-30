import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { accountApi, taskApi, type Task } from '@/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, THead, TH, TBody, TR, TD } from '@/components/ui/table'
import { Dialog, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Plus, Play, Trash2, Power } from 'lucide-react'
import { toast } from 'sonner'

const intervals = [
  { label: '每 30 分钟', value: 30 }, { label: '每 1 小时', value: 60 }, { label: '每 3 小时', value: 180 },
  { label: '每 6 小时', value: 360 }, { label: '每 12 小时', value: 720 }, { label: '每 24 小时', value: 1440 },
  { label: '每 3 天', value: 4320 }, { label: '每 7 天', value: 10080 },
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
  const queryClient = useQueryClient()
  const { data: tasks } = useQuery({ queryKey: ['tasks'], queryFn: taskApi.list })
  const { data: accounts } = useQuery({ queryKey: ['accounts'], queryFn: accountApi.list })
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ account_id: 0, repository_id: 0, workflow_filename: '', ref: 'main', interval: 1440, inputs_json: '' })

  const createMut = useMutation({
    mutationFn: () => taskApi.create({ account_id: form.account_id, repository_id: form.repository_id, workflow_filename: form.workflow_filename, ref: form.ref, cron_expr: toCron(form.interval), inputs_json: form.inputs_json, enabled: true }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['tasks'] }); toast.success('已创建'); setOpen(false) },
    onError: () => toast.error('创建失败'),
  })

  const toggleMut = useMutation({ mutationFn: ({ id, enabled }: { id: number; enabled: boolean }) => taskApi.toggle(id, enabled), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }) })
  const runMut = useMutation({ mutationFn: (id: number) => taskApi.runNow(id), onSuccess: () => toast.success('已触发') })
  const delMut = useMutation({ mutationFn: (id: number) => taskApi.remove(id), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['tasks'] }); toast.success('已删除') } })

  return (
    <div className="space-y-4">
      <div className="flex justify-between"><Button className="gap-2" onClick={() => { setForm({ account_id: 0, repository_id: 0, workflow_filename: '', ref: 'main', interval: 1440, inputs_json: '' }); setOpen(true) }}><Plus className="h-4 w-4" /> 新建任务</Button></div>
      <Card><CardContent className="p-0">
        {tasks && tasks.length > 0 ? (
          <Table><THead><TR><TH>仓库/Workflow</TH><TH>间隔</TH><TH>状态</TH><TH>下次执行</TH><TH className="text-right">操作</TH></TR></THead>
            <TBody>{tasks.map((t: Task) => (
              <TR key={t.id}>
                <TD><div className="font-medium text-sm">{t.owner_repo}</div><div className="text-xs text-muted-foreground">{t.workflow_filename} @ {t.ref}</div></TD>
                <TD><Badge variant="secondary">{intervals.find((i) => i.value === fromCron(t.cron_expr))?.label || t.cron_expr}</Badge></TD>
                <TD><Badge variant={t.enabled ? 'success' : 'secondary'}>{t.enabled ? '启用' : '禁用'}</Badge></TD>
                <TD className="text-sm">{t.next_run_at ? new Date(t.next_run_at).toLocaleString() : '—'}</TD>
                <TD><div className="flex justify-end gap-1">
                  <Button variant="ghost" size="sm" onClick={() => toggleMut.mutate({ id: t.id, enabled: !t.enabled })}><Power className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => runMut.mutate(t.id)}><Play className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => { if (confirm('删除?')) delMut.mutate(t.id) }}><Trash2 className="h-4 w-4" /></Button>
                </div></TD>
              </TR>))}</TBody></Table>
        ) : <div className="p-8 text-center text-muted-foreground">暂无定时任务</div>}
      </CardContent></Card>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>新建定时任务</DialogTitle>
        <div className="space-y-3">
          <div><label className="text-sm font-medium">账户</label>
            <select className="mt-1 h-10 w-full rounded-md border bg-background px-3 text-sm" value={form.account_id} onChange={(e) => setForm({ ...form, account_id: Number(e.target.value) })}>
              <option value={0}>选择账户</option>{accounts?.map((a) => <option key={a.id} value={a.id}>{a.note?.trim() ? `${a.note}(${a.github_login})` : a.github_login}</option>)}
            </select></div>
          <div><label className="text-sm font-medium">仓库 ID</label>
            <Input type="number" className="mt-1" value={form.repository_id} onChange={(e) => setForm({ ...form, repository_id: Number(e.target.value) })} placeholder="输入仓库 ID" /></div>
          <div><label className="text-sm font-medium">Workflow 文件名</label>
            <Input className="mt-1" value={form.workflow_filename} onChange={(e) => setForm({ ...form, workflow_filename: e.target.value })} placeholder="deploy.yml" /></div>
          <div><label className="text-sm font-medium">分支</label>
            <Input className="mt-1" value={form.ref} onChange={(e) => setForm({ ...form, ref: e.target.value })} placeholder="main" /></div>
          <div><label className="text-sm font-medium">执行间隔</label>
            <select className="mt-1 h-10 w-full rounded-md border bg-background px-3 text-sm" value={form.interval} onChange={(e) => setForm({ ...form, interval: Number(e.target.value) })}>
              {intervals.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
            </select></div>
        </div>
        <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>取消</Button><Button onClick={() => createMut.mutate()}>创建</Button></DialogFooter>
      </Dialog>
    </div>
  )
}
