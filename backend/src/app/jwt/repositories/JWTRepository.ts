export interface JWTRepository {
  updateToken(rId: string, expiratonNow: number, expirationOffset: number): void
  saveToken(rId: string, expiratonNow: number, expirationOffset: number, userId: number): void
  verifyToken(rId: string): Promise<boolean>
  deleteToken(rId: string): void
}