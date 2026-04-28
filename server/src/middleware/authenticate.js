import { AppError } from './errors.js'
import { firebaseAuth } from '../shared/firebaseAdmin.js'

function getBearerToken(authorizationHeader) {
  if (!authorizationHeader) {
    throw new AppError(
      401,
      'Missing Authorization header',
      'UNAUTHORIZED'
    )
  }

  if (!authorizationHeader.startsWith('Bearer ')) {
    throw new AppError(
      401,
      'Invalid Authorization header format',
      'UNAUTHORIZED'
    )
  }

  const token = authorizationHeader.slice(7).trim()
  if (!token) {
    throw new AppError(401, 'Missing Firebase ID token', 'UNAUTHORIZED')
  }

  return token
}

export async function authenticate(req, res, next) {
  try {
    const token = getBearerToken(req.headers.authorization)
    const decoded = await firebaseAuth.verifyIdToken(token)

    if (!decoded.email) {
      throw new AppError(401, 'Token is missing required email claim', 'UNAUTHORIZED')
    }

    req.user = {
      uid: decoded.uid,
      email: decoded.email,
    }

    next()
  } catch (error) {
    if (error instanceof AppError) {
      next(error)
      return
    }

    next(new AppError(401, 'Invalid Firebase ID token', 'UNAUTHORIZED'))
  }
}

