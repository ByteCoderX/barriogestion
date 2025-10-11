export interface GuestDbSerialize {
  firstName: string
  lastName: string
  dni: string
  contact: string | null
  visitDate: Date
  exitDate: Date
  visitType: string | null
  reason: string | null
  observations: string
  userId: number
  status: string | null
  id: number
}
