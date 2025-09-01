import { Request, Response, NextFunction } from 'express'
import { accessLogger } from '@config'

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now()

  const duration = Date.now() - start
  const { method, originalUrl, ip } = req
  const { statusCode } = res

  accessLogger.info(
    `${method} ${originalUrl} - ${statusCode} - ${ip} - ${duration}ms`,
  )

  next()
}
