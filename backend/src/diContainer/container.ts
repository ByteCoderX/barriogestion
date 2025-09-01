// General Container
import { DiContainer } from './DiContainer'

// Prisma Repositories
import { PrismaJWTRepository } from '@app/jwt/repositories/PrismaJWTRepository'

// App Services
import { JWTServices } from '@app/jwt/JWTService'

const container = new DiContainer()

const JWTRepo = new PrismaJWTRepository()

container.registerInstance('jwt-repository', PrismaJWTRepository)
container.register('jwt-services', JWTServices)

export { container }
