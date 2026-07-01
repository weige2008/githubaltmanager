import * as React from 'react'
import { Input } from '@/components/ui/input'
import { CopyButton } from '@/components/ui/copy-button'
import { cn } from '@/lib/utils'

interface CopyableFieldProps {
  value: string
  className?: string
  readOnly?: boolean
}

const CopyableField = ({ value, className, readOnly = true }: CopyableFieldProps) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Input value={value} readOnly={readOnly} className="font-mono text-sm" />
      <CopyButton value={value} />
    </div>
  )
}

export { CopyableField }
