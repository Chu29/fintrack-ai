import { sendSuccess } from '../../shared/http.js'
import {
  createUserCategory,
  deleteUserCategory,
  listCategories,
  updateUserCategory,
} from './categories.service.js'

export async function listCategoriesController(req, res, next) {
  try {
    const categories = await listCategories(req.user)
    sendSuccess(req, res, { categories })
  } catch (error) {
    next(error)
  }
}

export async function createCategoryController(req, res, next) {
  try {
    const category = await createUserCategory(req.user, req.validated.body)
    sendSuccess(req, res, { category }, 201)
  } catch (error) {
    next(error)
  }
}

export async function updateCategoryController(req, res, next) {
  try {
    const category = await updateUserCategory(
      req.user,
      req.validated.params.categoryId,
      req.validated.body
    )
    sendSuccess(req, res, { category })
  } catch (error) {
    next(error)
  }
}

export async function deleteCategoryController(req, res, next) {
  try {
    await deleteUserCategory(req.user, req.validated.params.categoryId)
    sendSuccess(req, res, { deleted: true })
  } catch (error) {
    next(error)
  }
}
