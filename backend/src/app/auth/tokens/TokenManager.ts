import { TokenAccessValidation } from './models/TokenAccessValidation'
import { TokenRefreshValidation } from './models/TokenRefreshValidation'
import { TokenRefreshWithDates } from './models/TokenRefreshWithDates'

export interface TokenManager {
  createAccess(userId: string, admin: boolean): Promise<string>
  createRefresh(sessionId: string): Promise<TokenRefreshWithDates>
  validateAccess(token: string): Promise<TokenAccessValidation>
  validateRefresh(token: string): Promise<TokenRefreshValidation>
}
