// General Container
import { DiContainer } from './DiContainer'

// Prisma Repositories
import { PrismaUserCredentialsRepository } from '@app/auth/users/repositories/userCredentials/PrismaUserCredentialsRepository'
import { PrismaUserMetaRepository } from '@app/auth/users/repositories/userMeta/PrismaUserMetaRepository'

// Repositories
import { BcryptPasswordHasher } from '@app/auth/passwords/BcryptPasswordHasher'
import { JsonWebTokenTokenManager } from '@app/auth/tokens/JsonWebTokenTokenManager'
import { PrismaSessionsRepository as SessionsRepository } from '@app/auth/sessions/PrismaSessionsRepository'

// Services
import { AuthServices } from '@app/auth/AuthServices'

const authContainer = new DiContainer()

// Auth Modules
const sessionsRepository = new SessionsRepository()
const tokenManager = new JsonWebTokenTokenManager()
const passwordHasher = new BcryptPasswordHasher()
const authUserMeta = new PrismaUserMetaRepository()
const authUserCredentials = new PrismaUserCredentialsRepository()

authContainer.registerInstance('sessions-repository', sessionsRepository)
authContainer.registerInstance('token-manager', tokenManager)
authContainer.registerInstance('password-hasher', passwordHasher)

authContainer.registerInstance('auth-user-credentials', authUserCredentials)
authContainer.registerInstance('auth-user-meta', authUserMeta)
authContainer.register('auth-services', AuthServices, [
  'auth-user-meta',
  'auth-user-credentials',
  'password-hasher',
  'token-manager',
  'sessions-repository',
])

export { authContainer }
