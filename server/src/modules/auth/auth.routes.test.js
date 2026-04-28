import request from 'supertest'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AppError } from '../../middleware/errors.js'
import { createTestApp } from '../../test/createTestApp.js'

vi.mock('../../middleware/authenticate.js', () => ({
  authenticate: (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      next(new AppError(401, 'Missing Authorization header', 'UNAUTHORIZED'))
      return
    }

    req.user = { uid: 'uid_1', email: 'user@example.com' }
    next()
  },
}))

vi.mock('./auth.service.js', () => ({
  createSession: vi.fn(),
  getProfile: vi.fn(),
  logout: vi.fn(),
}))

import { authRouter } from './auth.routes.js'
import { createSession, getProfile, logout } from './auth.service.js'

const app = createTestApp(authRouter)

afterEach(() => {
  vi.clearAllMocks()
})

describe('auth routes', () => {
  it('returns session on happy path', async () => {
    createSession.mockResolvedValue({
      id: 'user_1',
      email: 'user@example.com',
    })

    const response = await request(app)
      .post('/session')
      .set('Authorization', 'Bearer token')
      .send({})

    expect(response.status).toBe(200)
    expect(response.body.ok).toBe(true)
    expect(response.body.data.user.email).toBe('user@example.com')
    expect(response.body.requestId).toBeTruthy()
  })

  it('returns validation error for invalid request body', async () => {
    const response = await request(app)
      .post('/session')
      .set('Authorization', 'Bearer token')
      .send({ unexpected: true })

    expect(response.status).toBe(400)
    expect(response.body.ok).toBe(false)
    expect(response.body.error.code).toBe('VALIDATION_ERROR')
  })

  it('returns unauthorized when header is missing', async () => {
    const response = await request(app).get('/me')

    expect(response.status).toBe(401)
    expect(response.body.ok).toBe(false)
    expect(response.body.error.code).toBe('UNAUTHORIZED')
  })

  it('returns not found from service', async () => {
    getProfile.mockRejectedValue(new AppError(404, 'User profile not found', 'USER_NOT_FOUND'))

    const response = await request(app)
      .get('/me')
      .set('Authorization', 'Bearer token')

    expect(response.status).toBe(404)
    expect(response.body.ok).toBe(false)
    expect(response.body.error.code).toBe('USER_NOT_FOUND')
  })

  it('returns conflict from service', async () => {
    createSession.mockRejectedValue(
      new AppError(409, 'Firebase account conflict', 'AUTH_PROVIDER_CONFLICT')
    )

    const response = await request(app)
      .post('/session')
      .set('Authorization', 'Bearer token')
      .send({})

    expect(response.status).toBe(409)
    expect(response.body.ok).toBe(false)
    expect(response.body.error.code).toBe('AUTH_PROVIDER_CONFLICT')
  })

  it('returns logout success on happy path', async () => {
    logout.mockReturnValue({ loggedOut: true })

    const response = await request(app)
      .post('/logout')
      .set('Authorization', 'Bearer token')
      .send({})

    expect(response.status).toBe(200)
    expect(response.body.ok).toBe(true)
    expect(response.body.data.loggedOut).toBe(true)
  })
})

