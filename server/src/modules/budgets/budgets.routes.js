import { Router } from 'express'
import { validateRequest } from '../../middleware/validateRequest.js'
import { getBudgetsStatusController } from './budgets.controller.js'
import { budgetsStatusRequestSchema } from './budgets.schema.js'

export const budgetsRouter = Router()

budgetsRouter.get(
  '/',
  validateRequest(budgetsStatusRequestSchema),
  getBudgetsStatusController
)
