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

vi.mock('./categories.service.js', () => ({
  listCategories: vi.fn(),
  createUserCategory: vi.fn(),
  updateUserCategory: vi.fn(),
  deleteUserCategory: vi.fn(),
}))

import { categoriesRouter } from './categories.routes.js'
import {
  createUserCategory,
  deleteUserCategory,
  listCategories,
  updateUserCategory,
} from './categories.service.js'

const app = createTestApp(categoriesRouter)

afterEach(() => {
  vi.clearAllMocks()
})

describe('categories routes', () => {
  it('lists categories on happy path', async () => {
    listCategories.mockResolvedValue([{ id: 'cat_1', name: 'Food', color: null }])

    const response = await request(app)
      .get('/')
      .set('Authorization', 'Bearer token')

    expect(response.status).toBe(200)
    expect(response.body.ok).toBe(true)
    expect(response.body.data.categories).toHaveLength(1)
  })

  it('returns validation error for invalid create body', async () => {
    const response = await request(app)
      .post('/')
      .set('Authorization', 'Bearer token')
      .send({})

    expect(response.status).toBe(400)
    expect(response.body.ok).toBe(false)
    expect(response.body.error.code).toBe('VALIDATION_ERROR')
  })

  it('returns unauthorized when header is missing', async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(401)
    expect(response.body.ok).toBe(false)
    expect(response.body.error.code).toBe('UNAUTHORIZED')
  })

  it('returns not found from service', async () => {
    updateUserCategory.mockRejectedValue(
      new AppError(404, 'Category not found', 'CATEGORY_NOT_FOUND')
    )

    const response = await request(app)
      .patch('/ckh2l7i2q0001xk1y0v5s8u9a')
      .set('Authorization', 'Bearer token')
      .send({ name: 'Updated', color: null })

    expect(response.status).toBe(404)
    expect(response.body.ok).toBe(false)
    expect(response.body.error.code).toBe('CATEGORY_NOT_FOUND')
  })

  it('returns conflict from service', async () => {
    createUserCategory.mockRejectedValue(
      new AppError(409, 'Category exists', 'CATEGORY_NAME_CONFLICT')
    )

    const response = await request(app)
      .post('/')
      .set('Authorization', 'Bearer token')
      .send({ name: 'Food', color: null })

    expect(response.status).toBe(409)
    expect(response.body.ok).toBe(false)
    expect(response.body.error.code).toBe('CATEGORY_NAME_CONFLICT')
  })

  it('deletes category on happy path', async () => {
    deleteUserCategory.mockResolvedValue(undefined)

    const response = await request(app)
      .delete('/ckh2l7i2q0001xk1y0v5s8u9a')
      .set('Authorization', 'Bearer token')

    expect(response.status).toBe(200)
    expect(response.body.ok).toBe(true)
    expect(response.body.data.deleted).toBe(true)
  })
})

