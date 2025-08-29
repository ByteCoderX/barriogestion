import { apiKeyMiddleware } from '@shared/middlewares/apiKeyMiddleware'
import { Router } from 'express'

export const v1 = () => {
  const router = Router()

  router.use(apiKeyMiddleware)

  router.get('/', (req, res) => {
    res.json({ message: 'Hello world v1' })
  })

  return router
}
