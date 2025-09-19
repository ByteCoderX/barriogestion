import { ResourceNotFoundException } from '@shared/exceptions/ResourceNotFoundException'
import { UserRepository } from './users/repositories/user/UserRepository'
import { AppException, httpStatusCodes } from '@shared/exceptions/AppException'
import { UsersRepository } from './users/repositories/auth_users/UsersRepository'
import { AuthCredentials } from './users/models/auth__users/AuthCredentials'
import { SessionsRepository } from './sessions/SessionsRepository'
import { UserCreate } from './users/models/auth__users/UserCreate'
import { PasswordHasher } from './passwords/PasswordHasher'
import { TokenManager } from './tokens/TokenManager'
import { randomUUID } from 'crypto'

export class AuthServices {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenManager: TokenManager,
    private readonly sessionsRepository: SessionsRepository,
  ) {}

  async registerUser(data: UserCreate) {
    // Verifica que el usuario no exista antes de registrarlo.
    const dbUser = await this.usersRepository.getByDni(data.dni)
    if (dbUser)
      throw new AppException(
        'Se intentó registrar un usuario existente.',
        httpStatusCodes.conflict,
      )

    // Verifica que el mail no esté registrado.
    const dbEmail = await this.usersRepository.getByEmail(data.email)
    if (dbEmail)
      throw new AppException(
        'Se intentó registrar un email existente.',
        httpStatusCodes.conflict,
      )

    // Se verifica que la id de "personalId" sea válida.
    const personal = await this.userRepository.getById(data.personalId)
    if (!personal)
      throw new ResourceNotFoundException('No existe un Personal con esa ID.')

    const passwordHashed = await this.passwordHasher.hash(data.password)

    // Se crea un objeto con los nuevos datos.
    const fullData = {
      id: randomUUID(),
      dni: data.dni,
      email: data.email,
      password: passwordHashed,
      personalId: data.personalId,
    }

    // Se guarda la información final en la db.
    await this.usersRepository.create(fullData)
    return
    // No debe devolver nada a menos que suceda algo inesperado
    // Por lo que simplemente hago un retorno vacío para finalizar
    // la ejecución.
  }

  async authenticate(
    data: AuthCredentials,
    connectionInfo: { ip: string; userAgent: string },
  ) {
    // Se obtiene la contraseña hasheada de la DB
    const dbUser = await this.usersRepository.getByDni(data.dni)
    if (!dbUser)
      throw new AppException(
        'Credenciales Inválidas.',
        httpStatusCodes.unauthorized,
      )

    // Se compara la contraseña hasheada con la ingresada
    const match = await this.passwordHasher.compare(
      data.password,
      dbUser.password,
    )

    if (!match)
      throw new AppException(
        'Credenciales Inválidas.',
        httpStatusCodes.unauthorized,
      )

    // Generación de tokens y guardado de sesión.
    const sessionId = randomUUID()
    const accessToken = await this.tokenManager.createAccess(
      dbUser.id,
      dbUser.admin,
    )
    const refreshToken = await this.tokenManager.createRefresh(sessionId)
    const clientMetadata = {
      id: sessionId,
      userId: dbUser.id,
      ip: connectionInfo.ip,
      userAgent: connectionInfo.userAgent,
      active: true,
      createdDate: refreshToken.dates.now,
      expirationDate: refreshToken.dates.offset,
    }
    await this.sessionsRepository.save(clientMetadata)

    return {
      tokens: {
        access: accessToken,
        refresh: refreshToken.token,
      },
      user: {
        id: dbUser.id,
        dni: dbUser.dni,
        email: dbUser.email,
        personalId: dbUser.personalId,
        isAdmin: dbUser.admin,
      },
    }
  }

  async changePassword(data: AuthCredentials) {
    // Se verifica que el usuario exista antes de cambiar la contraseña.
    const dbUser = await this.usersRepository.getByDni(data.dni)
    if (!dbUser)
      throw new AppException(
        'Credenciales Inválidas.',
        httpStatusCodes.unauthorized,
      )

    const passwordHashed = await this.passwordHasher.hash(data.password)

    // Se crea un objeto con los nuevos datos.
    const userUpdated = {
      dni: data.dni,
      password: passwordHashed,
    }

    // Se actualiza el hasheo de la contraseña del usuario en la db.
    const personal = await this.usersRepository.update(userUpdated)
    return personal
  }

  async getUser(id: string) {
    // Obtiene un usuario y si este existe lo devuelve 👍
    const user = this.usersRepository.getById(id)

    if (!user) throw new ResourceNotFoundException('Usuario no Encontrado')

    return user
  }

  async deleteSession(id: string) {
    this.sessionsRepository.delete(id)
  }
}
