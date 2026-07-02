import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { accountApi, batchApi, type TemplateFile } from '@/api'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { LoadingState } from '@/components/ui/loading-state'
import { ErrorState } from '@/components/ui/error-state'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Github, FileCode, Plus, Trash2, Download, FolderGit2, CircleCheck, CircleX, Loader2 } from 'lucide-react'
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
  const [sourceMode, setSourceMode] = useState<'clone' | 'manual'>('clone')
  const [cloneUrl, setCloneUrl] = useState('')
  const [manualFiles, setManualFiles] = useState<ManualFile[]>([{ path: '', content: '' }])
  const [templateFiles, setTemplateFiles] = useState<TemplateFile[]>([])
  const [results, setResults] = useState<{ success: any[]; failed: any[] } | null>(null)

  const { data: accounts, isLoading, isError, refetch } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => accountApi.list(),
  })

  const fetchTemplateMut = useMutation({
    mutationFn: (vars: { accountId: number; owner: string; repo: string }) =>
      batchApi.fetchTemplate({ account_id: vars.accountId, owner: vars.owner, repo: vars.repo }),
    onSuccess: (data) => {
      setTemplateFiles(data.files)
      toast.success(`已获取 ${data.count} 个文件`)
    },
    onError: () => toast.error('获取模板失败'),
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
      })
    },
    onSuccess: (data) => {
      setResults(data)
      const sCount = data.success.length
      const fCount = data.failed.length
      if (fCount === 0) {
        toast.success(`全部成功：${sCount} 个仓库已创建`)
      } else {
        toast.warning(`完成：${sCount} 成功，${fCount} 失败`)
      }
    },
    onError: () => toast.error('批量创建失败'),
  })

  const handleFetchTemplate = () => {
    const match = cloneUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
    if (!match) {
      toast.error('请输入正确的仓库 URL，如 https://github.com/owner/repo')
      return
    }
    if (accountIds.length === 0) {
      toast.error('请先选择至少一个账户')
      return
    }
    fetchTemplateMut.mutate({ accountId: accountIds[0], owner: match[1], repo: match[2] })
  }

  const toggleAccount = (id: number) => {
    setAccountIds(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])
  }

  const toggleAll = () => {
    if (!accounts) return
    setAccountIds(prev => prev.length === accounts.length ? [] : accounts.map(a => a.id))
  }

  const addManualFile = () => setManualFiles(prev => [...prev, { path: '', content: '' }])
  const removeManualFile = (idx: number) => setManualFiles(prev => prev.filter((_, i) => i !== idx))
  const updateManualFile = (idx: number, field: 'path' | 'content', val: string) =>
    setManualFiles(prev => prev.map((f, i) => i === idx ? { ...f, [field]: val } : f))

  const canExecute = accountIds.length > 0 && repoName.trim() && (sourceMode === 'manual' || templateFiles.length > 0)

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState retry={refetch} />

  return (
    <div className="space-y-6">
      <PageHeader title="批量创建仓库" description="为多个账户批量创建仓库，支持从公开仓库克隆或手动添加文件" />

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <span>选择账户</span>
              <Button variant="ghost" size="sm" onClick={toggleAll}>
                {accountIds.length === (accounts?.length || 0) ? '取消全选' : '全选'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-[500px] space-y-1 overflow-y-auto">
            {accounts?.map(acc => (
              <label key={acc.id} className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-accent">
                <Checkbox checked={accountIds.includes(acc.id)} onCheckedChange={() => toggleAccount(acc.id)} />
                <span className="text-sm font-medium">{acc.github_login}</span>
                <Badge variant={acc.status === 'active' ? 'success' : 'destructive'} className="ml-auto text-xs">
                  {acc.status}
                </Badge>
              </label>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">仓库配置</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">仓库名称</label>
                <Input value={repoName} onChange={e => setRepoName(e.target.value)} placeholder="my-repo" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">描述（可选）</label>
                <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Repository description" />
              </div>
              <div className="flex items-center gap-3 sm:col-span-2">
                <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
                <label className="text-sm font-medium">私有仓库</label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">文件来源</CardTitle></CardHeader>
            <CardContent>
              <Tabs value={sourceMode} onValueChange={(v) => setSourceMode(v as 'clone' | 'manual')}>
                <TabsList className="mb-4">
                  <TabsTrigger value="clone"><FolderGit2 className="mr-2 h-4 w-4" />从仓库克隆</TabsTrigger>
                  <TabsTrigger value="manual"><FileCode className="mr-2 h-4 w-4" />手动添加文件</TabsTrigger>
                </TabsList>

                <TabsContent value="clone" className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={cloneUrl}
                      onChange={e => setCloneUrl(e.target.value)}
                      placeholder="https://github.com/owner/repo"
                      className="flex-1"
                    />
                    <Button onClick={handleFetchTemplate} disabled={fetchTemplateMut.isPending || !cloneUrl || accountIds.length === 0}>
                      {fetchTemplateMut.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                      获取文件
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    输入公开仓库 URL，将完整复制所有文件（包括 .github/workflows）。使用第一个选中账户的 token 读取。
                  </p>
                  {templateFiles.length > 0 && (
                    <div className="rounded-md border">
                      <div className="border-b px-3 py-2 text-sm font-medium">
                        已获取 {templateFiles.length} 个文件
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
                        placeholder="文件内容..."
                        className="font-mono text-xs"
                        rows={6}
                      />
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addManualFile}>
                    <Plus className="mr-2 h-4 w-4" />添加文件
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {results && (
            <Alert>
              <AlertTitle>执行结果</AlertTitle>
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
                      <span>账户 {f.account_id}: {f.error}</span>
                    </div>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => { setResults(null); setTemplateFiles([]) }}>
              重置
            </Button>
            <Button
              onClick={() => createReposMut.mutate()}
              disabled={!canExecute || createReposMut.isPending}
              size="lg"
            >
              {createReposMut.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Github className="mr-2 h-4 w-4" />}
              为 {accountIds.length} 个账户创建仓库
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
