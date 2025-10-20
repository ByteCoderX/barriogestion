import { apiKeyMiddleware } from '@shared/middlewares/apiKeyMiddleware'
import { Router } from 'express'
import { expensesRoutes } from './expensesRoutes'
import { reservationsRoutes } from './reservationsRoutes'
import { sessionsMiddleware } from '@shared/middlewares/sessionsMiddleware'
import { guestsRoutes } from './guestsRoutes'
import { ComplaintsRoutes } from './ComplaintsRoutes'
import { DigitalIDRoutes } from './DigitalIDRoutes'

export const client_v1 = () => {
  const router = Router()
  router.use(apiKeyMiddleware)

  router.get('/', (req, res) => {
    res.json({ message: 'Client v1' })
  })

  router.use('/expenses', sessionsMiddleware, expensesRoutes())
  router.use('/reservations', sessionsMiddleware, reservationsRoutes())
  router.use('/guest', sessionsMiddleware, guestsRoutes())
  router.use('/complaints', sessionsMiddleware, ComplaintsRoutes())
  router.use('/carnet', sessionsMiddleware, DigitalIDRoutes())

  return router
}
