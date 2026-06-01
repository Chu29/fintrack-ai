import { AppError } from '../../middleware/errors.js'
import { getProfile } from '../auth/auth.service.js'
import {
  countBudgetsUsingCategory,
  createCategory,
  deleteCategoryById,
  findCategoryByIdAndUserId,
  findCategoryByNameAndUserId,
  listCategoriesByUserId,
  updateCategoryById,
} from './categories.repository.js'

async function getCurrentUser(authUser) {
  return getProfile(authUser)
}

async function assertCategoryNameAvailable({ userId, name, excludeCategoryId = null }) {
  const existingCategory = await findCategoryByNameAndUserId(name, userId)
  if (!existingCategory) {
    return
  }

  if (excludeCategoryId && existingCategory.id === excludeCategoryId) {
    return
  }

  throw new AppError(
    409,
    'Category name already exists for this user',
    'CATEGORY_NAME_CONFLICT'
  )
}

export async function listCategories(authUser) {
  const user = await getCurrentUser(authUser)
  return listCategoriesByUserId(user.id)
}

export async function createUserCategory(authUser, input) {
  const user = await getCurrentUser(authUser)
  await assertCategoryNameAvailable({ userId: user.id, name: input.name })

  try {
    return createCategory({
      userId: user.id,
      name: input.name,
      color: input.color ?? null,
    })
  } catch (error) {
    if (error?.code === 'P2002') {
      throw new AppError(
        409,
        'Category name already exists for this user',
        'CATEGORY_NAME_CONFLICT'
      )
    }

    throw error
  }
}

export async function updateUserCategory(authUser, categoryId, input) {
  const user = await getCurrentUser(authUser)
  const category = await findCategoryByIdAndUserId(categoryId, user.id)
  if (!category) {
    throw new AppError(404, 'Category not found', 'CATEGORY_NOT_FOUND')
  }

  await assertCategoryNameAvailable({
    userId: user.id,
    name: input.name,
    excludeCategoryId: category.id,
  })

  try {
    return updateCategoryById(category.id, {
      name: input.name,
      color: input.color ?? null,
    })
  } catch (error) {
    if (error?.code === 'P2002') {
      throw new AppError(
        409,
        'Category name already exists for this user',
        'CATEGORY_NAME_CONFLICT'
      )
    }

    throw error
  }
}

export async function deleteUserCategory(authUser, categoryId) {
  const user = await getCurrentUser(authUser)
  const category = await findCategoryByIdAndUserId(categoryId, user.id)
  if (!category) {
    throw new AppError(404, 'Category not found', 'CATEGORY_NOT_FOUND')
  }

  const budgetsCount = await countBudgetsUsingCategory(category.id, user.id)
  if (budgetsCount > 0) {
    throw new AppError(
      409,
      'Category is used by active budgets and must be reassigned first',
      'CATEGORY_IN_USE_BY_BUDGETS'
    )
  }

  await deleteCategoryById(category.id)
}
