import * as z from 'zod'

export const ReservationsSchemas = {
  create: z.object({
    spaceId: z.number(),
    dni: z
      .string()
      .regex(/^\d{7,8}$/, 'El DNI debe tener 7 u 8 dígitos numéricos'),
    reservationDate: z.date(),
    startTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'El formato de hora debe ser HH:MM'),
    endTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'El formato de hora debe ser HH:MM'),
    peopleCount: z.number().min(1, 'Debe ir al menos 1 persona.'),
    observations: z.string().max(1024, 'La observación es demasiado extensa.'),
  }),

  mySpaces: z.object({
    dni: z
      .string()
      .regex(/^\d{7,8}$/, 'El DNI debe tener 7 u 8 dígitos numéricos'),
  }),

  spaceCapacity: z.object({
    spaceId: z.coerce.number(),
  }),
}
