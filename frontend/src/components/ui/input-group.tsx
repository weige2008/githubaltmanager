import * as React from 'react'
import { cn } from '@/lib/utils'

const InputGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('group/input relative flex items-center', className)} {...props} />
  )
)
InputGroup.displayName = 'InputGroup'

const InputGroupPrefix = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('pointer-events-none absolute left-3 flex items-center text-muted-foreground group-data-[disabled=true]/input:opacity-50', className)}
      {...props}
    />
  )
)
InputGroupPrefix.displayName = 'InputGroupPrefix'

const InputGroupSuffix = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('absolute right-3 flex items-center text-muted-foreground', className)}
      {...props}
    />
  )
)
InputGroupSuffix.displayName = 'InputGroupSuffix'

export { InputGroup, InputGroupPrefix, InputGroupSuffix }
