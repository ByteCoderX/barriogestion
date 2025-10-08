import { ReservationsServices } from '@app/client/reservations/ReservationsServices'
import { clientContainer } from '@diContainer/clientContainer'
import { zodBodyMiddleware } from '@shared/middlewares/zodBodyMiddleware'
import { zodParamsMiddleware } from '@shared/middlewares/zodParamsMiddleware'
import { ReservationsSchemas } from '@shared/schemas/routes/clients/ReservationsSchema'
import { Router } from 'express'

export const reservationsRoutes = () => {
  const router = Router()
  const reservationsServices = clientContainer.resolve<ReservationsServices>(
    'reservations-services',
  )

  router.get('/spaces', async (req, res) => {
    const spaces = await reservationsServices.getSpaces()

    res.status(200).send(spaces)
  })

  router.get(
    '/me/:dni',
    zodParamsMiddleware(ReservationsSchemas.mySpaces),
    async (req, res) => {
      const userDni = String(req.params.dni)

      const spaces = await reservationsServices.getUserReservations(userDni)

      res.status(200).send(spaces)
    },
  )

  router.get(
    '/space/capacity/:spaceId',
    zodParamsMiddleware(ReservationsSchemas.spaceCapacity),
    async (req, res) => {
      const spaceId = Number(req.params.spaceId)

      const capacity = await reservationsServices.getSpaceCapacity(spaceId)

      res.status(200).send(capacity)
    },
  )

  router.post(
    '/',
    zodBodyMiddleware(ReservationsSchemas.create),
    async (req, res) => {
      const spaces = await reservationsServices.reserve(req.body)

      res.status(200).send(spaces)
    },
  )

  return router
}
