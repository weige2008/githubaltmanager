import { create } from 'zustand'

interface AppState {
  token: string
  setToken: (t: string) => void
  logout: () => void
}

export const useAppStore = create<AppState>((set) => ({
  token: localStorage.getItem('gam_token') || '',
  setToken: (token) => {
    localStorage.setItem('gam_token', token)
    set({ token })
  },
  logout: () => {
    localStorage.removeItem('gam_token')
    set({ token: '' })
  },
}))
