import { sendSuccess } from '../../shared/http.js'
import {
  getBudgetVsActualReport,
  getMonthlySpendTrendReport,
  getSpendingByCategoryReport,
} from './reports.service.js'

export async function getSpendingByCategoryController(req, res, next) {
  try {
    const data = await getSpendingByCategoryReport(req.user, req.validated.query)
    sendSuccess(req, res, data)
  } catch (error) {
    next(error)
  }
}

export async function getMonthlySpendTrendController(req, res, next) {
  try {
    const data = await getMonthlySpendTrendReport(req.user, req.validated.query)
    sendSuccess(req, res, data)
  } catch (error) {
    next(error)
  }
}

export async function getBudgetVsActualController(req, res, next) {
  try {
    const data = await getBudgetVsActualReport(req.user, req.validated.query)
    sendSuccess(req, res, data)
  } catch (error) {
    next(error)
  }
}

