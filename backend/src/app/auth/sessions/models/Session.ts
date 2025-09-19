export interface Session {
  id: string
  userId: string
  ip: string
  userAgent: string
  active: boolean
  createdDate: Date
  expirationDate: Date
}
