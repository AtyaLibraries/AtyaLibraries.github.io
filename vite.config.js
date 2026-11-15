import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Org/user GitHub Pages site is served from the domain root, so base = '/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    allowedHosts: [],
    fs: {
      strict: true,
    },
  },
  preview: {
    host: '127.0.0.1',
    allowedHosts: [],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
