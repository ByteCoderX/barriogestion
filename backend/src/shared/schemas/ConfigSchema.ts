import z from 'zod'

export const ConfigSchema = z.object({
  PORT: z.coerce.number(),
  DATABASE_URL: z.url(),
  JWT_ACCESS_EXP_MS: z.coerce.number(),
  JWT_REFRESH_EXP_MS: z.coerce.number(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  API_KEY: z.string(),
  LOG_DIR: z.string(),
})
