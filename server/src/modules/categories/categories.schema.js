import { z } from 'zod'
import { emptyObjectSchema } from '../../shared/validation.js'

const categoryIdParamsSchema = z
  .object({
    categoryId: z.string().cuid(),
  })
  .strict()

const categoryBodySchema = z
  .object({
    name: z.string().trim().min(1).max(80),
    color: z.string().trim().min(1).max(32).nullable().optional(),
  })
  .strict()

export const listCategoriesRequestSchema = {
  params: emptyObjectSchema,
  query: emptyObjectSchema,
  body: emptyObjectSchema,
}

export const createCategoryRequestSchema = {
  params: emptyObjectSchema,
  query: emptyObjectSchema,
  body: categoryBodySchema,
}

export const updateCategoryRequestSchema = {
  params: categoryIdParamsSchema,
  query: emptyObjectSchema,
  body: categoryBodySchema,
}

export const deleteCategoryRequestSchema = {
  params: categoryIdParamsSchema,
  query: emptyObjectSchema,
  body: emptyObjectSchema,
}
