import { Router } from 'express'

export const expensesRoutes = () => {
  const router = Router()

  router.get('/:id', async (req, res) => {
    // Obtenes una Expensa
    res.status(200).send('hola')
  })

  router.get('/', async (req, res) => {
    // Obtenes todas las Expensas
    res.status(200).send('hola')
  })

  router.post('/', async (req, res) => {
    // Creas una Nueva Expensa
    res.status(200).send('hola')
  })

  router.patch('/:id', async (req, res) => {
    // Actualizas una Expensa
    res.status(200).send('hola')
  })

  router.delete('/:id', async (req, res) => {
    // Eliminas una Expensa
    res.status(200).send('hola')
  })

  return router
}
