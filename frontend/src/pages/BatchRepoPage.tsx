import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { accountApi, repoApi, batchApi, type TemplateFile, type SecretEntry, type Repo } from '@/api'
import { displayName, sortAccounts } from '@/lib/account'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { LoadingState } from '@/components/ui/loading-state'
import { ErrorState } from '@/components/ui/error-state'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Github, FileCode, Plus, Trash2, Download, FolderGit2, CircleCheck, CircleX, Loader2, Lock, Globe, KeyRound, Eye, EyeOff, RefreshCw, Search } from 'lucide-react'
import { toast } from 'sonner'

interface ManualFile {
  path: string
  content: string
}

export default function BatchRepoPage() {
  const { t } = useTranslation()
  const [accountIds, setAccountIds] = useState<number[]>([])
  const [repoName, setRepoName] = useState('')
  const [description, setDescription] = useState('')
  const [isPrivate, setIsPrivate] = useState(true)
  const [repoCount, setRepoCount] = useState(1)
  const [sourceMode, setSourceMode] = useState<'clone' | 'manual'>('clone')
  const [cloneUrl, setCloneUrl] = useState('')
  const [manualFiles, setManualFiles] = useState<ManualFile[]>([{ path: '', content: '' }])
  const [templateFiles, setTemplateFiles] = useState<TemplateFile[]>([])
  const [secrets, setSecrets] = useState<{ name: string; value: string; show: boolean }[]>([])
  const [results, setResults] = useState<{ success: any[]; failed: any[] } | null>(null)

  const { data: accounts, isLoading, isError, refetch } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => accountApi.list(),
  })
  const { data: groups } = useQuery({ queryKey: ['accounts', 'groups'], queryFn: () => accountApi.listGroups() })
  const [groupFilter, setGroupFilter] = useState<string>('')

  const fetchTemplateMut = useMutation({
    mutationFn: (vars: { accountId: number; owner: string; repo: string }) =>
      batchApi.fetchTemplate({ account_id: vars.accountId, owner: vars.owner, repo: vars.repo }),
    onSuccess: (data) => {
      setTemplateFiles(data.files)
      toast.success(t('batchRepo.fetchSuccess', { count: data.count }))
    },
    onError: () => toast.error(t('batchRepo.fetchFailed')),
  })

  const createReposMut = useMutation({
    mutationFn: () => {
      let files: TemplateFile[] = []
      if (sourceMode === 'clone') {
        files = templateFiles
      } else {
        files = manualFiles
          .filter(f => f.path.trim())
          .map(f => ({ path: f.path, content: btoa(unescape(encodeURIComponent(f.content))) }))
      }
      return batchApi.createRepos({
        account_ids: accountIds,
        repo_name: repoName,
        description,
        private: isPrivate,
        files,
        count: repoCount,
        secrets: secrets.filter(s => s.name.trim()).map(s => ({ name: s.name, value: s.value })),
      })
    },
    onSuccess: (data) => {
      setResults(data)
      const sCount = data.success.length
      const fCount = data.failed.length
      if (fCount === 0) {
        toast.success(t('batchRepo.successMsg', { count: sCount }))
      } else {
        toast.warning(t('batchRepo.partialMsg', { success: sCount, failed: fCount }))
      }
    },
    onError: () => toast.error(t('batchRepo.failed')),
  })

  const handleFetchTemplate = () => {
    const match = cloneUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
    if (!match) {
      toast.error(t('batchRepo.invalidUrl'))
      return
    }
    if (accountIds.length === 0) {
      toast.error(t('batchRepo.noAccount'))
      return
    }
    fetchTemplateMut.mutate({ accountId: accountIds[0], owner: match[1], repo: match[2] })
  }

  const toggleAccount = (id: number) => {
    setAccountIds(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])
  }

  const toggleAll = () => {
    const list = accounts ? sortAccounts(accounts).filter(a => !groupFilter || groupFilter === '__ungrouped__' ? (groupFilter === '__ungrouped__' ? !a.group : true) : (a.group || '') === groupFilter) : []
    setAccountIds(prev => prev.length === list.length ? [] : list.map(a => a.id))
  }

  const addManualFile = () => setManualFiles(prev => [...prev, { path: '', content: '' }])
  const removeManualFile = (idx: number) => setManualFiles(prev => prev.filter((_, i) => i !== idx))
  const updateManualFile = (idx: number, field: 'path' | 'content', val: string) =>
    setManualFiles(prev => prev.map((f, i) => i === idx ? { ...f, [field]: val } : f))

  const addSecret = () => setSecrets(prev => [...prev, { name: '', value: '', show: false }])
  const removeSecret = (idx: number) => setSecrets(prev => prev.filter((_, i) => i !== idx))
  const updateSecret = (idx: number, field: 'name' | 'value', val: string) =>
    setSecrets(prev => prev.map((s, i) => i === idx ? { ...s, [field]: val } : s))
  const toggleSecretVisibility = (idx: number) =>
    setSecrets(prev => prev.map((s, i) => i === idx ? { ...s, show: !s.show } : s))

  const canExecute = accountIds.length > 0 && repoName.trim() && (sourceMode === 'manual' || templateFiles.length > 0)
  const totalRepos = accountIds.length * repoCount

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState retry={refetch} />

  return (
    <div className="space-y-6">
      <PageHeader title={t('batchRepo.title')} description={t('batchRepo.description')} />

      <Tabs defaultValue="create">
        <TabsList>
          <TabsTrigger value="create"><Plus className="mr-2 h-4 w-4" />批量创建仓库</TabsTrigger>
          <TabsTrigger value="update"><RefreshCw className="mr-2 h-4 w-4" />批量更新仓库</TabsTrigger>
        </TabsList>

        <TabsContent value="create">

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <span>{t('batchRepo.selectAccount')}</span>
              <Button variant="ghost" size="sm" onClick={toggleAll}>
                {t('batchRepo.selectAll')}
              </Button>
            </CardTitle>
            {(groups || []).filter(g => g).length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                <button onClick={() => setGroupFilter('')} className={cn('rounded-md px-2 py-0.5 text-xs transition-colors', !groupFilter ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}>全部</button>
                <button onClick={() => setGroupFilter('__ungrouped__')} className={cn('rounded-md px-2 py-0.5 text-xs transition-colors', groupFilter === '__ungrouped__' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}>未分组</button>
                {(groups || []).filter(g => g).map(g => (
                  <button key={g} onClick={() => setGroupFilter(g)} className={cn('rounded-md px-2 py-0.5 text-xs transition-colors', groupFilter === g ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}>{g}</button>
                ))}
              </div>
            )}
          </CardHeader>
          <CardContent className="max-h-[500px] space-y-1 overflow-y-auto">
            {(accounts ? sortAccounts(accounts).filter(a => {
              if (!groupFilter) return true
              if (groupFilter === '__ungrouped__') return !a.group
              return (a.group || '') === groupFilter
            }) : []).map(acc => (
              <label key={acc.id} className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-accent">
                <Checkbox checked={accountIds.includes(acc.id)} onCheckedChange={() => toggleAccount(acc.id)} />
                <span className="text-sm font-medium">{displayName(acc)}</span>
                <Badge variant={acc.status === 'active' ? 'success' : 'destructive'} className="ml-auto text-xs">
                  {acc.status}
                </Badge>
              </label>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">{t('batchRepo.repoConfig')}</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('batchRepo.repoName')}</label>
                <Input value={repoName} onChange={e => setRepoName(e.target.value)} placeholder="my-repo" />
                {repoCount > 1 && <p className="text-xs text-muted-foreground">将创建为 {repoName}-1, {repoName}-2 ... {repoName}-{repoCount}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('batchRepo.descriptionLabel')}</label>
                <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Repository description" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium">每个账户创建数量</label>
                <div className="flex items-center gap-3">
                  <Input type="number" min={1} max={50} value={repoCount} onChange={e => setRepoCount(Math.max(1, Math.min(50, Number(e.target.value) || 1)))} className="w-24" />
                  <span className="text-sm text-muted-foreground">
                    共将为 {accountIds.length} 个账户创建 <span className="font-bold text-primary">{totalRepos}</span> 个仓库
                  </span>
                </div>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium">{t('batchRepo.visibility')}</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPrivate(true)}
                    className={`flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                      isPrivate ? 'border-primary bg-primary/10 text-primary' : 'border-input hover:bg-accent'
                    }`}
                  >
                    <Lock className="h-4 w-4" />
                    {t('batchRepo.private')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPrivate(false)}
                    className={`flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                      !isPrivate ? 'border-primary bg-primary/10 text-primary' : 'border-input hover:bg-accent'
                    }`}
                  >
                    <Globe className="h-4 w-4" />
                    {t('batchRepo.public')}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">{t('batchRepo.fileSource')}</CardTitle></CardHeader>
            <CardContent>
              <Tabs value={sourceMode} onValueChange={(v) => setSourceMode(v as 'clone' | 'manual')}>
                <TabsList className="mb-4">
                  <TabsTrigger value="clone"><FolderGit2 className="mr-2 h-4 w-4" />{t('batchRepo.clone')}</TabsTrigger>
                  <TabsTrigger value="manual"><FileCode className="mr-2 h-4 w-4" />{t('batchRepo.manual')}</TabsTrigger>
                </TabsList>

                <TabsContent value="clone" className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={cloneUrl}
                      onChange={e => setCloneUrl(e.target.value)}
                      placeholder="https://github.com/owner/repo"
                      className="flex-1"
                    />
                    <Button onClick={handleFetchTemplate} disabled={fetchTemplateMut.isPending || !cloneUrl.trim()}>
                      {fetchTemplateMut.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                      {t('batchRepo.fetchFiles')}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t('batchRepo.cloneHint')}
                  </p>
                  {templateFiles.length > 0 && (
                    <div className="rounded-md border">
                      <div className="border-b px-3 py-2 text-sm font-medium">
                        {t('batchRepo.fetchedFiles', { count: templateFiles.length })}
                      </div>
                      <div className="max-h-[200px] overflow-y-auto p-2">
                        {templateFiles.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 rounded-sm px-2 py-1 text-sm hover:bg-accent">
                            <FileCode className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="font-mono text-xs">{f.path}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="manual" className="space-y-3">
                  {manualFiles.map((file, idx) => (
                    <div key={idx} className="rounded-md border p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <Input
                          value={file.path}
                          onChange={e => updateManualFile(idx, 'path', e.target.value)}
                          placeholder=".github/workflows/main.yml"
                          className="font-mono text-sm"
                        />
                        {manualFiles.length > 1 && (
                          <Button variant="ghost" size="icon" onClick={() => removeManualFile(idx)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <Textarea
                        value={file.content}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateManualFile(idx, 'content', e.target.value)}
                        placeholder={t('batchRepo.fileContent')}
                        className="font-mono text-xs"
                        rows={6}
                      />
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addManualFile}>
                    <Plus className="mr-2 h-4 w-4" />{t('batchRepo.addFile')}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <KeyRound className="h-4 w-4" />
                Repository Secrets
                {secrets.length > 0 && <Badge variant="secondary">{secrets.length}</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">
                {t('batchRepo.secretsHint')}
              </p>
              {secrets.map((secret, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    value={secret.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSecret(idx, 'name', e.target.value)}
                    placeholder="SECRET_NAME"
                    className="font-mono text-sm sm:w-48"
                  />
                  <div className="relative flex-1">
                    <Input
                      type={secret.show ? 'text' : 'password'}
                      value={secret.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSecret(idx, 'value', e.target.value)}
                      placeholder="secret value"
                      className="pr-10 font-mono text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => toggleSecretVisibility(idx)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {secret.show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeSecret(idx)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addSecret}>
                <Plus className="mr-2 h-4 w-4" />{t('batchRepo.addSecret')}
              </Button>
            </CardContent>
          </Card>

          {results && (
            <Alert>
              <AlertTitle>{t('ui.results')}</AlertTitle>
              <AlertDescription>
                <div className="mt-2 space-y-1">
                  {results.success.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CircleCheck className="h-4 w-4 text-success" />
                      <span>{s.repo}</span>
                    </div>
                  ))}
                  {results.failed.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CircleX className="h-4 w-4 text-destructive" />
                      <span>{f.account_id}: {f.error}</span>
                    </div>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => { setResults(null); setTemplateFiles([]) }}>
              {t('ui.reset')}
            </Button>
            <Button
              onClick={() => createReposMut.mutate()}
              disabled={!canExecute || createReposMut.isPending}
              size="lg"
            >
              {createReposMut.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Github className="mr-2 h-4 w-4" />}
              创建 {totalRepos} 个仓库（{accountIds.length} 账户 × {repoCount}）
            </Button>
          </div>
        </div>
        </div>
        </TabsContent>

        <TabsContent value="update">
          <BatchUpdateRepos />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function BatchUpdateRepos() {
  const { t } = useTranslation()
  const queryClient = (window as any).__queryClient
  const { data: accounts } = useQuery({ queryKey: ['accounts'], queryFn: () => accountApi.list() })
  const { data: groups } = useQuery({ queryKey: ['accounts', 'groups'], queryFn: () => accountApi.listGroups() })
  const [selectedAccounts, setSelectedAccounts] = useState<number[]>([])
  const [groupFilter, setGroupFilter] = useState('')
  const [repoName, setRepoName] = useState('')
  const [selectedRepoIds, setSelectedRepoIds] = useState<number[]>([])
  const [templateUrl, setTemplateUrl] = useState('')
  const [results, setResults] = useState<{ success: any[]; failed: any[] } | null>(null)

  const { data: allRepos, isLoading: reposLoading } = useQuery({
    queryKey: ['update-repos', selectedAccounts],
    queryFn: async () => {
      const results = await Promise.all(selectedAccounts.map(async (accId) => {
        try { return await repoApi.listByAccount(accId) } catch { return [] as Repo[] }
      }))
      return results.flat()
    },
    enabled: selectedAccounts.length > 0,
  })

  const matchedRepos = (allRepos || []).filter(r => !repoName.trim() || r.name.toLowerCase() === repoName.trim().toLowerCase())

  const accMap = new Map<number, string>()
  ;(accounts || []).forEach(a => accMap.set(a.id, a.github_login))

  const toggleAccount = (id: number) => { setSelectedAccounts(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]); setSelectedRepoIds([]) }
  const toggleRepo = (id: number) => setSelectedRepoIds(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id])

  const updateMut = useMutation({
    mutationFn: () => {
      const match = templateUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
      if (!match) throw new Error('请输入正确的仓库 URL')
      return batchApi.updateRepos({ repo_ids: selectedRepoIds, template_owner: match[1], template_repo: match[2] })
    },
    onSuccess: (data) => { setResults(data); toast.success(`完成：${data.success?.length || 0} 成功，${data.failed?.length || 0} 失败`) },
    onError: (e: any) => toast.error(e?.message || '更新失败'),
  })

  const sortedAccounts = accounts ? sortAccounts(accounts).filter(a => !groupFilter || groupFilter === '__ungrouped__' ? (groupFilter === '__ungrouped__' ? !a.group : true) : (a.group || '') === groupFilter) : []

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Left: account selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base">
            <span>选择账户</span>
            <Button variant="ghost" size="sm" onClick={() => { setSelectedAccounts(prev => prev.length === sortedAccounts.length ? [] : sortedAccounts.map(a => a.id)); setSelectedRepoIds([]) }}>
              {selectedAccounts.length === sortedAccounts.length && sortedAccounts.length > 0 ? '取消' : '全选'}
            </Button>
          </CardTitle>
          {(groups || []).filter(g => g).length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              <button onClick={() => setGroupFilter('')} className={cn('rounded-md px-2 py-0.5 text-xs transition-colors', !groupFilter ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}>全部</button>
              {(groups || []).filter(g => g).map(g => (
                <button key={g} onClick={() => setGroupFilter(g)} className={cn('rounded-md px-2 py-0.5 text-xs transition-colors', groupFilter === g ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70')}>{g}</button>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent className="max-h-[500px] space-y-1 overflow-y-auto">
          {sortedAccounts.map(acc => (
            <label key={acc.id} className="flex cursor-pointer items-center gap-2.5 rounded-md p-2 hover:bg-accent">
              <Checkbox checked={selectedAccounts.includes(acc.id)} onCheckedChange={() => toggleAccount(acc.id)} />
              <span className="flex-1 truncate text-sm">{displayName(acc)}</span>
            </label>
          ))}
        </CardContent>
      </Card>

      {/* Right: repo selection + template + execute */}
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Search className="h-4 w-4" /> 匹配目标仓库</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {selectedAccounts.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">请先在左侧选择账户</div>
            ) : reposLoading ? <LoadingState variant="skeleton" skeletonRows={3} /> : (
              <>
                <div className="flex items-center gap-2">
                  <Input value={repoName} onChange={e => { setRepoName(e.target.value); setSelectedRepoIds([]) }} placeholder="输入仓库名称（精确匹配）" className="flex-1" />
                  <Button variant="outline" size="sm" onClick={() => setSelectedRepoIds(matchedRepos.map(r => r.id))} disabled={matchedRepos.length === 0}>全选匹配</Button>
                </div>
                {matchedRepos.length > 0 && (
                  <div className="max-h-[300px] overflow-y-auto rounded-md border">
                    {matchedRepos.map(r => {
                      const checked = selectedRepoIds.includes(r.id)
                      return (
                        <label key={r.id} className="flex cursor-pointer items-center gap-3 border-b px-3 py-2 last:border-0 hover:bg-accent">
                          <Checkbox checked={checked} onCheckedChange={() => toggleRepo(r.id)} />
                          <span className="text-sm font-medium">{accMap.get(r.account_id) || '?'}</span>
                          <span className="text-muted-foreground">/</span>
                          <span className="flex-1 truncate font-mono text-sm">{r.name}</span>
                        </label>
                      )
                    })}
                  </div>
                )}
                <p className="text-sm text-muted-foreground">匹配 {matchedRepos.length} 个，已选 {selectedRepoIds.length} 个</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Download className="h-4 w-4" /> 从源仓库拉取更新</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                <p className="font-medium text-warning">⚠️ 此操作会清空目标仓库的所有文件，然后从源仓库复制全部文件。</p>
                <p className="mt-1 text-sm text-muted-foreground">操作不可撤销，请确认目标仓库选择正确。</p>
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <label className="text-sm font-medium">源仓库 URL</label>
              <Input value={templateUrl} onChange={e => setTemplateUrl(e.target.value)} placeholder="https://github.com/owner/repo" className="flex-1" />
            </div>

            {results && (
              <Alert>
                <AlertTitle>执行结果</AlertTitle>
                <AlertDescription>
                  <div className="mt-2 max-h-[200px] space-y-1 overflow-y-auto">
                    {results.success.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm"><CircleCheck className="h-4 w-4 shrink-0 text-success" /><span>repo_id: {s.repo_id}</span></div>
                    ))}
                    {results.failed.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm"><CircleX className="h-4 w-4 shrink-0 text-destructive" /><span>repo_id: {f.repo_id} — {f.error}</span></div>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => { setResults(null); setSelectedRepoIds([]) }}>重置</Button>
              <Button
                size="lg"
                disabled={selectedRepoIds.length === 0 || !templateUrl.trim() || updateMut.isPending}
                onClick={() => updateMut.mutate()}
                className="gap-2"
              >
                {updateMut.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                更新 {selectedRepoIds.length} 个仓库
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
