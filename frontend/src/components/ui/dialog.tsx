import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DialogProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export function Dialog({ open, onClose, children, className }: DialogProps) {
  React.useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className={cn('relative z-50 w-full max-w-lg rounded-lg border bg-card p-6 shadow-lg animate-fade-in-up mx-4', className)}>
        <button onClick={onClose} className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity">
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  )
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold mb-4">{children}</h2>
}

export function DialogFooter({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-end gap-2 mt-6">{children}</div>
}
