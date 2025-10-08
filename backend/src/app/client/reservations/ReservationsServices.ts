import { AppException, httpStatusCodes } from '@shared/exceptions/AppException'
import { Reservation } from './models/Reservation'
import { ReservationsRepository } from './repositories/ReservationsRepository'
import { ResourceNotFoundException } from '@shared/exceptions/ResourceNotFoundException'

export class ReservationsServices {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  public async getSpaces() {
    const spaces = await this.reservationsRepository.getSpaces()
    return spaces
  }

  public async getSpaceCapacity(spaceId: number) {
    if (!spaceId)
      throw new AppException(
        'No se ingresó una ID.',
        httpStatusCodes.unproccesableEntity,
      )

    const spaceCapacity =
      await this.reservationsRepository.getSpaceCapacity(spaceId)

    if (!spaceCapacity)
      throw new ResourceNotFoundException(
        'No se encontró un espacio público con esa id.',
      )

    return spaceCapacity
  }

  public async getUserReservations(userDni: string) {
    if (!userDni)
      throw new AppException(
        'No se ingresó un DNI.',
        httpStatusCodes.unproccesableEntity,
      )

    const userReservations =
      await this.reservationsRepository.getUserReservations(userDni)

    return userReservations
  }
  public async reserve(spaceData: Reservation) {
    const spaceCapacity = await this.reservationsRepository.getSpaceCapacity(
      spaceData.spaceId,
    )

    if (!spaceCapacity)
      throw new ResourceNotFoundException(
        'No se encontró un espacio público con esa id.',
      )

    const peopleAndReservations = spaceData.peopleCount + spaceCapacity.reserved
    if (
      spaceData.peopleCount > spaceCapacity.capacity ||
      peopleAndReservations > spaceCapacity.capacity
    )
      throw new AppException(
        `Se está superando la capacidad disponible del espacio: ${peopleAndReservations}/${spaceCapacity.capacity}`,
        httpStatusCodes.conflict,
      )

    const reserve = await this.reservationsRepository.create(spaceData)
    return reserve
  }
}
