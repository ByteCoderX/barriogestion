import { Request, Response, NextFunction } from 'express'
import { authContainer } from '@diContainer/authContainer'
import { AppException, httpStatusCodes } from '@shared/exceptions/AppException'
import { config } from '@config'
import { getRemainingTime } from '@shared/utils/dates/getRemainingTime'
import { TokenManager } from '@app/auth/tokens/TokenManager'
import { SessionsRepository } from '@app/auth/sessions/SessionsRepository'
import { UsersCredentialsRepository } from '@app/auth/users/repositories/userCredentials/UsersCredentialsRepository'

interface UserInyected extends Request {
  user?: {
    userId: string
    admin: boolean
  }
}

export const sessionsMiddleware = async (
  req: UserInyected,
  res: Response,
  next: NextFunction,
) => {
  const tokenManager = authContainer.resolve<TokenManager>('token-manager')
  const sessionsRepository = authContainer.resolve<SessionsRepository>(
    'sessions-repository',
  )
  const authRepository =
    authContainer.resolve<UsersCredentialsRepository>('auth-repository')

  const accessToken = req.cookies.accessToken
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken)
    throw new AppException(
      'Credenciales Inválidas.',
      httpStatusCodes.unauthorized,
    )

  const refreshVerificaition = await tokenManager.validateRefresh(refreshToken)

  if (!refreshVerificaition.valid) {
    throw new AppException(
      'Credenciales Inválidas.',
      httpStatusCodes.unauthorized,
    )
  }

  const session = await sessionsRepository.getById(
    refreshVerificaition.decoded.sessionId,
  )

  if (!session) {
    throw new AppException(
      'Credenciales Inválidas.',
      httpStatusCodes.unauthorized,
    )
  }

  let inyectedUser

  const issueAccessToken = (userId: string, admin: boolean) => {
    const token = tokenManager.createAccess(userId, admin)
    inyectedUser = { userId, admin }
    res.cookie('accessToken', token)
  }

  if (accessToken) {
    const accessVerification = await tokenManager.validateAccess(accessToken)
    const { valid, decoded } = accessVerification

    if (
      !valid ||
      getRemainingTime(decoded.exp, config.JWT_ACCESS_REFRESH_TIME.unit) <
        config.JWT_ACCESS_REFRESH_TIME.value
    ) {
      issueAccessToken(decoded.userId, decoded.admin)
    } else {
      inyectedUser = { userId: decoded.userId, admin: decoded.admin }
    }
  } else {
    const userCredentials = await authRepository.getById(session.userId)
    if (!userCredentials) {
      throw new Error('Ocurrió un error al intentar generar un Access Token.')
    }
    issueAccessToken(userCredentials.id, userCredentials.admin)
  }

  const refreshExpiration = getRemainingTime(
    refreshVerificaition.decoded.exp,
    config.JWT_REMAINING_REFRESH_TIME.unit,
  )

  if (refreshExpiration < config.JWT_REMAINING_REFRESH_TIME.value) {
    const token = await tokenManager.createRefresh(
      refreshVerificaition.decoded.sessionId,
    )
    res.cookie('refreshToken', token)
  }

  if (!inyectedUser)
    throw new Error(
      'Ocurrió un error al intentar inyectar un usuario en la consulta.',
    )
  req.user = {
    userId: inyectedUser.userId,
    admin: inyectedUser.admin,
  }
  next()
}
