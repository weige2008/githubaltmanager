/**
 * 主题状态管理
 * 两套独立主题：fluent（Fluent 2 浅色）和 glass（Glassmorphism 深色）
 */

import { defineStore } from 'pinia'

export type ThemeName = 'fluent' | 'glass'

interface ThemeState {
  theme: ThemeName
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    theme: (localStorage.getItem('gam_theme') as ThemeName) || 'fluent'
  }),
  actions: {
    apply() {
      document.documentElement.setAttribute('data-theme', this.theme)
    },
    toggle() {
      this.theme = this.theme === 'fluent' ? 'glass' : 'fluent'
      localStorage.setItem('gam_theme', this.theme)
      this.apply()
    },
    set(name: ThemeName) {
      this.theme = name
      localStorage.setItem('gam_theme', this.theme)
      this.apply()
    }
  }
})
