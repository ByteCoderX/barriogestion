import { GuestsServices } from '@app/client/guests/GuestsServices'
import { clientContainer } from '@diContainer/clientContainer'
import { zodBodyMiddleware } from '@shared/middlewares/zodBodyMiddleware'
import { zodQueryMiddleware } from '@shared/middlewares/zodQueryMiddleware'
import { GuestsSchema } from '@shared/schemas/routes/clients/GuestsSchema'
import { Router } from 'express'

export const guestsRoutes = () => {
  const router = Router()
  const guestsServices = clientContainer.resolve<GuestsServices>(
    'reservations-services',
  )

  router.get(
    '/:userId',
    zodQueryMiddleware(GuestsSchema.get),
    async (req, res) => {
      // Recibe únicamente el dni
      const userId = Number(req.query.userId)
      const guests = await guestsServices.getGuests(userId)

      res.status(200).send(guests)
    },
  )

  // Recibe toda la data
  router.post('/', zodBodyMiddleware(GuestsSchema.create), async (req, res) => {
    const guest = await guestsServices.createGuest(req.body)

    res.status(200).send(guest)
  })

  // Recibe todos los parámetros
  // y al guardarlo establece su estado en pendiente
  router.patch(
    '/',
    zodBodyMiddleware(GuestsSchema.update),
    async (req, res) => {
      const guest = await guestsServices.updateGuest(req.body)

      res.status(200).send(guest)
    },
  )

  // Elimina el registro de la db, se requiere el dni del usuario para eliminar
  router.delete(
    '/',
    zodBodyMiddleware(GuestsSchema.delete),
    async (req, res) => {
      const { userId, guestId } = req.body
      const guest = await guestsServices.deleteAccess(userId, guestId)

      res.status(200).send(guest)
    },
  )

  return router
}
