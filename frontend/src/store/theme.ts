import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ===== Types (ported from New API) =====
export type ThemeMode = 'system' | 'light' | 'dark'
export type ThemePreset = 'default' | 'underground' | 'rose-garden' | 'lake-view' | 'sunset-glow' | 'forest-whisper' | 'ocean-breeze' | 'lavender-dream' | 'simple-large' | 'anthropic'
export type ThemeRadius = 'default' | 'none' | 'sm' | 'md' | 'lg' | 'xl'
export type ThemeScale = 'default' | 'sm' | 'lg' | 'xl'
export type ThemeFont = 'default' | 'sans' | 'serif'
export type ContentLayout = 'full' | 'centered'
export type SidebarMode = 'inset' | 'floating' | 'sidebar'
export type LayoutMode = 'default' | 'compact' | 'offcanvas'

export interface ThemeConfig {
  mode: ThemeMode
  preset: ThemePreset
  font: ThemeFont
  radius: ThemeRadius
  scale: ThemeScale
  contentLayout: ContentLayout
  sidebarMode: SidebarMode
  layoutMode: LayoutMode
}

export const DEFAULT_CONFIG: ThemeConfig = {
  mode: 'dark',
  preset: 'default',
  font: 'default',
  radius: 'default',
  scale: 'default',
  contentLayout: 'full',
  sidebarMode: 'inset',
  layoutMode: 'default',
}

// ===== Preset metadata for UI =====
export const PRESETS: { value: ThemePreset; label: string; swatches: [string, string] }[] = [
  { value: 'default', label: '默认', swatches: ['hsl(222 47% 11%)', 'hsl(0 0% 95%)'] },
  { value: 'anthropic', label: 'Anthropic', swatches: ['hsl(30 40% 88%)', 'hsl(15 60% 52%)'] },
  { value: 'simple-large', label: '超大字体简易', swatches: ['hsl(0 0% 15%)', 'hsl(0 0% 99%)'] },
  { value: 'underground', label: '暗夜', swatches: ['hsl(153 49% 42%)', 'hsl(337 31% 53%)'] },
  { value: 'rose-garden', label: '玫瑰花园', swatches: ['hsl(12 80% 44%)', 'hsl(5 30% 77%)'] },
  { value: 'lake-view', label: '湖光', swatches: ['hsl(163 38% 63%)', 'hsl(201 28% 53%)'] },
  { value: 'sunset-glow', label: '日落霞光', swatches: ['hsl(25 56% 48%)', 'hsl(42 38% 75%)'] },
  { value: 'forest-whisper', label: '森林低语', swatches: ['hsl(182 31% 41%)', 'hsl(250 15% 45%)'] },
  { value: 'ocean-breeze', label: '海风', swatches: ['hsl(263 52% 52%)', 'hsl(277 48% 56%)'] },
  { value: 'lavender-dream', label: '薰衣草梦', swatches: ['hsl(307 43% 53%)', 'hsl(201 17% 77%)'] },
]

export const RADIUS_OPTIONS = [
  { value: 'default', label: 'Auto' }, { value: 'none', label: '0' },
  { value: 'sm', label: '0.3' }, { value: 'md', label: '0.5' },
  { value: 'lg', label: '0.75' }, { value: 'xl', label: '1.0' },
] as const

export const SCALE_OPTIONS = [
  { value: 'sm', label: '紧凑' }, { value: 'default', label: '默认' },
  { value: 'lg', label: '宽松' }, { value: 'xl', label: '超大' },
] as const

// ===== Store =====
interface ThemeStore extends ThemeConfig {
  setMode: (m: ThemeMode) => void
  setPreset: (p: ThemePreset) => void
  setFont: (f: ThemeFont) => void
  setRadius: (r: ThemeRadius) => void
  setScale: (s: ThemeScale) => void
  setContentLayout: (l: ContentLayout) => void
  setSidebarMode: (s: SidebarMode) => void
  setLayoutMode: (l: LayoutMode) => void
  reset: () => void
  applyToDOM: () => void
}

function applyConfig(cfg: ThemeConfig) {
  const body = document.body
  const html = document.documentElement

  // Theme mode
  const isDark = cfg.mode === 'dark' || (cfg.mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  html.classList.toggle('dark', isDark)

  // Data attributes
  body.setAttribute('data-theme-preset', cfg.preset)
  body.setAttribute('data-theme-radius', cfg.radius)
  body.setAttribute('data-theme-scale', cfg.scale)
  body.setAttribute('data-theme-content-layout', cfg.contentLayout)

  // Font
  const resolvedFont = cfg.font === 'default' ? (cfg.preset === 'anthropic' ? 'serif' : 'sans') : cfg.font
  body.setAttribute('data-theme-font', resolvedFont)

  // Sidebar mode
  body.setAttribute('data-sidebar-mode', cfg.sidebarMode)

  // Apply font to body
  if (resolvedFont === 'serif') {
    body.style.fontFamily = 'Georgia, "Times New Roman", serif'
  } else {
    body.style.fontFamily = 'Inter, system-ui, -apple-system, sans-serif'
  }
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_CONFIG,

      setMode: (mode) => { set({ mode }); get().applyToDOM() },
      setPreset: (preset) => { set({ preset }); get().applyToDOM() },
      setFont: (font) => { set({ font }); get().applyToDOM() },
      setRadius: (radius) => { set({ radius }); get().applyToDOM() },
      setScale: (scale) => { set({ scale }); get().applyToDOM() },
      setContentLayout: (contentLayout) => { set({ contentLayout }); get().applyToDOM() },
      setSidebarMode: (sidebarMode) => { set({ sidebarMode }); get().applyToDOM() },
      setLayoutMode: (layoutMode) => { set({ layoutMode }); get().applyToDOM() },

      reset: () => { set({ ...DEFAULT_CONFIG }); get().applyToDOM() },

      applyToDOM: () => {
        const cfg = get()
        applyConfig({
          mode: cfg.mode, preset: cfg.preset, font: cfg.font, radius: cfg.radius,
          scale: cfg.scale, contentLayout: cfg.contentLayout, sidebarMode: cfg.sidebarMode, layoutMode: cfg.layoutMode,
        })
      },
    }),
    {
      name: 'gam-theme',
      // Only persist the config values, not the functions
      partialize: (state) => ({
        mode: state.mode, preset: state.preset, font: state.font, radius: state.radius,
        scale: state.scale, contentLayout: state.contentLayout, sidebarMode: state.sidebarMode, layoutMode: state.layoutMode,
      }),
    }
  )
)
