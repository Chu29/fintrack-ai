// Network and offline detection utilities

export function isOnline() {
  if (typeof window === 'undefined') return true
  return navigator.onLine
}

export function addNetworkListeners(callback) {
  if (typeof window === 'undefined') return () => {}

  const handleOnline = () => callback(true)
  const handleOffline = () => callback(false)

  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)

  return () => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  }
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'

function getHealthCheckUrl(baseUrl = API_BASE_URL) {
  if (baseUrl?.startsWith('http://') || baseUrl?.startsWith('https://')) {
    return new URL('/health', baseUrl).toString()
  }

  return '/health'
}

// Check if we can reach the backend server
export async function checkBackendConnectivity(url = getHealthCheckUrl()) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000), // 5 second timeout
    })
    return response.ok
  } catch {
    return false
  }
}

// Comprehensive connectivity check
export async function checkConnectivity() {
  const networkOnline = isOnline()
  if (!networkOnline) return false

  try {
    const backendReachable = await checkBackendConnectivity()
    return backendReachable
  } catch {
    return false
  }
}
