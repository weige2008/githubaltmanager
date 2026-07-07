import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { accountApi, repoApi, type Repo } from '@/api'
import { displayName } from '@/lib/account'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, THead, TH, TBody, TR, TD } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { RefreshCw, Eye, EyeOff, Copy, Lock } from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/page-header'
import { ErrorState } from '@/components/ui/error-state'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { CopyButton } from '@/components/ui/copy-button'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { useTranslation } from 'react-i18next'

export default function AccountDetailPage() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const accId = Number(id)
  const { data: acc, isLoading, isError, refetch } = useQuery({ queryKey: ['account', accId], queryFn: () => accountApi.get(accId) })
  const { data: repos } = useQuery<Repo[]>({ queryKey: ['repos', accId], queryFn: () => repoApi.listByAccount(accId) })

  const [secretsVisible, setSecretsVisible] = useState(false)
  const [secrets, setSecrets] = useState<{ token: string; password: string; email: string } | null>(null)

  const revealSecrets = async () => {
    if (secretsVisible) { setSecretsVisible(false); return }
    try { const s = await accountApi.getSecrets(accId); setSecrets(s); setSecretsVisible(true) }
    catch (e: any) { toast.error(e?.message || t('accounts.decryptFailed')) }
  }

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => toast.success(label)).catch(() => toast.error(t('accounts.copyFailed')))
  }

  const syncRepos = async () => {
    toast.loading(t('repos.syncing'), { id: 'sync' })
    try { const r = await repoApi.refreshRepos(accId); toast.success(t('accounts.syncedCount', { count: r.total }), { id: 'sync' }) }
    catch { toast.error(t('accounts.syncFailed'), { id: 'sync' }) }
  }

  if (isError) return <ErrorState retry={refetch} />

  if (isLoading || !acc) return <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32" />)}</div>

  const accountName = displayName(acc)

  return (
    <div className="space-y-6">
      <BreadcrumbNav items={[{ label: t('nav.accounts'), href: '/accounts' }, { label: accountName }]} />

      <PageHeader
        title={accountName}
        description={acc.display_name}
        actions={<Button variant="outline" onClick={() => navigate('/accounts')}>{t('common.back')}</Button>}
      />

      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={acc.avatar_url} alt={acc.github_login} />
          <AvatarFallback className="text-lg font-bold text-primary">{acc.github_login[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <Badge variant={acc.status === 'active' ? 'success' : acc.status === 'banned' ? 'destructive' : 'secondary'}>
          {acc.status === 'active' ? t('accounts.statusActive') : acc.status === 'banned' ? t('accounts.statusBanned') : acc.status}
        </Badge>
      </div>

      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">{t('accounts.tabInfo')}</TabsTrigger>
          <TabsTrigger value="repos">{t('accounts.tabRepos')} ({repos?.length ?? 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card>
            <CardHeader><CardTitle>{t('accounts.basicInfo')}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm lg:grid-cols-3">
                <div><span className="text-muted-foreground">{t('accounts.githubId')}</span><br /><span className="font-medium">{acc.github_id}</span></div>
                <div><span className="text-muted-foreground">{t('accounts.githubLogin')}</span><br /><span className="font-medium">{acc.github_login}</span></div>
                <div><span className="text-muted-foreground">{t('accounts.displayName')}</span><br /><span className="font-medium">{acc.display_name}</span></div>
                <div>
                  <span className="flex items-center gap-2 text-muted-foreground">Token
                    <button onClick={revealSecrets} className="text-primary">{secretsVisible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}</button>
                    {secretsVisible && secrets?.token && <CopyButton value={secrets.token} variant="ghost" size="icon" className="h-3.5 w-3.5 p-0 text-primary" onCopy={() => toast.success(t('accounts.tokenCopied'))} />}
                  </span>
                  <code className="text-xs">{secretsVisible && secrets ? '••••' + secrets.token.slice(-4) : '••••••••'}</code>
                </div>
                <div>
                  <span className="flex items-center text-muted-foreground">{t('accounts.password')}
                    {secretsVisible && secrets?.password && <CopyButton value={secrets.password} variant="ghost" size="icon" className="ml-2 h-3.5 w-3.5 p-0 text-primary" onCopy={() => toast.success(t('accounts.passwordCopied'))} />}
                  </span>
                  <span className="font-medium">{secretsVisible && secrets ? secrets.password || t('accounts.emptyValue') : '••••'}</span>
                </div>
                <div>
                  <span className="flex items-center text-muted-foreground">{t('accounts.email')}
                    {secretsVisible && secrets?.email && <CopyButton value={secrets.email} variant="ghost" size="icon" className="ml-2 h-3.5 w-3.5 p-0 text-primary" onCopy={() => toast.success(t('accounts.tokenCopied'))} />}
                  </span>
                  <span className="font-medium">{secretsVisible && secrets ? secrets.email || t('accounts.emptyValue') : '••••'}</span>
                </div>
                <div><span className="text-muted-foreground">{t('accounts.lastChecked')}</span><br />{acc.last_checked_at ? new Date(acc.last_checked_at).toLocaleString() : '—'}</div>
                <div><span className="text-muted-foreground">{t('accounts.notes')}</span><br />{acc.note || '—'}</div>
                <div><span className="text-muted-foreground">{t('accounts.group', { defaultValue: '分组' })}</span><br />{acc.group || '—'}</div>
                <div className="col-span-2 lg:col-span-3"><span className="text-muted-foreground">{t('accounts.statusReason')}</span><br />{acc.status_reason || '—'}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="repos">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>{t('accounts.repos')} ({repos?.length ?? 0})</CardTitle>
              <Button variant="outline" size="sm" className="gap-2" onClick={syncRepos}><RefreshCw className="h-4 w-4" /> {t('common.sync')}</Button>
            </CardHeader>
            <CardContent className="p-0">
              {repos && repos.length > 0 ? (
                <Table>
                  <THead><TR><TH>{t('accounts.repos')}</TH><TH>{t('repos.permission')}</TH><TH className="text-right">{t('common.actions')}</TH></TR></THead>
                  <TBody>
                    {repos.map((r) => (
                      <TR key={r.id}>
                        <TD>
                          <a href={r.html_url} target="_blank" rel="noreferrer" className="font-medium text-primary hover:underline">{r.full_name}</a>
                          <div className="flex gap-1 mt-1">
                            {r.private && <Badge variant="warning" className="text-[10px]">{t('repos.private')}</Badge>}
                            {r.fork && <Badge variant="secondary" className="text-[10px]">Fork</Badge>}
                            {r.archived && <Badge variant="secondary" className="text-[10px]">{t('repos.archived')}</Badge>}
                          </div>
                        </TD>
                        <TD className="text-sm">{r.permission}</TD>
                        <TD className="text-right"><Button variant="ghost" size="sm" onClick={() => navigate(`/repos?rid=${r.id}`)}>{t('repos.browse')}</Button></TD>
                      </TR>
                    ))}
                  </TBody>
                </Table>
              ) : <div className="p-8 text-center text-muted-foreground">{t('repos.emptyOrSync')}</div>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
