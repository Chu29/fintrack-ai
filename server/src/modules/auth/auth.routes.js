import { Router } from 'express'
import { validateRequest } from '../../middleware/validateRequest.js'
import { authenticate } from '../../middleware/authenticate.js'
import {
  createSessionController,
  getMeController,
  logoutController,
} from './auth.controller.js'
import {
  createSessionRequestSchema,
  getMeRequestSchema,
  logoutRequestSchema,
} from './auth.schema.js'

export const authRouter = Router()

authRouter.post(
  '/session',
  validateRequest(createSessionRequestSchema),
  authenticate,
  createSessionController
)
authRouter.get('/me', validateRequest(getMeRequestSchema), authenticate, getMeController)
authRouter.post(
  '/logout',
  validateRequest(logoutRequestSchema),
  authenticate,
  logoutController
)
