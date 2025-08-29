import { AppException, httpStatusCodes } from '@shared/exceptions/AppException'
import { ExpressMiddleware } from '@shared/types/ExpressMiddleware'
import { config } from 'src/configs'

export const apiKeyMiddleware: ExpressMiddleware = (req, _, next) => {
  const apiKey = req.headers['x-api-key']

  if (apiKey !== config.API_KEY) {
    throw new AppException('API Key invalida.', httpStatusCodes.unauthorized)
  }

  next()
}
