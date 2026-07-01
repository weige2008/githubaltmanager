import * as React from 'react'
import { Check, Copy } from 'lucide-react'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CopyButtonProps extends Omit<ButtonProps, 'onClick'> {
  value: string
  onCopy?: () => void
  copyIcon?: React.ReactNode
  checkIcon?: React.ReactNode
  timeout?: number
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ value, onCopy, copyIcon, checkIcon, timeout = 2000, className, children, size = 'icon', variant = 'ghost', ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        onCopy?.()
        setTimeout(() => setCopied(false), timeout)
      } catch {
        // fallback
        const ta = document.createElement('textarea')
        ta.value = value
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        setCopied(true)
        onCopy?.()
        setTimeout(() => setCopied(false), timeout)
      }
    }

    return (
      <Button ref={ref} variant={variant} size={size} className={cn('shrink-0', className)} onClick={handleCopy} {...props}>
        {copied ? (checkIcon ?? <Check className="h-4 w-4 text-success" />) : (copyIcon ?? <Copy className="h-4 w-4" />)}
        {children}
      </Button>
    )
  }
)
CopyButton.displayName = 'CopyButton'

export { CopyButton }
