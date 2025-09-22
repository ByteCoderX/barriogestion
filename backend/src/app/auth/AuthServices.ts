import { ResourceNotFoundException } from '@shared/exceptions/ResourceNotFoundException'
import { UserMetaRepository } from './users/repositories/userMeta/UserMetaRepository'
import { AppException, httpStatusCodes } from '@shared/exceptions/AppException'
import { UsersCredentialsRepository } from './users/repositories/userCredentials/UsersCredentialsRepository'
import { UserCredentials } from './users/models/userCredentials/UserCredentials'
import { SessionsRepository } from './sessions/SessionsRepository'
import { UserCreate } from './users/models/userCredentials/UserCreate'
import { PasswordHasher } from './passwords/PasswordHasher'
import { TokenManager } from './tokens/TokenManager'
import crypto, { randomUUID } from 'crypto'

export class AuthServices {
  constructor(
    private readonly usersCredentials: UsersCredentialsRepository,
    private readonly userMetadata: UserMetaRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenManager: TokenManager,
    private readonly sessionsRepository: SessionsRepository,
  ) {}

  async registerUser(data: UserCreate) {
    // Verifica que el usuario no exista antes de registrarlo.
    const dbUser = await this.usersCredentials.getByDni(data.dni)
    if (dbUser)
      throw new AppException(
        'Se intentó registrar un usuario existente.',
        httpStatusCodes.conflict,
      )

    // Verifica que el mail no esté registrado.
    const dbEmail = await this.usersCredentials.getByEmail(data.email)
    if (dbEmail)
      throw new AppException(
        'Se intentó registrar un email existente.',
        httpStatusCodes.conflict,
      )

    // Se verifica que el DNI sea válido.
    const personal = await this.userMetadata.getByDni(data.dni)
    if (!personal)
      throw new ResourceNotFoundException('No existe un Usuario con ese DNI.')

    const passwordHashed = await this.passwordHasher.hash(data.password)

    const emailHashed = crypto
      .createHash('md5')
      .update(data.email)
      .digest('hex')

    // Se crea un objeto con los nuevos datos.
    const fullData = {
      id: randomUUID(),
      dni: data.dni,
      avatarHash: emailHashed,
      email: data.email,
      password: passwordHashed,
    }

    // Se guarda la información final en la db.
    await this.usersCredentials.create(fullData)
    return
    // No debe devolver nada a menos que suceda algo inesperado
    // Por lo que simplemente hago un retorno vacío para finalizar
    // la ejecución.
  }

  async authenticate(
    data: UserCredentials,
    connectionInfo: { ip: string; userAgent: string },
  ) {
    // Se obtiene la contraseña hasheada de la DB
    const dbUser = await this.usersCredentials.getByDni(data.dni)
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
    const avatarUrl = `https://www.gravatar.com/avatar/${dbUser.avatarHash}?s=200`
    const userMetadata = await this.userMetadata.getByDni(data.dni)
    if (!userMetadata)
      throw new Error(
        'La puta madre, pasó algo raro cuando se intentó obtener la metadada del usuario en el login del servicio de Auth.',
      )

    return {
      tokens: {
        access: accessToken,
        refresh: refreshToken.token,
      },
      user: {
        id: dbUser.id,
        dni: dbUser.dni,
        fullName: `${userMetadata.firstName} ${userMetadata.lastName}`,
        contact: userMetadata.contact,
        address: userMetadata.address,
        email: dbUser.email,
        isAdmin: dbUser.admin,
        avatar: avatarUrl,
      },
    }
  }

  async changePassword(data: UserCredentials) {
    // Se verifica que el usuario exista antes de cambiar la contraseña.
    const dbUser = await this.usersCredentials.getByDni(data.dni)
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
    const personal = await this.usersCredentials.update(userUpdated)
    return personal
  }

  async getUser(id: string) {
    // Obtiene un usuario y si este existe lo devuelve 👍
    const user = this.usersCredentials.getById(id)

    if (!user) throw new ResourceNotFoundException('Usuario no Encontrado')

    return user
  }

  async deleteSession(id: string) {
    this.sessionsRepository.delete(id)
  }
}
