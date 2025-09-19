import { User } from '../../models/auth__users/User'
import { UserSave } from '@app/auth/users/models/auth__users/UserSave'
import { AuthCredentials } from '../../models/auth__users/AuthCredentials'
import { UsersRepository } from './UsersRepository'
import { prisma } from '@database/prisma'

export class PrismaUserRepository implements UsersRepository {
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

  async update(data: AuthCredentials): Promise<void> {
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
