// General Container
import { DiContainer } from './DiContainer'

// Prisma Repositories
import { PrismaExpensesRepository } from '@app/client/expenses/repositories/PrismaExpensesRepository'

// Services
import { ExpensesServices } from '@app/client/expenses/ExpensesServices'

const clientContainer = new DiContainer()

// Expenses Modules
const expensesRepository = new PrismaExpensesRepository()

clientContainer.registerInstance('expenses-repository', expensesRepository)
clientContainer.register('expenses-services', ExpensesServices, [
  'expenses-repository',
])

export { clientContainer }
