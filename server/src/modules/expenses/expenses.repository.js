import { prisma } from '../../config/prisma.js'

export function findCategoryByIdAndUserId(categoryId, userId) {
  return prisma.category.findFirst({
    where: { id: categoryId, userId },
  })
}

export function findExpenseByIdAndUserId(expenseId, userId) {
  return prisma.expense.findFirst({
    where: { id: expenseId, userId },
    include: { category: true },
  })
}

export async function listExpensesByUserId({
  userId,
  page,
  pageSize,
  categoryId,
  startDate,
  endDate,
}) {
  const where = {
    userId,
    ...(categoryId ? { categoryId } : {}),
    ...(startDate || endDate
      ? {
          spentAt: {
            ...(startDate ? { gte: startDate } : {}),
            ...(endDate ? { lte: endDate } : {}),
          },
        }
      : {}),
  }

  const skip = (page - 1) * pageSize

  const [expenses, total] = await prisma.$transaction([
    prisma.expense.findMany({
      where,
      include: { category: true },
      orderBy: { spentAt: 'desc' },
      skip,
      take: pageSize,
    }),
    prisma.expense.count({ where }),
  ])

  return { expenses, total }
}

export function createExpense(data) {
  return prisma.expense.create({
    data,
    include: { category: true },
  })
}

export function updateExpenseById(expenseId, data) {
  return prisma.expense.update({
    where: { id: expenseId },
    data,
    include: { category: true },
  })
}

export function deleteExpenseById(expenseId) {
  return prisma.expense.delete({
    where: { id: expenseId },
  })
}
