import express from 'express'
import { errorHandler, notFoundHandler } from '../middleware/errors.js'
import { requestIdMiddleware } from '../middleware/requestId.js'

export function createTestApp(router, mountPath = '/') {
  const app = express()
  app.use(express.json())
  app.use(requestIdMiddleware)
  app.use(mountPath, router)
  app.use(notFoundHandler)
  app.use(errorHandler)
  return app
}

