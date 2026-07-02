import { toast } from 'sonner'
import i18n from '@/i18n/config'

interface ServerError {
  response?: {
    status: number
    data?: { error?: string; message?: string }
  }
  message?: string
}

export function handleServerError(error: unknown, fallbackMessage?: string): void {
  const err = error as ServerError

  if (err?.response?.status === 401) {
    toast.error(i18n.t('common.sessionExpired'))
    localStorage.removeItem('gam_token')
    window.location.href = '/login'
    return
  }

  if (err?.response?.status === 403) {
    toast.error(i18n.t('common.noPermission'))
    return
  }

  if (err?.response?.status === 404) {
    toast.error(i18n.t('common.notFound_resource'))
    return
  }

  if (err?.response?.status === 500) {
    toast.error(i18n.t('common.serverError'))
    return
  }

  const message = err?.response?.data?.error || err?.response?.data?.message || err?.message || fallbackMessage || i18n.t('common.operationFailed')
  toast.error(message)
}

export function getErrorMessage(error: unknown): string {
  const err = error as ServerError
  return err?.response?.data?.error || err?.response?.data?.message || err?.message || i18n.t('common.unknownError')
}
