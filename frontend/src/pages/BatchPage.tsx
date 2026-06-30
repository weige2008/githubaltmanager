import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { accountApi, repoApi, batchApi, type Repo } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, THead, TH, TBody, TR, TD } from '@/components/ui/table'
import { toast } from 'sonner'

export default function BatchPage() {
  const [selectedAcc, setSelectedAcc] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<number[]>([])
  const [tab, setTab] = useState<'create' | 'dispatch'>('create')
  const [filename, setFilename] = useState('keepalive.yml')
  const [commitMsg, setCommitMsg] = useState('Batch create workflow')
  const [content, setContent] = useState('name: Keep Alive\non:\n  workflow_dispatch:\njobs:\n  run:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo hello\n')
  const [dispFilename, setDispFilename] = useState('')

  const { data: accounts } = useQuery({ queryKey: ['accounts'], queryFn: accountApi.list })
  const { data: allRepos } = useQuery({ queryKey: ['repos', selectedAcc], queryFn: () => repoApi.listByAccount(selectedAcc!), enabled: !!selectedAcc })

  const filtered = useMemo(() => (allRepos || []).filter((r) => !search || r.full_name.toLowerCase().includes(search.toLowerCase())), [allRepos, search])
  const b64 = (t: string) => btoa(unescape(encodeURIComponent(t)))

  const doCreate = async () => {
    if (selected.length === 0) { toast.error('请先选择仓库'); return }
    try { const r = await batchApi.createWorkflows({ repo_ids: selected, filename, content: b64(content), commit_message: commitMsg }); toast.success(`成功 ${r.success?.length || 0}，失败 ${r.failed?.length || 0}`) }
    catch (e: any) { toast.error(e?.message || '失败') }
  }
  const doDispatch = async () => {
    if (selected.length === 0) { toast.error('请先选择仓库'); return }
    if (!dispFilename) { toast.error('请填文件名'); return }
    try { const r = await batchApi.dispatch({ repo_ids: selected, filename: dispFilename }); toast.success(`成功 ${r.success?.length || 0}，失败 ${r.failed?.length || 0}`) }
    catch (e: any) { toast.error(e?.message || '失败') }
  }

  return (
    <div className="space-y-4">
      <Card><CardContent className="flex flex-wrap items-center gap-3 p-4">
        <select className="h-9 rounded-md border bg-background px-3 text-sm" value={selectedAcc ?? ''} onChange={(e) => { setSelectedAcc(Number(e.target.value)); setSelected([]) }}>
          <option value="">选择账户</option>{accounts?.map((a) => <option key={a.id} value={a.id}>{a.note?.trim() ? `${a.note}(${a.github_login})` : a.github_login}</option>)}
        </select>
        <Input className="w-48" placeholder="搜索仓库" value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="flex gap-1"><Button variant="outline" size="sm" onClick={() => setSelected(filtered.map((r) => r.id))}>全选</Button><Button variant="outline" size="sm" onClick={() => setSelected([])}>取消</Button></div>
        <span className="text-sm text-muted-foreground">已选 {selected.length}</span>
      </CardContent></Card>

      <Card><CardContent className="p-0">
        {allRepos && allRepos.length > 0 ? (
          <Table><THead><TR><TH className="w-8"><input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={(e) => setSelected(e.target.checked ? filtered.map((r) => r.id) : [])} /></TH><TH>仓库</TH><TH>权限</TH></TR></THead>
            <TBody>{filtered.map((r: Repo) => (
              <TR key={r.id} onClick={() => setSelected((s) => s.includes(r.id) ? s.filter((x) => x !== r.id) : [...s, r.id])}>
                <TD><input type="checkbox" checked={selected.includes(r.id)} onChange={() => {}} /></TD>
                <TD><span className="font-medium">{r.full_name}</span>{r.private && <Badge variant="warning" className="ml-2 text-xs">私有</Badge>}{r.fork && <Badge variant="secondary" className="ml-1 text-xs">Fork</Badge>}</TD>
                <TD className="text-sm">{r.permission}</TD>
              </TR>))}</TBody></Table>
        ) : <div className="p-8 text-center text-muted-foreground">请先选择账户并同步仓库</div>}
      </CardContent></Card>

      <Card><CardHeader><CardTitle>{tab === 'create' ? '批量创建 Workflow' : '批量触发 Workflow'}</CardTitle>
        <div className="flex gap-2 mt-2"><Button variant={tab === 'create' ? 'default' : 'outline'} size="sm" onClick={() => setTab('create')}>创建</Button><Button variant={tab === 'dispatch' ? 'default' : 'outline'} size="sm" onClick={() => setTab('dispatch')}>触发</Button></div>
      </CardHeader>
        <CardContent className="space-y-3">
          {tab === 'create' ? (<>
            <Input placeholder="文件名 (如 keepalive.yml)" value={filename} onChange={(e) => setFilename(e.target.value)} />
            <Input placeholder="commit message" value={commitMsg} onChange={(e) => setCommitMsg(e.target.value)} />
            <Textarea rows={10} className="font-mono text-xs" value={content} onChange={(e) => setContent(e.target.value)} />
            <Button onClick={doCreate}>批量创建 ({selected.length} 个)</Button>
          </>) : (<>
            <Input placeholder="workflow 文件名 (如 deploy.yml)" value={dispFilename} onChange={(e) => setDispFilename(e.target.value)} />
            <Button onClick={doDispatch}>批量触发 ({selected.length} 个)</Button>
          </>)}
        </CardContent>
      </Card>
    </div>
  )
}
