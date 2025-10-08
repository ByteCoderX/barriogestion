import { AppException, httpStatusCodes } from '@shared/exceptions/AppException'
import { ExpensesRepository } from './repositories/ExpensesRepository'
import { ResourceNotFoundException } from '@shared/exceptions/ResourceNotFoundException'

export class ExpensesServices {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  public async getDetailedById(idCargo: string) {
    if (!idCargo)
      throw new AppException(
        'No se ingresó una id',
        httpStatusCodes.unproccesableEntity,
      )

    const expense = await this.expensesRepository.getDetailedById(idCargo)

    if (!expense)
      throw new ResourceNotFoundException(
        'No se encontró una expensa con la id:' + idCargo,
      )

    return expense
  }
  public async getCurrentPending(dni: string) {
    if (!dni)
      throw new AppException(
        'No se ingresó una id',
        httpStatusCodes.unproccesableEntity,
      )

    const expense = await this.expensesRepository.getCurrentPending(dni)
    return expense
  }
  public async getLastPaid(dni: string) {
    if (!dni)
      throw new AppException(
        'No se ingresó una id',
        httpStatusCodes.unproccesableEntity,
      )

    const expense = await this.expensesRepository.getLastPaid(dni)
    return expense
  }

  public async getHistory(dni: string) {
    if (!dni)
      throw new AppException(
        'No se ingresó una id',
        httpStatusCodes.unproccesableEntity,
      )

    const expense = await this.expensesRepository.getHistory(dni)
    return expense
  }
}
