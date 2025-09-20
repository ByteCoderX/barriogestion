import { Router } from 'express'

export const accessRoutes = () => {
  const router = Router()

  router.post('/', async (req, res) => {
    // Registras un Nuevo Acceso
    res.status(200).send('hola')
  })

  router.get('/', async (req, res) => {
    // Obtienes el Historial de Accesos con Paginación
    res.status(200).send('hola')
  })

  return router
}
