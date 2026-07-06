import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { accountApi, repoApi, type Workflow, type WorkflowInput } from '@/api'
import { displayName } from '@/lib/account'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LegacyDialog as Dialog, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { PageHeader } from '@/components/page-header'
import { LoadingState } from '@/components/ui/loading-state'
import { ErrorState } from '@/components/ui/error-state'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { ScrollArea } from '@/components/ui/scroll-area'
import { RefreshCw, Folder, File, ExternalLink, Play } from 'lucide-react'
import { toast } from 'sonner'

export default function ReposPage() {
  const { t } = useTranslation()
  const [params, setParams] = useSearchParams()
  const [selectedAcc, setSelectedAcc] = useState<number | null>(null)
  const [selectedRepo, setSelectedRepo] = useState<number | null>(null)
  const [entries, setEntries] = useState<any[]>([])
  const [fileContent, setFileContent] = useState<any>(null)
  const [editorText, setEditorText] = useState('')
  const [commitMsg, setCommitMsg] = useState('')
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [wfOpen, setWfOpen] = useState(false)
  const [syncing, setSyncing] = useState(false)

  const { data: accounts, isLoading: accountsLoading, isError: accountsError, refetch: refetchAccounts } = useQuery({ queryKey: ['accounts'], queryFn: () => accountApi.list() })
  const { data: repos, isLoading: reposLoading, isError: reposError, refetch: refetchRepos } = useQuery({
    queryKey: ['repos', selectedAcc],
    queryFn: () => repoApi.listByAccount(selectedAcc!),
    enabled: !!selectedAcc,
  })

  const pathParam = params.get('path') || ''
  const pathStack = pathParam ? pathParam.split('/').filter(Boolean) : []

  useEffect(() => { if (accounts && accounts.length && !selectedAcc) { setSelectedAcc(accounts[0].id) } }, [accounts])
  useEffect(() => {
    if (repos && repos.length) {
      const rid = params.get('rid')
      if (rid) { const r = repos.find((x) => x.id === Number(rid)); if (r) setSelectedRepo(r.id) }
      if (!selectedRepo) setSelectedRepo(repos[0].id)
    }
  }, [repos])

  const loadDir = async (repoId: number, stack: string[]) => {
    const path = stack.join('/')
    const e = await repoApi.listContents(repoId, path)
    setEntries(e); setFileContent(null); setEditorText('')
  }

  useEffect(() => { if (selectedRepo) loadDir(selectedRepo, pathStack) }, [selectedRepo, pathParam])

  const clickEntry = async (e: any) => {
    if (e.type === 'dir') {
      const next = new URLSearchParams(params)
      next.set('path', [...pathStack, e.name].join('/'))
      setParams(next)
    } else if (e.type === 'file') {
      const fc = await repoApi.getFile(selectedRepo!, e.path)
      setFileContent(fc)
      if (fc.encoding === 'base64') { setEditorText(decodeBase64(fc.content)) } else { setEditorText(fc.content) }
      setCommitMsg('')
    }
  }

  const decodeBase64 = (b64: string) => { try { return decodeURIComponent(escape(atob(b64.replace(/\n/g, '')))) } catch { return b64 } }
  const encodeBase64 = (text: string) => { try { return btoa(unescape(encodeURIComponent(text))) } catch { return text } }

  const saveFile = async () => {
    if (!commitMsg) { toast.error(t('repos.commitMsgRequired')); return }
    try {
      await repoApi.updateFile(selectedRepo!, { path: fileContent.path, content: encodeBase64(editorText), message: commitMsg, sha: fileContent.sha })
      toast.success(t('repos.commitSuccess'))
    } catch (e: any) { toast.error(e?.message || t('repos.commitFailed')) }
  }

  const syncRepos = async () => {
    if (!selectedAcc) return; setSyncing(true)
    try { const r = await repoApi.refreshRepos(selectedAcc); toast.success(t('repos.syncSuccess', { count: r.total })) } catch { toast.error(t('repos.syncFailed')) } finally { setSyncing(false) }
  }

  const loadWorkflows = async () => { if (!selectedRepo) return; setWorkflows(await repoApi.listWorkflows(selectedRepo)); setWfOpen(true) }

  const [dispOpen, setDispOpen] = useState(false)
  const [dispFilename, setDispFilename] = useState('')
  const [dispInputs, setDispInputs] = useState<WorkflowInput[]>([])
  const [dispValues, setDispValues] = useState<Record<string, string>>({})
  const [dispLoading, setDispLoading] = useState(false)

  const dispatchWf = async (filename: string) => {
    if (!selectedRepo) return; setDispLoading(true)
    try {
      const res = await repoApi.getWorkflowInputs(selectedRepo, filename)
      const inputs = res?.inputs || []
      if (inputs.length > 0) {
        setDispFilename(filename); setDispInputs(inputs)
        const vals: Record<string, string> = {}; inputs.forEach((i) => { vals[i.name] = i.default || '' })
        setDispValues(vals); setDispOpen(true)
      } else { await repoApi.dispatch(selectedRepo, { filename }); toast.success(t('repos.dispatchSuccess', { filename })) }
    } catch { try { await repoApi.dispatch(selectedRepo!, { filename }); toast.success(t('repos.dispatchSuccess', { filename })) } catch {} }
    finally { setDispLoading(false) }
  }

  const doDispatch = async () => {
    const inputs: Record<string, string> = {}
    for (const [k, v] of Object.entries(dispValues)) { if (v) inputs[k] = v }
    try { await repoApi.dispatch(selectedRepo!, { filename: dispFilename, inputs }); toast.success(t('repos.dispatched')); setDispOpen(false) } catch {}
  }

  const repo = repos?.find((r) => r.id === selectedRepo)

  const crumbs: { label: string; href?: string }[] = [{ label: t('repos.title'), href: '/repos' }]
  if (repo) {
    if (pathStack.length === 0) {
      crumbs.push({ label: repo.full_name })
    } else {
      crumbs.push({ label: repo.full_name, href: `/repos?rid=${repo.id}` })
      pathStack.forEach((seg, i) => {
        const isLast = i === pathStack.length - 1
        const sub = pathStack.slice(0, i + 1).join('/')
        crumbs.push(isLast ? { label: seg } : { label: seg, href: `/repos?rid=${repo.id}&path=${encodeURIComponent(sub)}` })
      })
    }
  }

  return (
    <div className="space-y-4">
      <PageHeader title={t('repos.title')} description={t('repos.description')} />
      <BreadcrumbNav items={crumbs} />

      {accountsLoading ? (
        <LoadingState />
      ) : accountsError ? (
        <Card><CardContent className="p-0"><ErrorState retry={refetchAccounts} /></CardContent></Card>
      ) : (
        <>
          <Card><CardContent className="flex flex-wrap items-center gap-3 p-4">
            <Select value={selectedAcc ? String(selectedAcc) : undefined} onValueChange={(v) => { const next = new URLSearchParams(params); next.delete('rid'); next.delete('path'); setParams(next); setSelectedAcc(Number(v)); setSelectedRepo(null) }}>
              <SelectTrigger className="h-9 w-[220px]"><SelectValue placeholder={t('repos.selectAccount')} /></SelectTrigger>
              <SelectContent>
                {accounts?.map((a) => <SelectItem key={a.id} value={String(a.id)}>{displayName(a)}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2" onClick={syncRepos} disabled={!selectedAcc || syncing}>
              <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} /> {t('repos.sync')}
            </Button>
            {repos && repos.length > 0 && (<>
              <Select value={selectedRepo ? String(selectedRepo) : undefined} onValueChange={(v) => { const next = new URLSearchParams(params); next.delete('path'); setParams(next); setSelectedRepo(Number(v)) }}>
                <SelectTrigger className="h-9 w-72"><SelectValue placeholder={t('repos.selectRepo')} /></SelectTrigger>
                <SelectContent>
                  {repos.map((r) => <SelectItem key={r.id} value={String(r.id)}>{r.full_name}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={loadWorkflows}>{t('repos.workflows')}</Button>
              {repo && <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">GitHub <ExternalLink className="h-3 w-3" /></a>}
            </>)}
          </CardContent></Card>

          {selectedRepo && (
            reposLoading ? <LoadingState /> : reposError ? (
              <Card><CardContent className="p-0"><ErrorState retry={refetchRepos} /></CardContent></Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-[35%_1fr]">
                <Card><CardContent className="p-4">
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-0.5 pr-3">
                      {entries.map((e) => (
                        <button key={e.sha} onClick={() => clickEntry(e)} className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent">
                          {e.type === 'dir' ? <Folder className="h-4 w-4 text-primary" /> : <File className="h-4 w-4 text-muted-foreground" />}
                          <span className={e.type === 'dir' ? 'font-medium text-primary' : ''}>{e.name}</span>
                        </button>
                      ))}
                      {entries.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">{t('repos.emptyDir')}</p>}
                    </div>
                  </ScrollArea>
                </CardContent></Card>

                <Card><CardContent className="p-4">
                  {fileContent ? (<>
                    <div className="mb-2 text-sm text-muted-foreground">{fileContent.path}</div>
                    <Textarea rows={18} value={editorText} onChange={(e) => setEditorText(e.target.value)}
                      className="font-mono text-xs leading-6" />
                    <div className="mt-2 flex gap-2">
                      <Input value={commitMsg} onChange={(e) => setCommitMsg(e.target.value)} placeholder={t('repos.commitMsgPlaceholder')} />
                      <Button onClick={saveFile}>{t('repos.commit')}</Button>
                    </div>
                  </>) : <div className="flex h-full items-center justify-center py-12 text-muted-foreground">{t('repos.selectFile')}</div>}
                </CardContent></Card>
              </div>
            )
          )}

          <Dialog open={wfOpen} onClose={() => setWfOpen(false)}>
            <DialogTitle>{t('repos.workflows')}</DialogTitle>
            <div className="space-y-2">
              {workflows.map((w) => (
                <div key={w.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div><div className="font-medium text-sm">{w.filename}</div><div className="text-xs text-muted-foreground">{w.name}</div></div>
                  <div className="flex items-center gap-2">
                    <Badge variant={w.state === 'active' ? 'success' : 'secondary'} className="text-xs">{w.state}</Badge>
                    <Button size="sm" variant="ghost" className="gap-1" disabled={dispLoading} onClick={() => dispatchWf(w.filename)}>
                      <Play className="h-3.5 w-3.5" /> {t('repos.trigger')}
                    </Button>
                  </div>
                </div>
              ))}
              {workflows.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">{t('repos.noWorkflow')}</p>}
            </div>
          </Dialog>

          <Dialog open={dispOpen} onClose={() => setDispOpen(false)}>
            <DialogTitle>{t('repos.dispatchTitle', { filename: dispFilename })}</DialogTitle>
            <div className="space-y-3">
              {dispInputs.map((inp) => (
                <div key={inp.name} className="space-y-1">
                  <label className="text-sm font-medium">{inp.name}{inp.required ? ' *' : ''}</label>
                  <Input value={dispValues[inp.name] || ''} onChange={(e) => setDispValues({ ...dispValues, [inp.name]: e.target.value })}
                    placeholder={inp.description || inp.default || t('repos.inputPlaceholder')} />
                  {inp.description && <p className="text-xs text-muted-foreground">{inp.description}</p>}
                </div>
              ))}
            </div>
            <DialogFooter><Button onClick={doDispatch}>{t('repos.trigger')}</Button></DialogFooter>
          </Dialog>
        </>
      )}
    </div>
  )
}
