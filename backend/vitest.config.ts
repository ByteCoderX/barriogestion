import path from 'path'
import { loadEnvFile } from 'process'
import { defineConfig } from 'vitest/config'

loadEnvFile('.env.tests')
console.log(`DATABASE_URL=${process.env.DATABASE_URL}`)

export default defineConfig({
  test: {
    globals: true,
    include: ['tests/**/*.test.ts'],
    env: process.env,
  },
  resolve: {
    alias: {
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@database': path.resolve(__dirname, 'src/database'),
      '@tests': path.resolve(__dirname, 'tests'),
      '@diContainer': path.resolve(__dirname, 'src/diContainer'),
      '@config': path.resolve(__dirname, 'src/configs.ts'),
    },
  },
})
