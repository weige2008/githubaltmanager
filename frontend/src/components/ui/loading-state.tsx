import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Loader2 } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface LoadingStateProps {
  title?: string
  description?: string
  className?: string
  variant?: 'spinner' | 'skeleton'
  skeletonRows?: number
  skeletonClassName?: string
}

const LoadingState = ({
  className, variant = 'spinner', skeletonRows = 3, skeletonClassName, ...rest
}: LoadingStateProps) => {
  const { t } = useTranslation()
  const title = rest.title ?? t('common.loading')
  const description = rest.description

  if (variant === 'skeleton') {
    return (
      <div className={cn('space-y-3', className)}>
        {Array.from({ length: skeletonRows }).map((_, i) => (
          <Skeleton key={i} className={cn('h-12 w-full', skeletonClassName)} />
        ))}
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <Loader2 className="mb-3 h-8 w-8 animate-spin text-muted-foreground" />
      <p className="text-sm font-medium">{title}</p>
      {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
    </div>
  )
}

export { LoadingState }
