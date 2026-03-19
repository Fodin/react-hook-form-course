import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'src/hooks', replacement: path.resolve(__dirname, './src/hooks') },
      { find: 'src/components', replacement: path.resolve(__dirname, './src/components') },
      { find: 'src', replacement: path.resolve(__dirname, './src') },
    ],
  },
})
