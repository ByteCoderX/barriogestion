import express from 'express'
import cors from 'cors'
import { loggerMiddleware } from './loggerMiddleware'
//import { checkJWT } from './jwtMiddleware'

export const applyAppMiddlewares = (app: express.Application) => {
  app.disable('x-powered-by')
  app.use(cors())
  app.use(loggerMiddleware)
  //app.use(checkJWT) //lo desmarco porque es más paja laburar en dev con los JWT activados.
  app.use(express.json())
}
