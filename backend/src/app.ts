import { v1 } from '@routes/v1'
import { applyAppMiddlewares } from '@shared/middlewares/applyAppMiddlewares'
import { errorHandlerMiddlware } from '@shared/middlewares/errorHandlerMiddleware'
import { routeNotFoundMiddleware } from '@shared/middlewares/routeNotFoundMiddleware'
import express from 'express'

const app = express()
applyAppMiddlewares(app)

app.get('/health', (req, res) => {
  res.json({ status: 'Ok' })
})

app.use('/api/v1', v1())

app.use(routeNotFoundMiddleware)
app.use(errorHandlerMiddlware)

export { app }
