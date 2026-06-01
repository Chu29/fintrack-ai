import { AppError } from '../../middleware/errors.js'
import { prisma } from '../../config/prisma.js'
import {
  createFirebaseAccount,
  createUserByEmail,
  findFirebaseAccountWithUser,
  findUserByEmail,
} from './auth.repository.js'

async function findOrCreateUserByEmail(email) {
  const existingUser = await findUserByEmail(email)
  if (existingUser) {
    return existingUser
  }

  return createUserByEmail(email)
}

export async function createSession(authUser) {
  const user = await findOrCreateUserByEmail(authUser.email)
  const firebaseAccount = await findFirebaseAccountWithUser(authUser.uid)

  if (firebaseAccount && firebaseAccount.userId !== user.id) {
    throw new AppError(
      409,
      'Firebase account is linked to another user',
      'AUTH_PROVIDER_CONFLICT',
    )
  }

  if (!firebaseAccount) {
    await createFirebaseAccount({ userId: user.id, uid: authUser.uid })
  }

  // Update user with Firebase data if missing
  const needsUpdate =
    (!user.name && authUser.displayName) ||
    (!user.avatarUrl && authUser.photoURL)

  if (needsUpdate) {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(authUser.displayName &&
          !user.name && { name: authUser.displayName }),
        ...(authUser.photoURL &&
          !user.avatarUrl && { avatarUrl: authUser.photoURL }),
      },
    })
    return updatedUser
  }

  return user
}

export async function getProfile(authUser) {
  const firebaseAccount = await findFirebaseAccountWithUser(authUser.uid)

  if (firebaseAccount) {
    // Refresh the user data to get the latest updates
    const refreshedUser = await prisma.user.findUnique({
      where: { id: firebaseAccount.userId },
    })
    return refreshedUser
  }

  const user = await findUserByEmail(authUser.email)
  if (!user) {
    throw new AppError(404, 'User profile not found', 'USER_NOT_FOUND')
  }

  await createFirebaseAccount({ userId: user.id, uid: authUser.uid })
  return user
}

export async function updateProfile(authUser, updateData) {
  const firebaseAccount = await findFirebaseAccountWithUser(authUser.uid)
  if (!firebaseAccount) {
    throw new AppError(404, 'User profile not found', 'USER_NOT_FOUND')
  }

  const { name } = updateData
  if (!name || !name.trim()) {
    throw new AppError(400, 'Name is required', 'VALIDATION_ERROR')
  }

  const updatedUser = await prisma.user.update({
    where: { id: firebaseAccount.userId },
    data: {
      name: name.trim(),
    },
  })

  return updatedUser
}

export function logout() {
  return { loggedOut: true }
}
