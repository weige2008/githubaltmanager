import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: 'sm' | 'default' | 'lg'
}

const sizeMap = {
  sm: 'h-3 w-3',
  default: 'h-4 w-4',
  lg: 'h-6 w-6',
}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size = 'default', ...props }, ref) => (
    <Loader2 ref={ref} className={cn('animate-spin', sizeMap[size], className)} {...props} />
  )
)
Spinner.displayName = 'Spinner'

export { Spinner }
