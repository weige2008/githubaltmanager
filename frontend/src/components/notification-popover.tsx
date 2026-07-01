import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Bell, CircleCheck, CircleX, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { useNotificationStore } from '@/store/notification'
import { formatRelative } from '@/lib/time'
import { cn } from '@/lib/utils'

const statusIcons: Record<string, typeof CircleCheck> = {
  success: CircleCheck,
  failed: CircleX,
  running: Timer,
}

const statusColors: Record<string, string> = {
  success: 'text-success',
  failed: 'text-destructive',
  running: 'text-primary',
}

const NotificationPopover = () => {
  const { t } = useTranslation()
  const { notifications, unreadCount, markAsRead } = useNotificationStore()
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={(v) => { setOpen(v); if (v) setTimeout(markAsRead, 1000) }}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b p-3">
          <span className="text-sm font-semibold">{t('automation.logs')}</span>
          {unreadCount > 0 && <Badge variant="secondary">{unreadCount}</Badge>}
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
              {t('automation.noLogs')}
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {notifications.map((item) => {
                const Icon = statusIcons[item.status] ?? Timer
                return (
                  <div key={item.id} className={cn('flex items-start gap-2 rounded-md p-2 hover:bg-accent', !item.read && 'bg-accent/50')}>
                    <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', statusColors[item.status])} />
                    <div className="flex-1 space-y-0.5">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.timestamp && formatRelative(item.timestamp)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

export { NotificationPopover }
