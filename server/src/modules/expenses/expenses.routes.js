import { Router } from 'express'
import { validateRequest } from '../../middleware/validateRequest.js'
import { authenticate } from '../../middleware/authenticate.js'
import {
  createExpenseController,
  deleteExpenseController,
  listExpensesController,
  updateExpenseController,
} from './expenses.controller.js'
import {
  createExpenseRequestSchema,
  deleteExpenseRequestSchema,
  listExpensesRequestSchema,
  updateExpenseRequestSchema,
} from './expenses.schema.js'

export const expensesRouter = Router()

expensesRouter.get(
  '/',
  validateRequest(listExpensesRequestSchema),
  authenticate,
  listExpensesController
)
expensesRouter.post(
  '/',
  validateRequest(createExpenseRequestSchema),
  authenticate,
  createExpenseController
)
expensesRouter.patch(
  '/:expenseId',
  validateRequest(updateExpenseRequestSchema),
  authenticate,
  updateExpenseController
)
expensesRouter.delete(
  '/:expenseId',
  validateRequest(deleteExpenseRequestSchema),
  authenticate,
  deleteExpenseController
)
