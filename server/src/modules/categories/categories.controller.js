import { sendSuccess } from '../../shared/http.js'
import { getCategoriesStatus } from './categories.service.js'

export function getCategoriesStatusController(req, res) {
  const data = getCategoriesStatus()
  sendSuccess(req, res, data)
}
