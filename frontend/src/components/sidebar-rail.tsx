import * as React from 'react'
import { cn } from '@/lib/utils'

interface SidebarRailProps {
  onResize?: (width: number) => void
  minWidth?: number
  maxWidth?: number
  className?: string
}

const SidebarRail = ({ onResize, minWidth = 64, maxWidth = 320, className }: SidebarRailProps) => {
  const [isDragging, setIsDragging] = React.useState(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)

    const startX = e.clientX
    const startWidth = parseInt(document.documentElement.style.getPropertyValue('--sidebar-width') || '240', 10)

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - startX
      const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + delta))
      document.documentElement.style.setProperty('--sidebar-width', `${newWidth}px`)
      onResize?.(newWidth)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      className={cn(
        'absolute right-0 top-0 h-full w-1 cursor-col-resize transition-colors',
        'hover:bg-primary/20',
        isDragging && 'bg-primary/40',
        className
      )}
    />
  )
}

export { SidebarRail }
