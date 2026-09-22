import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { accountApi, repoApi, type Repo } from '@/api'
import { displayName } from '@/lib/account'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, THead, TH, TBody, TR, TD } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { RefreshCw, Eye, EyeOff, Copy, Lock, ExternalLink, Github, Settings, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/page-header'
import { ErrorState } from '@/components/ui/error-state'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { CopyButton } from '@/components/ui/copy-button'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Input, Textarea } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
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
        actions={
          <div className="flex gap-2">
            <a href={`https://github.com/${acc.github_login}`} target="_blank" rel="noreferrer">
              <Button variant="outline" className="gap-2"><Github className="h-4 w-4" />GitHub 主页</Button>
            </a>
            <Button variant="outline" onClick={() => navigate('/accounts')}>{t('common.back')}</Button>
          </div>
        }
      />

      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={acc.avatar_url} alt={acc.github_login} />
          <AvatarFallback className="text-lg font-bold text-primary">{acc.github_login[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <Badge variant={acc.status === 'active' ? 'success' : acc.status === 'banned' ? 'destructive' : acc.status === 'restricted' ? 'warning' : 'secondary'}>
          {acc.status === 'active' ? t('accounts.statusActive')
            : acc.status === 'banned' ? t('accounts.statusBanned')
            : acc.status === 'restricted' ? t('accounts.statusRestricted')
            : acc.status}
        </Badge>
      </div>

      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">{t('accounts.tabInfo')}</TabsTrigger>
          <TabsTrigger value="repos">{t('accounts.tabRepos')} ({repos?.length ?? 0})</TabsTrigger>
          <TabsTrigger value="settings"><Settings className="mr-1.5 h-3.5 w-3.5" />{t('accounts.tabSettings')}</TabsTrigger>
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
                <div><span className="text-muted-foreground">{t('accounts.importedAt')}</span><br />{acc.created_at ? new Date(acc.created_at).toLocaleString() : '—'}</div>
                <div><span className="text-muted-foreground">{t('accounts.registeredAt')}</span><br />{acc.github_created_at ? new Date(acc.github_created_at).toLocaleDateString() : '—'}</div>
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
                        <TD className="text-right"><div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/repos?rid=${r.id}`)}>{t('repos.browse')}</Button>
                          <a href={r.html_url} target="_blank" rel="noreferrer" title={t('repos.openOnGithub')}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><ExternalLink className="h-3.5 w-3.5" /></Button>
                          </a>
                        </div></TD>
                      </TR>
                    ))}
                  </TBody>
                </Table>
              ) : <div className="p-8 text-center text-muted-foreground">{t('repos.emptyOrSync')}</div>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <ProfileSettings accId={accId} login={acc.github_login} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ProfileSettings({ accId, login }: { accId: number; login: string }) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [form, setForm] = useState({ name: '', email: '', blog: '', company: '', location: '', bio: '', twitter_username: '' })

  const { data: profile, isLoading } = useQuery({
    queryKey: ['gh-profile', accId],
    queryFn: () => accountApi.getProfile(accId),
  })
  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || '',
        email: profile.email || '',
        blog: profile.blog || '',
        company: profile.company || '',
        location: profile.location || '',
        bio: profile.bio || '',
        twitter_username: profile.twitter_username || '',
      })
    }
  }, [profile])

  const saveMut = useMutation({
    mutationFn: () => accountApi.updateProfile(accId, form),
    onSuccess: () => {
      toast.success(t('accounts.profileSaveSuccess'))
      queryClient.invalidateQueries({ queryKey: ['account', accId] })
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
    onError: (e: any) => toast.error(e?.message || t('common.operationFailed')),
  })

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm(prev => ({ ...prev, [k]: e.target.value }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base"><Settings className="h-4 w-4" /> {t('accounts.profileTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground">
          {t('accounts.profileHint')} <a href={`https://github.com/settings/profile`} target="_blank" rel="noreferrer" className="text-primary hover:underline">github.com/settings/profile ↗</a>
        </p>
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-10" />)}
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t('accounts.profileName')}</label>
                <Input value={form.name} onChange={set('name')} placeholder="bytedancer" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t('accounts.profileEmail')}</label>
                <Input value={form.email} onChange={set('email')} placeholder="public@example.com" />
                <p className="text-xs text-muted-foreground">{t('accounts.profileEmailHint')}</p>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t('accounts.profileBlog')}</label>
                <Input value={form.blog} onChange={set('blog')} placeholder="https://example.com" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t('accounts.profileTwitter')}</label>
                <Input value={form.twitter_username} onChange={set('twitter_username')} placeholder="twitter_username" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t('accounts.profileCompany')}</label>
                <Input value={form.company} onChange={set('company')} placeholder="@github" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">{t('accounts.profileLocation')}</label>
                <Input value={form.location} onChange={set('location')} placeholder="Hangzhou, China" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-medium">{t('accounts.profileBio')}</label>
                <Textarea rows={3} value={form.bio} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm(prev => ({ ...prev, bio: e.target.value }))} />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              {saveMut.isPending && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
              <Button onClick={() => saveMut.mutate()} disabled={saveMut.isPending}>{t('accounts.profileSave')}</Button>
            </div>
            <EmailVisibilityRow accId={accId} />
          </>
        )}
      </CardContent>
    </Card>
  )
}

function EmailVisibilityRow({ accId }: { accId: number }) {
  const { t } = useTranslation()
  const [visibility, setVisibility] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['email-visibility', accId],
    queryFn: () => accountApi.getEmailVisibility(accId),
    retry: false,
  })
  useEffect(() => { if (data?.visibility) setVisibility(data.visibility) }, [data])

  const toggle = async (makePublic: boolean) => {
    const next = makePublic ? 'public' : 'private'
    setSaving(true)
    try {
      await accountApi.setEmailVisibility(accId, next)
      setVisibility(next)
      toast.success(next === 'public' ? t('accounts.emailVisOn') : t('accounts.emailVisOff'))
    } catch (e: any) {
      toast.error(e?.message || t('common.operationFailed'))
    } finally {
      setSaving(false)
    }
  }

  if (isError) {
    return (
      <div className="rounded-md border border-warning/30 bg-warning/5 p-3 text-xs text-muted-foreground">
        {t('accounts.emailVisNoScope')}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border p-3">
      <div>
        <div className="text-sm font-medium">{t('accounts.emailVisibility')}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">
          {isLoading ? t('common.loading') : (
            <>
              {t('accounts.profileEmail')}: <code className="font-mono">{data?.email || '—'}</code>
              {visibility && <Badge variant={visibility === 'public' ? 'warning' : 'secondary'} className="ml-2 text-[10px]">{visibility === 'public' ? t('accounts.emailVisOn') : t('accounts.emailVisOff')}</Badge>}
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {saving && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />}
        <Switch checked={visibility === 'public'} disabled={isLoading || saving} onCheckedChange={(v) => toggle(v === true)} />
        <span className="text-xs text-muted-foreground">{visibility === 'public' ? t('accounts.emailVisOn') : t('accounts.emailVisOff')}</span>
      </div>
    </div>
  )
}
