/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { firebaseAuth } from '../firebaseClient'
import { createSession, getMe, logoutSession } from '../api/authApi'
import { getReadableAuthErrorMessage } from './errorMessages'
import {
  setCachedUserSession,
  getCachedBackendUser,
  setCachedBackendUser,
  setAuthTimestamp,
  clearAuthCache,
  isCachedSessionValid,
} from '../storage/localStorage'
import {
  checkConnectivity,
  addNetworkListeners,
} from '../network/offlineDetection'

const AuthContext = createContext(null)

const googleProvider = new GoogleAuthProvider()

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null)
  const [backendUser, setBackendUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState('')
  const [isOnline, setIsOnline] = useState(true)

  // Initialize from cache and set up network listeners
  useEffect(() => {
    // Load cached user data if available
    const cachedBackendUser = getCachedBackendUser()
    const isValidSession = isCachedSessionValid()

    if (cachedBackendUser && isValidSession) {
      setBackendUser(cachedBackendUser)
    }

    // Set up network status monitoring
    const removeNetworkListeners = addNetworkListeners(setIsOnline)

    return () => {
      removeNetworkListeners()
    }
  }, [])

  // Firebase auth state listener with offline support
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      setFirebaseUser(user)

      if (!user) {
        setBackendUser(null)
        clearAuthCache()
        setIsLoading(false)
        return
      }

      // Cache Firebase user session
      setCachedUserSession({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      })
      setAuthTimestamp()

      // Try to get backend user data
      try {
        const isOnlineNow = await checkConnectivity()

        if (isOnlineNow) {
          // Online: Fresh data from backend
          await createSession()
          const profile = await getMe()
          setBackendUser(profile)
          setCachedBackendUser(profile)
          setAuthError('')
        } else {
          // Offline: Use cached backend user data
          const cachedBackendUser = getCachedBackendUser()
          if (cachedBackendUser) {
            setBackendUser(cachedBackendUser)
            setAuthError('')
          } else {
            setAuthError(
              'You are offline. Some features may be limited until you reconnect.',
            )
          }
        }
      } catch (error) {
        // Fallback to cached data if network request fails
        const cachedBackendUser = getCachedBackendUser()
        if (cachedBackendUser) {
          setBackendUser(cachedBackendUser)
          setAuthError(
            'Limited connectivity. Using cached data. Some features may be limited.',
          )
        } else {
          setAuthError(
            getReadableAuthErrorMessage(
              error,
              'We could not complete account setup. Please try signing in again.',
            ),
          )
        }
      } finally {
        setIsLoading(false)
      }
    })

    return unsubscribe
  }, [])

  const value = useMemo(
    () => ({
      firebaseUser,
      backendUser,
      isLoading,
      isAuthenticated: Boolean(firebaseUser),
      authError,
      isOnline,
      clearAuthError: () => setAuthError(''),
      signInWithEmail: async ({ email, password }) => {
        try {
          setAuthError('')
          await signInWithEmailAndPassword(firebaseAuth, email, password)
        } catch (error) {
          setAuthError(
            getReadableAuthErrorMessage(
              error,
              'Unable to sign in right now. Please try again.',
            ),
          )
          throw error
        }
      },
      signInWithGoogle: async () => {
        try {
          setAuthError('')
          await signInWithPopup(firebaseAuth, googleProvider)
        } catch (error) {
          setAuthError(
            getReadableAuthErrorMessage(
              error,
              'Unable to sign in with Google right now. Please try again.',
            ),
          )
          throw error
        }
      },
      signUpWithEmail: async ({ fullName, email, password }) => {
        try {
          setAuthError('')
          const result = await createUserWithEmailAndPassword(
            firebaseAuth,
            email,
            password,
          )
          if (fullName?.trim()) {
            await updateProfile(result.user, { displayName: fullName.trim() })
          }
        } catch (error) {
          setAuthError(
            getReadableAuthErrorMessage(
              error,
              'Unable to create your account right now. Please try again.',
            ),
          )
          throw error
        }
      },
      sendPasswordReset: async (email) => {
        try {
          await sendPasswordResetEmail(firebaseAuth, email)
        } catch (error) {
          setAuthError(
            getReadableAuthErrorMessage(
              error,
              'Unable to send password reset email. Please try again.',
            ),
          )
          throw error
        }
      },
      refreshUserProfile: async () => {
        try {
          const profile = await getMe()
          setBackendUser(profile)
          setCachedBackendUser(profile)
          return profile
        } catch (error) {
          setAuthError('Failed to refresh profile data')
          throw error
        }
      },
      logout: async () => {
        try {
          await logoutSession()
        } catch {
          // Ignore logout session errors when offline
        }
        await signOut(firebaseAuth)
        clearAuthCache()
      },
    }),
    [authError, backendUser, firebaseUser, isLoading, isOnline],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
