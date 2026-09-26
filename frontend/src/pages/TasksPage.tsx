import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { accountApi, batchTaskApi, taskApi, type Task, type BatchTask } from '@/api'
import { displayName } from '@/lib/account'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, THead, TH, TBody, TR, TD } from '@/components/ui/table'
import { LegacyDialog as Dialog, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Plus, Play, Trash2, Loader2, Layers, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/page-header'
import { LoadingState } from '@/components/ui/loading-state'
import { ErrorState } from '@/components/ui/error-state'
import { EmptyState } from '@/components/ui/empty-state'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
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

const batchIntervals = [
  { value: 5, label: '每 5 分钟' },
  { value: 15, label: '每 15 分钟' },
  { value: 30, label: '每 30 分钟' },
  { value: 60, label: '每 1 小时' },
  { value: 360, label: '每 6 小时' },
  { value: 720, label: '每 12 小时' },
  { value: 1440, label: '每 24 小时' },
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

const TYPE_LABEL: Record<string, string> = {
  dispatch: '批量工作流', star: '批量 Star', unstar: '批量取消 Star',
  follow: '批量关注', unfollow: '批量取消关注',
}

function WorkflowTasksBody() {
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
      <div className="flex justify-end">
        <Button className="gap-2" onClick={openCreate}><Plus className="h-4 w-4" /> {t('tasks.create')}</Button>
      </div>
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

function BatchTasksTab() {
  const queryClient = useQueryClient()
  const { data: tasks, isLoading, isError, refetch } = useQuery({ queryKey: ['batch-tasks'], queryFn: batchTaskApi.list })
  const { data: accounts } = useQuery({ queryKey: ['accounts'], queryFn: () => accountApi.list() })

  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [name, setName] = useState('')
  const [type, setType] = useState<'dispatch' | 'star' | 'unstar' | 'follow' | 'unfollow'>('star')
  const [intervalMin, setIntervalMin] = useState(1440)
  const [selectedAccountIds, setSelectedAccountIds] = useState<number[]>([])
  const [repoName, setRepoName] = useState('keepalive')
  const [filename, setFilename] = useState('keepalive.yml')
  const [ref, setRef] = useState('main')
  const [starUrl, setStarUrl] = useState('')
  const [followUser, setFollowUser] = useState('')

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['batch-tasks'] })

  const buildPayload = (): string | null => {
    if (selectedAccountIds.length === 0) { toast.error('请选择至少一个账户'); return null }
    let payload: Record<string, unknown> = { account_ids: selectedAccountIds }
    if (type === 'dispatch') {
      if (!repoName.trim() || !filename.trim()) { toast.error('请填写仓库名与工作流文件名'); return null }
      payload = { ...payload, repo_name: repoName.trim(), filename: filename.trim(), ref: ref.trim() || 'main' }
    } else if (type === 'star' || type === 'unstar') {
      const m = starUrl.trim().match(/github\.com\/([^/]+)\/([^/]+)/) || starUrl.trim().match(/^([\w.-]+)\/([\w.-]+)$/)
      if (!m) { toast.error('仓库地址格式错误'); return null }
      payload = { ...payload, owner: m[1], repo: m[2].replace(/\.git$/, '') }
    } else {
      if (!followUser.trim()) { toast.error('请填写用户名'); return null }
      payload = { ...payload, username: followUser.trim() }
    }
    return JSON.stringify(payload)
  }

  const createMut = useMutation({
    mutationFn: () => {
      const payload = buildPayload()
      if (!payload) throw new Error('参数不完整')
      return batchTaskApi.create({ name: name.trim() || `${TYPE_LABEL[type]}定时任务`, type, cron_expr: toCron(intervalMin), payload_json: payload })
    },
    onSuccess: () => { toast.success('批量定时任务已创建'); setOpen(false); invalidate() },
    onError: (e: any) => toast.error(e?.message || '创建失败'),
  })
  const toggleMut = useMutation({
    mutationFn: ({ id, enabled }: { id: number; enabled: boolean }) => batchTaskApi.toggle(id, enabled),
    onSuccess: () => invalidate(),
    onError: () => toast.error('操作失败'),
  })
  const delMut = useMutation({
    mutationFn: (id: number) => batchTaskApi.remove(id),
    onSuccess: () => { invalidate(); toast.success('已删除') },
  })
  const runMut = useMutation({
    mutationFn: (id: number) => batchTaskApi.runNow(id),
    onSuccess: () => { toast.success('已触发执行，稍后刷新查看结果'); setTimeout(invalidate, 3000) },
  })

  const resultBadge = (r: string) => {
    if (r === 'success') return <Badge variant="success">全部成功</Badge>
    if (r === 'partial') return <Badge variant="warning">部分成功</Badge>
    if (r === 'failed') return <Badge variant="destructive">失败</Badge>
    if (r === 'running') return <Badge variant="secondary" className="gap-1"><Loader2 className="h-3 w-3 animate-spin" />执行中</Badge>
    return <Badge variant="secondary">未执行</Badge>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button className="gap-2" onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> 创建批量定时任务</Button>
      </div>
      <Card><CardContent className="p-0">
        {isLoading ? <LoadingState /> : isError ? <ErrorState retry={refetch} /> : tasks && tasks.length > 0 ? (
          <Table>
            <THead><TR>
              <TH>任务</TH><TH>类型</TH><TH>间隔</TH><TH>启用</TH><TH>下次执行</TH><TH>上次结果</TH><TH className="text-right">操作</TH>
            </TR></THead>
            <TBody>
              {tasks.map((task: BatchTask) => {
                const iv = batchIntervals.find((i) => toCron(i.value) === task.cron_expr)
                return (
                  <TR key={task.id}>
                    <TD>
                      <div className="text-sm font-medium">{task.name}</div>
                      {task.last_summary && <div className="max-w-[280px] truncate text-xs text-muted-foreground">{task.last_summary}</div>}
                    </TD>
                    <TD><Badge variant="secondary">{TYPE_LABEL[task.type] || task.type}</Badge></TD>
                    <TD><Badge variant="secondary">{iv ? iv.label : task.cron_expr}</Badge></TD>
                    <TD><Switch checked={task.enabled} onCheckedChange={(v) => toggleMut.mutate({ id: task.id, enabled: v === true })} /></TD>
                    <TD className="text-sm">{task.next_run_at ? new Date(task.next_run_at).toLocaleString() : '—'}</TD>
                    <TD>
                      <div className="flex flex-col gap-1">{resultBadge(task.last_run_result)}
                        {task.last_run_at && <span className="text-xs text-muted-foreground">{new Date(task.last_run_at).toLocaleString()}</span>}
                      </div>
                    </TD>
                    <TD>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" title="立即执行一次" onClick={() => runMut.mutate(task.id)}><Play className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setDeleteId(task.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TD>
                  </TR>
                )
              })}
            </TBody>
          </Table>
        ) : (
          <EmptyState title="暂无批量定时任务" description="创建后系统会按设定周期自动执行批量操作" />
        )}
      </CardContent></Card>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>创建批量定时任务</DialogTitle>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">任务名称</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="如：每日 keepalive" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">操作类型</label>
            <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="dispatch">批量工作流（按账户+仓库名）</SelectItem>
                <SelectItem value="star">批量 Star 仓库</SelectItem>
                <SelectItem value="unstar">批量取消 Star</SelectItem>
                <SelectItem value="follow">批量关注用户</SelectItem>
                <SelectItem value="unfollow">批量取消关注</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">执行账户（已选 {selectedAccountIds.length}）</label>
              <Button variant="ghost" size="sm" onClick={() => setSelectedAccountIds((accounts || []).map(a => a.id))}>全选</Button>
            </div>
            <div className="max-h-[160px] space-y-1 overflow-y-auto rounded-md border p-2">
              {(accounts || []).map((a) => (
                <label key={a.id} className="flex cursor-pointer items-center gap-2 rounded p-1.5 text-sm hover:bg-accent">
                  <input type="checkbox" checked={selectedAccountIds.includes(a.id)}
                    onChange={() => setSelectedAccountIds(prev => prev.includes(a.id) ? prev.filter(i => i !== a.id) : [...prev, a.id])}
                    className="h-3.5 w-3.5" />
                  <span className="flex-1 truncate">{displayName(a)}</span>
                  <span className="text-[10px] text-muted-foreground">{a.status}</span>
                </label>
              ))}
            </div>
          </div>
          {type === 'dispatch' && (
            <>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">仓库名（按账户缓存精确匹配）</label>
                <Input value={repoName} onChange={(e) => setRepoName(e.target.value)} placeholder="keepalive" className="font-mono text-sm" />
                <p className="text-xs text-muted-foreground">执行时在每个选中账户的仓库缓存中按该名称匹配仓库，账户删除后自动跳过</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">工作流文件名</label>
                  <Input value={filename} onChange={(e) => setFilename(e.target.value)} placeholder="keepalive.yml" className="font-mono text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">分支 Ref</label>
                  <Input value={ref} onChange={(e) => setRef(e.target.value)} placeholder="main" className="font-mono text-sm" />
                </div>
              </div>
            </>
          )}
          {(type === 'star' || type === 'unstar') && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium">目标仓库</label>
              <Input value={starUrl} onChange={(e) => setStarUrl(e.target.value)} placeholder="https://github.com/owner/repo 或 owner/repo" className="text-sm" />
            </div>
          )}
          {(type === 'follow' || type === 'unfollow') && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium">目标用户名</label>
              <Input value={followUser} onChange={(e) => setFollowUser(e.target.value)} placeholder="GitHub username" className="font-mono text-sm" />
            </div>
          )}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">执行间隔</label>
            <Select value={String(intervalMin)} onValueChange={(v) => setIntervalMin(Number(v))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {batchIntervals.map((i) => <SelectItem key={i.value} value={String(i.value)}>{i.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>取消</Button>
          <Button onClick={() => createMut.mutate()} disabled={createMut.isPending}>
            {createMut.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}创建
          </Button>
        </DialogFooter>
      </Dialog>

      <ConfirmDialog
        open={deleteId !== null}
        title="删除该批量定时任务？"
        onConfirm={() => { if (deleteId !== null) delMut.mutate(deleteId); setDeleteId(null) }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}

export default function TasksPage() {
  const { t } = useTranslation()
  return (
    <div className="space-y-4">
      <PageHeader title={t('tasks.title')} description={t('tasks.description')} />
      <Tabs defaultValue="workflow">
        <TabsList>
          <TabsTrigger value="workflow"><Clock className="mr-2 h-4 w-4" />工作流定时任务</TabsTrigger>
          <TabsTrigger value="batch"><Layers className="mr-2 h-4 w-4" />批量定时任务</TabsTrigger>
        </TabsList>
        <TabsContent value="workflow" className="space-y-4"><WorkflowTasksBody /></TabsContent>
        <TabsContent value="batch" className="space-y-4"><BatchTasksTab /></TabsContent>
      </Tabs>
    </div>
  )
}
