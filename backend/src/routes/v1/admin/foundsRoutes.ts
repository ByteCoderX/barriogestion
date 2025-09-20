import { Router } from 'express'

export const foundsRoutes = () => {
  const router = Router()

  router.get('/', async (req, res) => {
    // Obtenes los Fondos ?
    res.status(200).send('hola')
  })

  return router
}
