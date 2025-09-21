import * as z from 'zod'

export const AuthSchema = {
  register: z.object({
    dni: z.string().min(1, 'El DNI es obligatorio.'), //Ya se que lo va a tomar como un string
    email: z.email().min(1, 'El email es obligatorio.'),
    password: z.string().min(1, 'La contraseña es obligatoria.'),
    userId: z.coerce.number().min(1, 'La id del usuario es obligatoria.'),
  }),

  login: z.object({
    dni: z.string().min(1, 'El DNI es obligatorio.'), //Ya se que lo va a tomar como un string
    password: z.string().min(1, 'La contraseña es obligatoria.'),
  }),

  logout: z.object({
    token: z.string().min(1, 'El Token de Refresco es Obligatorio.'),
  }),

  verify: z.object({
    token: z.string().min(1, 'El Token de Refresco es Obligatorio.'),
  }),

  changePassword: z.object({
    dni: z.string().min(1, { message: 'Falta el Username.' }),
    password: z
      .string()
      .min(1, { message: 'Falta la Contraseña.' })
      .max(60, { message: 'La Contraseña es Demasiado Larga.' }),
  }),
}
