import { authenticate } from './authenticate'
import { profile } from './profile'
import { register } from './register'
import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/me', { onRequest: [verifyJWT] }, profile)

  app.patch('/token/refresh', refresh)

  app.post('/users', register)
  app.post('/sessions', authenticate)
}
