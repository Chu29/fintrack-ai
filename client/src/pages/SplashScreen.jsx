import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import '../index.css'
import SignIn from './_components/SignIn'
import { authStyles as auth } from './_components/authStyles'
import { useAuth } from '../shared/auth/AuthContext.jsx'

const SplashScreen = () => {
  const navigate = useNavigate()
  const { isAuthenticated, authError, clearAuthError, signInWithEmail, signInWithGoogle } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleEmailSignIn = async (credentials) => {
    setIsSubmitting(true)
    clearAuthError()
    try {
      await signInWithEmail(credentials)
      navigate('/dashboard')
    } catch {
      // Auth errors are surfaced via AuthContext state.
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true)
    clearAuthError()
    try {
      await signInWithGoogle()
      navigate('/dashboard')
    } catch {
      // Auth errors are surfaced via AuthContext state.
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-dashboard-page px-6 py-8 text-dashboard-ink md:px-10 lg:px-16">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_0.9fr]">
        <section className="max-w-2xl pt-6 md:pt-2">
          <p className={auth.eyebrow}>
            The Digital Curator
          </p>
          <h1 className={auth.heroTitle}>
            Smart Expenses,
            <span className={auth.heroAccent}>
              Smarter You
            </span>
          </h1>
          <p className={auth.heroBody}>
            Experience the next evolution of personal finance. FinTrack AI turns
            complex data into editorial insights, crafting your financial
            journey with precision.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              type="button"
              className={auth.ctaPrimary}
              onClick={() => navigate('/create-account')}
            >
              Get Started
            </button>
            <button
              type="button"
              className={auth.ctaSecondary}
            >
              View Demo
            </button>
          </div>
          <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-3 text-[11px] font-medium uppercase tracking-[0.08em] text-dashboard-secondary">
            <span>Secured by Obsidian</span>
            <span>Trusted by 2M+ Users</span>
          </div>
        </section>

        <section
          className={auth.panelCompact}
          aria-label="Sign in panel"
        >
          <SignIn
            onEmailSignIn={handleEmailSignIn}
            onGoogleSignIn={handleGoogleSignIn}
            onCreateAccount={() => navigate('/create-account')}
            isSubmitting={isSubmitting}
            errorMessage={authError}
          />
        </section>
      </div>
    </main>
  )
}

export default SplashScreen
