import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { accountApi, repoApi, type Repo } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, THead, TH, TBody, TR, TD } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, RefreshCw, Eye, EyeOff, Copy, Lock } from 'lucide-react'
import { toast } from 'sonner'

export default function AccountDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const accId = Number(id)
  const { data: acc, isLoading } = useQuery({ queryKey: ['account', accId], queryFn: () => accountApi.get(accId) })
  const { data: repos } = useQuery<Repo[]>({ queryKey: ['repos', accId], queryFn: () => repoApi.listByAccount(accId) })

  const [secretsVisible, setSecretsVisible] = useState(false)
  const [secrets, setSecrets] = useState<{ token: string; password: string; email: string } | null>(null)

  const revealSecrets = async () => {
    if (secretsVisible) { setSecretsVisible(false); return }
    try { const s = await accountApi.getSecrets(accId); setSecrets(s); setSecretsVisible(true) }
    catch (e: any) { toast.error(e?.message || '解密失败') }
  }

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => toast.success(`${label} 已复制`)).catch(() => toast.error('复制失败'))
  }

  const syncRepos = async () => {
    toast.loading('同步中...', { id: 'sync' })
    try { const r = await repoApi.refreshRepos(accId); toast.success(`已同步 ${r.total} 个仓库`, { id: 'sync' }) }
    catch { toast.error('同步失败', { id: 'sync' }) }
  }

  if (isLoading || !acc) return <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32" />)}</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/accounts')}><ArrowLeft className="h-5 w-5" /></Button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">{acc.github_login[0]?.toUpperCase()}</div>
        <div>
          <h2 className="text-xl font-bold">{acc.note?.trim() ? `${acc.note.trim()}(${acc.github_login})` : acc.github_login}</h2>
          <Badge variant={acc.status === 'active' ? 'success' : acc.status === 'banned' ? 'destructive' : 'secondary'}>{acc.status}</Badge>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>基本信息</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm lg:grid-cols-3">
            <div><span className="text-muted-foreground">GitHub ID</span><br /><span className="font-medium">{acc.github_id}</span></div>
            <div><span className="text-muted-foreground">登录名</span><br /><span className="font-medium">{acc.github_login}</span></div>
            <div><span className="text-muted-foreground">显示名</span><br /><span className="font-medium">{acc.display_name}</span></div>
            <div>
              <span className="flex items-center gap-2 text-muted-foreground">Token
                <button onClick={revealSecrets} className="text-primary">{secretsVisible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}</button>
                {secretsVisible && secrets?.token && <button onClick={() => copyText(secrets.token, 'Token')} className="text-primary"><Copy className="h-3.5 w-3.5" /></button>}
              </span>
              <code className="text-xs">{secretsVisible && secrets ? secrets.token.slice(0, 20) + '...' : '••••••••'}</code>
            </div>
            <div>
              <span className="text-muted-foreground">密码</span>
              {secretsVisible && secrets?.password && <button onClick={() => copyText(secrets.password, '密码')} className="ml-2 text-primary"><Copy className="h-3.5 w-3.5" /></button>}
              <br /><span className="font-medium">{secretsVisible && secrets ? secrets.password || '(空)' : '••••'}</span>
            </div>
            <div><span className="text-muted-foreground">邮箱</span><br /><span className="font-medium">{secretsVisible && secrets ? secrets.email || '(空)' : '••••'}</span></div>
            <div><span className="text-muted-foreground">最后检测</span><br />{acc.last_checked_at ? new Date(acc.last_checked_at).toLocaleString() : '—'}</div>
            <div><span className="text-muted-foreground">备注</span><br />{acc.note || '—'}</div>
            <div className="col-span-2 lg:col-span-3"><span className="text-muted-foreground">状态详情</span><br />{acc.status_reason || '—'}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>仓库 ({repos?.length ?? 0})</CardTitle>
          <Button variant="outline" size="sm" className="gap-2" onClick={syncRepos}><RefreshCw className="h-4 w-4" /> 同步</Button>
        </CardHeader>
        <CardContent className="p-0">
          {repos && repos.length > 0 ? (
            <Table>
              <THead><TR><TH>仓库</TH><TH>权限</TH><TH className="text-right">操作</TH></TR></THead>
              <TBody>
                {repos.map((r) => (
                  <TR key={r.id}>
                    <TD>
                      <a href={r.html_url} target="_blank" rel="noreferrer" className="font-medium text-primary hover:underline">{r.full_name}</a>
                      <div className="flex gap-1 mt-1">
                        {r.private && <Badge variant="warning" className="text-[10px]">私有</Badge>}
                        {r.fork && <Badge variant="secondary" className="text-[10px]">Fork</Badge>}
                        {r.archived && <Badge variant="secondary" className="text-[10px]">归档</Badge>}
                      </div>
                    </TD>
                    <TD className="text-sm">{r.permission}</TD>
                    <TD className="text-right"><Button variant="ghost" size="sm" onClick={() => navigate(`/repos?rid=${r.id}`)}>浏览</Button></TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          ) : <div className="p-8 text-center text-muted-foreground">没有仓库数据，请点击同步</div>}
        </CardContent>
      </Card>
    </div>
  )
}
