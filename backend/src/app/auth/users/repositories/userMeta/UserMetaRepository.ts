import { User } from '../../models/userMeta/User'

export interface UserMetaRepository {
  getByDni(dni: string): Promise<User | null>
}
