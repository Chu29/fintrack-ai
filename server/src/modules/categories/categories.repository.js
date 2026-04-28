import { prisma } from '../../config/prisma.js'

export function listCategoriesByUserId(userId) {
  return prisma.category.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

export function findCategoryByIdAndUserId(categoryId, userId) {
  return prisma.category.findFirst({
    where: { id: categoryId, userId },
  })
}

export function findCategoryByNameAndUserId(name, userId) {
  return prisma.category.findFirst({
    where: { name, userId },
  })
}

export function createCategory({ userId, name, color }) {
  return prisma.category.create({
    data: { userId, name, color },
  })
}

export function updateCategoryById(categoryId, data) {
  return prisma.category.update({
    where: { id: categoryId },
    data,
  })
}

export function countBudgetsUsingCategory(categoryId, userId) {
  return prisma.budget.count({
    where: { categoryId, userId },
  })
}

export function deleteCategoryById(categoryId) {
  return prisma.category.delete({
    where: { id: categoryId },
  })
}
