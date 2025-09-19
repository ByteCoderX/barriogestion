import { getDateWithOffset } from '@shared/utils/dates/getDateWithOffset'
import { TokenManager } from './TokenManager'
import { config } from '@config'
import Jwt from 'jsonwebtoken'
import { TokenRefreshWithDates } from './models/TokenRefreshWithDates'
import { TokenAccessValidation } from './models/TokenAccessValidation'
import { TokenRefreshValidation } from './models/TokenRefreshValidation'
import { TokenAccessPayload } from './models/TokenAccessPayload'
import { TokenRefreshPayload } from './models/TokenRefreshPayload'

// Token Secrets
const refreshSecret = config.JWT_REFRESH_SECRET
const accessSecret = config.JWT_ACCESS_SECRET

// Token expiration Dates
const accessExpiration = config.JWT_ACCESS_EXP_TIME
const refreshExpiration = config.JWT_REFRESH_EXP_TIME

export class JsonWebTokenTokenManager implements TokenManager {
  createAccess(userId: string, admin: boolean): Promise<string> {
    const token = Jwt.sign({ userId, admin }, accessSecret, {
      expiresIn: `${accessExpiration.value}${accessExpiration.unit}`,
    })

    return Promise.resolve(token)
  }
  createRefresh(sessionId: string): Promise<TokenRefreshWithDates> {
    const dates = getDateWithOffset({
      value: refreshExpiration.value,
      unit: refreshExpiration.unit,
    })

    const token = Jwt.sign({ sessionId }, refreshSecret, {
      expiresIn: `${refreshExpiration.value}${refreshExpiration.unit}`,
    })

    return Promise.resolve({
      token,
      dates,
    })
  }

  validateAccess(token: string): Promise<TokenAccessValidation> {
    try {
      const decoded = Jwt.verify(token, accessSecret) as TokenAccessPayload
      return Promise.resolve({ valid: true, decoded })
    } catch {
      const decoded = Jwt.decode(token) as TokenAccessPayload
      return Promise.resolve({ valid: false, decoded })
    }
  }

  validateRefresh(token: string): Promise<TokenRefreshValidation> {
    try {
      const decoded = Jwt.verify(token, refreshSecret) as TokenRefreshPayload
      return Promise.resolve({ valid: true, decoded })
    } catch {
      const decoded = Jwt.decode(token) as TokenRefreshPayload
      return Promise.resolve({ valid: false, decoded })
    }
  }
}
