export interface ExpensaHistorial {
  id: string
  period: string
  issueDate: Date
  dueDate: Date
  status: string
  paymentDate: Date | null
  paymentMethod: string | null
  items: number
}
