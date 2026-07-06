import { useState, useMemo, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { accountApi, repoApi, type Account } from '@/api'
import { displayName as getDisplayName, getPinnedIds, getSortMode, sortAccounts } from '@/lib/account'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Table, THead, TH, TBody, TR, TD } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { LegacyDialog as Dialog, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Plus, RefreshCw, Trash2, ShieldCheck, Edit3, Pin, PinOff, ArrowUpDown, Search } from 'lucide-react'
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
  const { data: accounts, isLoading, isError } = useQuery({ queryKey: ['accounts'], queryFn: () => accountApi.list() })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [importData, setImportData] = useState({ token: '', password: '', recovery_email: '', note: '' })
  const [importing, setImporting] = useState(false)
  const [noteOpen, setNoteOpen] = useState(false)
  const [noteAcc, setNoteAcc] = useState<Account | null>(null)
  const [noteValue, setNoteValue] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<Account | null>(null)

  const [sortMode, setSortMode] = useState<SortMode>(() => getSortMode() as SortMode)
  const [searchQuery, setSearchQuery] = useState('')
  const [pinnedIds, setPinnedIds] = useState<number[]>(() => getPinnedIds())

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

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(a =>
        a.github_login.toLowerCase().includes(q) ||
        (a.note || '').toLowerCase().includes(q) ||
        (a.display_name || '').toLowerCase().includes(q)
      )
    }

    return list
  }, [accounts, searchQuery])

  const checkMutation = useMutation({
    mutationFn: (id: number) => accountApi.checkStatus(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['accounts'] }); toast.success(t('accounts.checkComplete')) },
    onError: () => toast.error(t('accounts.checkFailed')),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => accountApi.remove(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['accounts'] }); toast.success(t('accounts.deleteSuccess')) },
  })

  const handleImport = async () => {
    if (!importData.token) { toast.error(t('accounts.tokenRequired')); return }
    setImporting(true)
    try {
      const acc = await accountApi.import(importData)
      toast.success(t('accounts.importSuccess', { name: acc.github_login }))
      setDialogOpen(false)
      setImportData({ token: '', password: '', recovery_email: '', note: '' })
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      try { await repoApi.refreshRepos(acc.id); toast.success(t('accounts.syncSuccess')) } catch {}
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    } catch (e: any) { toast.error(e?.message || t('accounts.importFailed')) }
    finally { setImporting(false) }
  }

  const handleSaveNote = async () => {
    if (!noteAcc) return
    await accountApi.update(noteAcc.id, { note: noteValue })
    toast.success(t('accounts.noteSaved'))
    setNoteOpen(false)
    queryClient.invalidateQueries({ queryKey: ['accounts'] })
  }

  const openNote = (acc: Account) => { setNoteAcc(acc); setNoteValue(acc.note || ''); setNoteOpen(true) }

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

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="gap-2"
            onClick={() => { accounts?.forEach((a) => checkMutation.mutate(a.id)) }}>
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
                              {isPinned && <Badge variant="secondary" className="px-1 py-0 text-[10px]">{t('accounts.pinned')}</Badge>}
                            </div>
                            <div className="text-xs text-muted-foreground">{acc.display_name}</div>
                          </div>
                          <button onClick={() => openNote(acc)} className="ml-1 opacity-30 hover:opacity-100"><Edit3 className="h-3.5 w-3.5" /></button>
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>{t('common.cancel')}</Button>
          <Button disabled={importing} onClick={handleImport}>{importing ? t('accounts.importing') : t('accounts.import')}</Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={noteOpen} onClose={() => setNoteOpen(false)} className="max-w-sm">
        <DialogTitle>{t('accounts.editNote', { name: noteAcc?.github_login })}</DialogTitle>
        <Input value={noteValue} onChange={(e) => setNoteValue(e.target.value)} placeholder={t('accounts.notePlaceholderExample')} />
        <p className="mt-2 text-xs text-muted-foreground">{t('accounts.noteHint')}</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setNoteOpen(false)}>{t('common.cancel')}</Button>
          <Button onClick={handleSaveNote}>{t('common.save')}</Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}
