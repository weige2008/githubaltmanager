import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { autoTaskApi, authApi, type AutoTaskConfig } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Clock, Lock, Info, Settings as SettingsIcon, Activity, RefreshCw, Database, Github, Tag, AlertCircle, ShieldAlert, KeyRound, CheckCircle2, AlertTriangle, Layers, Palette, Languages, Users, FolderPlus, GitBranch, FolderGit2, FileText } from 'lucide-react'
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
  { value: 5, labelKey: 'settings.interval5min' },
  { value: 15, labelKey: 'settings.interval15min' },
  { value: 30, labelKey: 'settings.interval30min' },
  { value: 60, labelKey: 'settings.interval1hour' },
  { value: 180, labelKey: 'settings.interval3hour' },
  { value: 360, labelKey: 'settings.interval6hour' },
  { value: 720, labelKey: 'settings.interval12hour' },
  { value: 1440, labelKey: 'settings.interval24hour' },
  { value: 10080, labelKey: 'settings.interval7days' },
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
    onError: () => toast.error(t('settings.saveFailed')),
  })

  const checkNowMut = useMutation({
    mutationFn: () => autoTaskApi.checkNow(),
    onSuccess: () => {
      toast.success(t('settings.checkTriggered'))
      queryClient.invalidateQueries({ queryKey: ['automation-logs'] })
    },
    onError: () => toast.error(t('settings.triggerFailed')),
  })

  const syncNowMut = useMutation({
    mutationFn: () => autoTaskApi.syncNow(),
    onSuccess: () => {
      toast.success(t('settings.syncTriggered'))
      queryClient.invalidateQueries({ queryKey: ['automation-logs'] })
    },
    onError: () => toast.error(t('settings.triggerFailed')),
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
    if (!iso) return t('settings.never')
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
                        {t('settings.autoCheckTitle')}
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
                        <span className="text-sm text-muted-foreground">{t('settings.autoCheckIntervalLabel')}</span>
                        <Select
                          value={String(form.auto_check_interval)}
                          onValueChange={(v) => updateForm({ auto_check_interval: Number(v) })}
                          disabled={!form.auto_check_enabled}
                        >
                          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {intervals.map((i) => <SelectItem key={i.value} value={String(i.value)}>{t(i.labelKey)}</SelectItem>)}
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
                        {t('settings.checkNow')}
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{t('settings.lastCheck')}：{formatTime(config?.auto_check_last_at)}</span>
                      <Badge variant={form.auto_check_enabled ? 'success' : 'secondary'}>
                        {form.auto_check_enabled ? t('settings.running') : t('settings.stopped')}
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
                        {t('settings.autoSyncTitle')}
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
                        <span className="text-sm text-muted-foreground">{t('settings.autoSyncIntervalLabel')}</span>
                        <Select
                          value={String(form.auto_sync_interval)}
                          onValueChange={(v) => updateForm({ auto_sync_interval: Number(v) })}
                          disabled={!form.auto_sync_enabled}
                        >
                          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {intervals.map((i) => <SelectItem key={i.value} value={String(i.value)}>{t(i.labelKey)}</SelectItem>)}
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
                        {t('settings.syncNow')}
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{t('settings.lastSync')}：{formatTime(config?.auto_sync_last_at)}</span>
                      <Badge variant={form.auto_sync_enabled ? 'success' : 'secondary'}>
                        {form.auto_sync_enabled ? t('settings.running') : t('settings.stopped')}
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

        <TabsContent value="about" className="space-y-4">
          {/* 项目信息 */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Info className="h-4 w-4" /> {t('settings.projectInfo')}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-lg border bg-muted/30 p-3">
                  <div className="text-xs text-muted-foreground">{t('settings.version')}</div>
                  <div className="mt-0.5 font-mono text-sm font-bold">v{__APP_VERSION__}</div>
                </div>
                <div className="rounded-lg border bg-muted/30 p-3">
                  <div className="text-xs text-muted-foreground">{t('settings.deployTime')}</div>
                  <div className="mt-0.5 font-mono text-xs font-bold">
                    {(() => { try { return new Date(__BUILD_TIME__).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) } catch { return '—' } })()}
                  </div>
                </div>
                <div className="rounded-lg border bg-muted/30 p-3">
                  <div className="text-xs text-muted-foreground">{t('settings.frontend')}</div>
                  <div className="mt-0.5 text-xs font-medium">React 19 + Tailwind</div>
                </div>
                <div className="rounded-lg border bg-muted/30 p-3">
                  <div className="text-xs text-muted-foreground">{t('settings.backend')}</div>
                  <div className="mt-0.5 text-xs font-medium">Go + Gin + GORM</div>
                </div>
              </div>
              <Separator />
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><span className="font-medium text-foreground">{t('settings.encryptionScheme')}：</span> AES-256-GCM + Argon2id + NaCl box</div>
                <div className="flex items-center gap-2"><span className="font-medium text-foreground">{t('settings.databaseType')}：</span> SQLite（纯 Go，零 CGO 依赖）</div>
                <div className="flex items-center gap-2"><span className="font-medium text-foreground">{t('settings.embedMethod')}：</span> go:embed（单二进制，无需 Nginx）</div>
              </div>
              <Separator />
              <div className="flex flex-wrap gap-2">
                <a href="https://github.com/weige2008/githubaltmanager" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent">
                  <Github className="h-3.5 w-3.5" /> {t('settings.githubRepo')}
                </a>
                <a href="https://github.com/weige2008/githubaltmanager/releases" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent">
                  <Tag className="h-3.5 w-3.5" /> {t('settings.releases')}
                </a>
                <a href="https://github.com/weige2008/githubaltmanager/issues" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent">
                  <AlertCircle className="h-3.5 w-3.5" /> {t('settings.issueFeedback')}
                </a>
              </div>
            </CardContent>
          </Card>

          {/* 用户须知 */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><ShieldAlert className="h-4 w-4" /> {t('settings.userNotices')}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 rounded-lg border border-warning/30 bg-warning/5 p-3">
                <KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                <div className="text-sm">
                  <span className="font-medium">{t('settings.masterPasswordWarning')}</span>
                  <span className="text-muted-foreground"> {t('settings.masterPasswordWarningDesc')}</span>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-info/30 bg-info/5 p-3">
                <Database className="mt-0.5 h-4 w-4 shrink-0 text-info" />
                <div className="text-sm">
                  <span className="font-medium">{t('settings.restartWarning')}</span>
                  <span className="text-muted-foreground"> {t('settings.restartWarningDesc')}</span>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-success/30 bg-success/5 p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <div className="text-sm">
                  <span className="font-medium">{t('settings.backupSafe')}</span>
                  <span className="text-muted-foreground"> {t('settings.backupSafeDesc')}</span>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <div className="text-sm">
                  <span className="font-medium">{t('settings.tokenSecurity')}</span>
                  <span className="text-muted-foreground"> {t('settings.tokenSecurityDesc')}</span>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <Activity className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="text-sm">
                  <span className="font-medium">{t('settings.rateLimit')}</span>
                  <span className="text-muted-foreground"> {t('settings.rateLimitDesc')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 支持的功能 */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Layers className="h-4 w-4" /> {t('settings.featureList')}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  { icon: Users, labelKey: 'settings.featureAccounts' },
                  { icon: FolderPlus, labelKey: 'settings.featureBatchRepo' },
                  { icon: GitBranch, labelKey: 'settings.featureBatchWorkflow' },
                  { icon: FolderGit2, labelKey: 'settings.featureRepos' },
                  { icon: Clock, labelKey: 'settings.featureTasks' },
                  { icon: RefreshCw, labelKey: 'settings.featureAuto' },
                  { icon: Palette, labelKey: 'settings.featureTheme' },
                  { icon: Languages, labelKey: 'settings.featureI18n' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-md border bg-muted/20 p-2">
                    <f.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="text-xs">{t(f.labelKey)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 开源许可 */}
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>{t('settings.openSourceLicense')}</span>
              </div>
              <Badge variant="outline">MIT License</Badge>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
