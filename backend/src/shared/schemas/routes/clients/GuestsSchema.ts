import * as z from 'zod'

export const GuestsSchema = {
  get: z.object({
    userId: z.coerce.number(),
  }),

  create: z.object({
    firstName: z.string(),
    lastName: z.string(),
    dni: z
      .string()
      .regex(/^\d{7,8}$/, 'El DNI debe tener 7 u 8 dígitos numéricos'),
    contact: z.string(),
    visitDate: z.date(),
    exitDate: z.date(),
    visitType: z.string(),
    reason: z.string(),
    userId: z.coerce.number(),
    observations: z.string(),
  }),

  update: z.object({
    id: z.coerce.number(),
    firstName: z.string(),
    lastName: z.string(),
    dni: z
      .string()
      .regex(/^\d{7,8}$/, 'El DNI debe tener 7 u 8 dígitos numéricos'),
    contact: z.string(),
    visitDate: z.date(),
    exitDate: z.date(),
    visitType: z.string(),
    reason: z.string(),
    userId: z.coerce.number(),
    observations: z.string(),
  }),

  delete: z.object({
    userId: z.coerce.number(),
    guestId: z.coerce.number(),
  }),
}
