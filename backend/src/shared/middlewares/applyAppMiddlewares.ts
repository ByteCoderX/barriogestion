import express from 'express'
import cors from 'cors'
import { loggerMiddleware } from './loggerMiddleware'

export const applyAppMiddlewares = (app: express.Application) => {
  app.disable('x-powered-by')
  app.use(cors())
  app.use(loggerMiddleware)
  app.use(express.json())
}
