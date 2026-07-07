import { useState, useMemo, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { accountApi, repoApi, type Account } from '@/api'
import { displayName as getDisplayName, getPinnedIds, getSortMode, sortAccounts } from '@/lib/account'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Table, THead, TH, TBody, TR, TD } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { LegacyDialog as Dialog, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Plus, RefreshCw, Trash2, ShieldCheck, Edit3, Pin, ArrowUpDown, Search, RotateCcw, Trash } from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/page-header'
import { LoadingState } from '@/components/ui/loading-state'
import { ErrorState } from '@/components/ui/error-state'
import { EmptyState } from '@/components/ui/empty-state'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTranslation } from 'react-i18next'

type SortMode = 'default' | 'name' | 'status' | 'checked' | 'created'

export default function AccountsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeGroup, setActiveGroup] = useState<string>('')
  const { data: accounts, isLoading, isError } = useQuery({
    queryKey: ['accounts', activeGroup],
    queryFn: () => accountApi.list(activeGroup === 'recycle' || activeGroup === 'all' || !activeGroup ? undefined : activeGroup)
  })
  const { data: groups } = useQuery({ queryKey: ['accounts', 'groups'], queryFn: () => accountApi.listGroups() })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [importData, setImportData] = useState({ token: '', password: '', recovery_email: '', note: '', group: '' })
  const [importing, setImporting] = useState(false)
  const [noteOpen, setNoteOpen] = useState(false)
  const [noteAcc, setNoteAcc] = useState<Account | null>(null)
  const [noteValue, setNoteValue] = useState('')
  const [groupValue, setGroupValue] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<Account | null>(null)
  const [recycleOpen, setRecycleOpen] = useState(false)
  const [permDeleteTarget, setPermDeleteTarget] = useState<Account | null>(null)

  const [sortMode, setSortMode] = useState<SortMode>(() => getSortMode() as SortMode)
  const [searchQuery, setSearchQuery] = useState('')
  const [pinnedIds, setPinnedIds] = useState<number[]>(() => getPinnedIds())

  useEffect(() => {
    if (searchParams.get('recycle') === '1') {
      setRecycleOpen(true)
      searchParams.delete('recycle')
      setSearchParams(searchParams, { replace: true })
    }
  }, [searchParams, setSearchParams])

  useEffect(() => {
    localStorage.setItem('gam-pinned-accounts', JSON.stringify(pinnedIds))
  }, [pinnedIds])

  useEffect(() => {
    localStorage.setItem('gam-account-sort', sortMode)
  }, [sortMode])

  const togglePin = (id: number) => {
    setPinnedIds(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id])
  }

  const sortedAccounts = useMemo(() => {
    if (!accounts) return []
    let list = sortAccounts(accounts)

    if (activeGroup) {
      list = list.filter(a => (a.group || '') === activeGroup)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(a =>
        a.github_login.toLowerCase().includes(q) ||
        (a.note || '').toLowerCase().includes(q) ||
        (a.display_name || '').toLowerCase().includes(q)
      )
    }

    return list
  }, [accounts, searchQuery, activeGroup])

  const checkMutation = useMutation({
    mutationFn: (id: number) => accountApi.checkStatus(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['accounts'] }); toast.success(t('accounts.checkComplete')) },
    onError: () => toast.error(t('accounts.checkFailed')),
  })

  const batchCheckMutation = useMutation({
    mutationFn: (ids: number[]) => accountApi.batchCheck(ids),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['accounts'] }); toast.success(t('accounts.checkComplete')) },
    onError: () => toast.error(t('accounts.checkFailed')),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => accountApi.remove(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['accounts'] }); toast.success(t('accounts.deleteSuccess')) },
  })

  const restoreMutation = useMutation({
    mutationFn: (id: number) => accountApi.restore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      queryClient.invalidateQueries({ queryKey: ['accounts', 'recycle-bin'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
      toast.success('已恢复') // TODO: i18n
    },
    onError: (e: any) => toast.error(e?.message || '恢复失败'),
  })

  const permDeleteMutation = useMutation({
    mutationFn: (id: number) => accountApi.permanentDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      queryClient.invalidateQueries({ queryKey: ['accounts', 'recycle-bin'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
      toast.success('已永久删除') // TODO: i18n
    },
    onError: (e: any) => toast.error(e?.message || '永久删除失败'),
  })

  const handleImport = async () => {
    if (!importData.token) { toast.error(t('accounts.tokenRequired')); return }
    setImporting(true)
    try {
      const acc = await accountApi.import(importData)
      toast.success(t('accounts.importSuccess', { name: acc.github_login }))
      setDialogOpen(false)
      setImportData({ token: '', password: '', recovery_email: '', note: '', group: '' })
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      try { await repoApi.refreshRepos(acc.id); toast.success(t('accounts.syncSuccess')) } catch {}
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    } catch (e: any) { toast.error(e?.message || t('accounts.importFailed')) }
    finally { setImporting(false) }
  }

  const handleSaveNote = async () => {
    if (!noteAcc) return
    try {
      await accountApi.update(noteAcc.id, { note: noteValue, group: groupValue })
      toast.success(t('accounts.noteSaved'))
      setNoteOpen(false)
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      queryClient.invalidateQueries({ queryKey: ['accounts', 'groups'] })
    } catch (e: any) {
      toast.error(e?.message || t('accounts.noteSaveFailed', { defaultValue: '保存失败' }))
    }
  }

  const openNote = (acc: Account) => {
    setNoteAcc(acc)
    setNoteValue(acc.note || '')
    setGroupValue(acc.group || '')
    setNoteOpen(true)
  }

  const statusBadge = (status: string) => {
    const map: Record<string, { variant: 'success' | 'destructive' | 'warning' | 'secondary'; label: string }> = {
      active: { variant: 'success', label: t('accounts.statusActive') },
      banned: { variant: 'destructive', label: t('accounts.statusBanned') },
      error: { variant: 'warning', label: t('accounts.statusError') },
      unknown: { variant: 'secondary', label: t('accounts.statusUnknown') },
    }
    return map[status] || map.unknown
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title={t('accounts.title')}
        description={t('accounts.description')}
        actions={<Button onClick={() => setDialogOpen(true)} className="gap-2"><Plus className="h-4 w-4" />{t('accounts.import')}</Button>}
      />

      {/* Group filter tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant={activeGroup === '' ? 'default' : 'outline'}
          onClick={() => setActiveGroup('')}
        >
          {t('accounts.allGroups', { defaultValue: '全部' })}
        </Button>
        {groups?.filter(g => g).map((g) => (
          <Button
            key={g}
            size="sm"
            variant={activeGroup === g ? 'default' : 'outline'}
            onClick={() => setActiveGroup(g)}
          >
            {g}
          </Button>
        ))}
        <Button
          size="sm"
          variant="outline"
          className="gap-2 ml-auto text-muted-foreground"
          onClick={() => setRecycleOpen(true)}
        >
          <Trash2 className="h-3.5 w-3.5" />
          {t('accounts.recycleBin', { defaultValue: '回收站' })}
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="gap-2"
            onClick={() => batchCheckMutation.mutate(sortedAccounts.map((a) => a.id))}
            disabled={batchCheckMutation.isPending || sortedAccounts.length === 0}
          >
            <ShieldCheck className="h-4 w-4" /> {t('accounts.batchCheck')}
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => queryClient.invalidateQueries({ queryKey: ['accounts'] })}>
            <RefreshCw className="h-4 w-4" /> {t('common.refresh')}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('common.search')}
              className="h-9 w-40 pl-8 text-sm"
            />
          </div>
          <Select value={sortMode} onValueChange={(v) => setSortMode(v as SortMode)}>
            <SelectTrigger className="h-9 w-[140px] gap-2 text-sm">
              <ArrowUpDown className="h-3.5 w-3.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">{t('accounts.sortDefault')}</SelectItem>
              <SelectItem value="name">{t('accounts.sortName')}</SelectItem>
              <SelectItem value="status">{t('accounts.sortStatus')}</SelectItem>
              <SelectItem value="checked">{t('accounts.sortChecked')}</SelectItem>
              <SelectItem value="created">{t('accounts.sortCreated')}</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground whitespace-nowrap">{sortedAccounts.length}</span>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingState />
          ) : isError ? (
            <ErrorState retry={() => queryClient.invalidateQueries({ queryKey: ['accounts'] })} />
          ) : sortedAccounts.length > 0 ? (
            <Table>
              <THead>
                <TR>
                  <TH className="w-8"></TH>
                  <TH>{t('accounts.accountColumn')}</TH><TH>{t('common.status')}</TH><TH>{t('accounts.lastChecked')}</TH><TH className="text-right">{t('common.actions')}</TH>
                </TR>
              </THead>
              <TBody>
                {sortedAccounts.map((acc) => {
                  const sb = statusBadge(acc.status)
                  const isPinned = pinnedIds.includes(acc.id)
                  return (
                    <TR key={acc.id} className={isPinned ? 'bg-muted/30' : ''}>
                      <TD>
                        <button
                          onClick={() => togglePin(acc.id)}
                          className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                            isPinned ? 'text-primary' : 'text-muted-foreground/40 hover:text-muted-foreground'
                          }`}
                          title={isPinned ? t('accounts.unpin') : t('accounts.pin')}
                        >
                          {isPinned ? <Pin className="h-3.5 w-3.5 fill-current" /> : <Pin className="h-3.5 w-3.5" />}
                        </button>
                      </TD>
                      <TD>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={acc.avatar_url} alt={acc.github_login} />
                            <AvatarFallback>{acc.github_login[0]?.toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium">{getDisplayName(acc)}</span>
                              {acc.group && (
                                <Badge variant="outline" className="px-1 py-0 text-[10px] text-muted-foreground">{acc.group}</Badge>
                              )}
                              {isPinned && <Badge variant="secondary" className="px-1 py-0 text-[10px]">{t('accounts.pinned')}</Badge>}
                            </div>
                            <div className="text-xs text-muted-foreground">{acc.display_name}</div>
                          </div>
                          <button onClick={() => openNote(acc)} className="ml-1 rounded p-1 text-muted-foreground/60 transition-opacity hover:bg-muted hover:text-foreground"><Edit3 className="h-3.5 w-3.5" /></button>
                        </div>
                      </TD>
                      <TD><Badge variant={sb.variant}>{sb.label}</Badge></TD>
                      <TD className="text-sm text-muted-foreground">{acc.last_checked_at ? new Date(acc.last_checked_at).toLocaleString() : '—'}</TD>
                      <TD>
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/accounts/${acc.id}`)}>{t('accounts.details')}</Button>
                          <Button variant="ghost" size="sm" onClick={() => checkMutation.mutate(acc.id)}>{t('accounts.check')}</Button>
                          <Button variant="ghost" size="sm" className="text-destructive"
                            onClick={() => setDeleteTarget(acc)}>
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
            <EmptyState
              title={t('accounts.noAccounts')}
              description={t('accounts.noAccountsDescription')}
              action={<Button onClick={() => setDialogOpen(true)} className="gap-2"><Plus className="h-4 w-4" />{t('accounts.importNow')}</Button>}
            />
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={!!deleteTarget}
        onConfirm={() => { if (deleteTarget) deleteMutation.mutate(deleteTarget.id); setDeleteTarget(null) }}
        onCancel={() => setDeleteTarget(null)}
        title={t('accounts.deleteConfirm', { name: deleteTarget?.github_login })}
      />

      <ConfirmDialog
        open={!!permDeleteTarget}
        onConfirm={() => { if (permDeleteTarget) permDeleteMutation.mutate(permDeleteTarget.id); setPermDeleteTarget(null) }}
        onCancel={() => setPermDeleteTarget(null)}
        title={`永久删除 ${permDeleteTarget?.github_login}? 此操作无法撤销。` /* TODO: i18n */}
      />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{t('accounts.importTitle')}</DialogTitle>
        <div className="space-y-4">
          <a href="https://github.com/settings/tokens/new?scopes=repo,repo:status,repo_deployment,public_repo,repo:invite,security_events,workflow,write:packages,read:packages,delete:packages,admin:org,write:org,read:org,manage_runners:org,admin:public_key,write:public_key,read:public_key,admin:repo_hook,write:repo_hook,read:repo_hook,admin:org_hook,gist,notifications,user,user:email,user:follow,delete_repo,write:discussion,read:discussion,admin:enterprise,manage_runners:enterprise,manage_billing:enterprise,read:enterprise,scim:enterprise,audit_log,read:audit_log,codespace,codespace:secrets,copilot,manage_billing:copilot,write:network_configurations,read:network_configurations,project,read:project,admin:gpg_key,write:gpg_key,read:gpg_key,admin:ssh_signing_key,write:ssh_signing_key,read:ssh_signing_key"
            target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">{t('accounts.createTokenOnGithub')} →</a>
          <div className="space-y-2"><label className="text-sm font-medium">{t('accounts.githubToken')} *</label>
            <Input type="password" value={importData.token} onChange={(e) => setImportData({ ...importData, token: e.target.value })} placeholder="ghp_xxx" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><label className="text-sm font-medium">{t('accounts.passwordOptional')}</label>
              <Input type="password" value={importData.password} onChange={(e) => setImportData({ ...importData, password: e.target.value })} /></div>
            <div className="space-y-2"><label className="text-sm font-medium">{t('accounts.emailOptional')}</label>
              <Input value={importData.recovery_email} onChange={(e) => setImportData({ ...importData, recovery_email: e.target.value })} /></div>
          </div>
          <div className="space-y-2"><label className="text-sm font-medium">{t('accounts.notesOptional')}</label>
            <Input value={importData.note} onChange={(e) => setImportData({ ...importData, note: e.target.value })} placeholder={t('accounts.notePlaceholderExample')} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">{t('accounts.group', { defaultValue: '分组' })}</label>
            <Input value={importData.group} onChange={(e) => setImportData({ ...importData, group: e.target.value })} placeholder={t('accounts.groupPlaceholder', { defaultValue: '输入分组名称（如：主号、备用）' })} /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>{t('common.cancel')}</Button>
          <Button disabled={importing} onClick={handleImport}>{importing ? t('accounts.importing') : t('accounts.import')}</Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={noteOpen} onClose={() => setNoteOpen(false)} className="max-w-sm">
        <DialogTitle>{t('accounts.editNote', { name: noteAcc?.github_login })}</DialogTitle>
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('accounts.notesOptional')}</label>
            <Input value={noteValue} onChange={(e) => setNoteValue(e.target.value)} placeholder={t('accounts.notePlaceholderExample')} />
            <p className="text-xs text-muted-foreground">{t('accounts.noteHint')}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('accounts.group', { defaultValue: '分组' })}</label>
            <Input value={groupValue} onChange={(e) => setGroupValue(e.target.value)} placeholder={t('accounts.groupPlaceholder', { defaultValue: '输入分组名称' })} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setNoteOpen(false)}>{t('common.cancel')}</Button>
          <Button onClick={handleSaveNote}>{t('common.save')}</Button>
        </DialogFooter>
      </Dialog>

      {/* Recycle bin dialog */}
      <RecycleBinDialog open={recycleOpen} onClose={() => setRecycleOpen(false)} onPermDelete={(acc) => setPermDeleteTarget(acc)} />
    </div>
  )
}

