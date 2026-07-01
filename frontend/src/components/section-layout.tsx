import * as React from 'react'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface SectionLayoutProps {
  title?: string
  description?: string
  actions?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  contentClassName?: string
}

const SectionLayout = ({ title, description, actions, children, footer, className, contentClassName }: SectionLayoutProps) => (
  <section className={cn('space-y-4', className)}>
    {(title || actions) && (
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    )}
    <div className={contentClassName}>{children}</div>
    {footer && (
      <>
        <Separator />
        <div className="flex items-center justify-end gap-2">{footer}</div>
      </>
    )}
  </section>
)

export { SectionLayout }
