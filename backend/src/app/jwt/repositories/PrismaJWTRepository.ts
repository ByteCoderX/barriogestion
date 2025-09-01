import { prisma } from "@database/prisma";
import { JWTRepository } from "./JWTRepository";

export class PrismaJWTRepository implements JWTRepository {
    updateToken(rId: string, expirationNow: number, expirationOffset: number): void {
        prisma.jwt.update({
            where: { rId },
            data: {
                tokenExpirationNow: expirationNow,
                tokenExpirationOffset: expirationOffset
            }
        });
    }

    saveToken(rId: string, expiratonNow: number, expirationOffset: number, userId: number): void {
        prisma.jwt.create({
            data: {
                rId,
                tokenExpirationNow: expiratonNow,
                tokenExpirationOffset: expirationOffset,
                userId
            }
        })
    }

    verifyToken(rId: string): Promise<boolean> {
        const search = prisma.jwt.findUnique({
            where: {
                rId
            }
        });
        if (!search) return Promise.resolve(false);
        return Promise.resolve(true);
    }

    deleteToken(rId: string): void {
        prisma.jwt.delete({
            where: {
                rId
            }
        })
    }
}