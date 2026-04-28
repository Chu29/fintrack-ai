import { sendSuccess } from '../../shared/http.js'
import { getAuthStatus } from './auth.service.js'

export function getAuthStatusController(req, res) {
  const data = getAuthStatus()
  sendSuccess(req, res, data)
}
