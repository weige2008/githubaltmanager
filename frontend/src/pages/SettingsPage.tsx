import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { autoTaskApi, authApi, type AutoTaskConfig } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Clock, Lock, Info, Settings as SettingsIcon, Activity, RefreshCw, Database } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { zhCN, enUS } from 'date-fns/locale'
import { PageHeader } from '@/components/page-header'
import { LoadingState } from '@/components/ui/loading-state'
import { ErrorState } from '@/components/ui/error-state'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from 'react-i18next'
import { useThemeStore, type ThemeMode } from '@/store/theme'
import { LANGUAGES } from '@/i18n/languages'

function formatDeployTime(iso: string): string {
  try {
    const d = new Date(iso)
    const lang = document.documentElement.lang
    return format(d, 'yyyy-MM-dd HH:mm:ss', { locale: lang === 'en-US' ? enUS : zhCN })
  } catch {
    return iso
  }
}

const intervals = [
  { value: 5, label: '5 分钟' },
  { value: 15, label: '15 分钟' },
  { value: 30, label: '30 分钟' },
  { value: 60, label: '1 小时' },
  { value: 180, label: '3 小时' },
  { value: 360, label: '6 小时' },
  { value: 720, label: '12 小时' },
  { value: 1440, label: '24 小时' },
  { value: 10080, label: '7 天' },
]

const themeModes: { value: ThemeMode; labelKey: string }[] = [
  { value: 'system', labelKey: 'theme.modeSystem' },
  { value: 'light', labelKey: 'theme.modeLight' },
  { value: 'dark', labelKey: 'theme.modeDark' },
]

