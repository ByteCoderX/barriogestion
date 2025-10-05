import { ExpensaDetalle } from '../models/ExpensaDetalle'
import { ExpensaHistorialItem } from '../models/ExpensaHistorialItem'
import { ExpensaPendiente } from '../models/ExpensaPendiente'
import { ExpensaUltimoPago } from '../models/ExpensaUltimoPago'

export interface ExpensesRepository {
  getDetailedById(idCargo: string): Promise<ExpensaDetalle | undefined>
  getCurrentPending(userId: number): Promise<ExpensaPendiente | undefined>
  getLastPaid(userId: number): Promise<ExpensaUltimoPago | undefined>

  getHistory(userId: number): Promise<ExpensaHistorialItem[]>
  // Capaz le agregue paginación si es necesario
  // pero estoy 100% seguro de que va a quedar así
  // 21/09/2025

  // 2 semanas después me di cuenta que tenia razón
  // 04/10/2025
}
