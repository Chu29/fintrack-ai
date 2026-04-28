import { AppError } from '../../middleware/errors.js'
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
      'AUTH_PROVIDER_CONFLICT'
    )
  }

  if (!firebaseAccount) {
    await createFirebaseAccount({ userId: user.id, uid: authUser.uid })
  }

  return user
}

export async function getProfile(authUser) {
  const firebaseAccount = await findFirebaseAccountWithUser(authUser.uid)
  if (firebaseAccount) {
    return firebaseAccount.user
  }

  const user = await findUserByEmail(authUser.email)
  if (!user) {
    throw new AppError(404, 'User profile not found', 'USER_NOT_FOUND')
  }

  await createFirebaseAccount({ userId: user.id, uid: authUser.uid })
  return user
}

export function logout() {
  return { loggedOut: true }
}
