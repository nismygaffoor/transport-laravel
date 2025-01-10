import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Optional: Shorten imports from the `src` directory
    },
  },
  server: {
    port: 3000, // Optional: Customize the development server port
    open: true, // Automatically open the app in the default browser
  },
  build: {
    outDir: 'dist', // Specify output directory for production build
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg'], // Handle static assets
})
