import { AppException, httpStatusCodes } from '@shared/exceptions/AppException'
import { TicketCreate } from './models/TicketCreate'
import { ComplaintsRepository } from './repositories/ComplaintsRepository'

export class ComplaintsServices {
  constructor(private readonly complaintsRepository: ComplaintsRepository) {}

  public async getTickets(dni: string) {
    if (!dni)
      throw new AppException(
        'No se ingresó un DNI.',
        httpStatusCodes.unproccesableEntity,
      )

    const result = await this.complaintsRepository.getByDni(dni)
    return result
  }

  public async createTicket(ticket: TicketCreate) {
    if (!ticket)
      throw new AppException(
        'Datos inválidos para crear un ticket.',
        httpStatusCodes.unproccesableEntity,
      )

    const result = await this.complaintsRepository.create(ticket)

    if (!result)
      throw new AppException(
        'No fue posible crear el ticket.',
        httpStatusCodes.conflict,
      )

    return result
  }
}
