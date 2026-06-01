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

vi.mock('./expenses.service.js', () => ({
  listExpenses: vi.fn(),
  createUserExpense: vi.fn(),
  updateUserExpense: vi.fn(),
  deleteUserExpense: vi.fn(),
}))

import { expensesRouter } from './expenses.routes.js'
import {
  createUserExpense,
  deleteUserExpense,
  listExpenses,
  updateUserExpense,
} from './expenses.service.js'

const app = createTestApp(expensesRouter)

afterEach(() => {
  vi.clearAllMocks()
})

describe('expenses routes', () => {
  it('lists expenses on happy path', async () => {
    listExpenses.mockResolvedValue({
      expenses: [{ id: 'exp_1', amount: '12.50', spentAt: '2026-04-01T00:00:00.000Z' }],
      pagination: { page: 1, pageSize: 20, total: 1, totalPages: 1 },
    })

    const response = await request(app)
      .get('/?page=1&pageSize=20')
      .set('Authorization', 'Bearer token')

    expect(response.status).toBe(200)
    expect(response.body.ok).toBe(true)
    expect(response.body.data.expenses).toHaveLength(1)
  })

  it('returns validation error for invalid query', async () => {
    const response = await request(app)
      .get('/?page=0')
      .set('Authorization', 'Bearer token')

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
    updateUserExpense.mockRejectedValue(new AppError(404, 'Expense not found', 'EXPENSE_NOT_FOUND'))

    const response = await request(app)
      .patch('/ck1234567890abcdef1234567')
      .set('Authorization', 'Bearer token')
      .send({ note: 'updated note' })

    expect(response.status).toBe(404)
    expect(response.body.ok).toBe(false)
    expect(response.body.error.code).toBe('EXPENSE_NOT_FOUND')
  })

  it('returns conflict from service', async () => {
    createUserExpense.mockRejectedValue(
      new AppError(409, 'Budget conflict', 'EXPENSE_BUDGET_CONFLICT')
    )

    const response = await request(app)
      .post('/')
      .set('Authorization', 'Bearer token')
      .send({
        amount: '15.00',
        spentAt: '2026-04-01T10:00:00.000Z',
      })

    expect(response.status).toBe(409)
    expect(response.body.ok).toBe(false)
    expect(response.body.error.code).toBe('EXPENSE_BUDGET_CONFLICT')
  })

  it('deletes expense on happy path', async () => {
    deleteUserExpense.mockResolvedValue(undefined)

    const response = await request(app)
      .delete('/ck1234567890abcdef1234567')
      .set('Authorization', 'Bearer token')

    expect(response.status).toBe(200)
    expect(response.body.ok).toBe(true)
    expect(response.body.data.deleted).toBe(true)
  })
})

