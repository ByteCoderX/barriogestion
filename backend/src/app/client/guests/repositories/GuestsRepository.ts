import { Guest } from '../models/Guest'
import { GuestCreate } from '../models/GuestCreate'
import { GuestUpdate } from '../models/GuestUpdate'

export interface GuestsRepository {
  create(guest: GuestCreate): Promise<void>
  getById(userId: number): Promise<Guest[]>
  update(guest: GuestUpdate): Promise<void>
  remove(userId: number, guestId: number): Promise<void>
}
