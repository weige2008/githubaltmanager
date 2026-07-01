import * as React from 'react'
import { cn } from '@/lib/utils'

const TitledCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
      {...props}
    >
      {children}
    </div>
  )
)
TitledCard.displayName = 'TitledCard'

const TitledCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center justify-between border-b p-4', className)} {...props} />
  )
)
TitledCardHeader.displayName = 'TitledCardHeader'

const TitledCardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('font-semibold leading-none tracking-tight', className)} {...props} />
  )
)
TitledCardTitle.displayName = 'TitledCardTitle'

const TitledCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
)
TitledCardDescription.displayName = 'TitledCardDescription'

const TitledCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('p-4', className)} {...props} />
)
TitledCardContent.displayName = 'TitledCardContent'

const TitledCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center border-t p-4', className)} {...props} />
)
TitledCardFooter.displayName = 'TitledCardFooter'

export { TitledCard, TitledCardHeader, TitledCardTitle, TitledCardDescription, TitledCardContent, TitledCardFooter }
