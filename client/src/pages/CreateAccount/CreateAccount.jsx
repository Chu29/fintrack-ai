import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import SignUp from '../_components/SignUp'
import { authStyles as auth } from '../_components/authStyles'
import { useAuth } from '../../shared/auth/AuthContext.jsx'

const CreateAccount = () => {
  const navigate = useNavigate()
  const { signUpWithEmail, signInWithGoogle, authError, clearAuthError, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      return
    }

    setIsSubmitting(true)
    clearAuthError()

    try {
      await signUpWithEmail({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      })
      navigate('/dashboard')
    } catch {
      // Auth errors are surfaced via AuthContext state.
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignUp = async () => {
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
    <main className={auth.page}>
      <div className={auth.ambient} aria-hidden="true" />
      <div className={auth.topWash} aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-130 flex-col items-center justify-center">
        <header className="mb-8 text-center">
          <p className={auth.brand}>Fintrack</p>
          <p className={auth.brandSub}>The Digital Curator</p>
        </header>
        <SignUp
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          setShowPassword={setShowPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          onGoogleSignUp={handleGoogleSignUp}
          onLogin={() => navigate('/')}
          isSubmitting={isSubmitting}
          errorMessage={
            formData.password !== formData.confirmPassword
              ? 'Passwords do not match'
              : authError
          }
        />
      </div>
    </main>
  )
}

export default CreateAccount
