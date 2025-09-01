import { app } from 'src/app'
import request from 'supertest'

describe('app', () => {
  describe('/health', () => {
    it('Deberia responder con status 200 y { status: ok }', async () => {
      const response = await request(app).get('/health')

      expect(response.statusCode).toBe(200)
      expect(response.body).toStrictEqual({ status: 'Ok' })
    })
  })

  describe('routeNotFoundMiddleware', () => {
    it('Si la ruta consultada no existe deberia responder con status 404.', async () => {
      const response = await request(app).get('/ruta-inexistente')

      expect(response.status).toBe(404)
    })
  })

  describe('errorHandlerMiddleware', () => {
    it('Si se produce un error deberia responder con buen formato.', async () => {
      const response = await request(app).get('/ruta-inexistente')

      expect(response.body).toEqual({
        timestamp: expect.toSatisfy(
          (v) => !isNaN(Number(v)),
          'deberia ser un numero',
        ),
        method: 'GET',
        path: '/ruta-inexistente',
        status: 404,
        message: expect.stringContaining('No se encontro la ruta'),
      })
    })
  })
})
