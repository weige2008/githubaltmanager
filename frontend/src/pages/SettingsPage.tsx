import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { autoTaskApi, authApi, accountApi, apiKeyApi, systemApi, type AutoTaskConfig, type APIKey } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, THead, TH, TBody, TR, TD } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { EmptyState } from '@/components/ui/empty-state'
import { Clock, Lock, Info, Settings as SettingsIcon, Activity, RefreshCw, Database, Github, Tag, AlertCircle, ShieldAlert, KeyRound, CheckCircle2, AlertTriangle, Layers, Palette, Languages, Users, FolderPlus, GitBranch, FolderGit2, FileText, Trash2, Filter, Plus, Download, ArrowUpCircle, Loader2 } from 'lucide-react'
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
import { MultiSelect } from '@/components/ui/multi-select'
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

const splitGroups = (s?: string | null): string[] =>
  (s || '').split(',').map((x) => x.trim()).filter(Boolean)

const joinGroups = (arr: string[]): string => arr.join(',')

export default function SettingsPage() {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mode, setMode } = useThemeStore()

  const { data: config, isLoading, isError, refetch } = useQuery({
    queryKey: ['autotask-config'],
    queryFn: () => autoTaskApi.get(),
    refetchInterval: 5000,
  })

  const { data: groups = [] } = useQuery({
    queryKey: ['groups'],
    queryFn: () => accountApi.listGroups(),
  })

  const groupOptions = groups.map((g) => ({ label: g, value: g }))

  const [form, setForm] = useState<AutoTaskConfig>({
    auto_check_enabled: false, auto_check_interval: 30,
    auto_sync_enabled: true, auto_sync_interval: 30,
    auto_check_groups: '', auto_sync_groups: '',
    recycle_bin_enabled: false, recycle_bin_days: 30,
  })

  // Only update form on first load, not on every refetch
  const loadedRef = useRef(false)
  useEffect(() => {
    if (config && !loadedRef.current) {
      setForm(config)
      loadedRef.current = true
    }
  }, [config])

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

  const cleanRecycleBinMut = useMutation({
    mutationFn: () => accountApi.cleanRecycleBin(),
    onSuccess: () => {
      toast.success('清理完成')
      queryClient.invalidateQueries({ queryKey: ['autotask-config'] })
    },
    onError: () => toast.error('清理失败'),
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
          <TabsTrigger value="apikeys"><KeyRound className="mr-2 h-4 w-4" />API Keys</TabsTrigger>
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
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Filter className="h-4 w-4" />
                        <span>检测分组</span>
                        <span className="text-xs">（留空 = 全部分组）</span>
                      </div>
                      <MultiSelect
                        options={groupOptions}
                        value={splitGroups(form.auto_check_groups)}
                        onChange={(arr) => updateForm({ auto_check_groups: joinGroups(arr) })}
                        placeholder="全部分组"
                        disabled={!form.auto_check_enabled}
                      />
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
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Filter className="h-4 w-4" />
                        <span>同步分组</span>
                        <span className="text-xs">（留空 = 全部分组）</span>
                      </div>
                      <MultiSelect
                        options={groupOptions}
                        value={splitGroups(form.auto_sync_groups)}
                        onChange={(arr) => updateForm({ auto_sync_groups: joinGroups(arr) })}
                        placeholder="全部分组"
                        disabled={!form.auto_sync_enabled}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* 回收站 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-base">
                      <span className="flex items-center gap-2">
                        <Trash2 className="h-4 w-4" />
                        回收站
                      </span>
                      <Switch
                        checked={!!form.recycle_bin_enabled}
                        onCheckedChange={(checked) => updateForm({ recycle_bin_enabled: checked })}
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">保留天数</span>
                        <Input
                          type="number"
                          min={1}
                          className="w-24"
                          value={form.recycle_bin_days ?? 30}
                          disabled={!form.recycle_bin_enabled}
                          onChange={(e) => {
                            const v = Number(e.target.value)
                            setForm((prev) => ({ ...prev, recycle_bin_days: isNaN(v) ? 30 : v }))
                          }}
                          onBlur={(e) => {
                            const v = Math.max(1, Number(e.target.value) || 30)
                            updateForm({ recycle_bin_days: v })
                          }}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => cleanRecycleBinMut.mutate()}
                        disabled={cleanRecycleBinMut.isPending}
                      >
                        {cleanRecycleBinMut.isPending
                          ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          : <Trash2 className="mr-2 h-4 w-4" />}
                        立即清理
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate('/accounts?recycle=1')}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        查看回收站
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>上次清理：{formatTime(config?.recycle_bin_last_clean)}</span>
                      <Badge variant={form.recycle_bin_enabled ? 'success' : 'secondary'}>
                        {form.recycle_bin_enabled ? t('settings.running') : t('settings.stopped')}
                      </Badge>
                    </div>
                    <div className="rounded-md border border-warning/30 bg-warning/5 p-3 text-xs text-muted-foreground">
                      删除账户时会进入回收站，超过保留天数的记录会在自动检测/同步时被永久删除。未启用回收站时，账户将直接永久删除。
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="apikeys">
          <APIKeysTab />
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
              {/* Update check */}
              <UpdateCheckSection />
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

