import { insertUsuarios } from '@tests/helpers/database/insertUsuarios'
import { clearDatabase } from '@tests/helpers/database/clearDatabase'
import { cookieParser } from '@tests/helpers/utils/cookieParser'
import { app } from 'src/app'
import request from 'supertest'
import { config } from '@config'

const baseEndpoint = '/bg/v1/auth'

describe.sequential('auth routes v1', () => {
  describe('POST /register', () => {
    beforeEach(async () => {
      await clearDatabase()
    })
    it('Si los datos ingresados son válidos debería responder con status 201.', async () => {
      // Arrange
      await insertUsuarios()

      const userRegisterMock = {
        dni: '11.222.333',
        email: 'pedro@test.com',
        password: 'asd',
        userId: 1,
      }

      // Act
      const response = await request(app)
        .post(baseEndpoint + '/register')
        .set('x-api-key', config.API_KEY)
        .send(userRegisterMock)

      // Assert
      expect(response.statusCode).toBe(201)
    })

    it('Si faltan datos o son inválidos debe responder con status 422.', async () => {
      // Arrange
      await insertUsuarios()

      const userRegisterMock = {
        dni: '11.222.333',
        email: 'pedro@test.com',
        password: 'asd',
        //userId: 1,
      }

      // Act
      const response = await request(app)
        .post(baseEndpoint + '/register')
        .set('x-api-key', config.API_KEY)
        .send(userRegisterMock)

      // Assert
      expect(response.statusCode).toBe(422)
    })

    it('Si se intenta registrar un usuario existente debe responder con status 409.', async () => {
      // Arrange
      await insertUsuarios()

      const userRegisterMock = {
        dni: '11.222.333',
        email: 'pedro@test.com',
        password: 'asd',
        userId: 1,
      }

      await request(app)
        .post(baseEndpoint + '/register')
        .set('x-api-key', config.API_KEY)
        .send(userRegisterMock)

      // Act
      const response = await request(app)
        .post(baseEndpoint + '/register')
        .set('x-api-key', config.API_KEY)
        .send(userRegisterMock)

      // Assert
      expect(response.statusCode).toBe(409)
    })

    it('Si la id de "Usuario" es inválida debe responder con status 404.', async () => {
      // Arrange
      await insertUsuarios()

      const userRegisterMock = {
        dni: '11.222.333',
        email: 'pedro@test.com',
        password: 'asd',
        userId: 999,
      }

      // Act
      const response = await request(app)
        .post(baseEndpoint + '/register')
        .set('x-api-key', config.API_KEY)
        .send(userRegisterMock)

      // Assert
      expect(response.statusCode).toBe(404)
    })
  })

  describe('POST /login', async () => {
    beforeEach(async () => {
      await clearDatabase()
    })
    it('Si el Usuario no existe debe devolver un status 401.', async () => {
      // Arrange
      const userLoginMock = {
        dni: '11.222.333',
        password: 'asd',
      }

      // Act
      const response = await request(app)
        .post(baseEndpoint + '/login')
        .set('x-api-key', config.API_KEY)
        .send(userLoginMock)

      // Assert
      expect(response.status).toBe(401)
    })

    it('Si faltan datos o son inválidos debe responder con status 422.', async () => {
      // Arrange
      await insertUsuarios()

      const userRegisterMock = {
        dni: '11.222.333',
        //password: 'asd',
      }

      // Act
      const response = await request(app)
        .post(baseEndpoint + '/login')
        .set('x-api-key', config.API_KEY)
        .send(userRegisterMock)

      // Assert
      expect(response.statusCode).toBe(422)
    })

    it('Si la contraseña es correcta debería responder con status 200 y asignar las cookies.', async () => {
      // Arrange
      await insertUsuarios()
      const userInputMock = {
        dni: '11.222.333',
        password: 'asd',
      }

      const userRegisterMock = {
        dni: '11.222.333',
        email: 'pedro@test.com',
        password: 'asd',
        userId: 1,
      }

      await request(app)
        .post(baseEndpoint + '/register')
        .set('x-api-key', config.API_KEY)
        .send(userRegisterMock)

      // Act
      const response = await request(app)
        .post(baseEndpoint + '/login')
        .set('x-api-key', config.API_KEY)
        .send(userInputMock)

      const parsedCookies = cookieParser(response.headers)

      // Assert
      expect(parsedCookies.refreshToken).toBeDefined()
      expect(parsedCookies.accessToken).toBeDefined()

      expect(response.status).toBe(200)
    })
  })

  describe('POST /validator', async () => {
    beforeEach(async () => {
      await clearDatabase()
    })

    it('Si no se envía un refresh token o se envía un refresh token inválido debe responder con status 401.', async () => {
      // Arrange
      // Act
      const response = await request(app)
        .post(baseEndpoint + '/validator')
        .set('x-api-key', config.API_KEY)

      // Assert
      expect(response.status).toBe(401)
    })

    it('Si se envía un token válido debe responder con status 200.', async () => {
      // Arrange
      await insertUsuarios()
      const userInputMock = {
        dni: '11.222.333',
        password: 'asd',
      }

      const userRegisterMock = {
        dni: '11.222.333',
        email: 'pedro@test.com',
        password: 'asd',
        userId: 1,
      }

      await request(app)
        .post(baseEndpoint + '/register')
        .set('x-api-key', config.API_KEY)
        .send(userRegisterMock)

      const login = await request(app)
        .post(baseEndpoint + '/login')
        .set('x-api-key', config.API_KEY)
        .send(userInputMock)

      const parsedCookies = cookieParser(login.headers)

      // Act
      const response = await request(app)
        .post(baseEndpoint + '/validator')
        .set('x-api-key', config.API_KEY)
        .set('Cookie', [`refreshToken=${parsedCookies.refreshToken}`])

      // Assert
      expect(response.status).toBe(200)
    })
  })

  describe('POST /change-password', async () => {
    beforeEach(async () => {
      await clearDatabase()
    })
    it('Si el Usuario no existe debe devolver un status 401.', async () => {
      // Arrange
      const userInputMock = {
        dni: '11.222.333',
        password: 'asdasd',
      }

      // Act
      const response = await request(app)
        .post(baseEndpoint + '/change-password')
        .set('x-api-key', config.API_KEY)
        .send(userInputMock)

      // Assert
      expect(response.status).toBe(401)
    })

    it('Si faltan datos o son inválidos debe responder con status 422.', async () => {
      // Arrange
      await insertUsuarios()

      const userRegisterMock = {
        dni: '11.222.333',
        //password: 'asd',
      }

      // Act
      const response = await request(app)
        .post(baseEndpoint + '/change-password')
        .set('x-api-key', config.API_KEY)
        .send(userRegisterMock)

      // Assert
      expect(response.statusCode).toBe(422)
    })

    it('Si los datos son correctos debería responder con status 200.', async () => {
      // Arrange
      await insertUsuarios()
      const userInputMock = {
        dni: '11.222.333',
        password: 'asdasd',
      }

      const userRegisterMock = {
        dni: '11.222.333',
        email: 'pedro@test.com',
        password: 'asd',
        userId: 1,
      }

      await request(app)
        .post(baseEndpoint + '/register')
        .set('x-api-key', config.API_KEY)
        .send(userRegisterMock)

      // Act
      const response = await request(app)
        .post(baseEndpoint + '/change-password')
        .set('x-api-key', config.API_KEY)
        .send(userInputMock)

      // Assert
      expect(response.status).toBe(200)
    })

    it('Se verifica mediante el endpoint "/login" que la contraseña se cambió correctamente.', async () => {
      // Arrange
      await insertUsuarios()
      const userRegisterMock = {
        dni: '11.222.333',
        email: 'pedro@test.com',
        password: 'asd',
        userId: 1,
      }

      const userNewPasswordMock = {
        dni: '11.222.333',
        password: 'asdasd',
      }

      await request(app)
        .post(baseEndpoint + '/register')
        .set('x-api-key', config.API_KEY)
        .send(userRegisterMock)

      await request(app)
        .post(baseEndpoint + '/change-password')
        .set('x-api-key', config.API_KEY)
        .send(userNewPasswordMock)

      // Act
      const response = await request(app)
        .post(baseEndpoint + '/login')
        .set('x-api-key', config.API_KEY)
        .send(userNewPasswordMock)

      // Assert
      expect(response.status).toBe(200)
    })
  })

  describe('POST /logout', async () => {
    beforeEach(async () => {
      await clearDatabase()
    })

    it('Si no se envía un refresh token debe responder con status 304.', async () => {
      // Arrange
      // Act
      const response = await request(app)
        .post(baseEndpoint + '/logout')
        .set('x-api-key', config.API_KEY)

      // Assert

      expect(response.status).toBe(304)
    })

    it('Si se envía un refresh token inválido debe responder con status 304.', async () => {
      // Arrange
      // Act
      const response = await request(app)
        .post(baseEndpoint + '/logout')
        .set('x-api-key', config.API_KEY)
        .set('Cookie', [
          'refreshToken=token_inválido',
          'accessToken=token_inválido',
        ])

      // Assert

      expect(response.status).toBe(304)
    })

    it('Si se envía un refresh token válido debe responder con status 200.', async () => {
      // Arrange
      await insertUsuarios()
      const userInputMock = {
        dni: '11.222.333',
        password: 'asd',
      }

      const userRegisterMock = {
        dni: '11.222.333',
        email: 'pedro@test.com',
        password: 'asd',
        userId: 1,
      }

      await request(app)
        .post(baseEndpoint + '/register')
        .set('x-api-key', config.API_KEY)
        .send(userRegisterMock)

      const login = await request(app)
        .post(baseEndpoint + '/login')
        .set('x-api-key', config.API_KEY)
        .send(userInputMock)

      const parsedCookies = cookieParser(login.headers)

      // Act
      const response = await request(app)
        .post(baseEndpoint + '/logout')
        .set('x-api-key', config.API_KEY)
        .set('Cookie', [`refreshToken=${parsedCookies.refreshToken}`])

      // Assert

      expect(response.status).toBe(200)
    })
  })
})
