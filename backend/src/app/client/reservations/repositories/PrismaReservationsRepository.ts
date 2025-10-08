import { Reservation } from '../models/Reservation'
import { Space } from '../models/Space'
import { SpaceCapacity } from '../models/SpaceCapacity'
import { ReservationsRepository } from './ReservationsRepository'
import { prisma } from '@database/prisma'

export class PrismaReservationsRepository implements ReservationsRepository {
  async getSpaceCapacity(spaceId: number): Promise<SpaceCapacity | undefined> {
    const space = await prisma.publicSpace.findUnique({
      where: {
        id: spaceId,
      },
      select: {
        capacity: true,
        reservations: {
          select: {
            peopleCount: true,
          },
        },
      },
    })

    if (!space) return undefined

    let capacityReserved = 0
    space.reservations.forEach((people) => {
      capacityReserved += people.peopleCount
    })

    const result = {
      capacity: space.capacity,
      reserved: capacityReserved,
    }

    return result
  }
  async create(reservation: Reservation): Promise<Reservation> {
    const result = await prisma.reservation.create({
      data: {
        spaceId: reservation.spaceId,
        dni: reservation.dni,
        reservationDate: reservation.reservationDate,
        startTime: reservation.startTime,
        endTime: reservation.endTime,
        peopleCount: reservation.peopleCount,
        observations: reservation.observations || 'Sin Observaciones',
      },
    })

    return result
  }
  async getSpaces(): Promise<Space[]> {
    const dbSpaces = await prisma.publicSpace.findMany()

    const spaces = dbSpaces.map((space) => ({
      id: space.id,
      name: space.name,
      characteristics: space.characteristics,
      address: space.address,
      price: Number(space.price),
      openingTime: space.openingTime,
      closingTime: space.closingTime,
      usageCondition: space.usageCondition,
      capacity: space.capacity,
      availability: space.availability,
    }))

    return spaces
  }

  async getUserReservations(dni: string): Promise<Reservation[]> {
    const userReservations = await prisma.reservation.findMany({
      where: {
        dni,
      },
    })

    const spaces = userReservations.map((reservation) => ({
      spaceId: reservation.id,
      dni: reservation.dni,
      reservationDate: reservation.reservationDate,
      startTime: reservation.reservationDate,
      endTime: reservation.endTime,
      peopleCount: reservation.peopleCount,
      observations: reservation.observations,
    }))

    return spaces
  }
}
