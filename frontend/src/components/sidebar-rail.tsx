import * as React from 'react'
import { cn } from '@/lib/utils'

interface SidebarRailProps {
  onToggle?: () => void
  className?: string
}

const SidebarRail = ({ onToggle, className }: SidebarRailProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      className={cn(
        'absolute inset-y-0 right-0 z-20 hidden w-4 cursor-pointer transition-all ease-linear',
        'after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] after:-translate-x-1/2',
        'after:bg-transparent after:transition-colors hover:after:bg-border',
        'sm:flex',
        className
      )}
    />
  )
}

export { SidebarRail }
