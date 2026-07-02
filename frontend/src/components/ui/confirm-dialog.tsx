import * as React from 'react'
import { useTranslation } from 'react-i18next'
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter,
  AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'

interface ConfirmDialogProps {
  open: boolean
  onConfirm: () => void
  onCancel?: () => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
  children?: React.ReactNode
}

const ConfirmDialog = ({
  open, onConfirm, onCancel, variant = 'destructive', children, ...rest
}: ConfirmDialogProps) => {
  const { t } = useTranslation()
  const title = rest.title ?? t('ui.confirm.title')
  const description = rest.description ?? t('ui.confirm.desc')
  const confirmText = rest.confirmText ?? t('common.confirm')
  const cancelText = rest.cancelText ?? t('common.cancel')

  const handleOpenChange = (v: boolean) => {
    if (!v) onCancel?.()
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{children ?? description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            className={cn(variant === 'destructive' && 'bg-destructive text-destructive-foreground hover:bg-destructive/90')}
            onClick={onConfirm}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { ConfirmDialog }
