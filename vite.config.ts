import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Racing-F1/', // Para GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      util: "util"
    },
  },
  define: {
    'process.env': {},
    global: 'globalThis',
    Buffer: ['buffer', 'Buffer']
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
        Buffer: 'Buffer'
      }
    }
  }
});
