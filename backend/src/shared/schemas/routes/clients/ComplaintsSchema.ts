import * as z from 'zod'

export const ComplaintsSchema = {
  create: z.object({
    title: z
      .string()
      .min(1, 'El Título es Obligatorio')
      .max(50, 'El Título es demasiado Largo'),
    category: z
      .string()
      .min(1, 'La Categoría es Obligatoria')
      .max(50, 'La Categoría es demasiado Larga'),
    priority: z
      .string()
      .min(1, 'La Prioridad es Obligatoria')
      .max(30, 'La Prioridad es demasiado Larga'),
    location: z
      .string()
      .min(1, 'La Ubicación es Obligatoria')
      .max(120, 'La Ubicación es demasiado Larga'),
    description: z
      .string()
      .min(1, 'La Descripción es Obligatoria')
      .max(512, 'La Descripción es demasiado Larga'),
    dni: z
      .string()
      .regex(/^\d{7,8}$/, 'El DNI debe tener 7 u 8 dígitos numéricos'),
  }),

  get: z.object({
    dni: z
      .string()
      .regex(/^\d{7,8}$/, 'El DNI debe tener 7 u 8 dígitos numéricos'),
  }),
}
