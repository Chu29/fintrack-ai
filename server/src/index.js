import 'dotenv/config'

import { app } from '../app.js'
import { env } from './config/env.js'

const PORT = env.PORT

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

async function shutdown(signal) {
  console.log(`Received ${signal}. Shutting down gracefully...`)
  server.close(async () => {
    const { prisma } = await import('./config/prisma.js')
    await prisma.$disconnect()
    process.exit(0)
  })
}

process.on('SIGTERM', () => {
  shutdown('SIGTERM')
})

process.on('SIGINT', () => {
  shutdown('SIGINT')
})
