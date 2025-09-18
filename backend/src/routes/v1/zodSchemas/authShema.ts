import * as z from 'zod';

export const schem = {

    login: z.object({
      dni: z.number().min(1, "El DNI es obligatorio."), //Ya se que lo va a tomar como un string
      password: z.string().min(1, "La contraseña es obligatoria.")
    }),

    logout: z.object({
      token: z.string().min(1, "El Token de Refresco es Obligatorio."),
    }),

    verify: z.object({
      token: z.string().min(1, "El Token de Refresco es Obligatorio."),
    })
}