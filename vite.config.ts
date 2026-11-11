import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      // Do not bundle dependencies; the user's app installs them
      external: [
        /^react($|\/)/,
        /^react-dom($|\/)/,
        /^@base-ui\/react($|\/)/,
        /^cn($|\/)/,
        /^tailwind-variants($|\/)/,
      ],
    },
  },
  plugins: [react()],
})
