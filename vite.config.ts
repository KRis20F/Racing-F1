import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  base: '/Racing-F1/',
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
      '@types': resolve(__dirname, './src/app/types'),
      'buffer': 'buffer/'
    }
  },
  define: {
    'process.env': {},
    'global': {},
    'Buffer': ['buffer', 'Buffer']
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
      supported: { 
        bigint: true 
      },
    },
    include: ['buffer']
  },
  build: {
    target: 'esnext',
    minify: false,
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    // rollupOptions: {} // Puedes dejarlo vacío o eliminarlo
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  },
})