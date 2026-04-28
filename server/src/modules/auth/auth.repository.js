import { prisma } from '../../config/prisma.js'

export function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  })
}

export function createUserByEmail(email) {
  return prisma.user.create({
    data: { email },
  })
}

export function findFirebaseAccountWithUser(uid) {
  return prisma.oAuthAccount.findUnique({
    where: {
      provider_providerAccountId: {
        provider: 'firebase',
        providerAccountId: uid,
      },
    },
    include: {
      user: true,
    },
  })
}

export function createFirebaseAccount({ userId, uid }) {
  return prisma.oAuthAccount.create({
    data: {
      userId,
      provider: 'firebase',
      providerAccountId: uid,
    },
  })
}
