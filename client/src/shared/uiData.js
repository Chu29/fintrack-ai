export function formatCurrency(value) {
  const amount = Number(value || 0)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function toProfile(authContext) {
  // Merge Firebase and backend user data, preferring Firebase for name/avatar when backend has nulls
  const firebaseUser = authContext.firebaseUser
  const backendUser = authContext.backendUser

  const name =
    firebaseUser?.displayName ||
    backendUser?.name ||
    firebaseUser?.email ||
    backendUser?.email ||
    'User'
  const email = firebaseUser?.email || backendUser?.email || ''
  const photoURL = firebaseUser?.photoURL || backendUser?.avatarUrl || null

  const initials =
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || '')
      .join('') || 'U'

  return {
    name,
    email,
    photoURL,
    initials,
  }
}

export function monthLabel(month) {
  const date = new Date(Date.UTC(2026, month - 1, 1))
  return date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
}
