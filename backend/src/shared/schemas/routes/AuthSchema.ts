import * as z from 'zod'

export const AuthSchema = {
  register: z.object({
    username: z.string().min(1, { message: 'Falta el Username.' }),
    email: z.email().min(1, { message: 'Falta el email.' }),
    password: z
      .string()
      .min(1, { message: 'Falta la Contraseña.' })
      .max(60, { message: 'La Contraseña es Demasiado Larga.' }),
    personalId: z.coerce
      .number()
      .min(1, { message: 'Falta la id del Personal.' }),
  }),

  login: z.object({
    username: z.string().min(1, { message: 'Falta el Username.' }),
    password: z
      .string()
      .min(1, { message: 'Falta la Contraseña.' })
      .max(60, { message: 'La Contraseña es Demasiado Larga.' }),
  }),

  changePassword: z.object({
    username: z.string().min(1, { message: 'Falta el Username.' }),
    password: z
      .string()
      .min(1, { message: 'Falta la Contraseña.' })
      .max(60, { message: 'La Contraseña es Demasiado Larga.' }),
  }),
}
