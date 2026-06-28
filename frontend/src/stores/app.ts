import { defineStore } from 'pinia'

interface AppState {
  token: string
  initialized: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    token: localStorage.getItem('gam_token') || '',
    initialized: false
  }),
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    setToken(token: string) {
      this.token = token
      if (token) {
        localStorage.setItem('gam_token', token)
      } else {
        localStorage.removeItem('gam_token')
      }
    },
    logout() {
      this.setToken('')
      this.initialized = false
    }
  }
})
