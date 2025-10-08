import { ExpensaDetalle } from '../models/ExpensaDetalle'
import { ExpensaHistorial } from '../models/ExpensaHistorial'
import { ExpensaPendiente } from '../models/ExpensaPendiente'
import { ExpensaUltimoPago } from '../models/ExpensaUltimoPago'

export interface ExpensesRepository {
  getDetailedById(idCargo: string): Promise<ExpensaDetalle | undefined>
  getCurrentPending(dni: string): Promise<ExpensaPendiente | undefined>
  getLastPaid(dni: string): Promise<ExpensaUltimoPago | undefined>

  getHistory(dni: string): Promise<ExpensaHistorial[]>
  // Capaz le agregue paginación si es necesario
  // pero estoy 100% seguro de que va a quedar así
  // 21/09/2025

  // 2 semanas después me di cuenta que tenia razón
  // 04/10/2025
}
