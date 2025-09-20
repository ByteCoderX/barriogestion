import { User } from '../../models/userMeta/User'

export interface UserMetaRepository {
  getById(id: number): Promise<User | null>
}
