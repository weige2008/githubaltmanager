import { create } from 'zustand'

interface AppState {
  token: string
  theme: 'light' | 'dark'
  setToken: (t: string) => void
  logout: () => void
  toggleTheme: () => void
  initTheme: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  token: localStorage.getItem('gam_token') || '',
  theme: (localStorage.getItem('gam_theme') as 'light' | 'dark') || 'dark',
  setToken: (token) => {
    localStorage.setItem('gam_token', token)
    set({ token })
  },
  logout: () => {
    localStorage.removeItem('gam_token')
    set({ token: '' })
  },
  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('gam_theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
    set({ theme: next })
  },
  initTheme: () => {
    const theme = get().theme
    document.documentElement.classList.toggle('dark', theme === 'dark')
  },
}))
