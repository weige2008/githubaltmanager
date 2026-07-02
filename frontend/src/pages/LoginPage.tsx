import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '@/api'
import { useAppStore } from '@/store/app'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Github, Lock, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

export default function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setToken } = useAppStore()
  const [initialized, setInitialized] = useState(false)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  useEffect(() => {
    authApi.status().then((d) => setInitialized(d.isInitialized)).catch(() => setInitialized(false))
  }, [])

  const handleSubmit = async () => {
    if (!password) return
    if (!initialized && password !== confirm) { toast.error(t('auth.passwordMismatch')); return }
    if (!initialized && password.length < 8) { toast.error(t('auth.passwordTooShort')); return }
    setLoading(true)
    try {
      const fn = initialized ? authApi.login : authApi.setup
      const res = await fn(password)
      setToken(res.token)
      if (!initialized) toast.success(t('auth.setupSuccess'))
      navigate('/dashboard')
    } catch (e: any) {
      toast.error(e?.message || t('common.operationFailed'))
    } finally { setLoading(false) }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>
      <Card className="relative w-full max-w-md animate-fade-in-up">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Github className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">{t('auth.welcome')}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {initialized ? t('auth.loginDescription') : t('auth.setup')}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('auth.password')}</label>
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder={t('auth.passwordPlaceholder')} />
          </div>
          {!initialized && (
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('auth.confirmPassword')}</label>
              <PasswordInput value={confirm} onChange={(e) => setConfirm(e.target.value)}
                placeholder={t('auth.confirmPasswordPlaceholder')} />
            </div>
          )}
          {!initialized && (
            <div className="flex items-start gap-2 rounded-lg bg-warning/10 p-3 text-sm text-warning">
              <Lock className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{t('auth.setupHint')}</span>
            </div>
          )}
          <Button className="w-full" size="lg" disabled={loading} onClick={handleSubmit}>
            {loading ? t('auth.loggingIn') : initialized ? t('auth.loginButton') : t('auth.completeSetup')}
          </Button>
          <Button variant="ghost" className="w-full gap-2" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4" /> {t('auth.backHome')}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
