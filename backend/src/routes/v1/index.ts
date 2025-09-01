import { apiKeyMiddleware } from '@shared/middlewares/apiKeyMiddleware'
import { Router } from 'express'
import { authRoutes } from './authRoutes'
import { usersRoutes } from './usersRoutes'
import { accessRoutes } from './accessRoutes'
import { expensesRoutes } from './expensesRoutes'
import { billsRoutes } from './billsRoutes'
import { foundsRoutes } from './foundsRoutes'
import { incomesRoutes } from './incomesRoutes'
import { paymentsRoutes } from './paymentsRoutes'

export const v1 = () => {
  const router = Router()

  router.use(apiKeyMiddleware)

  router.get('/', (req, res) => {
    res.json({ message: 'Hello world v1' })
  })

  router.use('/auth', authRoutes())
  router.use('/user', usersRoutes())
  router.use('/access', accessRoutes())
  router.use('/expenses', expensesRoutes())
  router.use('/bills', billsRoutes())
  router.use('/founds', foundsRoutes())
  router.use('/incomes', incomesRoutes())
  router.use('/payment', paymentsRoutes())

  return router
}
