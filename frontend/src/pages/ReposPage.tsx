import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { accountApi, repoApi, type Workflow, type WorkflowInput } from '@/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { RefreshCw, Folder, File, ExternalLink, Play } from 'lucide-react'
import { toast } from 'sonner'

export default function ReposPage() {
  const [params] = useSearchParams()
  const [selectedAcc, setSelectedAcc] = useState<number | null>(null)
  const [selectedRepo, setSelectedRepo] = useState<number | null>(null)
  const [pathStack, setPathStack] = useState<string[]>([])
  const [entries, setEntries] = useState<any[]>([])
  const [fileContent, setFileContent] = useState<any>(null)
  const [editorText, setEditorText] = useState('')
  const [commitMsg, setCommitMsg] = useState('')
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [wfOpen, setWfOpen] = useState(false)
  const [syncing, setSyncing] = useState(false)

  const { data: accounts } = useQuery({ queryKey: ['accounts'], queryFn: accountApi.list })
  const { data: repos } = useQuery({
    queryKey: ['repos', selectedAcc],
    queryFn: () => repoApi.listByAccount(selectedAcc!),
    enabled: !!selectedAcc,
  })

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

  useEffect(() => { if (selectedRepo) { setPathStack([]); loadDir(selectedRepo, []) } }, [selectedRepo])

  const clickEntry = async (e: any) => {
    if (e.type === 'dir') { const s = [...pathStack, e.name]; setPathStack(s); loadDir(selectedRepo!, s) }
    else if (e.type === 'file') {
      const fc = await repoApi.getFile(selectedRepo!, e.path)
      setFileContent(fc)
      if (fc.encoding === 'base64') { setEditorText(decodeBase64(fc.content)) } else { setEditorText(fc.content) }
      setCommitMsg('')
    }
  }
  const goUp = (idx: number) => { const s = pathStack.slice(0, idx); setPathStack(s); loadDir(selectedRepo!, s) }

  const decodeBase64 = (b64: string) => { try { return decodeURIComponent(escape(atob(b64.replace(/\n/g, '')))) } catch { return b64 } }
  const encodeBase64 = (text: string) => { try { return btoa(unescape(encodeURIComponent(text))) } catch { return text } }

  const saveFile = async () => {
    if (!commitMsg) { toast.error('请填写 commit message'); return }
    try {
      await repoApi.updateFile(selectedRepo!, { path: fileContent.path, content: encodeBase64(editorText), message: commitMsg, sha: fileContent.sha })
      toast.success('已提交')
    } catch (e: any) { toast.error(e?.message || '提交失败') }
  }

  const syncRepos = async () => {
    if (!selectedAcc) return; setSyncing(true)
    try { const r = await repoApi.refreshRepos(selectedAcc); toast.success(`同步 ${r.total} 个仓库`) } catch { toast.error('同步失败') } finally { setSyncing(false) }
  }

  const loadWorkflows = async () => { if (!selectedRepo) return; setWorkflows(await repoApi.listWorkflows(selectedRepo)); setWfOpen(true) }

  // Dispatch
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
      } else { await repoApi.dispatch(selectedRepo, { filename }); toast.success(`已触发 ${filename}`) }
    } catch { try { await repoApi.dispatch(selectedRepo!, { filename }); toast.success(`已触发 ${filename}`) } catch {} }
    finally { setDispLoading(false) }
  }

  const doDispatch = async () => {
    const inputs: Record<string, string> = {}
    for (const [k, v] of Object.entries(dispValues)) { if (v) inputs[k] = v }
    try { await repoApi.dispatch(selectedRepo!, { filename: dispFilename, inputs }); toast.success(`已触发`); setDispOpen(false) } catch {}
  }

  const repo = repos?.find((r) => r.id === selectedRepo)

  return (
    <div className="space-y-4">
      <Card><CardContent className="flex flex-wrap items-center gap-3 p-4">
        <select className="h-9 rounded-md border bg-background px-3 text-sm" value={selectedAcc ?? ''} onChange={(e) => { setSelectedAcc(Number(e.target.value)); setSelectedRepo(null) }}>
          {accounts?.map((a) => <option key={a.id} value={a.id}>{a.note?.trim() ? `${a.note}(${a.github_login})` : a.github_login}</option>)}
        </select>
        <Button variant="outline" size="sm" className="gap-2" onClick={syncRepos} disabled={!selectedAcc || syncing}>
          <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} /> 同步仓库
        </Button>
        {repos && repos.length > 0 && (<>
          <select className="h-9 rounded-md border bg-background px-3 text-sm w-72" value={selectedRepo ?? ''} onChange={(e) => setSelectedRepo(Number(e.target.value))}>
            {repos.map((r) => <option key={r.id} value={r.id}>{r.full_name}</option>)}
          </select>
          <Button variant="outline" size="sm" onClick={loadWorkflows}>Workflows</Button>
          {repo && <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">GitHub <ExternalLink className="h-3 w-3" /></a>}
        </>)}
      </CardContent></Card>

      {selectedRepo && (
        <div className="grid gap-4 md:grid-cols-[35%_1fr]">
          {/* File tree */}
          <Card><CardContent className="p-4">
            <div className="mb-2 flex flex-wrap items-center gap-1 text-sm">
              <button className="text-primary hover:underline" onClick={() => goUp(-1)}>/</button>
              {pathStack.map((seg, i) => (<span key={i}><span className="text-muted-foreground">/</span>
                <button className="text-primary hover:underline" onClick={() => goUp(i + 1)}>{seg}</button></span>))}
            </div>
            <div className="max-h-[500px] overflow-auto space-y-0.5">
              {entries.map((e) => (
                <button key={e.sha} onClick={() => clickEntry(e)} className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent">
                  {e.type === 'dir' ? <Folder className="h-4 w-4 text-primary" /> : <File className="h-4 w-4 text-muted-foreground" />}
                  <span className={e.type === 'dir' ? 'font-medium text-primary' : ''}>{e.name}</span>
                </button>
              ))}
              {entries.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">空目录</p>}
            </div>
          </CardContent></Card>

          {/* File editor */}
          <Card><CardContent className="p-4">
            {fileContent ? (<>
              <div className="mb-2 text-sm text-muted-foreground">{fileContent.path}</div>
              <Textarea rows={18} value={editorText} onChange={(e) => setEditorText(e.target.value)}
                className="font-mono text-xs" />
              <div className="mt-2 flex gap-2">
                <Input value={commitMsg} onChange={(e) => setCommitMsg(e.target.value)} placeholder="commit message" />
                <Button onClick={saveFile}>提交</Button>
              </div>
            </>) : <div className="flex h-full items-center justify-center py-12 text-muted-foreground">选择文件查看内容</div>}
          </CardContent></Card>
        </div>
      )}

      {/* Workflow Dialog */}
      <Dialog open={wfOpen} onClose={() => setWfOpen(false)}>
        <DialogTitle>Workflows</DialogTitle>
        <div className="space-y-2">
          {workflows.map((w) => (
            <div key={w.id} className="flex items-center justify-between rounded-lg border p-3">
              <div><div className="font-medium text-sm">{w.filename}</div><div className="text-xs text-muted-foreground">{w.name}</div></div>
              <div className="flex items-center gap-2">
                <Badge variant={w.state === 'active' ? 'success' : 'secondary'} className="text-xs">{w.state}</Badge>
                <Button size="sm" variant="ghost" className="gap-1" disabled={dispLoading} onClick={() => dispatchWf(w.filename)}>
                  <Play className="h-3.5 w-3.5" /> 触发
                </Button>
              </div>
            </div>
          ))}
          {workflows.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">无 Workflow</p>}
        </div>
      </Dialog>

      {/* Dispatch Inputs Dialog */}
      <Dialog open={dispOpen} onClose={() => setDispOpen(false)}>
        <DialogTitle>触发 {dispFilename}</DialogTitle>
        <div className="space-y-3">
          {dispInputs.map((inp) => (
            <div key={inp.name} className="space-y-1">
              <label className="text-sm font-medium">{inp.name}{inp.required ? ' *' : ''}</label>
              <Input value={dispValues[inp.name] || ''} onChange={(e) => setDispValues({ ...dispValues, [inp.name]: e.target.value })}
                placeholder={inp.description || inp.default || '请输入'} />
              {inp.description && <p className="text-xs text-muted-foreground">{inp.description}</p>}
            </div>
          ))}
        </div>
        <DialogFooter><Button onClick={doDispatch}>触发</Button></DialogFooter>
      </Dialog>
    </div>
  )
}
