import { getProfile } from '../auth/auth.service.js'
import {
  getActualSpendByCategoryRange,
  getCategorySpendingByRange,
  getMonthlySpendingTrend,
  listBudgetsByMonth,
  listCategoriesByIds,
} from './reports.repository.js'

function getMonthDateRange({ month, year }) {
  const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0))
  const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999))
  return { startDate, endDate }
}

function normalizeAmount(value) {
  if (!value) {
    return '0.00'
  }

  const numeric = typeof value === 'string' ? Number(value) : Number(value.toString())
  return numeric.toFixed(2)
}

export async function getSpendingByCategoryReport(authUser, query) {
  const user = await getProfile(authUser)
  const { startDate, endDate } = getMonthDateRange(query)

  const groups = await getCategorySpendingByRange({
    userId: user.id,
    startDate,
    endDate,
  })

  const categoryIds = groups
    .map((group) => group.categoryId)
    .filter((categoryId) => Boolean(categoryId))

  const categories = await listCategoriesByIds({
    userId: user.id,
    categoryIds,
  })

  const categoryMap = new Map(categories.map((category) => [category.id, category]))

  const spendingByCategory = groups.map((group) => {
    if (!group.categoryId) {
      return {
        categoryId: null,
        name: 'Uncategorized',
        color: null,
        totalSpent: normalizeAmount(group._sum.amount),
      }
    }

    const category = categoryMap.get(group.categoryId)
    return {
      categoryId: group.categoryId,
      name: category?.name ?? 'Unknown category',
      color: category?.color ?? null,
      totalSpent: normalizeAmount(group._sum.amount),
    }
  })

  return {
    month: query.month,
    year: query.year,
    spendingByCategory,
  }
}

export async function getMonthlySpendTrendReport(authUser, query) {
  const user = await getProfile(authUser)
  const rows = await getMonthlySpendingTrend({
    userId: user.id,
    year: query.year,
  })

  const rowMap = new Map(rows.map((row) => [row.month, normalizeAmount(row.totalSpent)]))
  const trend = Array.from({ length: 12 }, (_, index) => index + 1).map((month) => ({
    month,
    totalSpent: rowMap.get(month) ?? '0.00',
  }))

  return {
    year: query.year,
    trend,
  }
}

export async function getBudgetVsActualReport(authUser, query) {
  const user = await getProfile(authUser)
  const budgets = await listBudgetsByMonth({
    userId: user.id,
    month: query.month,
    year: query.year,
  })

  const categoryIds = budgets.map((budget) => budget.categoryId)
  const { startDate, endDate } = getMonthDateRange(query)

  const spendRows = await getActualSpendByCategoryRange({
    userId: user.id,
    categoryIds,
    startDate,
    endDate,
  })

  const spentByCategory = new Map(
    spendRows.map((row) => [row.categoryId, normalizeAmount(row._sum.amount)])
  )

  const budgetVsActual = budgets.map((budget) => {
    const limitAmount = normalizeAmount(budget.limitAmount)
    const actualSpent = spentByCategory.get(budget.categoryId) ?? '0.00'
    const remaining = (Number(limitAmount) - Number(actualSpent)).toFixed(2)

    return {
      budgetId: budget.id,
      categoryId: budget.categoryId,
      categoryName: budget.category.name,
      categoryColor: budget.category.color ?? null,
      month: budget.month,
      year: budget.year,
      limitAmount,
      actualSpent,
      remaining,
    }
  })

  return {
    month: query.month,
    year: query.year,
    budgetVsActual,
  }
}

