import { prisma } from '../../config/prisma.js'

export function getCategorySpendingByRange({ userId, startDate, endDate }) {
  return prisma.expense.groupBy({
    by: ['categoryId'],
    where: {
      userId,
      spentAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    _sum: {
      amount: true,
    },
  })
}

export function listCategoriesByIds({ userId, categoryIds }) {
  if (categoryIds.length === 0) {
    return []
  }

  return prisma.category.findMany({
    where: {
      userId,
      id: { in: categoryIds },
    },
    select: {
      id: true,
      name: true,
      color: true,
    },
  })
}

export function getMonthlySpendingTrend({ userId, year }) {
  return prisma.$queryRaw`
    SELECT
      EXTRACT(MONTH FROM "spentAt")::int AS month,
      COALESCE(SUM("amount"), 0)::text AS "totalSpent"
    FROM "Expense"
    WHERE "userId" = ${userId}
      AND EXTRACT(YEAR FROM "spentAt")::int = ${year}
    GROUP BY month
    ORDER BY month ASC
  `
}

export function listBudgetsByMonth({ userId, month, year }) {
  return prisma.budget.findMany({
    where: {
      userId,
      month,
      year,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          color: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export function getActualSpendByCategoryRange({ userId, categoryIds, startDate, endDate }) {
  if (categoryIds.length === 0) {
    return []
  }

  return prisma.expense.groupBy({
    by: ['categoryId'],
    where: {
      userId,
      categoryId: { in: categoryIds },
      spentAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    _sum: {
      amount: true,
    },
  })
}

