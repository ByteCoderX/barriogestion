import { prisma } from '@database/prisma'
import { User } from '../../models/userMeta/User'
import { UserMetaRepository } from './UserMetaRepository'

export class PrismaUserMetaRepository implements UserMetaRepository {
  async getByDni(dni: string): Promise<User | null> {
    const dbResult = await prisma.usuarios.findUnique({
      where: {
        dni,
      },
      select: {
        firstName: true,
        lastName: true,
        contact: true,
        address: true,
        id: true,
      },
    })

    let resultFormatted
    if (dbResult)
      resultFormatted = {
        firstName: dbResult.firstName,
        lastName: dbResult.lastName,
        contact: dbResult.contact ?? 'Ninguno',
        address: dbResult.address ?? 'Ninguna',
        id: String(dbResult.id),
      }

    return resultFormatted ?? null
  }
}
