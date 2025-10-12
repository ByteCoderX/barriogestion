import { Ticket } from '../models/Ticket'
import { TicketCreate } from '../models/TicketCreate'

export interface ComplaintsRepository {
  create(data: TicketCreate): Promise<Ticket>
  getByDni(dni: string): Promise<Ticket[]>
}
