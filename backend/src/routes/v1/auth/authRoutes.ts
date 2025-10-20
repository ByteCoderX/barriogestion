import { AuthServices } from '@app/auth/AuthServices'
import { authContainer } from '@diContainer/authContainer'
import { Router } from 'express'
import { AuthSchema } from '@shared/schemas/routes/auth/AuthSchema'
import { zodBodyMiddleware } from '@shared/middlewares/zodBodyMiddleware'
import { AppException, httpStatusCodes } from '@shared/exceptions/AppException'
import { TokenManager } from '@app/auth/tokens/TokenManager'
import { DigitalIDServices } from '@app/client/digitalID/DigitalIDServices'
import { clientContainer } from '@diContainer/clientContainer'

export const authRoutes = () => {
  const router = Router()
  const authServices = authContainer.resolve<AuthServices>('auth-services')
  const tokenManager = authContainer.resolve<TokenManager>('token-manager')
  const digitalIDServices =
    clientContainer.resolve<DigitalIDServices>('digitalid-services')

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
      res.cookie('refreshToken', result.tokens.refresh, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        domain: '.bringfeel.com.ar',
      })
      res.cookie('accessToken', result.tokens.access, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        domain: '.bringfeel.com.ar',
      })

      const carnetData = await digitalIDServices.getCarnetData(result.user.dni)

      // Se devuelve token de acceso y la información del usuario mediante el body.
      res.status(200).send({
        id: result.user.id,
        dni: result.user.dni,
        fullName: result.user.fullName,
        contact: result.user.contact,
        address: result.user.address,
        email: result.user.email,
        avatar: result.user.avatar,
        admin: result.user.isAdmin,
        carnet: carnetData,
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

  router.post('/logout', async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(304)

    const refreshVerificaition =
      await tokenManager.validateRefresh(refreshToken)

    if (!refreshVerificaition.valid) return res.sendStatus(304)

    await authServices.deleteSession(refreshVerificaition.decoded.sessionId)
    res.clearCookie('refreshToken', { path: '/' })
    return res.sendStatus(200)
  })

  return router
}
