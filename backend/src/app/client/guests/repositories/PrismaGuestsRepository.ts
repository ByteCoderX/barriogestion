import { Guest } from '../models/Guest'
import { GuestCreate } from '../models/GuestCreate'
import { GuestUpdate } from '../models/GuestUpdate'
import { GuestsRepository } from './GuestsRepository'
import { prisma } from '@database/prisma'

export class PrismaAccessRepository implements GuestsRepository {
  async create(guest: GuestCreate): Promise<void> {
    console.log(guest)
    throw new Error('Method not implemented.')
  }

  async getById(userId: number): Promise<Guest[]> {
    const guests = await prisma.guest.findMany({
      where: {
        userId,
      },
    })

    const result = guests.map((guest) => ({
      id: guest.id,
      firstName: guest.firstName,
      lastName: guest.lastName,
      dni: guest.dni,
      contact: guest.contact || undefined,
      visitDate: guest.visitDate,
      exitDate: guest.exitDate,
      visitType: guest.visitType || undefined,
      reason: guest.reason || undefined,
      userId: guest.userId,
      observations: guest.observations || 'Sin Observaciones',
      status: guest.status || 'pendiente',
    }))

    return result
  }

  async update(guest: GuestUpdate): Promise<void> {
    console.log(guest)
    throw new Error('Method not implemented.')
  }

  async remove(userId: number, guestId: number): Promise<void> {
    console.log(userId, guestId)
    throw new Error('Method not implemented.')
  }
}
