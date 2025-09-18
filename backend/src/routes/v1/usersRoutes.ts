import { Router } from "express";
import { JWTServices } from "@app/jwt/JWTService";
import { container } from "@diContainer/container";

export const usersRoutes = () => {
    const router = Router()
    const authServices = container.resolve<JWTServices>("jwt-services")

    router.get('/', async (req, res) => { // Obtenes todos los Usuarios
        const token = String(req.query.token)
        const data = await authServices.verifyToken(token) //ahora le agrego verificaciones

        res.status(data ? 200 : 401).json(data)
    })

    router.get('/:id', async (req, res) => { // Obtenes un Usuario
        const token = String(req.query.token)
        const data = await authServices.verifyToken(token) //ahora le agrego verificaciones

        res.status(data ? 200 : 401).json(data)
    })

    router.post('/', async (req, res) => { // Creas un usuario
        const token = String(req.query.token)
        const data = await authServices.verifyToken(token) //ahora le agrego verificaciones

        res.status(data ? 200 : 401).json(data)
    })

    router.patch('/:id', async (req, res) => { // Editas un Usuario
        const token = String(req.query.token)
        const data = await authServices.verifyToken(token) //ahora le agrego verificaciones

        res.status(data ? 200 : 401).json(data)
    })

    router.delete('/:id', async (req, res) => { // Eliminas un Usuario
        const token = String(req.query.token)
        const data = await authServices.verifyToken(token) //ahora le agrego verificaciones

        res.status(data ? 200 : 401).json(data)
    })

    return router
}