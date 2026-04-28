import { sendSuccess } from '../../shared/http.js'
import { getExpensesStatus } from './expenses.service.js'

export function getExpensesStatusController(req, res) {
  const data = getExpensesStatus()
  sendSuccess(req, res, data)
}
