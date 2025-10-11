import { Guest } from '../models/Guest'
import { GuestCreate } from '../models/GuestCreate'
import { GuestUpdate } from '../models/GuestUpdate'

export interface GuestsRepository {
  create(guest: GuestCreate): Promise<Guest>
  getById(userId: number): Promise<Guest[]>
  getByDni(dni: string): Promise<Guest | undefined>
  update(guest: GuestUpdate): Promise<Guest>
  remove(userId: number, guestId: number): Promise<Guest | undefined>
}
