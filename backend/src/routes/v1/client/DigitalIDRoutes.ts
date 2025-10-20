import { DigitalIDServices } from '@app/client/digitalID/DigitalIDServices'
import { clientContainer } from '@diContainer/clientContainer'
import { zodQueryMiddleware } from '@shared/middlewares/zodQueryMiddleware'
import { ComplaintsSchema } from '@shared/schemas/routes/clients/ComplaintsSchema'
import { Router } from 'express'

export const DigitalIDRoutes = () => {
  const router = Router()
  const digitalIDRoutes =
    clientContainer.resolve<DigitalIDServices>('digitalid-services')

  router.get(
    '/:dni',
    zodQueryMiddleware(ComplaintsSchema.get),
    async (req, res) => {
      const userDni = String(req.query.dni)
      // Obtiene los tickets de un usuario
      const tickets = await digitalIDRoutes.generateCarnet(res, userDni)

      res.status(200).send(tickets)
    },
  )

  return router
}
