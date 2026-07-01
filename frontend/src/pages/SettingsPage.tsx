import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { autoTaskApi, authApi, type AutoTaskConfig } from '@/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Clock, Lock, Info, Settings as SettingsIcon } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { zhCN, enUS } from 'date-fns/locale'

function formatDeployTime(iso: string): string {
  try {
    const d = new Date(iso)
    const lang = document.documentElement.lang
    return format(d, 'yyyy-MM-dd HH:mm:ss', { locale: lang === 'en-US' ? enUS : zhCN })
  } catch {
    return iso
  }
}
import { PageHeader } from '@/components/page-header'
import { LoadingState } from '@/components/ui/loading-state'
import { ErrorState } from '@/components/ui/error-state'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { useTranslation } from 'react-i18next'
import { useThemeStore, type ThemeMode } from '@/store/theme'
import { LANGUAGES } from '@/i18n/languages'

const intervals = [
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

  const { data: config, isLoading, isError, refetch } = useQuery({ queryKey: ['autotask-config'], queryFn: autoTaskApi.get })

  const [form, setForm] = useState<AutoTaskConfig>({ auto_check_enabled: false, auto_check_interval: 30, auto_sync_enabled: true, auto_sync_interval: 30 })
  useEffect(() => { if (config) setForm(config) }, [config])

  const [oldPw, setOldPw] = useState(''); const [newPw, setNewPw] = useState(''); const [confirmPw, setConfirmPw] = useState('')

  const saveMut = useMutation({
    mutationFn: (data: AutoTaskConfig) => autoTaskApi.update(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['autotask-config'] }); toast.success(t('settings.saveSuccess')) },
    onError: () => toast.error(t('settings.saveFailed')),
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

  return (
    <div className="space-y-6">
      <PageHeader title={t('settings.title')} description={t('settings.description')} />

      <Tabs defaultValue="automation">
        <TabsList>
          <TabsTrigger value="automation">{t('settings.automation')}</TabsTrigger>
          <TabsTrigger value="security">{t('settings.security')}</TabsTrigger>
          <TabsTrigger value="system">{t('settings.system')}</TabsTrigger>
          <TabsTrigger value="about">{t('settings.about')}</TabsTrigger>
        </TabsList>

        <TabsContent value="automation">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" /> {t('settings.automation')}</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              {isLoading ? (
                <LoadingState />
              ) : isError ? (
                <ErrorState retry={() => refetch()} />
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{t('settings.autoCheckTitle')}</div>
                      <div className="text-sm text-muted-foreground">{t('settings.autoCheckDesc')}</div>
                    </div>
                    <Switch checked={form.auto_check_enabled} onCheckedChange={(checked) => setForm({ ...form, auto_check_enabled: checked })} />
                  </div>
                  {form.auto_check_enabled && (
                    <div className="flex items-center gap-3">
                      <label className="text-sm">{t('settings.intervalLabel')}</label>
                      <Select value={String(form.auto_check_interval)} onValueChange={(v) => setForm({ ...form, auto_check_interval: Number(v) })}>
                        <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {intervals.map((i) => <SelectItem key={i.value} value={String(i.value)}>{t(i.labelKey)}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{t('settings.autoSyncTitle')}</div>
                      <div className="text-sm text-muted-foreground">{t('settings.autoSyncDesc')}</div>
                    </div>
                    <Switch checked={form.auto_sync_enabled} onCheckedChange={(checked) => setForm({ ...form, auto_sync_enabled: checked })} />
                  </div>
                  {form.auto_sync_enabled && (
                    <div className="flex items-center gap-3">
                      <label className="text-sm">{t('settings.intervalLabel')}</label>
                      <Select value={String(form.auto_sync_interval)} onValueChange={(v) => setForm({ ...form, auto_sync_interval: Number(v) })}>
                        <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {intervals.map((i) => <SelectItem key={i.value} value={String(i.value)}>{t(i.labelKey)}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <Button onClick={() => saveMut.mutate(form)} disabled={saveMut.isPending}>{saveMut.isPending ? t('common.saving') : t('settings.save')}</Button>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5" /> {t('settings.changePassword')}</CardTitle></CardHeader>
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
            <CardHeader><CardTitle className="flex items-center gap-2"><SettingsIcon className="h-5 w-5" /> {t('settings.system')}</CardTitle></CardHeader>
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
            <CardHeader><CardTitle className="flex items-center gap-2"><Info className="h-5 w-5" /> {t('settings.about')}</CardTitle></CardHeader>
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
