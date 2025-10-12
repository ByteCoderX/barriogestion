import { ComplaintsServices } from '@app/client/complaints/ComplaintsServices'
import { clientContainer } from '@diContainer/clientContainer'
import { zodBodyMiddleware } from '@shared/middlewares/zodBodyMiddleware'
import { zodQueryMiddleware } from '@shared/middlewares/zodQueryMiddleware'
import { ComplaintsSchema } from '@shared/schemas/routes/clients/ComplaintsSchema'
import { Router } from 'express'

export const ComplaintsRoutes = () => {
  const router = Router()
  const complaintsServices = clientContainer.resolve<ComplaintsServices>(
    'complaints-services',
  )

  router.get(
    '/:dni',
    zodQueryMiddleware(ComplaintsSchema.get),
    async (req, res) => {
      const userDni = String(req.query.dni)
      // Obtiene los tickets de un usuario
      const tickets = await complaintsServices.getTickets(userDni)

      res.status(200).send(tickets)
    },
  )

  router.post(
    '/',
    zodBodyMiddleware(ComplaintsSchema.create),
    async (req, res) => {
      // Crea un nuevo ticket
      const ticket = await complaintsServices.createTicket(req.body)

      res.status(200).send(ticket)
    },
  )

  return router
}
