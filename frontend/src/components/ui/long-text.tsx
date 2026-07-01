import * as React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface LongTextProps {
  children: React.ReactNode
  className?: string
  maxLength?: number
  showTooltip?: boolean
}

const LongText = ({ children, className, maxLength = 30, showTooltip = true }: LongTextProps) => {
  const text = String(children ?? '')
  const isLong = text.length > maxLength
  const display = isLong ? text.slice(0, maxLength) + '...' : text

  if (!isLong || !showTooltip) {
    return <span className={cn('truncate', className)}>{display}</span>
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={cn('cursor-help truncate', className)}>{display}</span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p className="break-all">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { LongText }
