import { Router } from 'express'
import { validateRequest } from '../../middleware/validateRequest.js'
import { authenticate } from '../../middleware/authenticate.js'
import {
  createCategoryController,
  deleteCategoryController,
  listCategoriesController,
  updateCategoryController,
} from './categories.controller.js'
import {
  createCategoryRequestSchema,
  deleteCategoryRequestSchema,
  listCategoriesRequestSchema,
  updateCategoryRequestSchema,
} from './categories.schema.js'

export const categoriesRouter = Router()

categoriesRouter.get(
  '/',
  validateRequest(listCategoriesRequestSchema),
  authenticate,
  listCategoriesController
)
categoriesRouter.post(
  '/',
  validateRequest(createCategoryRequestSchema),
  authenticate,
  createCategoryController
)
categoriesRouter.patch(
  '/:categoryId',
  validateRequest(updateCategoryRequestSchema),
  authenticate,
  updateCategoryController
)
categoriesRouter.delete(
  '/:categoryId',
  validateRequest(deleteCategoryRequestSchema),
  authenticate,
  deleteCategoryController
)
