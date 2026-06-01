import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Validate Firebase configuration
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_APP_ID',
]

const missingVars = requiredEnvVars.filter(
  (varName) => !import.meta.env[varName],
)

if (missingVars.length > 0) {
  console.error('Missing Firebase environment variables:', missingVars)
  console.error(
    'Please check your .env file and ensure all required Firebase variables are set.',
  )
  throw new Error(`Missing Firebase configuration: ${missingVars.join(', ')}`)
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
}

let firebaseApp
let firebaseAuth

try {
  firebaseApp = initializeApp(firebaseConfig)
  firebaseAuth = getAuth(firebaseApp)
  console.log('Firebase initialized successfully')
} catch (error) {
  console.error('Failed to initialize Firebase:', error)
  throw new Error(
    'Firebase initialization failed. Please check your configuration.',
  )
}

export { firebaseAuth }

export async function getCurrentIdToken() {
  const currentUser = firebaseAuth.currentUser
  if (!currentUser) {
    return null
  }

  return currentUser.getIdToken()
}
