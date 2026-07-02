import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-8xl font-black text-primary">404</h1>
      <p className="text-lg text-muted-foreground">{t('common.notFound')}</p>
      <Link to="/"><Button>{t('common.backHome')}</Button></Link>
    </div>
  )
}