export default function SettingsPage() {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const { mode, setMode } = useThemeStore()

  const { data: config, isLoading, isError, refetch } = useQuery({
    queryKey: ['autotask-config'],
    queryFn: () => autoTaskApi.get(),
    refetchInterval: 5000,
  })

  const [form, setForm] = useState<AutoTaskConfig>({
    auto_check_enabled: false, auto_check_interval: 30,
    auto_sync_enabled: true, auto_sync_interval: 30,
  })

  useEffect(() => { if (config) setForm(config) }, [config])

  const [oldPw, setOldPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')

  const updateForm = (patch: Partial<AutoTaskConfig>) => {
    const next = { ...form, ...patch }
    setForm(next)
    saveMut.mutate(next)
  }

  const saveMut = useMutation({
    mutationFn: (data: AutoTaskConfig) => autoTaskApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['autotask-config'] })
      queryClient.invalidateQueries({ queryKey: ['automation-logs'] })
    },
    onError: () => toast.error('保存失败'),
  })

  const checkNowMut = useMutation({
    mutationFn: () => autoTaskApi.checkNow(),
    onSuccess: () => {
      toast.success('检测已触发')
      queryClient.invalidateQueries({ queryKey: ['automation-logs'] })
    },
    onError: () => toast.error('触发失败'),
  })

  const syncNowMut = useMutation({
    mutationFn: () => autoTaskApi.syncNow(),
    onSuccess: () => {
      toast.success('同步已触发')
      queryClient.invalidateQueries({ queryKey: ['automation-logs'] })
    },
    onError: () => toast.error('触发失败'),
  })

  const changePwMut = useMutation({
    mutationFn: ({ oldPw, newPw }: { oldPw: string; newPw: string }) => authApi.changePassword(oldPw, newPw),
    onSuccess: () => { toast.success(t('settings.passwordChanged')); setOldPw(''); setNewPw(''); setConfirmPw('') },
    onError: (e: any) => toast.error(e?.message || t('settings.passwordChangeFailed')),
  })

  const changePw = () => {
    if (newPw.length < 8) { toast.error(t('settings.passwordMinLength')); return }
    if (newPw !== confirmPw) { toast.error(t('settings.passwordMismatch')); return }
    changePwMut.mutate({ oldPw, newPw })
  }

  const formatTime = (iso: string | null | undefined) => {
    if (!iso) return '从未'
    try {
      return format(new Date(iso), 'MM-dd HH:mm:ss', { locale: i18n.language === 'en-US' ? enUS : zhCN })
    } catch {
      return iso
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title={t('settings.title')} description={t('settings.description')} />

      <Tabs defaultValue="automation">
        <TabsList>
          <TabsTrigger value="automation"><Activity className="mr-2 h-4 w-4" />{t('settings.automation')}</TabsTrigger>
          <TabsTrigger value="security"><Lock className="mr-2 h-4 w-4" />{t('settings.security')}</TabsTrigger>
          <TabsTrigger value="system"><SettingsIcon className="mr-2 h-4 w-4" />{t('settings.system')}</TabsTrigger>
          <TabsTrigger value="about"><Info className="mr-2 h-4 w-4" />{t('settings.about')}</TabsTrigger>
        </TabsList>

        <TabsContent value="automation">
          <div className="space-y-4">
            {isLoading ? (
              <Card><CardContent className="p-6"><LoadingState /></CardContent></Card>
            ) : isError ? (
              <Card><CardContent className="p-6"><ErrorState retry={() => refetch()} /></CardContent></Card>
            ) : (
              <>
                {/* 自动检测 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-base">
                      <span className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4" />
                        自动检测封禁状态
                      </span>
                      <Switch
                        checked={form.auto_check_enabled}
                        onCheckedChange={(checked) => updateForm({ auto_check_enabled: checked })}
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">检测间隔</span>
                        <Select
                          value={String(form.auto_check_interval)}
                          onValueChange={(v) => updateForm({ auto_check_interval: Number(v) })}
                          disabled={!form.auto_check_enabled}
                        >
                          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {intervals.map((i) => <SelectItem key={i.value} value={String(i.value)}>{i.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => checkNowMut.mutate()}
                        disabled={checkNowMut.isPending}
                      >
                        {checkNowMut.isPending ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                        立即检测
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>上次检测：{formatTime(config?.auto_check_last_at)}</span>
                      <Badge variant={form.auto_check_enabled ? 'success' : 'secondary'}>
                        {form.auto_check_enabled ? '运行中' : '已停止'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* 自动同步 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-base">
                      <span className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        自动同步仓库列表
                      </span>
                      <Switch
                        checked={form.auto_sync_enabled}
                        onCheckedChange={(checked) => updateForm({ auto_sync_enabled: checked })}
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">同步间隔</span>
                        <Select
                          value={String(form.auto_sync_interval)}
                          onValueChange={(v) => updateForm({ auto_sync_interval: Number(v) })}
                          disabled={!form.auto_sync_enabled}
                        >
                          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {intervals.map((i) => <SelectItem key={i.value} value={String(i.value)}>{i.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => syncNowMut.mutate()}
                        disabled={syncNowMut.isPending}
                      >
                        {syncNowMut.isPending ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Database className="mr-2 h-4 w-4" />}
                        立即同步
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>上次同步：{formatTime(config?.auto_sync_last_at)}</span>
                      <Badge variant={form.auto_sync_enabled ? 'success' : 'secondary'}>
                        {form.auto_sync_enabled ? '运行中' : '已停止'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Lock className="h-4 w-4" /> {t('settings.changePassword')}</CardTitle></CardHeader>
            <CardContent className="space-y-3 max-w-sm">
              <Input type="password" placeholder={t('settings.currentPassword')} value={oldPw} onChange={(e) => setOldPw(e.target.value)} />
              <Input type="password" placeholder={t('settings.newPassword')} value={newPw} onChange={(e) => setNewPw(e.target.value)} />
              <Input type="password" placeholder={t('settings.confirmPassword')} value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} />
              <Button onClick={changePw} disabled={changePwMut.isPending}>{t('settings.confirmChange')}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><SettingsIcon className="h-4 w-4" /> {t('settings.system')}</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{t('settings.theme')}</div>
                  <div className="text-sm text-muted-foreground">{t('theme.mode')}</div>
                </div>
                <Select value={mode} onValueChange={(v) => setMode(v as ThemeMode)}>
                  <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {themeModes.map((m) => <SelectItem key={m.value} value={m.value}>{t(m.labelKey)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{t('settings.language')}</div>
                  <div className="text-sm text-muted-foreground">{LANGUAGES.find((l) => l.value === i18n.language)?.englishName}</div>
                </div>
                <Select value={i18n.language} onValueChange={(v) => { i18n.changeLanguage(v); document.documentElement.lang = v }}>
                  <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((l) => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Info className="h-4 w-4" /> {t('settings.about')}</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-1 text-muted-foreground">
              <div>{t('settings.aboutProject')}: {t('settings.aboutProjectValue')}</div>
              <div>{t('settings.aboutTechStack')}: {t('settings.aboutTechStackValue')}</div>
              <div>{t('settings.aboutEncryption')}: {t('settings.aboutEncryptionValue')}</div>
              <Separator className="my-3" />
              <div className="flex items-center gap-2 font-mono text-xs">
                <Clock className="h-3.5 w-3.5" />
                <span>{t('settings.deployTime')}: {formatDeployTime(__BUILD_TIME__)}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
