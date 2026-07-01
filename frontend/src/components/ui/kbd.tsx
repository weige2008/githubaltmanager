import * as React from 'react'
import { cn } from '@/lib/utils'

interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        'pointer-events-none select-none rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm',
        'inline-flex h-5 min-w-[20px] items-center justify-center gap-1',
        className
      )}
      {...props}
    />
  )
)
Kbd.displayName = 'Kbd'

export { Kbd }