function UpdateCheckSection() {
  const queryClient = useQueryClient()
  const { data: updateInfo, isLoading, refetch } = useQuery({
    queryKey: ['system-update'],
    queryFn: () => systemApi.checkUpdate(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  })

  const [updating, setUpdating] = useState(false)

  const handleUpdate = async () => {
    if (!confirm(`确定要更新到 ${updateInfo?.latest}？服务将短暂中断。`)) return
    setUpdating(true)
    toast.info('正在下载并更新...')
    try {
      await systemApi.selfUpdate()
      toast.success('更新成功！服务正在重启，请稍后刷新页面')
      setTimeout(() => window.location.reload(), 5000)
    } catch (e: any) {
      toast.error(e?.message || '更新失败，请手动下载')
      setUpdating(false)
    }
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isLoading ? (
            <><Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /><span className="text-sm text-muted-foreground">检查更新中...</span></>
          ) : updateInfo?.has_update ? (
            <><ArrowUpCircle className="h-5 w-5 text-warning" /><div><span className="text-sm font-medium text-warning">发现新版本！</span><span className="ml-2 text-xs text-muted-foreground">{updateInfo.current} → {updateInfo.latest}</span></div></>
          ) : (
            <><CheckCircle2 className="h-4 w-4 text-success" /><span className="text-sm text-muted-foreground">已是最新版本 {updateInfo?.current || __APP_VERSION__}</span></>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isLoading} className="gap-1.5">
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            检查更新
          </Button>
          {updateInfo?.has_update && (
            <Button size="sm" onClick={handleUpdate} disabled={updating} className="gap-1.5">
              {updating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
              {updating ? '更新中...' : '一键更新'}
            </Button>
          )}
        </div>
      </div>
      {updateInfo?.has_update && updateInfo?.release_notes && (
        <div className="mt-3 rounded-md bg-muted/30 p-3">
          <p className="mb-1 text-xs font-medium text-muted-foreground">更新内容</p>
          <pre className="whitespace-pre-wrap text-xs text-muted-foreground">{updateInfo.release_notes.slice(0, 500)}</pre>
          {updateInfo.release_notes.length > 500 && <p className="mt-1 text-xs text-primary">...</p>}
        </div>
      )}
      {updateInfo?.has_update && (
        <p className="mt-2 text-xs text-muted-foreground">
          也可以<a href={updateInfo.download_url} target="_blank" rel="noreferrer" className="text-primary hover:underline">手动下载</a>更新
        </p>
      )}
    </div>
  )
}

function APIKeysTab() {
  const queryClient = useQueryClient()
  const [createOpen, setCreateOpen] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyDays, setNewKeyDays] = useState('0')
  const [createdKey, setCreatedKey] = useState<string | null>(null)

  const { data: keys, isLoading } = useQuery({
    queryKey: ['apikeys'],
    queryFn: () => apiKeyApi.list(),
  })

  const createMut = useMutation({
    mutationFn: () => apiKeyApi.create({ name: newKeyName, expires_in_days: Number(newKeyDays) || 0 }),
    onSuccess: (data) => {
      setCreatedKey(data.key)
      setCreateOpen(false)
      setNewKeyName('')
      setNewKeyDays('0')
      queryClient.invalidateQueries({ queryKey: ['apikeys'] })
    },
    onError: (e: any) => toast.error(e?.message || '创建失败'),
  })

  const deleteMut = useMutation({
    mutationFn: (id: number) => apiKeyApi.remove(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['apikeys'] }); toast.success('已删除') },
  })

  const toggleMut = useMutation({
    mutationFn: (id: number) => apiKeyApi.toggle(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['apikeys'] }),
  })

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2"><KeyRound className="h-4 w-4" /> API Keys</span>
          <Button size="sm" className="gap-1.5" onClick={() => setCreateOpen(true)}><Plus className="h-3.5 w-3.5" />新建</Button>
        </CardTitle></CardHeader>
        <CardContent className="p-0">
          {isLoading ? <LoadingState /> : keys && keys.length > 0 ? (
            <Table>
              <THead><TR><TH>名称</TH><TH>密钥前缀</TH><TH>状态</TH><TH>最后使用</TH><TH>过期时间</TH><TH className="text-right">操作</TH></TR></THead>
              <TBody>
                {keys.map(k => (
                  <TR key={k.id}>
                    <TD className="font-medium">{k.name}</TD>
                    <TD><code className="text-xs font-mono">{k.key_prefix}...</code></TD>
                    <TD><Badge variant={k.enabled ? 'success' : 'secondary'}>{k.enabled ? '启用' : '禁用'}</Badge></TD>
                    <TD className="text-sm text-muted-foreground">{k.last_used_at ? format(new Date(k.last_used_at), 'MM-dd HH:mm') : '从未'}</TD>
                    <TD className="text-sm text-muted-foreground">{k.expires_at ? format(new Date(k.expires_at), 'yyyy-MM-dd') : '永久'}</TD>
                    <TD>
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => toggleMut.mutate(k.id)}>{k.enabled ? '禁用' : '启用'}</Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => { if (confirm(`删除密钥「${k.name}」？`)) deleteMut.mutate(k.id) }}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          ) : <EmptyState title="还没有 API Key" description="创建 API Key 后可通过 HTTP API 远程操作" action={<Button size="sm" onClick={() => setCreateOpen(true)}>创建 API Key</Button>} />}
        </CardContent>
      </Card>

      {/* API Documentation */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-base"><FileText className="h-4 w-4" /> API 使用文档</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
          <Alert>
            <AlertDescription>
              <p className="mb-2 font-medium">认证方式</p>
              <p className="mb-1">所有 API 请求需要携带以下任一认证头：</p>
              <pre className="rounded bg-muted p-2 text-xs">X-API-Key: gam_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</pre>
              <p className="mt-1 text-xs text-muted-foreground">或</p>
              <pre className="rounded bg-muted p-2 text-xs">Authorization: Bearer &lt;jwt_token&gt;</pre>
            </AlertDescription>
          </Alert>
          <div className="rounded-md border">
            <div className="border-b bg-muted/30 px-3 py-2 text-xs font-medium">账户管理</div>
            <div className="divide-y text-xs font-mono">
              <div className="flex justify-between px-3 py-1.5"><span className="text-green-600">GET</span><span>/api/accounts</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-green-600">GET</span><span>/api/accounts/:id</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-blue-600">POST</span><span>/api/accounts/import</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-orange-600">PUT</span><span>/api/accounts/:id</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-red-600">DEL</span><span>/api/accounts/:id</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-blue-600">POST</span><span>/api/accounts/:id/check</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-blue-600">POST</span><span>/api/accounts/batch-check</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-blue-600">POST</span><span>/api/accounts/batch-check-group</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-green-600">GET</span><span>/api/accounts/groups</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-green-600">GET</span><span>/api/accounts/recycle-bin</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-blue-600">POST</span><span>/api/accounts/:id/restore</span></div>
            </div>
          </div>
          <div className="rounded-md border">
            <div className="border-b bg-muted/30 px-3 py-2 text-xs font-medium">批量操作</div>
            <div className="divide-y text-xs font-mono">
              <div className="flex justify-between px-3 py-1.5"><span className="text-blue-600">POST</span><span>/api/batch/create-workflows</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-blue-600">POST</span><span>/api/batch/dispatch</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-blue-600">POST</span><span>/api/batch/create-repos</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-blue-600">POST</span><span>/api/batch/fetch-template</span></div>
            </div>
          </div>
          <div className="rounded-md border">
            <div className="border-b bg-muted/30 px-3 py-2 text-xs font-medium">仓库 / 工作流</div>
            <div className="divide-y text-xs font-mono">
              <div className="flex justify-between px-3 py-1.5"><span className="text-green-600">GET</span><span>/api/repos/:id/contents</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-green-600">GET</span><span>/api/repos/:id/file</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-orange-600">PUT</span><span>/api/repos/:id/file</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-green-600">GET</span><span>/api/repos/:id/workflows</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-blue-600">POST</span><span>/api/repos/:id/workflows</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-blue-600">POST</span><span>/api/repos/:id/dispatch</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-green-600">GET</span><span>/api/repos/:id/workflow-inputs</span></div>
            </div>
          </div>
          <div className="rounded-md border">
            <div className="border-b bg-muted/30 px-3 py-2 text-xs font-medium">自动化 / 统计</div>
            <div className="divide-y text-xs font-mono">
              <div className="flex justify-between px-3 py-1.5"><span className="text-green-600">GET</span><span>/api/stats/overview</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-green-600">GET</span><span>/api/autotask</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-orange-600">PUT</span><span>/api/autotask</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-blue-600">POST</span><span>/api/autotask/check-now</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-blue-600">POST</span><span>/api/autotask/sync-now</span></div>
              <div className="flex justify-between px-3 py-1.5"><span className="text-green-600">GET</span><span>/api/autotask/logs</span></div>
            </div>
          </div>
          <div className="rounded-md border bg-muted/20 p-3">
            <p className="mb-1 text-xs font-medium">示例：批量触发工作流</p>
            <pre className="overflow-x-auto text-xs">{`curl -X POST http://localhost:19527/api/batch/dispatch \\
  -H "X-API-Key: gam_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{"repo_ids":[1,2,3],"filename":"keepalive.yml"}'`}</pre>
          </div>
          <div className="rounded-md border bg-muted/20 p-3">
            <p className="mb-1 text-xs font-medium">示例：批量创建仓库</p>
            <pre className="overflow-x-auto text-xs">{`curl -X POST http://localhost:19527/api/batch/create-repos \\
  -H "X-API-Key: gam_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{"account_ids":[1,2],"repo_name":"my-repo","private":true,
       "files":[{"path":"README.md","content":"aGVsbG8="}]}'`}</pre>
          </div>
        </CardContent>
      </Card>

      {/* Create dialog */}
      {createOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setCreateOpen(false)}>
          <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-lg" onClick={e => e.stopPropagation()}>
            <h2 className="mb-4 text-lg font-semibold">新建 API Key</h2>
            <div className="space-y-3">
              <div className="space-y-1.5"><label className="text-sm font-medium">名称</label><Input value={newKeyName} onChange={e => setNewKeyName(e.target.value)} placeholder="如：CI/CD 脚本" autoFocus /></div>
              <div className="space-y-1.5"><label className="text-sm font-medium">过期天数（0=永久）</label><Input type="number" value={newKeyDays} onChange={e => setNewKeyDays(e.target.value)} placeholder="0" /></div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCreateOpen(false)}>取消</Button>
              <Button disabled={!newKeyName.trim()} onClick={() => createMut.mutate()}>创建</Button>
            </div>
          </div>
        </div>
      )}

      {/* Show created key */}
      {createdKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setCreatedKey(null)}>
          <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-lg" onClick={e => e.stopPropagation()}>
            <h2 className="mb-2 text-lg font-semibold text-warning">API Key 已创建</h2>
            <p className="mb-3 text-sm text-muted-foreground">请立即保存，此密钥不会再次显示。</p>
            <div className="flex items-center gap-2 rounded-md border bg-muted p-3">
              <code className="flex-1 break-all font-mono text-xs">{createdKey}</code>
              <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(createdKey); toast.success('已复制') }}>复制</Button>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={() => setCreatedKey(null)}>已保存</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
