import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'
export default defineConfig({
  plugins: [react(),reactRefresh()],
  server: {
    watch: {
      usePolling: true, 
    },
    hmr: {
      overlay: false,  
    } 
  }
})
