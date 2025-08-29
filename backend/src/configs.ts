import { ConfigSchema } from '@shared/schemas/ConfigSchema'
import { loadEnvFile } from 'process'
import { Logger } from '@shared/utils/logger/Logger'

if (process.env.NODE_ENV !== 'production') {
  loadEnvFile('.env.local')
}

export const generalLogger = new Logger({ baseDir: 'general' })
export const accessLogger = new Logger({ baseDir: 'app' })
export const config = ConfigSchema.parse(process.env)
