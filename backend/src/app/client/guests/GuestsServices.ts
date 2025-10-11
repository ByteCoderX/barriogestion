import { AppException, httpStatusCodes } from '@shared/exceptions/AppException'
import { GuestsRepository } from './repositories/GuestsRepository'
import { GuestCreate } from './models/GuestCreate'
import { GuestUpdate } from './models/GuestUpdate'

export class GuestsServices {
  constructor(private readonly guestsRepository: GuestsRepository) {}

  public async getGuests(userId: number) {
    if (!userId)
      throw new AppException(
        'No se ingresó una ID.',
        httpStatusCodes.unproccesableEntity,
      )

    const guests = await this.guestsRepository.getById(userId)
    return guests
  }

  public async createGuest(guestData: GuestCreate) {
    if (!guestData)
      throw new AppException(
        'Faltan datos para crear un invitado.',
        httpStatusCodes.unproccesableEntity,
      )

    const guest = await this.guestsRepository.getByDni(guestData.dni)
    if (guest)
      throw new AppException(
        'Este invitado ya existe.',
        httpStatusCodes.conflict,
      )

    const result = await this.guestsRepository.create(guestData)
    return result
  }

  public async updateGuest(guestData: GuestUpdate) {
    if (!guestData)
      throw new AppException(
        'Faltan datos para crear un invitado.',
        httpStatusCodes.unproccesableEntity,
      )

    const guest = await this.guestsRepository.getByDni(guestData.dni)
    if (!guest)
      throw new AppException(
        'Este invitado no existe.',
        httpStatusCodes.unproccesableEntity,
      )

    const result = await this.guestsRepository.update(guestData)
    return result
  }

  public async deleteAccess(userId: number, guestId: number) {
    if (!userId || !guestId)
      throw new AppException(
        'No se ingresó una ID / guestId.',
        httpStatusCodes.unproccesableEntity,
      )

    const result = await this.guestsRepository.remove(userId, guestId)

    if (!result)
      throw new AppException(
        'No se eliminó al invitado con la ID: ' + guestId,
        httpStatusCodes.unproccesableEntity,
      )

    return result
  }
}