function RecycleBinDialog({ open, onClose, onPermDelete }: { open: boolean; onClose: () => void; onPermDelete: (acc: Account) => void }) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { data: deleted, isLoading } = useQuery({
    queryKey: ['accounts', 'recycle-bin'],
    queryFn: () => accountApi.listRecycleBin(),
    enabled: open,
  })

  const restoreMutation = useMutation({
    mutationFn: (id: number) => accountApi.restore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      queryClient.invalidateQueries({ queryKey: ['accounts', 'recycle-bin'] })
      toast.success('已恢复') // TODO: i18n
    },
  })

  const cleanMutation = useMutation({
    mutationFn: () => accountApi.cleanRecycleBin(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts', 'recycle-bin'] })
      toast.success('已清空回收站') // TODO: i18n
    },
  })

  return (
    <Dialog open={open} onClose={onClose} className="max-w-2xl">
      <DialogTitle>{t('accounts.recycleBin', { defaultValue: '回收站' })}</DialogTitle>
      {isLoading ? (
        <LoadingState />
      ) : deleted && deleted.length > 0 ? (
        <Table>
          <THead>
            <TR>
              <TH>{t('accounts.accountColumn')}</TH>
              <TH>{t('accounts.deletedAt', { defaultValue: '删除时间' })}</TH>
              <TH className="text-right">{t('common.actions')}</TH>
            </TR>
          </THead>
          <TBody>
            {deleted.map((acc) => (
              <TR key={acc.id}>
                <TD>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={acc.avatar_url} alt={acc.github_login} />
                      <AvatarFallback>{acc.github_login[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{getDisplayName(acc)}</span>
                  </div>
                </TD>
                <TD className="text-sm text-muted-foreground">{acc.deleted_at ? new Date(acc.deleted_at).toLocaleString() : '—'}</TD>
                <TD>
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="sm" className="gap-1" onClick={() => restoreMutation.mutate(acc.id)} disabled={restoreMutation.isPending}>
                      <RotateCcw className="h-3.5 w-3.5" />
                      {t('accounts.restore', { defaultValue: '恢复' })}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1 text-destructive" onClick={() => onPermDelete(acc)}>
                      <Trash className="h-3.5 w-3.5" />
                      {t('accounts.permanentDelete', { defaultValue: '永久删除' })}
                    </Button>
                  </div>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      ) : (
        <EmptyState title={t('accounts.recycleBinEmpty', { defaultValue: '回收站为空' })} />
      )}
      <DialogFooter>
        <Button variant="outline" className="mr-auto text-destructive" disabled={!deleted?.length || cleanMutation.isPending} onClick={() => cleanMutation.mutate()}>
          {t('accounts.cleanRecycleBin', { defaultValue: '清空回收站' })}
        </Button>
        <Button variant="outline" onClick={onClose}>{t('common.close', { defaultValue: '关闭' })}</Button>
      </DialogFooter>
    </Dialog>
  )
}
