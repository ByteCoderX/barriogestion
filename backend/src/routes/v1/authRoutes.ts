import { AuthServices } from '@app/auth/AuthServices'
import { container } from '@diContainer/container'
import { Router } from 'express'
import { AuthSchema } from '@shared/schemas/routes/AuthSchema'
import { zodBodyMiddleware } from '@shared/middlewares/zodBodyMiddleware'
import { AppException, httpStatusCodes } from '@shared/exceptions/AppException'
import { TokenManager } from '@app/auth/tokens/TokenManager'

export const authRoutes = () => {
  const router = Router()
  const authServices = container.resolve<AuthServices>('auth-services')
  const tokenManager = container.resolve<TokenManager>('token-manager')

  router.post(
    '/register',
    zodBodyMiddleware(AuthSchema.register),
    async (req, res) => {
      // Se registra un usuario 👍
      await authServices.registerUser(req.body)
      res.sendStatus(201)
    },
  )

  router.post(
    '/login',
    zodBodyMiddleware(AuthSchema.login),
    async (req, res) => {
      // Primero se verifica que la contraseña sea correcta
      // y se intenta obtener los datos del usuario.
      // Se obtiene la ip y el useragent del usuario.
      const userIp = req.ip ?? 'null'
      const userAgent = req.headers['user-agent'] ?? 'null'

      const connectionInfo = {
        ip: userIp,
        userAgent,
      }

      const result = await authServices.authenticate(req.body, connectionInfo)

      // Se asigna el refresh token al usuario mediante cookies.
      res.cookie('refreshToken', result.tokens.refresh)
      res.cookie('accessToken', result.tokens.access)

      // Se devuelve token de acceso y la información del usuario mediante el body.
      res.status(200).send({
        user: {
          id: result.user.id,
          personalId: result.user.personalId,
          dni: result.user.dni,
          email: result.user.email,
        },
      })
    },
  )

  router.post('/validator', async (req, res) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken)
      throw new AppException(
        'Credenciales Inválidas.',
        httpStatusCodes.unauthorized,
      )

    const refreshVerificaition =
      await tokenManager.validateRefresh(refreshToken)

    if (!refreshVerificaition.valid) {
      throw new AppException(
        'Credenciales Inválidas.',
        httpStatusCodes.unauthorized,
      )
    }

    res.sendStatus(200)
  })

  router.post(
    '/change-password',
    zodBodyMiddleware(AuthSchema.changePassword),
    async (req, res) => {
      // Cambia la contraseña de un usuario existente.
      await authServices.changePassword(req.body)
      res.sendStatus(200)
    },
  )

  return router
}
