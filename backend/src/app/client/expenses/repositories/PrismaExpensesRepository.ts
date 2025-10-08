import { ExpensaDetalle } from '../models/ExpensaDetalle'
import { ExpensaHistorial } from '../models/ExpensaHistorial'
import { ExpensaPendiente } from '../models/ExpensaPendiente'
import { ExpensaUltimoPago } from '../models/ExpensaUltimoPago'
import { ExpensesRepository } from './ExpensesRepository'
import { prisma } from '@database/prisma'

export class PrismaExpensesRepository implements ExpensesRepository {
  async getDetailedById(idCargo: string): Promise<ExpensaDetalle | undefined> {
    const expensa = await prisma.expense.findUnique({
      where: {
        id: Number(idCargo),
      },
      select: {
        id: true,
        period: true,
        issueDate: true,
        dueDate: true,
        status: true,
        paymentDate: true,
        paymentMethod: true,
        dni: true,
        items: true,
      },
    })

    if (!expensa) return undefined

    return {
      id: String(expensa.id),
      period: expensa.period,
      issueDate: expensa.issueDate,
      dueDate: expensa.dueDate,
      status: expensa.status,
      paymentDate: expensa.paymentDate,
      paymentMethod: expensa.paymentMethod,
      dni: expensa.dni,
      items: expensa.items.map((item) => ({
        id: String(item.id),
        title: item.title,
        description: item.description,
        amount: item.amount,
      })),
    }
  }

  async getCurrentPending(dni: string): Promise<ExpensaPendiente | undefined> {
    const expensa = await prisma.expense.findFirst({
      where: {
        status: 'pending',
        dni,
      },
      select: {
        id: true,
        period: true,
        issueDate: true,
        dueDate: true,
        status: true,
        items: true,
      },
    })

    if (!expensa) return undefined

    const result = {
      id: String(expensa.id),
      period: expensa.period,
      issueDate: expensa.issueDate,
      dueDate: expensa.dueDate,
      status: expensa.status,
      items: expensa.items.map((item) => ({
        id: String(item.id),
        title: item.title,
        description: item.description,
        amount: item.amount,
      })),
    }

    return result
  }

  async getLastPaid(dni: string): Promise<ExpensaUltimoPago | undefined> {
    const expensa = await prisma.expense.findFirst({
      where: {
        status: 'paid',
        dni,
      },
      orderBy: {
        paymentDate: 'desc',
      },
      select: {
        id: true,
        period: true,
        issueDate: true,
        dueDate: true,
        paymentDate: true,
        paymentMethod: true,
        items: true,
      },
    })

    if (!expensa) return undefined

    const result = {
      id: String(expensa.id),
      period: expensa.period,
      issueDate: expensa.issueDate,
      dueDate: expensa.dueDate,
      paymentDate: expensa.paymentDate,
      paymentMethod: expensa.paymentMethod,
      items: expensa.items.map((item) => ({
        id: String(item.id),
        title: item.title,
        description: item.description,
        amount: item.amount,
      })),
    }

    return result
  }

  async getHistory(dni: string): Promise<ExpensaHistorial[]> {
    const expensas = await prisma.expense.findMany({
      where: {
        dni,
      },
      select: {
        id: true,
        period: true,
        issueDate: true,
        dueDate: true,
        status: true,
        paymentDate: true,
        paymentMethod: true,
        items: true,
      },
    })

    const result = expensas.map((expensa) => ({
      id: String(expensa.id),
      period: expensa.period,
      issueDate: expensa.issueDate,
      dueDate: expensa.dueDate,
      status: expensa.status,
      paymentDate: expensa.paymentDate,
      paymentMethod: expensa.paymentMethod,
      items: expensa.items.length,
    }))

    return result
  }
}
