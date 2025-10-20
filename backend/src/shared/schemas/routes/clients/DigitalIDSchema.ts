import * as z from 'zod'

export const DigitalIDSchema = {
  generate: z.object({
    dni: z
      .string()
      .regex(/^\d{7,8}$/, 'El DNI debe tener 7 u 8 dígitos numéricos'),
  }),
}
