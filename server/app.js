import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import PinoHttp from 'pino-http'
import { requestIdMiddleware } from './src/middleware/requestId.js'
import { notFoundHandler, errorHandler } from './src/middleware/errors.js'
// import { apiRouter } from './src/routes/api.js'

export const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(PinoHttp())
app.use(requestIdMiddleware)

app.get('/health', (req, res) => {
  res.status(200).json({
    ok: true,
    service: 'fintrack-api',
    uptime: process.uptime(),
    requestId: req.requestId,
  })
})

// app.use('/api', apiRouter)
app.use(notFoundHandler)
app.use(errorHandler)
