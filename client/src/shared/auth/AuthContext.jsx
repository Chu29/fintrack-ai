/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { firebaseAuth } from '../firebaseClient'
import { createSession, getMe, logoutSession } from '../api/authApi'
import { getReadableAuthErrorMessage } from './errorMessages'

const AuthContext = createContext(null)

const googleProvider = new GoogleAuthProvider()

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null)
  const [backendUser, setBackendUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      setFirebaseUser(user)

      if (!user) {
        setBackendUser(null)
        setIsLoading(false)
        return
      }

      try {
        await createSession()
        const profile = await getMe()
        setBackendUser(profile)
        setAuthError('')
      } catch (error) {
        setAuthError(
          getReadableAuthErrorMessage(
            error,
            'We could not complete account setup. Please try signing in again.'
          )
        )
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
      clearAuthError: () => setAuthError(''),
      signInWithEmail: async ({ email, password }) => {
        try {
          setAuthError('')
          await signInWithEmailAndPassword(firebaseAuth, email, password)
        } catch (error) {
          setAuthError(
            getReadableAuthErrorMessage(error, 'Unable to sign in right now. Please try again.')
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
              'Unable to sign in with Google right now. Please try again.'
            )
          )
          throw error
        }
      },
      signUpWithEmail: async ({ fullName, email, password }) => {
        try {
          setAuthError('')
          const result = await createUserWithEmailAndPassword(firebaseAuth, email, password)
          if (fullName?.trim()) {
            await updateProfile(result.user, { displayName: fullName.trim() })
          }
        } catch (error) {
          setAuthError(
            getReadableAuthErrorMessage(
              error,
              'Unable to create your account right now. Please try again.'
            )
          )
          throw error
        }
      },
      logout: async () => {
        await logoutSession()
        await signOut(firebaseAuth)
      },
    }),
    [authError, backendUser, firebaseUser, isLoading]
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
