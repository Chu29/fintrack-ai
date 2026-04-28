import { Router } from 'express'
import { validateRequest } from '../../middleware/validateRequest.js'
import { getAuthStatusController } from './auth.controller.js'
import { authStatusRequestSchema } from './auth.schema.js'

export const authRouter = Router()

authRouter.get('/', validateRequest(authStatusRequestSchema), getAuthStatusController)
