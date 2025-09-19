import { PasswordHasher } from './PasswordHasher'
import bcrypt from 'bcrypt'

export class BcryptPasswordHasher implements PasswordHasher {
  hash(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10)
    const passwordHashed = bcrypt.hashSync(password, salt)
    return Promise.resolve(passwordHashed)
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const match = await bcrypt.compare(password, hash)
    return Promise.resolve(match)
  }
}
