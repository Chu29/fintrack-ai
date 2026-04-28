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
  const source = authContext.backendUser || authContext.firebaseUser
  const name = source?.name || source?.displayName || source?.email || 'User'
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('') || 'U'

  return {
    name,
    role: 'Premium Curator',
    initials,
  }
}

export function monthLabel(month) {
  const date = new Date(Date.UTC(2026, month - 1, 1))
  return date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
}

