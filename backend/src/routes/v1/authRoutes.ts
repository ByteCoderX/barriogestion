import { Router } from "express";
import { JWTServices } from "@app/jwt/JWTService";
import { AuthServices } from "@app/auth/AuthServices";
import { container } from "@diContainer/container";
import { validate } from "@shared/middlewares/zodMiddleware";
import { schem } from "./zodSchemas/authShema";
import { AppException } from "@shared/exceptions/AppException";

export const authRoutes = () => {
    const router = Router()
    const jwtServices = container.resolve<JWTServices>("jwt-services")
    const authServices = container.resolve<AuthServices>("auth-services")

    router.post('/verify', validate(schem.verify, "body"), async (req, res) => { // La
        const token = String(req.query.token)
        const data = await jwtServices.verifyToken(token)

        res.status(data.valid ? 200 : 401).json(data)
    })

    router.post('/login', validate(schem.login, "body"), async (req, res) => { // Concha de
        const data = req.body;
        if (!data.dni || !data.password) throw new AppException("Faltan datos", 401)

        function removePoints(cursedNumber: string) {
            return cursedNumber.replace(/\./g, "");
        }

        const loginData = {
            dni: removePoints(data.dni),
            password: data.password
        }

        const response = await authServices.login(loginData)

        res.status(data ? 200 : 401).json(response)
    })

    router.post('/logout', validate(schem.logout, "body"), async (req, res) => { // Tu Madre
        const token = String(req.query.token)
        const data = await jwtServices.verifyToken(token)
        if(data.valid && data.rId) await jwtServices.deleteToken(data.rId)

        res.status(204)
    })

    return router
}