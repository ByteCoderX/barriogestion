import { User } from '../../models/userCredentials/User'
import { UserSave } from '@app/auth/users/models/userCredentials/UserSave'
import { UserCredentials } from '../../models/userCredentials/UserCredentials'
import { UsersCredentialsRepository } from './UsersCredentialsRepository'
import { prisma } from '@database/prisma'

export class PrismaUserCredentialsRepository
  implements UsersCredentialsRepository
{
  async create(data: UserSave) {
    await prisma.user.create({
      data: {
        id: data.id,
        dni: data.dni,
        email: data.email,
        password: data.password,
        personalId: data.personalId,
      },
    })
  }
  async getByDni(dni: string): Promise<User | undefined> {
    const dbResult = await prisma.user.findUnique({
      where: {
        dni,
      },
      select: {
        id: true,
        dni: true,
        email: true,
        password: true,
        personalId: true,
        admin: true,
      },
    })

    let resultFormatted
    if (dbResult)
      resultFormatted = {
        id: dbResult.id,
        dni: dbResult.dni,
        email: dbResult.email,
        password: dbResult.password,
        personalId: String(dbResult.personalId),
        admin: dbResult.admin,
      }

    return resultFormatted
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const dbResult = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        dni: true,
        email: true,
        password: true,
        personalId: true,
        admin: true,
      },
    })

    let resultFormatted
    if (dbResult)
      resultFormatted = {
        id: dbResult.id,
        dni: dbResult.dni,
        email: dbResult.email,
        password: dbResult.password,
        personalId: String(dbResult.personalId),
        admin: dbResult.admin,
      }

    return resultFormatted
  }

  async getById(id: string): Promise<User | undefined> {
    const dbResult = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        dni: true,
        email: true,
        password: true,
        personalId: true,
        admin: true,
      },
    })

    let resultFormatted
    if (dbResult)
      resultFormatted = {
        id: dbResult.id,
        dni: dbResult.dni,
        email: dbResult.email,
        password: dbResult.password,
        personalId: String(dbResult.personalId),
        admin: dbResult.admin,
      }

    return resultFormatted
  }

  async update(data: UserCredentials): Promise<void> {
    await prisma.user.update({
      where: {
        dni: data.dni,
      },
      data: {
        password: data.password,
      },
    })
  }
}
