import { auth_v1 } from '@routes/v1/auth'
import { admin_v1 } from '@routes/v1/admin'
import { client_v1 } from '@routes/v1/client'
import { applyAppMiddlewares } from '@shared/middlewares/applyAppMiddlewares'
import { errorHandlerMiddlware } from '@shared/middlewares/errorHandlerMiddleware'
import { routeNotFoundMiddleware } from '@shared/middlewares/routeNotFoundMiddleware'
import express from 'express'

const app = express()
applyAppMiddlewares(app)

app.get('/health', (req, res) => {
  res.json({ status: 'Ok' })
})

app.use('/bg/v1/auth', auth_v1())
app.use('/bg/v1/admin', admin_v1())
app.use('/bg/v1/client', client_v1())

app.use(routeNotFoundMiddleware)
app.use(errorHandlerMiddlware)

export { app }
