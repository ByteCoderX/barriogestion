export interface Reservation {
  spaceId: number
  dni: string
  reservationDate: Date
  startTime: Date
  endTime: Date
  peopleCount: number
  observations?: string | null
}
