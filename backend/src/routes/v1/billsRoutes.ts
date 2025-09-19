import { Router } from 'express'

export const billsRoutes = () => {
  const router = Router()

  router.post('/', async (req, res) => {
    // Creas un Nuevo Gasto
    res.status(200).send('hola')
  })

  router.get('/', async (req, res) => {
    // Obtenes todos los Gastos
    res.status(200).send('hola')
  })

  router.get('/:id', async (req, res) => {
    // Obtenes un Gasto
    res.status(200).send('hola')
  })

  router.patch('/:id', async (req, res) => {
    // Editas un Gasto
    res.status(200).send('hola')
  })
  return router
}
