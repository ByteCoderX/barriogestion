import { Router } from 'express'

export const incomesRoutes = () => {
  const router = Router()

  router.post('/', async (req, res) => {
    // Creas un Nuevo Ingreso
    res.status(200).send('hola')
  })

  router.get('/', async (req, res) => {
    // Obtenes los Ingresos Totales
    res.status(200).send('hola')
  })

  return router
}
