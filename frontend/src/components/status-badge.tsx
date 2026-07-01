import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

type StatusType = 'success' | 'warning' | 'destructive' | 'info' | 'neutral'

const statusColors: Record<StatusType, string> = {
  success: 'bg-success/15 text-success border-success/30',
  warning: 'bg-warning/15 text-warning border-warning/30',
  destructive: 'bg-destructive/15 text-destructive border-destructive/30',
  info: 'bg-primary/15 text-primary border-primary/30',
  neutral: 'bg-muted text-muted-foreground border-border',
}

const statusDotColors: Record<StatusType, string> = {
  success: 'bg-success',
  warning: 'bg-warning',
  destructive: 'bg-destructive',
  info: 'bg-primary',
  neutral: 'bg-muted-foreground',
}

const statusBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: '',
        dot: 'border-transparent bg-transparent p-0',
        underline: 'border-transparent bg-transparent p-0 underline-offset-4 underline decoration-dotted',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof statusBadgeVariants> {
  status: StatusType
  showDot?: boolean
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, status, variant, showDot, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        statusBadgeVariants({ variant }),
        variant === 'default' && statusColors[status],
        variant !== 'dot' && variant !== 'underline' && statusColors[status],
        className
      )}
      {...props}
    >
      {(showDot || variant === 'dot') && (
        <span className={cn('h-1.5 w-1.5 rounded-full', statusDotColors[status])} />
      )}
      {children}
    </span>
  )
)
StatusBadge.displayName = 'StatusBadge'

export { StatusBadge, type StatusType }
