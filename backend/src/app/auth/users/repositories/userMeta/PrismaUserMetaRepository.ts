import { prisma } from '@database/prisma'
import { User } from '../../models/userMeta/User'
import { UserMetaRepository } from './UserMetaRepository'

export class PrismaUserMetaRepository implements UserMetaRepository {
  async getById(id: number): Promise<User | null> {
    const dbResult = await prisma.usuarios.findUnique({
      where: {
        id,
      },
      select: {
        firstName: true,
        lastName: true,
        id: true,
      },
    })

    let resultFormatted
    if (dbResult)
      resultFormatted = {
        firstName: dbResult.firstName,
        lastName: dbResult.lastName,
        id: String(dbResult.id),
      }

    return resultFormatted ?? null
  }
}
