import * as React from 'react'
import { SearchInput } from '@/components/search-input'
import { cn } from '@/lib/utils'

interface DataTableToolbarProps {
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  filters?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

const DataTableToolbar = ({
  searchValue, onSearchChange, searchPlaceholder = '搜索...',
  filters, actions, className,
}: DataTableToolbarProps) => {
  return (
    <div className={cn('flex flex-1 flex-wrap items-center gap-2', className)}>
      {onSearchChange && (
        <SearchInput
          value={searchValue ?? ''}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
          className="max-w-sm"
        />
      )}
      {filters}
      <div className="ml-auto flex items-center gap-2">
        {actions}
      </div>
    </div>
  )
}

export { DataTableToolbar }
