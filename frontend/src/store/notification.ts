import { create } from 'zustand'

export interface NotificationItem {
  id: string
  title: string
  status: string
  timestamp: string
  read?: boolean
}

interface NotificationState {
  notifications: NotificationItem[]
  unreadCount: number
  addNotifications: (items: NotificationItem[]) => void
  markAsRead: () => void
  markAllAsRead: () => void
  clear: () => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotifications: (items) =>
    set((state) => {
      const existingIds = new Set(state.notifications.map((n) => n.id))
      const newItems = items.filter((item) => !existingIds.has(item.id))
      if (newItems.length === 0) return state
      const all = [...newItems, ...state.notifications].slice(0, 20)
      return {
        notifications: all,
        unreadCount: state.unreadCount + newItems.length,
      }
    }),
  markAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  markAllAsRead: () =>
    set(() => ({
      notifications: [],
      unreadCount: 0,
    })),
  clear: () => set({ notifications: [], unreadCount: 0 }),
}))
