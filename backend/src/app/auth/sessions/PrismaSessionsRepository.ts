import { Session } from './models/Session'
import { SessionsRepository } from './SessionsRepository'
import { prisma } from '@database/prisma'
import { SessionUpdate } from './models/SessionUpdate'

export class PrismaSessionsRepository implements SessionsRepository {
  async save(data: Session): Promise<void> {
    await prisma.webSession.create({
      data: {
        id: data.id,
        userId: data.userId,
        ip: data.ip,
        userAgent: data.userAgent,
        active: data.active,
        createdDate: data.createdDate,
        expirationDate: data.expirationDate,
      },
    })
  }
  async update(data: SessionUpdate): Promise<void> {
    await prisma.webSession.update({
      where: {
        id: data.sessionId,
      },
      data: {
        createdDate: data.createdDate,
        expirationDate: data.expirationDate,
        active: data.active,
      },
    })
  }
  async getById(id: string): Promise<Session | null> {
    const session = await prisma.webSession.findUnique({
      where: {
        id,
      },
    })

    return session
  }

  async delete(id: string) {
    await prisma.webSession.delete({
      where: {
        id,
      },
    })
  }
}
