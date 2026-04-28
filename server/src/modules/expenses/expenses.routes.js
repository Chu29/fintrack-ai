import { Router } from 'express'
import { validateRequest } from '../../middleware/validateRequest.js'
import { getExpensesStatusController } from './expenses.controller.js'
import { expensesStatusRequestSchema } from './expenses.schema.js'

export const expensesRouter = Router()

expensesRouter.get(
  '/',
  validateRequest(expensesStatusRequestSchema),
  getExpensesStatusController
)
