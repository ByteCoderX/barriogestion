import { Request, Response, NextFunction } from 'express';
import { container } from '@diContainer/container';
import { JWTServices } from '@app/jwt/JWTService';
import { AppException } from '@shared/exceptions/AppException';

//Puro sexo

const jwtServices = container.resolve<JWTServices>("jwt-services");

function dateCalculator(unixTimestamp: number) {
    const currentDateUnix: number = Math.floor(new Date().getTime() / 1000);

    const diffSeconds = Math.abs(unixTimestamp - currentDateUnix);
    const diffDays = Math.round(Math.floor(diffSeconds / 86400));

    return diffSeconds;
}

export async function checkJWT (req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.cookies ? req.cookies.token : undefined; //pero la puta madre
    const refreshToken = req.cookies ? req.cookies.refreshToken : undefined;

    if (!refreshToken) throw new AppException('No token provided', 401);

    const validateToken = await jwtServices.refreshToken(refreshToken) as {
                                                                data: {
                                                                    userName: string,
                                                                    rId: string,
                                                                    iat: number,
                                                                    exp: number
                                                                },
                                                                    status: boolean
                                                                };

    if (!validateToken.status) throw new AppException('JWT de Refresco Inválido.', 401); //Ya me da paja codear y no hice nada
    const tiempo = dateCalculator(validateToken.data.exp);
    if (tiempo < 150) {
        const tokenData = await jwtServices.createToken(validateToken.data.userName, true, validateToken.data.rId, true) as { token: string };
        res.cookie("refreshToken" , tokenData.token);
    }

    const resultVerify = await jwtServices.verifyToken(token);

    if(resultVerify) next();
    else {
        const tokenData = await jwtServices.createToken(validateToken.data.userName, false, validateToken.data.rId) as { token: string };
        res.cookie("token" , tokenData.token);
        return next();
    }
}