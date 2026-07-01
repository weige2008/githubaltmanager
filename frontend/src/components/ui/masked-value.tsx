import * as React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { CopyButton } from '@/components/ui/copy-button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MaskedValueProps {
  value: string
  className?: string
  displayLength?: number
  copyable?: boolean
}

const MaskedValue = ({ value, className, displayLength = 8, copyable = true }: MaskedValueProps) => {
  const [visible, setVisible] = React.useState(false)
  const masked = '•'.repeat(Math.min(value.length, displayLength))

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <code className="text-sm font-mono">
        {visible ? value : masked}
      </code>
      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setVisible((v) => !v)} tabIndex={-1}>
        {visible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
      </Button>
      {copyable && <CopyButton value={value} size="icon" className="h-7 w-7" />}
    </div>
  )
}

export { MaskedValue }
