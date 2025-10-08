import { ExpensesServices } from '@app/client/expenses/ExpensesServices'
import { clientContainer } from '@diContainer/clientContainer'
import { ResourceNotFoundException } from '@shared/exceptions/ResourceNotFoundException'
import { Router } from 'express'

export const expensesRoutes = () => {
  const router = Router()
  const expensesServices =
    clientContainer.resolve<ExpensesServices>('expenses-services')

  router.get('/detailed/:id', async (req, res) => {
    const expenseId = String(req.params.id)
    // Obtenes los detalles de una Expensa
    const result = await expensesServices.getDetailedById(expenseId)

    res.status(200).send(result)
  })

  router.get('/:dni', async (req, res) => {
    const userDni = String(req.params.dni)

    const pendingExpense = await expensesServices.getCurrentPending(userDni)
    const lastExpense = await expensesServices.getLastPaid(userDni)

    if (!pendingExpense && !lastExpense)
      throw new ResourceNotFoundException(
        'No se encontraron expensas para el usuario:' + userDni,
      )

    let currentImport = 0
    let previousImport = 0

    pendingExpense?.items.forEach((item) => {
      currentImport += item.amount
    })

    lastExpense?.items.forEach((item) => {
      previousImport += item.amount
    })

    // Todas las mañanas que vivi...
    res.status(200).send({
      current: {
        monto: currentImport,
        vencimiento: pendingExpense?.dueDate,
      },
      previous: {
        monto: previousImport,
        paidDate: lastExpense?.paymentDate,
      },
    })
  })

  router.get('/history/:dni', async (req, res) => {
    const userDni = String(req.params.dni)

    const expenseHistory = await expensesServices.getHistory(userDni)

    if (!expenseHistory)
      throw new ResourceNotFoundException(
        'No se encontraron expensas para el usuario:' + userDni,
      )

    res.status(200).send(expenseHistory)
  })

  return router
}
