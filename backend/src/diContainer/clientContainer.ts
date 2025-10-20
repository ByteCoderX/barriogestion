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
import { DigitalIDServices } from '@app/client/digitalID/DigitalIDServices'
import { PrismaUserMetaRepository } from '@app/client/digitalID/repositories/userMeta/PrismaUserMetaRepository'
import { PrismaUserCredentialsRepository } from '@app/client/digitalID/repositories/userCredentials/PrismaUserCredentialsRepository'

const clientContainer = new DiContainer()

// Expenses Modules
const expensesRepository = new PrismaExpensesRepository()

// Reservations Modules
const reservationsRepository = new PrismaReservationsRepository()

// Complaints Modules
const complaintsRepository = new PrismaComplaintsRepository()

// DigitalID Modules
const authUserMeta = new PrismaUserMetaRepository()
const authUserCredentials = new PrismaUserCredentialsRepository()

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

clientContainer.registerInstance(
  'digitalid-user-credentials',
  authUserCredentials,
)
clientContainer.registerInstance('digitalid-user-meta', authUserMeta)
clientContainer.register('digitalid-services', DigitalIDServices, [
  'digitalid-user-credentials',
  'digitalid-user-meta',
])

export { clientContainer }
