import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/Reynaldo',  // Add this line to ensure the app uses the correct base URL
  server: {
    host: '0.0.0.0',
    port: 3000,  // Keep the port consistent with the backend
  }
})
