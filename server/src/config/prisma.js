import { PrismaPg } from '@prisma/adapter-pg'
import prismaClientPackage from '../generated/prisma/client.js'
import { env } from './env.js'

const { PrismaClient } = prismaClientPackage
const globalForPrisma = globalThis

function createPrismaClient() {
  const adapter = new PrismaPg({ connectionString: env.DATABASE_URL })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.__prisma ?? createPrismaClient()

if (env.NODE_ENV !== 'production') {
  globalForPrisma.__prisma = prisma
}
