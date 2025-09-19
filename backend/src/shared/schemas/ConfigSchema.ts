import z from 'zod'

const timeRegex = /^(\d+)([smhd])$/

const timeSchema = z
  .string()
  .regex(timeRegex, 'El formato debe ser un número seguido de s, m, h o d')

const parsedTimeSchema = timeSchema.transform((val) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [, value, unit] = val.match(timeRegex)!
  return {
    value: Number(value),
    unit: unit as 's' | 'm' | 'h' | 'd',
  }
})

export const ConfigSchema = z.object({
  PORT: z.coerce.number(),
  DATABASE_URL: z.url(),
  JWT_ACCESS_EXP_TIME: parsedTimeSchema,
  JWT_ACCESS_REFRESH_TIME: parsedTimeSchema,
  JWT_REFRESH_EXP_TIME: parsedTimeSchema,
  JWT_REMAINING_REFRESH_TIME: parsedTimeSchema,
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  API_KEY: z.string(),
  LOG_DIR: z.string(),
})
