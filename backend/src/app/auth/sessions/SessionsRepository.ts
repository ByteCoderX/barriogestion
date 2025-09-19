import { Session } from './models/Session'
import { SessionUpdate } from './models/SessionUpdate'

export interface SessionsRepository {
  save(data: Session): Promise<void>
  update(data: SessionUpdate): Promise<void>
  getById(id: string): Promise<Session | null>
  delete(id: string): Promise<void>
}
