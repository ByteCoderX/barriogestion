export interface Guest {
  id: number
  firstName: string
  lastName: string
  dni: string
  contact?: string
  visitDate: Date
  exitDate: Date //Esto se calcula aparte con el tipo de visita
  visitType?: string
  reason?: string
  userId: number
  observations: string
  status?: string
}
