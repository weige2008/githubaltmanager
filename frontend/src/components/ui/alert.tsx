import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'border-destructive/50 text-destructive [&>svg]:text-destructive bg-destructive/5',
        success: 'border-success/50 text-success [&>svg]:text-success bg-success/5',
        warning: 'border-warning/50 text-warning [&>svg]:text-warning bg-warning/5',
        info: 'border-primary/50 text-primary [&>svg]:text-primary bg-primary/5',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, children, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
    {children}
  </div>
))
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
  )
)
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm text-muted-foreground [&_p]:leading-relaxed', className)} {...props} />
  )
)
AlertDescription.displayName = 'AlertDescription'

const AlertIcon = ({ variant = 'default' }: { variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info' }) => {
  const icons = {
    default: <Info className="h-4 w-4" />,
    destructive: <CircleAlert className="h-4 w-4" />,
    success: <CircleCheck className="h-4 w-4" />,
    warning: <TriangleAlert className="h-4 w-4" />,
    info: <Info className="h-4 w-4" />,
  }
  return icons[variant] || icons.default
}

export { Alert, AlertTitle, AlertDescription, AlertIcon }
