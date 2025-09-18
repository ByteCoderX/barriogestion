import { Router } from "express";
import { JWTServices } from "@app/jwt/JWTService";
import { container } from "@diContainer/container";

export const foundsRoutes = () => {
    const router = Router()
    const authServices = container.resolve<JWTServices>("jwt-services")

    router.get('/', async (req, res) => { // Obtenes los Fondos ?
        const token = String(req.query.token)
        const data = await authServices.verifyToken(token) //ahora le agrego verificaciones

        res.status(data ? 200 : 401).json(data)
    })

    return router
}