import { Request, Response, NextFunction } from 'express'
import { AuthServices } from '@app/auth/AuthServices'
import { container } from '@diContainer/container'
import { AppException, httpStatusCodes } from '@shared/exceptions/AppException'

interface UserInyected extends Request {
  user?: {
    userId: string
    admin: boolean
  }
}

export const permissionMiddleware = async (
  req: UserInyected,
  res: Response,
  next: NextFunction,
) => {
  const authServices = container.resolve<AuthServices>('auth-services')

  const inyectedUser = req.user
  if (!inyectedUser) throw new Error('Mal uso del Middleware de Permisos.')

  const user = await authServices.getUser(inyectedUser.userId)
  if (!user) throw new Error('No se encontró al usuario.')

  if (!user.admin)
    throw new AppException(
      'No tienes los permisos suficientes.',
      httpStatusCodes.unauthorized,
    )

  next()
}
