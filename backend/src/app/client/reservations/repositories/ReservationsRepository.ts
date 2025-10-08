import { Reservation } from '../models/Reservation'
import { Space } from '../models/Space'
import { SpaceCapacity } from '../models/SpaceCapacity'

export interface ReservationsRepository {
  create(reservation: Reservation): Promise<Reservation>
  getSpaces(): Promise<Space[]>
  getSpaceCapacity(spaceId: number): Promise<SpaceCapacity | undefined>
  getUserReservations(dni: string): Promise<Reservation[]>
}
