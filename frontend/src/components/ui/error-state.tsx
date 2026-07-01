import * as React from 'react'
import type { LucideIcon } from 'lucide-react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ErrorStateProps {
  icon?: LucideIcon
  title?: string
  description?: string
  retry?: () => void
  className?: string
}

const ErrorState = ({
  icon: Icon = AlertTriangle, title = '加载失败', description = '请检查网络连接后重试', retry, className,
}: ErrorStateProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
        <Icon className="h-6 w-6 text-destructive" />
      </div>
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {retry && (
        <Button variant="outline" size="sm" className="mt-4" onClick={retry}>
          <RefreshCw className="mr-2 h-4 w-4" />
          重试
        </Button>
      )}
    </div>
  )
}

export { ErrorState }
