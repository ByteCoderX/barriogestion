import { Guest } from '../models/Guest'
import { GuestCreate } from '../models/GuestCreate'
import { GuestDbSerialize } from '../models/GuestDbSerialize'
import { GuestUpdate } from '../models/GuestUpdate'
import { GuestsRepository } from './GuestsRepository'
import { prisma } from '@database/prisma'

export class PrismaAccessRepository implements GuestsRepository {
  async create(guest: GuestCreate): Promise<Guest> {
    const dbGuest = await prisma.guest.create({
      data: {
        firstName: guest.firstName,
        lastName: guest.lastName,
        dni: guest.dni,
        contact: guest.contact || undefined,
        visitDate: guest.visitDate,
        exitDate: guest.exitDate,
        visitType: guest.visitType || undefined,
        reason: guest.reason || undefined,
        observations: guest.observations,
        userId: guest.userId,
      },
    })

    return this.serializeOutput(dbGuest)
  }

  async getById(userId: number): Promise<Guest[]> {
    const guests = await prisma.guest.findMany({
      where: {
        userId,
      },
    })

    return this.serializeArrayOutput(guests)
  }

  async getByDni(dni: string): Promise<Guest | undefined> {
    const guest = await prisma.guest.findUnique({
      where: {
        dni,
      },
    })

    if (!guest) return undefined

    return this.serializeOutput(guest)
  }

  async update(guest: GuestUpdate): Promise<Guest> {
    const dbGuest = await prisma.guest.update({
      where: {
        dni: guest.dni,
      },
      data: {
        firstName: guest.firstName,
        lastName: guest.lastName,
        dni: guest.dni,
        contact: guest.contact || undefined,
        visitDate: guest.visitDate,
        exitDate: guest.exitDate,
        visitType: guest.visitType || undefined,
        reason: guest.reason || undefined,
        observations: guest.observations,
      },
    })

    return this.serializeOutput(dbGuest)
  }

  async remove(userId: number, guestId: number): Promise<Guest | undefined> {
    try {
      const result = await prisma.guest.delete({
        where: {
          id: guestId,
          userId,
        },
      })

      return this.serializeOutput(result)
    } catch {
      return undefined
    }
  }

  private serializeOutput(guest: GuestDbSerialize) {
    return {
      id: guest.id,
      firstName: guest.firstName,
      lastName: guest.lastName,
      dni: guest.dni,
      contact: guest.contact || 'Sin Contacto',
      visitDate: guest.visitDate,
      exitDate: guest.exitDate,
      visitType: guest.visitType || 'Desconocido',
      reason: guest.reason || 'Desconocida',
      userId: guest.userId,
      observations: guest.observations || 'Sin Observaciones',
      status: guest.status || 'pendiente',
    }
  }

  private serializeArrayOutput(guests: GuestDbSerialize[]) {
    return guests.map((guest) => this.serializeOutput(guest))
  }
}
