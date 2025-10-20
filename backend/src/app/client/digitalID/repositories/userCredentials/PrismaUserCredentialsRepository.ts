import { User } from '../../models/userCredentials/User'
import { UsersCredentialsRepository } from './UsersCredentialsRepository'
import { prisma } from '@database/prisma'

export class PrismaUserCredentialsRepository
  implements UsersCredentialsRepository
{
  async getByDni(dni: string): Promise<User | undefined> {
    const dbResult = await prisma.webUser.findUnique({
      where: {
        dni,
      },
      select: {
        id: true,
        dni: true,
        avatarHash: true,
        email: true,
        password: true,
        admin: true,
      },
    })

    let resultFormatted
    if (dbResult)
      resultFormatted = {
        id: dbResult.id,
        dni: dbResult.dni,
        avatarHash: dbResult.avatarHash,
        email: dbResult.email,
        password: dbResult.password,
        admin: dbResult.admin,
      }

    return resultFormatted
  }
}
