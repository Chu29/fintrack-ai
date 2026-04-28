import { Router } from 'express'
import { authenticate } from '../../middleware/authenticate.js'
import { validateRequest } from '../../middleware/validateRequest.js'
import {
  getBudgetVsActualController,
  getMonthlySpendTrendController,
  getSpendingByCategoryController,
} from './reports.controller.js'
import {
  budgetVsActualRequestSchema,
  monthlySpendTrendRequestSchema,
  spendingByCategoryRequestSchema,
} from './reports.schema.js'

export const reportsRouter = Router()

reportsRouter.get(
  '/spending-by-category',
  validateRequest(spendingByCategoryRequestSchema),
  authenticate,
  getSpendingByCategoryController
)

reportsRouter.get(
  '/monthly-spend-trend',
  validateRequest(monthlySpendTrendRequestSchema),
  authenticate,
  getMonthlySpendTrendController
)

reportsRouter.get(
  '/budget-vs-actual',
  validateRequest(budgetVsActualRequestSchema),
  authenticate,
  getBudgetVsActualController
)

