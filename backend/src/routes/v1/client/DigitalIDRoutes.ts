import { DigitalIDServices } from '@app/client/digitalID/DigitalIDServices'
import { clientContainer } from '@diContainer/clientContainer'
import { zodParamsMiddleware } from '@shared/middlewares/zodParamsMiddleware'
import { DigitalIDSchema } from '@shared/schemas/routes/clients/DigitalIDSchema'
import { Router } from 'express'

export const DigitalIDRoutes = () => {
  const router = Router()
  const digitalIDRoutes =
    clientContainer.resolve<DigitalIDServices>('digitalid-services')

  router.get(
    '/:dni',
    zodParamsMiddleware(DigitalIDSchema.generate),
    async (req, res) => {
      const userDni = String(req.params.dni)
      // Devuelve un PDF
      const tickets = await digitalIDRoutes.generateCarnet(res, userDni)

      res.status(200).send(tickets)
    },
  )

  return router
}
