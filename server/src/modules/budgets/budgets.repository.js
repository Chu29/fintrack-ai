import { prisma } from '../../config/prisma.js'

export function findCategoryByIdAndUserId(categoryId, userId) {
  return prisma.category.findFirst({
    where: { id: categoryId, userId },
  })
}

export function listBudgetsByUserAndMonth({ userId, month, year }) {
  return prisma.budget.findMany({
    where: { userId, month, year },
    include: {
      category: true,
    },
    orderBy: { createdAt: 'desc' },
  })
}

export function upsertBudgetByScope({
  userId,
  categoryId,
  month,
  year,
  limitAmount,
}) {
  return prisma.budget.upsert({
    where: {
      userId_categoryId_month_year: {
        userId,
        categoryId,
        month,
        year,
      },
    },
    update: { limitAmount },
    create: {
      userId,
      categoryId,
      month,
      year,
      limitAmount,
    },
    include: { category: true },
  })
}

export function findBudgetByIdAndUserId(budgetId, userId) {
  return prisma.budget.findFirst({
    where: { id: budgetId, userId },
    include: { category: true },
  })
}

export function deleteBudgetById(budgetId) {
  return prisma.budget.delete({
    where: { id: budgetId },
  })
}

export async function listBudgetsWithSpendingByUserAndMonth({
  userId,
  month,
  year,
}) {
  const budgets = await prisma.budget.findMany({
    where: { userId, month, year },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })

  // Get spending for each budget category
  const startDate = new Date(Date.UTC(year, month - 1, 1))
  const endDate = new Date(Date.UTC(year, month, 1))

  const spendingByCategory = await prisma.expense.groupBy({
    by: ['categoryId'],
    where: {
      userId,
      spentAt: {
        gte: startDate,
        lt: endDate,
      },
    },
    _sum: {
      amount: true,
    },
  })

  const spendingMap = new Map(
    spendingByCategory.map((item) => [
      item.categoryId,
      item._sum.amount?.toString() || '0',
    ]),
  )

  return budgets.map((budget) => ({
    ...budget,
    actualSpent: spendingMap.get(budget.categoryId) || '0',
  }))
}
