import { AppException } from '@shared/exceptions/AppException'
import { ErrorRequestHandler } from 'express'
import { accessLogger } from '@config'

export const errorHandlerMiddlware: ErrorRequestHandler = (
  err,
  req,
  res,
  _next,
) => {
  const { method, originalUrl } = req
  accessLogger.error(`${method} ${originalUrl} | ${err}`)

  const response = {
    timestamp: Date.now(),
    method: req.method,
    path: req.path,
    status: 500,
    message: 'Error en el servicio',
  }

  if (err instanceof AppException) {
    response.status = err.statusCode
    response.message = err.message
  }

  res.status(response.status).json(response)
}
