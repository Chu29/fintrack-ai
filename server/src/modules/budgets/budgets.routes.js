import { Router } from 'express'
import { validateRequest } from '../../middleware/validateRequest.js'
import { authenticate } from '../../middleware/authenticate.js'
import {
  deleteBudgetController,
  listBudgetsController,
  upsertBudgetController,
} from './budgets.controller.js'
import {
  deleteBudgetRequestSchema,
  listBudgetsRequestSchema,
  upsertBudgetRequestSchema,
} from './budgets.schema.js'

export const budgetsRouter = Router()

budgetsRouter.get(
  '/',
  validateRequest(listBudgetsRequestSchema),
  authenticate,
  listBudgetsController
)
budgetsRouter.put(
  '/',
  validateRequest(upsertBudgetRequestSchema),
  authenticate,
  upsertBudgetController
)
budgetsRouter.delete(
  '/:budgetId',
  validateRequest(deleteBudgetRequestSchema),
  authenticate,
  deleteBudgetController
)
