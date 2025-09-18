import { Router } from "express";
import { JWTServices } from "@app/jwt/JWTService";
import { container } from "@diContainer/container";

export const expensesRoutes = () => {
    const router = Router()
    const authServices = container.resolve<JWTServices>("jwt-services")

    router.get('/:id', async (req, res) => { // Obtenes una Expensa
        const token = String(req.query.token)
        const data = await authServices.verifyToken(token) //ahora le agrego verificaciones

        res.status(data ? 200 : 401).json(data)
    })

    router.get('/', async (req, res) => { // Obtenes todas las Expensas
        const token = String(req.query.token)
        const data = await authServices.verifyToken(token) //ahora le agrego verificaciones

        res.status(data ? 200 : 401).json(data)
    })

    router.post('/', async (req, res) => { // Creas una Nueva Expensa
        const token = String(req.query.token)
        const data = await authServices.verifyToken(token) //ahora le agrego verificaciones

        res.status(data ? 200 : 401).json(data)
    })

    router.patch('/:id', async (req, res) => { // Actualizas una Expensa
        const token = String(req.query.token)
        const data = await authServices.verifyToken(token) //ahora le agrego verificaciones

        res.status(data ? 200 : 401).json(data)
    })

    router.delete('/:id', async (req, res) => { // Eliminas una Expensa
        const token = String(req.query.token)
        const data = await authServices.verifyToken(token) //ahora le agrego verificaciones

        res.status(data ? 200 : 401).json(data)
    })

    return router
}