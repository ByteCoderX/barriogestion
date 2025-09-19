import { User } from '../../models/auth__users/User'
import { AuthCredentials } from '../../models/auth__users/AuthCredentials'
import { UserSave } from '@app/auth/users/models/auth__users/UserSave'

export interface UsersRepository {
  create(data: UserSave): Promise<void>
  getByDni(username: string): Promise<User | undefined>
  getByEmail(email: string): Promise<User | undefined>
  getById(id: string): Promise<User | undefined>
  update(data: AuthCredentials): Promise<void>
}
