import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LayoutState {
  collapsed: boolean
  mobileOpen: boolean
  activeRoute: string
  setCollapsed: (v: boolean) => void
  toggleCollapsed: () => void
  setMobileOpen: (v: boolean) => void
  setActiveRoute: (route: string) => void
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      collapsed: false,
      mobileOpen: false,
      activeRoute: '/dashboard',
      setCollapsed: (v) => set({ collapsed: v }),
      toggleCollapsed: () => set((s) => ({ collapsed: !s.collapsed })),
      setMobileOpen: (v) => set({ mobileOpen: v }),
      setActiveRoute: (route) => set({ activeRoute: route }),
    }),
    {
      name: 'gam-layout',
      partialize: (state) => ({ collapsed: state.collapsed }),
    }
  )
)
