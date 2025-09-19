import { User } from '../../models/users/User'

export interface UserRepository {
  getById(id: number): Promise<User | null>
}
