import { config } from "@config";
import jwt from 'jsonwebtoken';
import { JWTRepository } from "./repositories/JWTRepository";

function dateFormatter(days: number): object {
    const now = new Date();
    const dateNow = new Date();
    now.setDate(now.getDate() + days);

    return {
        now: Math.floor(dateNow.getTime() / 1000),
        offset: Math.floor(now.getTime() / 1000)
    }
}

export class JWTServices {
  constructor(private readonly JWTRepository: JWTRepository) {}

  async createToken(userName: string, useRefreshToken: boolean, rId: string, isUpdating?: boolean, userId?: number): Promise<object> {

    const jwtWork = {
        secret: useRefreshToken ? config.JWT_REFRESH_SECRET : config.JWT_ACCESS_SECRET,
        refresh: useRefreshToken ? config.JWT_REFRESH_EXP_MS : config.JWT_ACCESS_EXP_MS,
    }

    const expiresIn =  useRefreshToken ? config.JWT_REFRESH_EXP_MS : config.JWT_ACCESS_EXP_MS;
    const response = jwt.sign({ userName, rId }, jwtWork.secret, { expiresIn: `${jwtWork.refresh}s`, });

    const tokenExpiration = dateFormatter(expiresIn) as {now: number, offset: number};

    if (!isUpdating && useRefreshToken && userId)
       this.JWTRepository.saveToken(rId, tokenExpiration.now, tokenExpiration.offset, userId);

    if (isUpdating && userId)
      this.JWTRepository.updateToken(rId, tokenExpiration.now, tokenExpiration.offset);

    return {
        token: response,
        expiresAt: tokenExpiration.offset,
    };
  }

  async verifyToken(token: string): Promise<{
    rId?: string
    valid: boolean
  }> {
    try {
        const response = jwt.verify(token, config.JWT_ACCESS_SECRET) as { userName: string, rId: string, iat: number, exp: number };
        return response ? {
          rId: response.rId,
          valid: true
        } : {
          valid: false
        };
    } catch {
      return {
        valid: false
      }
    }
  }

  async refreshToken(token: string): Promise<object> {
      try {
        const tokenVerification = jwt.verify(token, config.JWT_REFRESH_SECRET) as { rId: string };
        if (!tokenVerification) return { status: false };

        const response = await this.JWTRepository.verifyToken(tokenVerification.rId);

        if (!response) return { status: false };

        return {
            data: tokenVerification,
            status: true,
        }
    } catch (error) {
      console.log(error);
      return { status: false } }
  }

  async deleteToken(rId: string) {
    this.JWTRepository.deleteToken(rId)
  }
}