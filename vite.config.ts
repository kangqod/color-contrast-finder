import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: './lib/main.ts',
      name: 'color-contrast-finder',
      fileName: 'color-contrast-finder'
    }
  },
  server: {
    open: true
  }
})
