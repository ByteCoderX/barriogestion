import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@database': path.resolve(__dirname, 'src/database'),
      '@tests': path.resolve(__dirname, 'src/tests'),
      '@diContainer': path.resolve(__dirname, 'src/diContainer'),
    },
  },
})
