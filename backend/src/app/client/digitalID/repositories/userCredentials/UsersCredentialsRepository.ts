import { User } from '../../models/userCredentials/User'

export interface UsersCredentialsRepository {
  getByDni(username: string): Promise<User | undefined>
}
