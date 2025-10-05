import { AppException, httpStatusCodes } from '@shared/exceptions/AppException'
import { ExpensesRepository } from './repositories/ExpensesRepository'

export class ExpensesServices {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  public async getDetailedById(idCargo: string) {
    if (!idCargo)
      throw new AppException(
        'No se ingresó una id',
        httpStatusCodes.unproccesableEntity,
      )

    const expense = await this.expensesRepository.getDetailedById(idCargo)
    return expense
  }
  public async getCurrentPending(userId: number) {
    if (!userId)
      throw new AppException(
        'No se ingresó una id',
        httpStatusCodes.unproccesableEntity,
      )

    const expense = await this.expensesRepository.getCurrentPending(userId)
    return expense
  }
  public async getLastPaid(userId: number) {
    if (!userId)
      throw new AppException(
        'No se ingresó una id',
        httpStatusCodes.unproccesableEntity,
      )

    const expense = await this.expensesRepository.getLastPaid(userId)
    return expense
  }

  public async getHistory(userId: number) {
    if (!userId)
      throw new AppException(
        'No se ingresó una id',
        httpStatusCodes.unproccesableEntity,
      )

    const expense = await this.expensesRepository.getHistory(userId)
    return expense
  }
}
