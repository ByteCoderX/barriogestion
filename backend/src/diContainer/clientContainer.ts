// General Container
import { DiContainer } from './DiContainer'

// Prisma Repositories
import { PrismaExpensesRepository } from '@app/client/expenses/repositories/PrismaExpensesRepository'
import { PrismaReservationsRepository } from '@app/client/reservations/repositories/PrismaReservationsRepository'
import { PrismaComplaintsRepository } from '@app/client/complaints/repositories/PrismaComplaintsRepository'

// Services
import { ExpensesServices } from '@app/client/expenses/ExpensesServices'
import { ReservationsServices } from '@app/client/reservations/ReservationsServices'
import { ComplaintsServices } from '@app/client/complaints/ComplaintsServices'

const clientContainer = new DiContainer()

// Expenses Modules
const expensesRepository = new PrismaExpensesRepository()

// Reservations Modules
const reservationsRepository = new PrismaReservationsRepository()

// Complaints Modules
const complaintsRepository = new PrismaComplaintsRepository()

clientContainer.registerInstance('expenses-repository', expensesRepository)
clientContainer.register('expenses-services', ExpensesServices, [
  'expenses-repository',
])

clientContainer.registerInstance(
  'reservations-repository',
  reservationsRepository,
)
clientContainer.register('reservations-services', ReservationsServices, [
  'reservations-repository',
])

clientContainer.registerInstance('complaints-repository', complaintsRepository)
clientContainer.register('complaints-services', ComplaintsServices, [
  'complaints-repository',
])

export { clientContainer }
