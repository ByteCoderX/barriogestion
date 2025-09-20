import { apiKeyMiddleware } from '@shared/middlewares/apiKeyMiddleware'
import { Router } from 'express'
import { usersRoutes } from './usersRoutes'
import { accessRoutes } from './accessRoutes'
import { expensesRoutes } from './expensesRoutes'
import { billsRoutes } from './billsRoutes'
import { foundsRoutes } from './foundsRoutes'
import { incomesRoutes } from './incomesRoutes'
import { paymentsRoutes } from './paymentsRoutes'
import { sessionsMiddleware } from '@shared/middlewares/sessionsMiddleware'

export const admin_v1 = () => {
  const router = Router()

  router.use(apiKeyMiddleware)

  router.get('/', (req, res) => {
    res.json({ message: 'Admin v1' })
  })

  router.use('/user', sessionsMiddleware, usersRoutes())
  router.use('/access', sessionsMiddleware, accessRoutes())
  router.use('/expenses', sessionsMiddleware, expensesRoutes())
  router.use('/bills', sessionsMiddleware, billsRoutes())
  router.use('/founds', sessionsMiddleware, foundsRoutes())
  router.use('/incomes', sessionsMiddleware, incomesRoutes())
  router.use('/payment', sessionsMiddleware, paymentsRoutes())

  return router
}
