import { AppError } from '../../middleware/errors.js'
import { getProfile } from '../auth/auth.service.js'
import {
  createExpense,
  deleteExpenseById,
  findCategoryByIdAndUserId,
  findExpenseByIdAndUserId,
  listExpensesByUserId,
  updateExpenseById,
} from './expenses.repository.js'

async function getCurrentUser(authUser) {
  return getProfile(authUser)
}

function toExpenseAmountString(value) {
  return typeof value === 'string' ? value : value.toString()
}

function serializeExpense(expense) {
  return {
    ...expense,
    amount: toExpenseAmountString(expense.amount),
    spentAt: expense.spentAt.toISOString(),
  }
}

async function assertCategoryOwnership(userId, categoryId) {
  if (!categoryId) {
    return
  }

  const category = await findCategoryByIdAndUserId(categoryId, userId)
  if (!category) {
    throw new AppError(404, 'Category not found', 'CATEGORY_NOT_FOUND')
  }
}

export async function listExpenses(authUser, query) {
  const user = await getCurrentUser(authUser)

  if (query.startDate && query.endDate && query.startDate > query.endDate) {
    throw new AppError(
      400,
      'startDate must be less than or equal to endDate',
      'INVALID_DATE_RANGE'
    )
  }

  if (query.categoryId) {
    await assertCategoryOwnership(user.id, query.categoryId)
  }

  const { expenses, total } = await listExpensesByUserId({
    userId: user.id,
    page: query.page,
    pageSize: query.pageSize,
    categoryId: query.categoryId,
    startDate: query.startDate,
    endDate: query.endDate,
  })

  const totalPages = Math.ceil(total / query.pageSize)

  return {
    expenses: expenses.map(serializeExpense),
    pagination: {
      page: query.page,
      pageSize: query.pageSize,
      total,
      totalPages,
    },
  }
}

export async function createUserExpense(authUser, input) {
  const user = await getCurrentUser(authUser)
  await assertCategoryOwnership(user.id, input.categoryId ?? null)

  const expense = await createExpense({
    userId: user.id,
    categoryId: input.categoryId ?? null,
    amount: input.amount,
    note: input.note ?? null,
    spentAt: input.spentAt,
  })

  return serializeExpense(expense)
}

export async function updateUserExpense(authUser, expenseId, input) {
  const user = await getCurrentUser(authUser)

  const existingExpense = await findExpenseByIdAndUserId(expenseId, user.id)
  if (!existingExpense) {
    throw new AppError(404, 'Expense not found', 'EXPENSE_NOT_FOUND')
  }

  if (input.categoryId !== undefined) {
    await assertCategoryOwnership(user.id, input.categoryId)
  }

  const expense = await updateExpenseById(existingExpense.id, {
    ...(input.categoryId !== undefined ? { categoryId: input.categoryId } : {}),
    ...(input.amount !== undefined ? { amount: input.amount } : {}),
    ...(input.note !== undefined ? { note: input.note } : {}),
    ...(input.spentAt !== undefined ? { spentAt: input.spentAt } : {}),
  })

  return serializeExpense(expense)
}

export async function deleteUserExpense(authUser, expenseId) {
  const user = await getCurrentUser(authUser)

  const existingExpense = await findExpenseByIdAndUserId(expenseId, user.id)
  if (!existingExpense) {
    throw new AppError(404, 'Expense not found', 'EXPENSE_NOT_FOUND')
  }

  await deleteExpenseById(existingExpense.id)
}
