import { AuthRepository } from "./repositories/AuthRepository";
import { AuthUserLogin } from "./models/AuthLogin";
import { nanoid } from 'nanoid';
import { JWTServices } from "@app/jwt/JWTService";
import { AppException } from "@shared/exceptions/AppException.js";

export class AuthServices {
  constructor(
    private readonly AuthRepository: AuthRepository,
    private readonly JWTServices: JWTServices
  ) {}

  async login(data: AuthUserLogin): Promise<object> {
    const passwordVerification = await this.AuthRepository.verifyPassword(data);

    if (!passwordVerification) throw new AppException("Error al iniciar sesión.", 401);

    let tokenCreation = {};

    if (passwordVerification) {
      const rId = nanoid();
      const idUsuario = String(data.dni);
      tokenCreation = {
        secureToken: await this.JWTServices.createToken(idUsuario, false, rId) as { token: string },
        token: await this.JWTServices.createToken(idUsuario, true, rId) as { token: string },
      }
    }

    if (!tokenCreation) throw new AppException("Ocurrió un error al intentar generar el JWT.", 401)

    return {
      verification: passwordVerification,
      tokens: tokenCreation || undefined
    }
  }
}