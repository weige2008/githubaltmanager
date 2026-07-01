import * as React from 'react'
import type { RowSelectionState } from '@tanstack/react-table'
import { cn } from '@/lib/utils'

interface DataTableBulkActionsProps {
  rowSelection: RowSelectionState
  onClearSelection: () => void
  children: React.ReactNode
  className?: string
}

const DataTableBulkActions = ({
  rowSelection, onClearSelection, children, className,
}: DataTableBulkActionsProps) => {
  const count = Object.keys(rowSelection).length
  if (count === 0) return null

  return (
    <div className={cn('flex items-center gap-2 rounded-md border bg-muted/50 px-4 py-2', className)}>
      <span className="text-sm font-medium">
        已选 {count} 项
      </span>
      <div className="ml-2 flex items-center gap-2">
        {children}
      </div>
      <button
        onClick={onClearSelection}
        className="ml-auto text-sm text-muted-foreground hover:text-foreground"
      >
        取消选择
      </button>
    </div>
  )
}

export { DataTableBulkActions }
