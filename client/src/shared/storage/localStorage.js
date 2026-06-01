const STORAGE_KEYS = {
  USER_SESSION: 'fintrack_user_session',
  BACKEND_USER: 'fintrack_backend_user',
  AUTH_TIMESTAMP: 'fintrack_auth_timestamp',
}

// Generic localStorage operations with error handling
export function getStorageItem(key, defaultValue = null) {
  try {
    if (typeof window === 'undefined') return defaultValue
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error)
    return defaultValue
  }
}

export function setStorageItem(key, value) {
  try {
    if (typeof window === 'undefined') return false
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.warn(`Error setting localStorage key "${key}":`, error)
    return false
  }
}

export function removeStorageItem(key) {
  try {
    if (typeof window === 'undefined') return false
    window.localStorage.removeItem(key)
    return true
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error)
    return false
  }
}

// User session specific operations
export function getCachedUserSession() {
  return getStorageItem(STORAGE_KEYS.USER_SESSION)
}

export function setCachedUserSession(session) {
  return setStorageItem(STORAGE_KEYS.USER_SESSION, session)
}

export function getCachedBackendUser() {
  return getStorageItem(STORAGE_KEYS.BACKEND_USER)
}

export function setCachedBackendUser(user) {
  return setStorageItem(STORAGE_KEYS.BACKEND_USER, user)
}

export function setAuthTimestamp() {
  return setStorageItem(STORAGE_KEYS.AUTH_TIMESTAMP, Date.now())
}

export function getAuthTimestamp() {
  return getStorageItem(STORAGE_KEYS.AUTH_TIMESTAMP, 0)
}

export function clearAuthCache() {
  removeStorageItem(STORAGE_KEYS.USER_SESSION)
  removeStorageItem(STORAGE_KEYS.BACKEND_USER)
  removeStorageItem(STORAGE_KEYS.AUTH_TIMESTAMP)
}

// Check if cached session is still valid (24 hours)
export function isCachedSessionValid(maxAge = 24 * 60 * 60 * 1000) {
  const timestamp = getAuthTimestamp()
  return timestamp && (Date.now() - timestamp) < maxAge
}
