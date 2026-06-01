import { sendSuccess } from '../../shared/http.js'
import {
  createUserExpense,
  deleteUserExpense,
  listExpenses,
  updateUserExpense,
} from './expenses.service.js'

export async function listExpensesController(req, res, next) {
  try {
    const data = await listExpenses(req.user, req.validated.query)
    sendSuccess(req, res, data)
  } catch (error) {
    next(error)
  }
}

export async function createExpenseController(req, res, next) {
  try {
    const expense = await createUserExpense(req.user, req.validated.body)
    sendSuccess(req, res, { expense }, 201)
  } catch (error) {
    next(error)
  }
}

export async function updateExpenseController(req, res, next) {
  try {
    const expense = await updateUserExpense(
      req.user,
      req.validated.params.expenseId,
      req.validated.body
    )
    sendSuccess(req, res, { expense })
  } catch (error) {
    next(error)
  }
}

export async function deleteExpenseController(req, res, next) {
  try {
    await deleteUserExpense(req.user, req.validated.params.expenseId)
    sendSuccess(req, res, { deleted: true })
  } catch (error) {
    next(error)
  }
}
