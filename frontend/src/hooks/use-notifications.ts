import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNotificationStore } from '@/store/notification'
import { autoTaskApi } from '@/api'

export function useNotifications() {
  const { addNotifications, markAsRead, unreadCount } = useNotificationStore()

  const { data } = useQuery({
    queryKey: ['autotask-logs', 'notifications'],
    queryFn: () => autoTaskApi.logs(5),
    refetchInterval: 30000,
    staleTime: 20000,
  })

  useEffect(() => {
    if (data) {
      addNotifications(
        data.map((log) => ({
          id: String(log.id),
          title: log.task_type,
          status: log.status,
          timestamp: log.created_at,
        }))
      )
    }
  }, [data, addNotifications])

  return { unreadCount, markAsRead }
}
