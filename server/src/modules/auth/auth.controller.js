import { sendSuccess } from '../../shared/http.js'
import { createSession, getProfile, logout } from './auth.service.js'

export async function createSessionController(req, res, next) {
  try {
    const user = await createSession(req.user)
    sendSuccess(req, res, { user })
  } catch (error) {
    next(error)
  }
}

export async function getMeController(req, res, next) {
  try {
    const user = await getProfile(req.user)
    sendSuccess(req, res, { user })
  } catch (error) {
    next(error)
  }
}

export function logoutController(req, res) {
  const data = logout()
  sendSuccess(req, res, data)
}
