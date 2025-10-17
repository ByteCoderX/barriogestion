import express from 'express'
import cors from 'cors'
import { loggerMiddleware } from './loggerMiddleware'
import cookieParser from 'cookie-parser'
import { config } from '@config'

const corsOptions = {
  origin: config.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
}

export const applyAppMiddlewares = (app: express.Application) => {
  app.disable('x-powered-by')
  app.use(cors(corsOptions))
  app.use(loggerMiddleware)
  app.use(express.json())
  app.use(cookieParser())
}
