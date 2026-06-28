import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Org/user GitHub Pages site is served from the domain root, so base = '/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
