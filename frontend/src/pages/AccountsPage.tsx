import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { accountApi, repoApi, type Account } from '@/api'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Table, THead, TH, TBody, TR, TD } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Plus, RefreshCw, Trash2, ShieldCheck, Edit3, HelpCircle } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

function statusBadge(status: string) {
  const map: Record<string, { variant: 'success' | 'destructive' | 'warning' | 'secondary'; label: string }> = {
    active: { variant: 'success', label: '正常' },
    banned: { variant: 'destructive', label: '封禁' },
    error: { variant: 'warning', label: '异常' },
    unknown: { variant: 'secondary', label: '未知' },
  }
  return map[status] || map.unknown
}

function displayName(acc: Account) {
  return acc.note?.trim() ? `${acc.note.trim()}(${acc.github_login})` : acc.github_login
}

export default function AccountsPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: accounts, isLoading } = useQuery({ queryKey: ['accounts'], queryFn: accountApi.list })

  const [importOpen, setImportOpen] = useState(false)
  const [importData, setImportData] = useState({ token: '', password: '', recovery_email: '', note: '' })
  const [importing, setImporting] = useState(false)
  const [noteOpen, setNoteOpen] = useState(false)
  const [noteAcc, setNoteAcc] = useState<Account | null>(null)
  const [noteValue, setNoteValue] = useState('')

  const checkMutation = useMutation({
    mutationFn: (id: number) => accountApi.checkStatus(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['accounts'] }); toast.success('检测完成') },
    onError: () => toast.error('检测失败'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => accountApi.remove(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['accounts'] }); toast.success('已删除') },
  })

  const handleImport = async () => {
    if (!importData.token) { toast.error('请输入 Token'); return }
    setImporting(true)
    try {
      const acc = await accountApi.import(importData)
      toast.success(`导入成功: ${acc.github_login}`)
      setImportOpen(false)
      setImportData({ token: '', password: '', recovery_email: '', note: '' })
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      try { await repoApi.refreshRepos(acc.id); toast.success('已自动同步仓库') } catch {}
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    } catch (e: any) { toast.error(e?.message || '导入失败') }
    finally { setImporting(false) }
  }

  const handleSaveNote = async () => {
    if (!noteAcc) return
    await accountApi.update(noteAcc.id, { note: noteValue })
    toast.success('备注已保存')
    setNoteOpen(false)
    queryClient.invalidateQueries({ queryKey: ['accounts'] })
  }

  const openNote = (acc: Account) => { setNoteAcc(acc); setNoteValue(acc.note || ''); setNoteOpen(true) }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button onClick={() => setImportOpen(true)} className="gap-2"><Plus className="h-4 w-4" /> 导入账户</Button>
          <Button variant="outline" className="gap-2"
            onClick={() => { accounts?.forEach((a) => checkMutation.mutate(a.id)) }}>
            <ShieldCheck className="h-4 w-4" /> 批量检测
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => queryClient.invalidateQueries({ queryKey: ['accounts'] })}>
            <RefreshCw className="h-4 w-4" /> 刷新
          </Button>
        </div>
        <span className="text-sm text-muted-foreground">共 {accounts?.length ?? 0} 个账户</span>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">加载中...</div>
          ) : accounts && accounts.length > 0 ? (
            <Table>
              <THead>
                <TR>
                  <TH>账户</TH><TH>状态</TH><TH>最后检测</TH><TH className="text-right">操作</TH>
                </TR>
              </THead>
              <TBody>
                {accounts.map((acc) => {
                  const sb = statusBadge(acc.status)
                  return (
                    <TR key={acc.id}>
                      <TD>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {acc.github_login[0]?.toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium">{displayName(acc)}</div>
                            <div className="text-xs text-muted-foreground">{acc.display_name}</div>
                          </div>
                          <button onClick={() => openNote(acc)} className="ml-1 opacity-30 hover:opacity-100"><Edit3 className="h-3.5 w-3.5" /></button>
                        </div>
                      </TD>
                      <TD><Badge variant={sb.variant}>{sb.label}</Badge></TD>
                      <TD className="text-sm text-muted-foreground">{acc.last_checked_at ? new Date(acc.last_checked_at).toLocaleString() : '—'}</TD>
                      <TD>
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/accounts/${acc.id}`)}>详情</Button>
                          <Button variant="ghost" size="sm" onClick={() => checkMutation.mutate(acc.id)}>检测</Button>
                          <Button variant="ghost" size="sm" className="text-destructive"
                            onClick={() => { if (confirm(`确定删除 ${acc.github_login}?`)) deleteMutation.mutate(acc.id) }}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TD>
                    </TR>
                  )
                })}
              </TBody>
            </Table>
          ) : (
            <div className="p-12 text-center">
              <p className="mb-4 text-muted-foreground">还没有导入任何账户</p>
              <Button onClick={() => setImportOpen(true)} className="gap-2"><Plus className="h-4 w-4" /> 导入第一个账户</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Import Dialog */}
      <Dialog open={importOpen} onClose={() => setImportOpen(false)}>
        <DialogTitle>导入 GitHub 账户</DialogTitle>
        <div className="space-y-4">
          <a href="https://github.com/settings/tokens/new?scopes=repo,repo:status,repo_deployment,public_repo,repo:invite,security_events,workflow,write:packages,read:packages,delete:packages,admin:org,write:org,read:org,manage_runners:org,admin:public_key,write:public_key,read:public_key,admin:repo_hook,write:repo_hook,read:repo_hook,admin:org_hook,gist,notifications,user,user:email,user:follow,delete_repo,write:discussion,read:discussion,admin:enterprise,manage_runners:enterprise,manage_billing:enterprise,read:enterprise,scim:enterprise,audit_log,read:audit_log,codespace,codespace:secrets,copilot,manage_billing:copilot,write:network_configurations,read:network_configurations,project,read:project,admin:gpg_key,write:gpg_key,read:gpg_key,admin:ssh_signing_key,write:ssh_signing_key,read:ssh_signing_key"
            target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">在 GitHub 创建 Token →</a>
          <div className="space-y-2"><label className="text-sm font-medium">GitHub Token *</label>
            <Input type="password" value={importData.token} onChange={(e) => setImportData({ ...importData, token: e.target.value })} placeholder="ghp_xxx" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><label className="text-sm font-medium">密码（选填）</label>
              <Input type="password" value={importData.password} onChange={(e) => setImportData({ ...importData, password: e.target.value })} /></div>
            <div className="space-y-2"><label className="text-sm font-medium">邮箱（选填）</label>
              <Input value={importData.recovery_email} onChange={(e) => setImportData({ ...importData, recovery_email: e.target.value })} /></div>
          </div>
          <div className="space-y-2"><label className="text-sm font-medium">备注（选填）</label>
            <Input value={importData.note} onChange={(e) => setImportData({ ...importData, note: e.target.value })} placeholder="如：主账户" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setImportOpen(false)}>取消</Button>
          <Button disabled={importing} onClick={handleImport}>{importing ? '导入中...' : '导入'}</Button>
        </DialogFooter>
      </Dialog>

      {/* Note Dialog */}
      <Dialog open={noteOpen} onClose={() => setNoteOpen(false)} className="max-w-sm">
        <DialogTitle>编辑备注 - {noteAcc?.github_login}</DialogTitle>
        <Input value={noteValue} onChange={(e) => setNoteValue(e.target.value)} placeholder="如：主账户、备用号1" />
        <p className="mt-2 text-xs text-muted-foreground">设置备注后显示为「备注名(用户名)」</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setNoteOpen(false)}>取消</Button>
          <Button onClick={handleSaveNote}>保存</Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}
