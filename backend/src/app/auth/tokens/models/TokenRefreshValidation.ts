export interface TokenRefreshValidation {
  valid: boolean
  decoded: {
    sessionId: string
    iat: number
    exp: number
  }
}
