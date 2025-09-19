export interface TokenAccessValidation {
  valid: boolean
  decoded: {
    userId: string
    admin: boolean
    iat: number
    exp: number
  }
}
