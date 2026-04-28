import { sendSuccess } from '../../shared/http.js'
import { getBudgetsStatus } from './budgets.service.js'

export function getBudgetsStatusController(req, res) {
  const data = getBudgetsStatus()
  sendSuccess(req, res, data)
}
