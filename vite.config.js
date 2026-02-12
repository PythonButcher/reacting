// Step 1 — Import required plugins
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'     // React plugin for Vite
import tailwindcss from '@tailwindcss/vite' // Tailwind v4+ Vite plugin

// Step 2 — Export Vite config
export default defineConfig({
  plugins: [
    react(),       // NOTE: lowercase function from the import
    tailwindcss(), // Tailwind plugin
  ],
})
