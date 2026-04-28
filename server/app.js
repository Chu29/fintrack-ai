import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import PinoHttp from 'pino-http'
import { env } from './src/config/env.js'
import { requestIdMiddleware } from './src/middleware/requestId.js'
import { notFoundHandler, errorHandler } from './src/middleware/errors.js'
import { apiRouter } from './src/routes/api.js'
import { sendSuccess } from './src/shared/http.js'

export const app = express()

app.use(helmet())
app.use(cors({ origin: env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(PinoHttp())
app.use(requestIdMiddleware)

app.get('/health', (req, res) => {
  sendSuccess(req, res, {
    service: 'fintrack-api',
    uptime: process.uptime(),
  })
})

app.use('/api', apiRouter)
app.use(notFoundHandler)
app.use(errorHandler)
