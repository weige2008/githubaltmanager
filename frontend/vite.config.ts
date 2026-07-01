import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  server: {
    proxy: { '/api': 'http://127.0.0.1:8080' }
  },
  build: { outDir: 'dist', chunkSizeWarningLimit: 2000 }
})
