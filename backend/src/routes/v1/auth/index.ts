import { apiKeyMiddleware } from '@shared/middlewares/apiKeyMiddleware'
import { Router } from 'express'
import { authRoutes } from '../auth/authRoutes'

export const auth_v1 = () => {
  const router = Router()

  router.use(apiKeyMiddleware)

  router.use('/', authRoutes())

  return router
}
