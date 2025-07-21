import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.', // 명시적으로 루트 디렉토리 지정
  publicDir: 'public', // public 디렉토리 지정
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "figma:asset": path.resolve(__dirname, "./src/assets"),
    },
  },
  define: {
    'import.meta.env.VITE_OPENAI_API_KEY': JSON.stringify(process.env.VITE_OPENAI_API_KEY)
  },
  server: {
    port: 5173,
    host: true,
    open: true // 자동으로 브라우저 열기
  }
})