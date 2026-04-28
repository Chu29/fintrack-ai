import { z } from 'zod'
import { emptyObjectSchema } from '../../shared/validation.js'

const monthSchema = z.coerce.number().int().min(1).max(12)
const yearSchema = z.coerce.number().int().min(2000).max(9999)

const monthYearQuerySchema = z
  .object({
    month: monthSchema,
    year: yearSchema,
  })
  .strict()

const yearlyQuerySchema = z
  .object({
    year: yearSchema,
  })
  .strict()

export const spendingByCategoryRequestSchema = {
  params: emptyObjectSchema,
  query: monthYearQuerySchema,
  body: emptyObjectSchema,
}

export const monthlySpendTrendRequestSchema = {
  params: emptyObjectSchema,
  query: yearlyQuerySchema,
  body: emptyObjectSchema,
}

export const budgetVsActualRequestSchema = {
  params: emptyObjectSchema,
  query: monthYearQuerySchema,
  body: emptyObjectSchema,
}

