import { User } from '../../models/userCredentials/User'
import { UserCredentials } from '../../models/userCredentials/UserCredentials'
import { UserSave } from '@app/auth/users/models/userCredentials/UserSave'

export interface UsersCredentialsRepository {
  create(data: UserSave): Promise<void>
  getByDni(username: string): Promise<User | undefined>
  getByEmail(email: string): Promise<User | undefined>
  getById(id: string): Promise<User | undefined>
  update(data: UserCredentials): Promise<void>
}
