import * as React from 'react'
import { HelpCircle } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface LearnMoreProps {
  content: React.ReactNode
  href?: string
  className?: string
  iconClassName?: string
}

const LearnMore = ({ content, href, className, iconClassName }: LearnMoreProps) => (
  <TooltipProvider delayDuration={200}>
    <Tooltip>
      <TooltipTrigger asChild>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className={cn('inline-flex text-muted-foreground hover:text-foreground', className)}>
            <HelpCircle className={cn('h-4 w-4', iconClassName)} />
          </a>
        ) : (
          <button type="button" className={cn('inline-flex text-muted-foreground hover:text-foreground', className)}>
            <HelpCircle className={cn('h-4 w-4', iconClassName)} />
          </button>
        )}
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        {content}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

export { LearnMore }
