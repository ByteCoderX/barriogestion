import { ResourceNotFoundException } from '@shared/exceptions/ResourceNotFoundException'
import { ExpressMiddleware } from '@shared/types/ExpressMiddleware'

export const routeNotFoundMiddleware: ExpressMiddleware = (req) => {
  throw new ResourceNotFoundException(`No se encontro la ruta ${req.path}`)
}
