import { apiKeyMiddleware } from '@shared/middlewares/apiKeyMiddleware'
import { Router } from 'express'

export const client_v1 = () => {
  const router = Router()

  router.use(apiKeyMiddleware)

  router.get('/', (req, res) => {
    res.json({ message: 'Client v1' })
  })

  //router.use('/expenses', sessionsMiddleware, expensesRoutes())

  return router
}
