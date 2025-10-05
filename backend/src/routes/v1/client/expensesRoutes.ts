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

    if (!result)
      throw new ResourceNotFoundException(
        'No se encontró una expensa con la id:' + expenseId,
      )

    res.status(200).send(result)
  })

  router.get('/:userId', async (req, res) => {
    const userId = Number(req.params.userId)

    const pendingExpense = await expensesServices.getCurrentPending(userId)
    const lastExpense = await expensesServices.getLastPaid(userId)

    if (!pendingExpense && !lastExpense)
      throw new ResourceNotFoundException(
        'No se encontraron expensas para el usuario:' + userId,
      )

    // Todas las mañanas que vivi...
    res.status(200).send({
      current: {
        monto: pendingExpense?.total, // ?, Ni idea
        vencimiento: pendingExpense?.periodo, // ?, Ni idea
      },
      previous: {
        monto: lastExpense?.importe, // ?, Ni idea
        paidDate: lastExpense?.fecha, // ?, Ni idea
      },
    })
  })

  router.get('/history/:userId', async (req, res) => {
    const userId = Number(req.params.userId)

    const expenseHistory = await expensesServices.getHistory(userId)

    if (!expenseHistory)
      throw new ResourceNotFoundException(
        'No se encontraron expensas para el usuario:' + userId,
      )

    res.status(200).send(expenseHistory)
  })

  return router
}
