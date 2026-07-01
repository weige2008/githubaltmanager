import { format, formatDistanceToNow, isToday, isYesterday, type Locale } from 'date-fns'
import { zhCN, enUS } from 'date-fns/locale'

const locales = { 'zh-CN': zhCN, 'en-US': enUS }

function getLocale(): Locale {
  const lang = typeof document !== 'undefined' ? document.documentElement.lang : 'zh-CN'
  return locales[lang as keyof typeof locales] ?? zhCN
}

export function formatTime(date: Date | string | number, fmt = 'PP HH:mm'): string {
  const d = typeof date === 'object' ? date : new Date(date)
  return format(d, fmt, { locale: getLocale() })
}

export function formatRelative(date: Date | string | number): string {
  const d = typeof date === 'object' ? date : new Date(date)
  return formatDistanceToNow(d, { addSuffix: true, locale: getLocale() })
}

export function formatSmartDate(date: Date | string | number): string {
  const d = typeof date === 'object' ? date : new Date(date)
  if (isToday(d)) return format(d, 'HH:mm', { locale: getLocale() })
  if (isYesterday(d)) return format(d, "'昨天' HH:mm", { locale: getLocale() })
  return format(d, 'MM-dd HH:mm', { locale: getLocale() })
}

export function formatDateTime(date: Date | string | number): string {
  const d = typeof date === 'object' ? date : new Date(date)
  return format(d, 'yyyy-MM-dd HH:mm:ss', { locale: getLocale() })
}
