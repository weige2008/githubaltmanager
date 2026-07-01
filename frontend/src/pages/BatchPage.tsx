import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { accountApi, repoApi, batchApi, type Repo } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, THead, TH, TBody, TR, TD } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { PageHeader } from '@/components/page-header'
import { LoadingState } from '@/components/ui/loading-state'
import { ErrorState } from '@/components/ui/error-state'
import { EmptyState } from '@/components/ui/empty-state'
import { toast } from 'sonner'

export default function BatchPage() {
  const { t } = useTranslation()
  const [selectedAcc, setSelectedAcc] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<number[]>([])
  const [tab, setTab] = useState<'create' | 'dispatch'>('create')
  const [filename, setFilename] = useState('keepalive.yml')
  const [commitMsg, setCommitMsg] = useState('Batch create workflow')
  const [content, setContent] = useState('name: Keep Alive\non:\n  workflow_dispatch:\njobs:\n  run:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo hello\n')
  const [dispFilename, setDispFilename] = useState('')

  const { data: accounts, isLoading: accountsLoading, isError: accountsError, refetch: refetchAccounts } = useQuery({ queryKey: ['accounts'], queryFn: accountApi.list })
  const { data: allRepos, isLoading: reposLoading, isError: reposError, refetch: refetchRepos } = useQuery({ queryKey: ['repos', selectedAcc], queryFn: () => repoApi.listByAccount(selectedAcc!), enabled: !!selectedAcc })

  const filtered = useMemo(() => (allRepos || []).filter((r) => !search || r.full_name.toLowerCase().includes(search.toLowerCase())), [allRepos, search])
  const b64 = (s: string) => btoa(unescape(encodeURIComponent(s)))
  const allChecked = filtered.length > 0 && selected.length === filtered.length
  const someChecked = selected.length > 0 && selected.length < filtered.length

  const doCreate = async () => {
    if (selected.length === 0) { toast.error(t('batch.selectReposFirst')); return }
    try {
      const r = await batchApi.createWorkflows({ repo_ids: selected, filename, content: b64(content), commit_message: commitMsg })
      toast.success(t('batch.successFailed', { success: r.success?.length || 0, failed: r.failed?.length || 0 }))
    } catch (e: any) { toast.error(e?.message || t('batch.failed')) }
  }
  const doDispatch = async () => {
    if (selected.length === 0) { toast.error(t('batch.selectReposFirst')); return }
    if (!dispFilename) { toast.error(t('batch.fillFilename')); return }
    try {
      const r = await batchApi.dispatch({ repo_ids: selected, filename: dispFilename })
      toast.success(t('batch.successFailed', { success: r.success?.length || 0, failed: r.failed?.length || 0 }))
    } catch (e: any) { toast.error(e?.message || t('batch.failed')) }
  }

  return (
    <div className="space-y-4">
      <PageHeader title={t('batch.title')} description={t('batch.description')} />

      <Card><CardContent className="flex flex-wrap items-center gap-3 p-4">
        <Select value={selectedAcc ? String(selectedAcc) : 'all'} onValueChange={(v) => { const id = v === 'all' ? null : Number(v); setSelectedAcc(id); setSelected([]) }}>
          <SelectTrigger className="h-9 w-[220px]"><SelectValue placeholder={t('batch.selectAccount')} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('batch.allAccounts')}</SelectItem>
            {accounts?.map((a) => <SelectItem key={a.id} value={String(a.id)}>{a.note?.trim() ? `${a.note}(${a.github_login})` : a.github_login}</SelectItem>)}
          </SelectContent>
        </Select>
        <Input className="w-48" placeholder={t('batch.searchRepos')} value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="flex gap-1">
          <Button variant="outline" size="sm" onClick={() => setSelected(filtered.map((r) => r.id))}>{t('batch.selectAll')}</Button>
          <Button variant="outline" size="sm" onClick={() => setSelected([])}>{t('batch.deselect')}</Button>
        </div>
        <span className="text-sm text-muted-foreground">{t('batch.selectedRepos', { count: selected.length })}</span>
      </CardContent></Card>

      {accountsError ? (
        <Card><CardContent className="p-0"><ErrorState retry={refetchAccounts} /></CardContent></Card>
      ) : (
        <Card><CardContent className="p-0">
          {!selectedAcc ? (
            <EmptyState title={t('batch.selectRepos')} description={t('batch.selectFirst')} />
          ) : reposLoading ? (
            <LoadingState />
          ) : reposError ? (
            <ErrorState retry={refetchRepos} />
          ) : filtered.length === 0 ? (
            <EmptyState title={t('common.noData')} description={t('batch.selectRepos')} />
          ) : (
            <Table>
              <THead>
                <TR>
                  <TH className="w-8">
                    <Checkbox
                      checked={allChecked ? true : someChecked ? 'indeterminate' : false}
                      onCheckedChange={(v) => setSelected(v ? filtered.map((r) => r.id) : [])}
                    />
                  </TH>
                  <TH>{t('batch.repository')}</TH>
                  <TH>{t('batch.permission')}</TH>
                </TR>
              </THead>
              <TBody>
                {filtered.map((r: Repo) => (
                  <TR key={r.id} onClick={() => setSelected((s) => s.includes(r.id) ? s.filter((x) => x !== r.id) : [...s, r.id])}>
                    <TD>
                      <Checkbox
                        checked={selected.includes(r.id)}
                        onCheckedChange={() => setSelected((s) => s.includes(r.id) ? s.filter((x) => x !== r.id) : [...s, r.id])}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TD>
                    <TD>
                      <span className="font-medium">{r.full_name}</span>
                      {r.private && <Badge variant="warning" className="ml-2 text-xs">{t('batch.private')}</Badge>}
                      {r.fork && <Badge variant="secondary" className="ml-1 text-xs">Fork</Badge>}
                    </TD>
                    <TD className="text-sm">{r.permission}</TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          )}
        </CardContent></Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{tab === 'create' ? t('batch.createWorkflowTitle') : t('batch.dispatchWorkflowTitle')}</CardTitle>
          <div className="mt-2 flex gap-2">
            <Button variant={tab === 'create' ? 'default' : 'outline'} size="sm" onClick={() => setTab('create')}>{t('batch.create')}</Button>
            <Button variant={tab === 'dispatch' ? 'default' : 'outline'} size="sm" onClick={() => setTab('dispatch')}>{t('batch.dispatch')}</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {tab === 'create' ? (
            <>
              <Input placeholder={t('batch.filenamePlaceholder')} value={filename} onChange={(e) => setFilename(e.target.value)} />
              <Input placeholder="commit message" value={commitMsg} onChange={(e) => setCommitMsg(e.target.value)} />
              <Textarea rows={10} className="font-mono text-xs" value={content} onChange={(e) => setContent(e.target.value)} />
              <Button onClick={doCreate}>{t('batch.batchCreate', { count: selected.length })}</Button>
            </>
          ) : (
            <>
              <Input placeholder={t('batch.workflowFilenamePlaceholder')} value={dispFilename} onChange={(e) => setDispFilename(e.target.value)} />
              <Button onClick={doDispatch}>{t('batch.batchDispatch', { count: selected.length })}</Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
