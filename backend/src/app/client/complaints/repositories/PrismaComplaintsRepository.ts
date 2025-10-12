import { prisma } from '@database/prisma'
import { Ticket } from '../models/Ticket'
import { TicketCreate } from '../models/TicketCreate'
import { ComplaintsRepository } from './ComplaintsRepository'

export class PrismaComplaintsRepository implements ComplaintsRepository {
  async create(data: TicketCreate): Promise<Ticket> {
    const ticket = await prisma.complaints.create({
      data: {
        title: data.title,
        category: data.category,
        priority: data.priority,
        location: data.location,
        description: data.description,
        dni: data.dni,
      },
    })

    return ticket
  }
  async getByDni(dni: string): Promise<Ticket[]> {
    const tickets = await prisma.complaints.findMany({
      where: {
        dni,
      },
    })

    return tickets
  }
}
