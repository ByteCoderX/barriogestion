import { ExpensaDetalle } from '../models/ExpensaDetalle'
import { ExpensaHistorialItem } from '../models/ExpensaHistorialItem'
import { ExpensaPendiente } from '../models/ExpensaPendiente'
import { ExpensaUltimoPago } from '../models/ExpensaUltimoPago'
import { ExpensesRepository } from './ExpensesRepository'
import { prisma } from '@database/prisma'

export class PrismaExpensesRepository implements ExpensesRepository {
  async getDetailedById(idCargo: string): Promise<ExpensaDetalle | undefined> {
    const expensa = await prisma.expensa_cargos.findUnique({
      where: { id_cargo: Number(idCargo) },
      include: {
        periodo: true,
        item: true,
        parcela: {
          include: {
            usuarios: {
              include: { usuario: true },
            },
            pagos: true,
          },
        },
      },
    })

    if (!expensa) return undefined

    return {
      id: Number(expensa.id_cargo),
      periodo: expensa.periodo.periodo,
      parcela: expensa.parcela.codigo_lote || 'Desconocida',
      item: expensa.item?.nombre ?? null,
      importe: Number(expensa.importe),
      detalle: expensa.detalle,
      usuarios: expensa.parcela.usuarios.map((up) => ({
        nombre: `${up.usuario.firstName} ${up.usuario.lastName}`,
        rol: up.rol_propiedad,
      })),
      pagos: expensa.parcela.pagos.map((p) => ({
        fecha: p.fecha,
        importe: Number(p.importe),
        medio: p.medio,
      })),
    }
  }

  async getCurrentPending(
    userId: number,
  ): Promise<ExpensaPendiente | undefined> {
    const lastPeriodo = await prisma.expensa_periodo.findFirst({
      orderBy: { fecha_inicio: 'desc' },
    })
    if (!lastPeriodo) return undefined

    const cargos = await prisma.expensa_cargos.findMany({
      where: {
        id_periodo: lastPeriodo.id_periodo,
        parcela: {
          usuarios: {
            some: { id_usuario: userId },
          },
        },
      },
      include: {
        parcela: true,
        item: true,
      },
    })

    const pagos = await prisma.expensa_pagos.findMany({
      where: {
        id_periodo: lastPeriodo.id_periodo,
        parcela: {
          usuarios: {
            some: { id_usuario: userId },
          },
        },
      },
    })

    const totalCargos = cargos.reduce((acc, c) => acc + Number(c.importe), 0)
    const totalPagos = pagos.reduce((acc, p) => acc + Number(p.importe), 0)
    const saldo = totalCargos - totalPagos

    return saldo > 0
      ? {
          periodo: lastPeriodo.periodo,
          total: totalCargos,
          pagado: totalPagos,
          saldo,
          cargos: cargos.map((c) => ({
            item: c.item?.nombre || 'Desconocido',
            importe: Number(c.importe),
            detalle: c.detalle,
          })),
        }
      : undefined
  }

  async getLastPaid(userId: number): Promise<ExpensaUltimoPago | undefined> {
    const pago = await prisma.expensa_pagos.findFirst({
      where: {
        parcela: {
          usuarios: {
            some: { id_usuario: userId },
          },
        },
      },
      include: {
        periodo: true,
        parcela: true,
      },
      orderBy: { fecha: 'desc' },
    })

    if (!pago) return undefined

    return {
      periodo: pago.periodo.periodo,
      parcela: pago.parcela.codigo_lote || 'Desconocida',
      fecha: pago.fecha,
      medio: pago.medio,
      importe: Number(pago.importe),
      referencia: pago.referencia,
    }
  }

  async getHistory(userId: number): Promise<ExpensaHistorialItem[]> {
    const cargos = await prisma.expensa_cargos.findMany({
      where: {
        parcela: {
          usuarios: {
            some: { id_usuario: userId },
          },
        },
      },
      include: {
        periodo: true,
        parcela: true,
      },
      orderBy: { id_periodo: 'desc' },
    })

    const pagos = await prisma.expensa_pagos.findMany({
      where: {
        parcela: {
          usuarios: {
            some: { id_usuario: userId },
          },
        },
      },
    })

    const historial = cargos.map((c) => {
      const pagosPeriodo = pagos.filter(
        (p) => p.id_periodo === c.id_periodo && p.id_parcela === c.id_parcela,
      )
      const pagado = pagosPeriodo.reduce((s, p) => s + Number(p.importe), 0)
      const saldo = Number(c.importe) - pagado

      return {
        periodo: c.periodo.periodo,
        parcela: c.parcela.codigo_lote || 'Desconocida',
        importe: Number(c.importe),
        pagado,
        saldo,
      }
    })

    return historial
  }
}
