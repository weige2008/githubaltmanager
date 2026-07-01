import { useCallback, useState } from 'react'

export function useDialog(defaultOpen = false) {
  const [open, setOpen] = useState(defaultOpen)

  const onOpenChange = useCallback((v: boolean) => setOpen(v), [])
  const openDialog = useCallback(() => setOpen(true), [])
  const closeDialog = useCallback(() => setOpen(false), [])
  const toggleDialog = useCallback(() => setOpen((v) => !v), [])

  return { open, setOpen, onOpenChange, openDialog, closeDialog, toggleDialog }
}
