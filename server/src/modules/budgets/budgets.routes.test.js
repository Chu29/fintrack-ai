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

vi.mock('./budgets.service.js', () => ({
  listBudgets: vi.fn(),
  upsertUserBudget: vi.fn(),
  deleteUserBudget: vi.fn(),
}))

import { budgetsRouter } from './budgets.routes.js'
import { deleteUserBudget, listBudgets, upsertUserBudget } from './budgets.service.js'

const app = createTestApp(budgetsRouter)

afterEach(() => {
  vi.clearAllMocks()
})

describe('budgets routes', () => {
  it('lists budgets on happy path', async () => {
    listBudgets.mockResolvedValue({
      budgets: [{ id: 'bud_1', month: 4, year: 2026, limitAmount: '500.00' }],
    })

    const response = await request(app)
      .get('/?month=4&year=2026')
      .set('Authorization', 'Bearer token')

    expect(response.status).toBe(200)
    expect(response.body.ok).toBe(true)
    expect(response.body.data.budgets).toHaveLength(1)
  })

  it('returns validation error for invalid query', async () => {
    const response = await request(app)
      .get('/?month=13&year=2026')
      .set('Authorization', 'Bearer token')

    expect(response.status).toBe(400)
    expect(response.body.ok).toBe(false)
    expect(response.body.error.code).toBe('VALIDATION_ERROR')
  })

  it('returns unauthorized when header is missing', async () => {
    const response = await request(app).get('/?month=4&year=2026')

    expect(response.status).toBe(401)
    expect(response.body.ok).toBe(false)
    expect(response.body.error.code).toBe('UNAUTHORIZED')
  })

  it('returns not found from service', async () => {
    deleteUserBudget.mockRejectedValue(new AppError(404, 'Budget not found', 'BUDGET_NOT_FOUND'))

    const response = await request(app)
      .delete('/ck1234567890abcdef1234567')
      .set('Authorization', 'Bearer token')

    expect(response.status).toBe(404)
    expect(response.body.ok).toBe(false)
    expect(response.body.error.code).toBe('BUDGET_NOT_FOUND')
  })

  it('returns conflict from service', async () => {
    upsertUserBudget.mockRejectedValue(
      new AppError(409, 'Budget already exists', 'BUDGET_SCOPE_CONFLICT')
    )

    const response = await request(app)
      .put('/')
      .set('Authorization', 'Bearer token')
      .send({
        categoryId: 'ck1234567890abcdef1234568',
        month: 4,
        year: 2026,
        limitAmount: '400.00',
      })

    expect(response.status).toBe(409)
    expect(response.body.ok).toBe(false)
    expect(response.body.error.code).toBe('BUDGET_SCOPE_CONFLICT')
  })

  it('deletes budget on happy path', async () => {
    deleteUserBudget.mockResolvedValue(undefined)

    const response = await request(app)
      .delete('/ck1234567890abcdef1234567')
      .set('Authorization', 'Bearer token')

    expect(response.status).toBe(200)
    expect(response.body.ok).toBe(true)
    expect(response.body.data.deleted).toBe(true)
  })
})

