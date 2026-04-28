import { AppError } from '../../middleware/errors.js'
import { getProfile } from '../auth/auth.service.js'
import {
  deleteBudgetById,
  findBudgetByIdAndUserId,
  findCategoryByIdAndUserId,
  listBudgetsByUserAndMonth,
  upsertBudgetByScope,
} from './budgets.repository.js'

async function getCurrentUser(authUser) {
  return getProfile(authUser)
}

function serializeBudget(budget) {
  return {
    ...budget,
    limitAmount: budget.limitAmount.toString(),
  }
}

async function assertCategoryOwnership(userId, categoryId) {
  const category = await findCategoryByIdAndUserId(categoryId, userId)
  if (!category) {
    throw new AppError(404, 'Category not found', 'CATEGORY_NOT_FOUND')
  }
}

export async function listBudgets(authUser, query) {
  const user = await getCurrentUser(authUser)
  const budgets = await listBudgetsByUserAndMonth({
    userId: user.id,
    month: query.month,
    year: query.year,
  })

  return { budgets: budgets.map(serializeBudget) }
}

export async function upsertUserBudget(authUser, input) {
  const user = await getCurrentUser(authUser)
  await assertCategoryOwnership(user.id, input.categoryId)

  try {
    const budget = await upsertBudgetByScope({
      userId: user.id,
      categoryId: input.categoryId,
      month: input.month,
      year: input.year,
      limitAmount: input.limitAmount,
    })

    return serializeBudget(budget)
  } catch (error) {
    if (error?.code === 'P2002') {
      throw new AppError(
        409,
        'Budget already exists for category and month/year',
        'BUDGET_SCOPE_CONFLICT'
      )
    }

    throw error
  }
}

export async function deleteUserBudget(authUser, budgetId) {
  const user = await getCurrentUser(authUser)
  const budget = await findBudgetByIdAndUserId(budgetId, user.id)
  if (!budget) {
    throw new AppError(404, 'Budget not found', 'BUDGET_NOT_FOUND')
  }

  await deleteBudgetById(budget.id)
}
