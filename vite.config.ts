import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    VITE_PUBLIC_APIURL: JSON.stringify('http://localhost:3000/store')
  },
})
