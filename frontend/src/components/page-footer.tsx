import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

interface PageFooterProps {
  className?: string
}

const PageFooter = ({ className }: PageFooterProps) => {
  const { t } = useTranslation()
  return (
    <footer className={cn('border-t py-6 text-center text-sm text-muted-foreground', className)}>
      <p>{t('common.appName')} &copy; {new Date().getFullYear()}</p>
    </footer>
  )
}

export { PageFooter }
