import { Router } from 'express'
import { validateRequest } from '../../middleware/validateRequest.js'
import { getCategoriesStatusController } from './categories.controller.js'
import { categoriesStatusRequestSchema } from './categories.schema.js'

export const categoriesRouter = Router()

categoriesRouter.get(
  '/',
  validateRequest(categoriesStatusRequestSchema),
  getCategoriesStatusController
)
