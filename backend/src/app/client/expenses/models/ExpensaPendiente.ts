import { ExpensaItem } from './ExpensaItem'

export interface ExpensaPendiente {
  id: string
  period: string
  issueDate: Date
  dueDate: Date
  status: string
  items: ExpensaItem[]
}
