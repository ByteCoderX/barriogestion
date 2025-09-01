import { AuthRepository } from "./AuthRepository";
import { AuthUserLogin } from "../models/AuthLogin";
import { prisma } from "@database/prisma";

export class PrismaAuthRepository implements AuthRepository {

  async verifyPassword(data: AuthUserLogin): Promise<boolean> {
    const response = await prisma.usuarios.findUnique({
      where: {
        dni: data.dni
      },
        select: {
            password: true
        }
    })

    if (response && response.password === data.password) return Promise.resolve(true);
    else return Promise.resolve(false);
  }
}