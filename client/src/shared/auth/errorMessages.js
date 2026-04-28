const firebaseMessageByCode = {
  'auth/invalid-credential': 'The email or password is incorrect.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-disabled': 'This account has been disabled. Contact support.',
  'auth/user-not-found': 'No account found for this email.',
  'auth/wrong-password': 'The email or password is incorrect.',
  'auth/email-already-in-use': 'This email is already registered. Try signing in.',
  'auth/weak-password': 'Use a stronger password with at least 8 characters.',
  'auth/too-many-requests': 'Too many attempts. Please wait and try again.',
  'auth/popup-closed-by-user': 'Sign-in popup was closed before completing.',
  'auth/network-request-failed': 'Network issue detected. Check your connection and retry.',
}

const backendMessageByCode = {
  UNAUTHORIZED: 'Your session has expired. Please sign in again.',
  VALIDATION_ERROR: 'Some input is invalid. Please review and try again.',
  INTERNAL_ERROR: 'Something went wrong on our side. Please try again.',
}

export function getReadableAuthErrorMessage(error, fallback) {
  const firebaseCode = error?.code
  if (firebaseCode && firebaseMessageByCode[firebaseCode]) {
    return firebaseMessageByCode[firebaseCode]
  }

  const backendCode = error?.error?.code
  if (backendCode && backendMessageByCode[backendCode]) {
    return backendMessageByCode[backendCode]
  }

  if (error?.error?.message && !String(error.error.message).startsWith('Firebase: Error')) {
    return error.error.message
  }

  return fallback
}

