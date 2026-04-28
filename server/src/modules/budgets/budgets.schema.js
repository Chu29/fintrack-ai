import { z } from 'zod'
import { emptyObjectSchema } from '../../shared/validation.js'

const monthSchema = z.coerce.number().int().min(1).max(12)
const yearSchema = z.coerce.number().int().min(2000).max(9999)

const limitAmountSchema = z
  .union([z.number(), z.string()])
  .transform((value) => (typeof value === 'number' ? value.toString() : value.trim()))
  .refine((value) => /^\d+(\.\d{1,2})?$/.test(value), {
    message: 'limitAmount must be a non-negative number with up to 2 decimal places',
  })
  .transform((value) => Number(value).toFixed(2))

const budgetIdParamsSchema = z
  .object({
    budgetId: z.string().cuid(),
  })
  .strict()

const listBudgetsQuerySchema = z
  .object({
    month: monthSchema,
    year: yearSchema,
  })
  .strict()

const upsertBudgetBodySchema = z
  .object({
    categoryId: z.string().cuid(),
    month: monthSchema,
    year: yearSchema,
    limitAmount: limitAmountSchema,
  })
  .strict()

export const listBudgetsRequestSchema = {
  params: emptyObjectSchema,
  query: listBudgetsQuerySchema,
  body: emptyObjectSchema,
}

export const upsertBudgetRequestSchema = {
  params: emptyObjectSchema,
  query: emptyObjectSchema,
  body: upsertBudgetBodySchema,
}

export const deleteBudgetRequestSchema = {
  params: budgetIdParamsSchema,
  query: emptyObjectSchema,
  body: emptyObjectSchema,
}
