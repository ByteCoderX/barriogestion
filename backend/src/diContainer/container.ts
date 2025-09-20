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

const container = new DiContainer()

// Auth Modules
const sessionsRepository = new SessionsRepository()
const tokenManager = new JsonWebTokenTokenManager()
const passwordHasher = new BcryptPasswordHasher()
const authUserMeta = new PrismaUserMetaRepository()
const authUserCredentials = new PrismaUserCredentialsRepository()

container.registerInstance('sessions-repository', sessionsRepository)
container.registerInstance('token-manager', tokenManager)
container.registerInstance('password-hasher', passwordHasher)

container.registerInstance('auth-user-credentials', authUserCredentials)
container.registerInstance('auth-user-meta', authUserMeta)
container.register('auth-services', AuthServices, [
  'auth-user-meta',
  'auth-user-credentials',
  'password-hasher',
  'token-manager',
  'sessions-repository',
])

export { container }
