import { Router } from 'express'

export const usersRoutes = () => {
  const router = Router()

  router.get('/', async (req, res) => {
    // Obtenes todos los Usuarios
    res.status(200).send('hola')
  })

  router.get('/:id', async (req, res) => {
    // Obtenes un Usuario
    res.status(200).send('hola')
  })

  router.post('/', async (req, res) => {
    // Creas un usuario
    res.status(200).send('hola')
  })

  router.patch('/:id', async (req, res) => {
    // Editas un Usuario
    res.status(200).send('hola')
  })

  router.delete('/:id', async (req, res) => {
    // Eliminas un Usuario
    res.status(200).send('hola')
  })

  return router
}
