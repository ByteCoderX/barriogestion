// General Container
import { DiContainer } from './DiContainer'

// Prisma Repositories
import { PrismaUserRepository } from '@app/auth/users/repositories/auth_users/PrismaUserRepository'
import { PrismaUserRepository as PrismaAuthUsersRepository } from '@app/auth/users/repositories/user/PrismaUserRepository'

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
const userRepository = new PrismaUserRepository()
const authUsersRepository = new PrismaAuthUsersRepository()

container.registerInstance('sessions-repository', sessionsRepository)
container.registerInstance('token-manager', tokenManager)
container.registerInstance('password-hasher', passwordHasher)

container.registerInstance('auth-users-repository', authUsersRepository)
container.registerInstance('auth-repository', userRepository)
container.register('auth-services', AuthServices, [
  'auth-repository',
  'auth-users-repository',
  'password-hasher',
  'token-manager',
  'sessions-repository',
])

export { container }
