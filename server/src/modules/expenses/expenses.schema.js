import { z } from 'zod'
import { emptyObjectSchema } from '../../shared/validation.js'

const amountSchema = z
  .union([z.number(), z.string()])
  .transform((value) => (typeof value === 'number' ? value.toString() : value.trim()))
  .refine((value) => /^\d+(\.\d{1,2})?$/.test(value), {
    message: 'amount must be a non-negative number with up to 2 decimal places',
  })
  .refine((value) => Number(value) > 0, {
    message: 'amount must be greater than 0',
  })
  .transform((value) => Number(value).toFixed(2))

const expenseIdParamsSchema = z
  .object({
    expenseId: z.string().cuid(),
  })
  .strict()

const listExpensesQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce.number().int().positive().max(100).default(20),
    categoryId: z.string().cuid().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
  })
  .strict()

const createExpenseBodySchema = z
  .object({
    categoryId: z.string().cuid().nullable().optional(),
    amount: amountSchema,
    note: z.string().trim().max(500).nullable().optional(),
    spentAt: z.coerce.date(),
  })
  .strict()

const updateExpenseBodySchema = z
  .object({
    categoryId: z.string().cuid().nullable().optional(),
    amount: amountSchema.optional(),
    note: z.string().trim().max(500).nullable().optional(),
    spentAt: z.coerce.date().optional(),
  })
  .strict()
  .refine((value) => Object.keys(value).length > 0, {
    message: 'body must include at least one updatable field',
  })

export const listExpensesRequestSchema = {
  params: emptyObjectSchema,
  query: listExpensesQuerySchema,
  body: emptyObjectSchema,
}

export const createExpenseRequestSchema = {
  params: emptyObjectSchema,
  query: emptyObjectSchema,
  body: createExpenseBodySchema,
}

export const updateExpenseRequestSchema = {
  params: expenseIdParamsSchema,
  query: emptyObjectSchema,
  body: updateExpenseBodySchema,
}

export const deleteExpenseRequestSchema = {
  params: expenseIdParamsSchema,
  query: emptyObjectSchema,
  body: emptyObjectSchema,
}
