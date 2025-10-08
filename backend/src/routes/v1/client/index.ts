import { apiKeyMiddleware } from '@shared/middlewares/apiKeyMiddleware'
import { Router } from 'express'
import { expensesRoutes } from './expensesRoutes'
import { reservationsRoutes } from './reservationsRoutes'
import { sessionsMiddleware } from '@shared/middlewares/sessionsMiddleware'

export const client_v1 = () => {
  const router = Router()

  router.use(apiKeyMiddleware)

  router.get('/', (req, res) => {
    res.json({ message: 'Client v1' })
  })

  router.use('/expenses', sessionsMiddleware, expensesRoutes())
  router.use('/reservations', sessionsMiddleware, reservationsRoutes())

  return router
}
