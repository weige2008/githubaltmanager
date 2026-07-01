import * as React from 'react'
import { cn } from '@/lib/utils'

const ButtonGroupContext = React.createContext<boolean>(false)

const ButtonGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <ButtonGroupContext.Provider value={true}>
      <div
        ref={ref}
        className={cn('flex items-center gap-1 rounded-md border bg-muted/50 p-1', className)}
        role="group"
        {...props}
      >
        {children}
      </div>
    </ButtonGroupContext.Provider>
  )
)
ButtonGroup.displayName = 'ButtonGroup'

export { ButtonGroup, ButtonGroupContext }
