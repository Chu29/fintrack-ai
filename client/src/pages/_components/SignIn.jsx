import { useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import EmailIcon from '@mui/icons-material/Email'
import { authStyles as auth } from './authStyles'

const SignIn = ({
  onEmailSignIn,
  onGoogleSignIn,
  onCreateAccount,
  isSubmitting,
  errorMessage,
}) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const handleChange = (name) => (event) => {
    setCredentials((prev) => ({
      ...prev,
      [name]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await onEmailSignIn(credentials)
  }

  return (
    <>
      <h2 className={auth.titleCenter}>Welcome Back</h2>
      <p className={auth.subtextCenter}>
        Secure access to your wealth portfolio
      </p>

      <button
        type="button"
        className={`${auth.secondaryButton} mt-8`}
        onClick={onGoogleSignIn}
        disabled={isSubmitting}
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <p className={`${auth.dividerText} my-7`}>
        Or email
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label htmlFor="email" className={auth.labelSm}>
          Email address
        </label>
        <div className={auth.field}>
          <EmailIcon />
          <input
            id="email"
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleChange('email')}
            placeholder="curator@fintrack.ai"
            className={auth.inputLg}
            required
          />
        </div>

        <div className="mt-2 flex items-center justify-between">
          <label htmlFor="password" className={auth.labelSm}>
            Password
          </label>
          <button type="button" className={auth.forgot}>
            Forgot?
          </button>
        </div>
        <div className={auth.field}>
          <LockOpenIcon />
          <input
            id="password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange('password')}
            placeholder="********"
            className={auth.inputLg}
            required
          />
        </div>

        <button
          type="submit"
          className={`${auth.primaryButton} mt-3 h-12 text-base`}
          disabled={isSubmitting}
        >
          <span className="leading-none">{isSubmitting ? 'Signing In...' : 'Sign In'}</span>
          <span aria-hidden="true" className="text-lg leading-none"></span>
        </button>
      </form>

      {errorMessage ? (
        <p className="mt-4 rounded-2xl bg-rose-50 px-3 py-2 text-center text-sm text-rose-600">
          {errorMessage}
        </p>
      ) : null}

      <p className="mt-7 text-center text-[1.03rem] text-slate-600">
        Don&apos;t have an account?{' '}
        <button type="button" className={auth.link} onClick={onCreateAccount}>
          Create Account
        </button>
      </p>
    </>
  )
}

export default SignIn
