import { useState, useEffect } from 'react'
import { autoTaskApi, authApi, type AutoTaskConfig } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Clock, Lock, Info } from 'lucide-react'
import { toast } from 'sonner'

const intervals = [
  { label: '每 30 分钟', value: 30 }, { label: '每 1 小时', value: 60 }, { label: '每 3 小时', value: 180 },
  { label: '每 6 小时', value: 360 }, { label: '每 12 小时', value: 720 }, { label: '每 24 小时', value: 1440 }, { label: '每 7 天', value: 10080 },
]

export default function SettingsPage() {
  const [config, setConfig] = useState<AutoTaskConfig>({ auto_check_enabled: false, auto_check_interval: 30, auto_sync_enabled: true, auto_sync_interval: 30 })
  const [saving, setSaving] = useState(false)
  const [oldPw, setOldPw] = useState(''); const [newPw, setNewPw] = useState(''); const [confirmPw, setConfirmPw] = useState('')

  useEffect(() => { autoTaskApi.get().then(setConfig).catch(() => {}) }, [])

  const save = async () => { setSaving(true); try { await autoTaskApi.update(config); toast.success('已保存') } catch { toast.error('保存失败') } finally { setSaving(false) } }

  const changePw = async () => {
    if (newPw.length < 8) { toast.error('新密码至少 8 位'); return }
    if (newPw !== confirmPw) { toast.error('两次不一致'); return }
    try { await authApi.changePassword(oldPw, newPw); toast.success('修改成功'); setOldPw(''); setNewPw(''); setConfirmPw('') }
    catch (e: any) { toast.error(e?.message || '修改失败') }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <Card><CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" /> 自动化任务</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          {/* Check */}
          <div className="flex items-center justify-between">
            <div><div className="font-medium">自动检测账户封禁</div><div className="text-sm text-muted-foreground">按间隔检测所有账户状态</div></div>
            <Button variant={config.auto_check_enabled ? 'default' : 'outline'} size="sm" onClick={() => setConfig({ ...config, auto_check_enabled: !config.auto_check_enabled })}>{config.auto_check_enabled ? '启用' : '禁用'}</Button>
          </div>
          {config.auto_check_enabled && <div className="flex items-center gap-3"><label className="text-sm">间隔</label>
            <select className="h-9 rounded-md border bg-background px-3 text-sm" value={config.auto_check_interval} onChange={(e) => setConfig({ ...config, auto_check_interval: Number(e.target.value) })}>{intervals.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}</select></div>}
          <hr />
          {/* Sync */}
          <div className="flex items-center justify-between">
            <div><div className="font-medium">自动同步仓库</div><div className="text-sm text-muted-foreground">按间隔拉取所有仓库和 Workflow</div></div>
            <Button variant={config.auto_sync_enabled ? 'default' : 'outline'} size="sm" onClick={() => setConfig({ ...config, auto_sync_enabled: !config.auto_sync_enabled })}>{config.auto_sync_enabled ? '启用' : '禁用'}</Button>
          </div>
          {config.auto_sync_enabled && <div className="flex items-center gap-3"><label className="text-sm">间隔</label>
            <select className="h-9 rounded-md border bg-background px-3 text-sm" value={config.auto_sync_interval} onChange={(e) => setConfig({ ...config, auto_sync_interval: Number(e.target.value) })}>{intervals.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}</select></div>}
          <Button onClick={save} disabled={saving}>{saving ? '保存中...' : '保存配置'}</Button>
        </CardContent>
      </Card>

      <Card><CardHeader><CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5" /> 修改主密码</CardTitle></CardHeader>
        <CardContent className="space-y-3 max-w-sm">
          <Input type="password" placeholder="原密码" value={oldPw} onChange={(e) => setOldPw(e.target.value)} />
          <Input type="password" placeholder="新密码（至少 8 位）" value={newPw} onChange={(e) => setNewPw(e.target.value)} />
          <Input type="password" placeholder="确认新密码" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} />
          <Button onClick={changePw}>确认修改</Button>
        </CardContent>
      </Card>

      <Card><CardHeader><CardTitle className="flex items-center gap-2"><Info className="h-5 w-5" /> 关于</CardTitle></CardHeader>
        <CardContent className="text-sm space-y-1 text-muted-foreground">
          <div>项目: GitHub 账户管理器 v2.0</div><div>技术栈: React + Tailwind + shadcn/ui / Go + Gin + GORM</div><div>加密: AES-256-GCM + Argon2id</div>
        </CardContent>
      </Card>
    </div>
  )
}
