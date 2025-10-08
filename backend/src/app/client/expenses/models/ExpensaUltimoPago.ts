import { ExpensaItem } from './ExpensaItem'

export interface ExpensaUltimoPago {
  id: string
  period: string
  issueDate: Date
  dueDate: Date
  paymentDate?: Date | null
  paymentMethod?: string | null
  items: ExpensaItem[]
}
