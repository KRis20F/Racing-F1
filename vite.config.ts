import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    hmr: {
      overlay: false
    },
    watch: {
      usePolling: false
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@app': resolve(__dirname, './src/app'),
      '@types': resolve(__dirname, './src/app/types')
    }
  },
  publicDir: 'public',
  build: {
    target: 'esnext',
    minify: false,
    sourcemap: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime']
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  }
})
