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

vi.mock('./reports.service.js', () => ({
  getSpendingByCategoryReport: vi.fn(),
  getMonthlySpendTrendReport: vi.fn(),
  getBudgetVsActualReport: vi.fn(),
}))

import { reportsRouter } from './reports.routes.js'
import {
  getBudgetVsActualReport,
  getMonthlySpendTrendReport,
  getSpendingByCategoryReport,
} from './reports.service.js'

const app = createTestApp(reportsRouter)

afterEach(() => {
  vi.clearAllMocks()
})

describe('reports routes', () => {
  it('returns spending-by-category on happy path', async () => {
    getSpendingByCategoryReport.mockResolvedValue({
      month: 4,
      year: 2026,
      spendingByCategory: [{ categoryId: null, name: 'Uncategorized', totalSpent: '20.00' }],
    })

    const response = await request(app)
      .get('/spending-by-category?month=4&year=2026')
      .set('Authorization', 'Bearer token')

    expect(response.status).toBe(200)
    expect(response.body.ok).toBe(true)
    expect(response.body.data.spendingByCategory).toHaveLength(1)
  })

  it('returns validation error for invalid query', async () => {
    const response = await request(app)
      .get('/spending-by-category?month=0&year=2026')
      .set('Authorization', 'Bearer token')

    expect(response.status).toBe(400)
    expect(response.body.ok).toBe(false)
    expect(response.body.error.code).toBe('VALIDATION_ERROR')
  })

  it('returns unauthorized when header is missing', async () => {
    const response = await request(app).get('/monthly-spend-trend?year=2026')

    expect(response.status).toBe(401)
    expect(response.body.ok).toBe(false)
    expect(response.body.error.code).toBe('UNAUTHORIZED')
  })

  it('returns not found from service', async () => {
    getBudgetVsActualReport.mockRejectedValue(
      new AppError(404, 'Report source not found', 'REPORT_SOURCE_NOT_FOUND')
    )

    const response = await request(app)
      .get('/budget-vs-actual?month=4&year=2026')
      .set('Authorization', 'Bearer token')

    expect(response.status).toBe(404)
    expect(response.body.ok).toBe(false)
    expect(response.body.error.code).toBe('REPORT_SOURCE_NOT_FOUND')
  })

  it('returns conflict from service', async () => {
    getMonthlySpendTrendReport.mockRejectedValue(
      new AppError(409, 'Report conflict', 'REPORT_CONFLICT')
    )

    const response = await request(app)
      .get('/monthly-spend-trend?year=2026')
      .set('Authorization', 'Bearer token')

    expect(response.status).toBe(409)
    expect(response.body.ok).toBe(false)
    expect(response.body.error.code).toBe('REPORT_CONFLICT')
  })
})

