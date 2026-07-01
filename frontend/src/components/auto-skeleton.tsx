import * as React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface AutoSkeletonProps {
  rows?: number
  columns?: number
  className?: string
  showHeader?: boolean
}

const AutoSkeleton = ({ rows = 5, columns = 4, className, showHeader = true }: AutoSkeletonProps) => {
  return (
    <div className={cn('w-full space-y-3', className)}>
      {showHeader && (
        <div className="flex gap-4">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
      )}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIdx) => (
            <Skeleton key={colIdx} className={cn('h-10 flex-1', colIdx === 0 && 'max-w-[60px]')} />
          ))}
        </div>
      ))}
    </div>
  )
}

export { AutoSkeleton }
