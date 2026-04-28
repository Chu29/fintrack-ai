import 'dotenv/config'
import { prisma } from '../src/config/prisma.js'

async function upsertUser({ email, name, avatarUrl, firebaseUid }) {
  const user = await prisma.user.upsert({
    where: { email },
    update: { name, avatarUrl },
    create: { email, name, avatarUrl },
  })

  await prisma.oAuthAccount.upsert({
    where: {
      provider_providerAccountId: {
        provider: 'firebase',
        providerAccountId: firebaseUid,
      },
    },
    update: { userId: user.id },
    create: {
      userId: user.id,
      provider: 'firebase',
      providerAccountId: firebaseUid,
    },
  })

  return user
}

async function upsertCategory({ userId, name, color }) {
  return prisma.category.upsert({
    where: {
      userId_name: { userId, name },
    },
    update: { color },
    create: { userId, name, color },
  })
}

async function upsertBudget({ userId, categoryId, month, year, limitAmount }) {
  return prisma.budget.upsert({
    where: {
      userId_categoryId_month_year: { userId, categoryId, month, year },
    },
    update: { limitAmount },
    create: { userId, categoryId, month, year, limitAmount },
  })
}

async function ensureExpense({ userId, categoryId, amount, note, spentAt }) {
  const existing = await prisma.expense.findFirst({
    where: { userId, categoryId, amount, note, spentAt },
  })

  if (existing) {
    return existing
  }

  return prisma.expense.create({
    data: { userId, categoryId, amount, note, spentAt },
  })
}

async function seedUserData(user, month, year) {
  const categories = {
    food: await upsertCategory({
      userId: user.id,
      name: 'Food',
      color: '#f59e0b',
    }),
    transport: await upsertCategory({
      userId: user.id,
      name: 'Transport',
      color: '#3b82f6',
    }),
    utilities: await upsertCategory({
      userId: user.id,
      name: 'Utilities',
      color: '#8b5cf6',
    }),
    leisure: await upsertCategory({
      userId: user.id,
      name: 'Leisure',
      color: '#10b981',
    }),
  }

  await Promise.all([
    upsertBudget({
      userId: user.id,
      categoryId: categories.food.id,
      month,
      year,
      limitAmount: '450.00',
    }),
    upsertBudget({
      userId: user.id,
      categoryId: categories.transport.id,
      month,
      year,
      limitAmount: '180.00',
    }),
    upsertBudget({
      userId: user.id,
      categoryId: categories.utilities.id,
      month,
      year,
      limitAmount: '220.00',
    }),
  ])

  const baseDate = new Date(Date.UTC(year, month - 1, 1, 12, 0, 0, 0))
  const dayMs = 24 * 60 * 60 * 1000

  await Promise.all([
    ensureExpense({
      userId: user.id,
      categoryId: categories.food.id,
      amount: '48.50',
      note: '[seed] Weekly groceries',
      spentAt: new Date(baseDate.getTime() + dayMs * 1),
    }),
    ensureExpense({
      userId: user.id,
      categoryId: categories.transport.id,
      amount: '23.40',
      note: '[seed] Metro pass top-up',
      spentAt: new Date(baseDate.getTime() + dayMs * 3),
    }),
    ensureExpense({
      userId: user.id,
      categoryId: categories.utilities.id,
      amount: '95.00',
      note: '[seed] Electricity bill',
      spentAt: new Date(baseDate.getTime() + dayMs * 5),
    }),
    ensureExpense({
      userId: user.id,
      categoryId: categories.leisure.id,
      amount: '32.00',
      note: '[seed] Weekend movie',
      spentAt: new Date(baseDate.getTime() + dayMs * 8),
    }),
    ensureExpense({
      userId: user.id,
      categoryId: null,
      amount: '15.75',
      note: '[seed] Miscellaneous cash expense',
      spentAt: new Date(baseDate.getTime() + dayMs * 10),
    }),
  ])
}

async function main() {
  const now = new Date()
  const month = now.getUTCMonth() + 1
  const year = now.getUTCFullYear()

  const users = await Promise.all([
    upsertUser({
      email: 'alice.seed@fintrack.dev',
      name: 'Alice Seed',
      avatarUrl: 'https://i.pravatar.cc/150?img=5',
      firebaseUid: 'seed-firebase-uid-alice',
    }),
    upsertUser({
      email: 'bob.seed@fintrack.dev',
      name: 'Bob Seed',
      avatarUrl: 'https://i.pravatar.cc/150?img=12',
      firebaseUid: 'seed-firebase-uid-bob',
    }),
  ])

  await Promise.all(users.map((user) => seedUserData(user, month, year)))

  console.log(`Seed completed for ${users.length} users (${month}/${year}).`)
}

main()
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

