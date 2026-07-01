import * as React from 'react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
  className?: string
}

const PageHeader = ({ title, description, actions, className }: PageHeaderProps) => (
  <div className={cn('flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between', className)}>
    <div className="space-y-1">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
    {actions && <div className="flex items-center gap-2">{actions}</div>}
  </div>
)

export { PageHeader }
