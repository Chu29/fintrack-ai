import { sendSuccess } from '../../shared/http.js'
import { deleteUserBudget, listBudgets, upsertUserBudget } from './budgets.service.js'

export async function listBudgetsController(req, res, next) {
  try {
    const data = await listBudgets(req.user, req.validated.query)
    sendSuccess(req, res, data)
  } catch (error) {
    next(error)
  }
}

export async function upsertBudgetController(req, res, next) {
  try {
    const budget = await upsertUserBudget(req.user, req.validated.body)
    sendSuccess(req, res, { budget })
  } catch (error) {
    next(error)
  }
}

export async function deleteBudgetController(req, res, next) {
  try {
    await deleteUserBudget(req.user, req.validated.params.budgetId)
    sendSuccess(req, res, { deleted: true })
  } catch (error) {
    next(error)
  }
}
