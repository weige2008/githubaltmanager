import { toast } from 'sonner'

interface ServerError {
  response?: {
    status: number
    data?: { error?: string; message?: string }
  }
  message?: string
}

export function handleServerError(error: unknown, fallbackMessage = '操作失败'): void {
  const err = error as ServerError

  if (err?.response?.status === 401) {
    toast.error('登录已过期，请重新登录')
    localStorage.removeItem('gam_token')
    window.location.href = '/login'
    return
  }

  if (err?.response?.status === 403) {
    toast.error('没有权限执行此操作')
    return
  }

  if (err?.response?.status === 404) {
    toast.error('请求的资源不存在')
    return
  }

  if (err?.response?.status === 500) {
    toast.error('服务器错误，请稍后重试')
    return
  }

  const message = err?.response?.data?.error || err?.response?.data?.message || err?.message || fallbackMessage
  toast.error(message)
}

export function getErrorMessage(error: unknown): string {
  const err = error as ServerError
  return err?.response?.data?.error || err?.response?.data?.message || err?.message || '未知错误'
}
