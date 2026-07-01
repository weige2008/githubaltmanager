import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import App from './App'
import './index.css'
import './styles/theme-presets.css'
import './i18n/config'
import '@fontsource-variable/public-sans'
import '@fontsource-variable/lora'
import { handleServerError } from './lib/handle-error'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30000, retry: 1, refetchOnWindowFocus: false },
    mutations: { onError: (error) => handleServerError(error) },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if ((error as { response?: { status?: number } })?.response?.status === 401) {
        handleServerError(error)
      }
    },
  }),
})

// Init theme system before render
import { useThemeStore } from './store/theme'
useThemeStore.getState().applyToDOM()

// Listen for system theme changes
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const cfg = useThemeStore.getState()
    if (cfg.mode === 'system') cfg.applyToDOM()
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster position="top-center" richColors />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
