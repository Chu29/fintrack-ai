import React from 'react'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import GoogleIcon from '@mui/icons-material/Google'
import { authStyles as auth } from './authStyles'

const SignUp = ({
  formData,
  handleChange,
  handleSubmit,
  showPassword,
  showConfirmPassword,
  setShowPassword,
  setShowConfirmPassword,
}) => {
  return (
    <form onSubmit={handleSubmit} className={auth.panel}>
      <h1 className={auth.title}>Create your ledger</h1>
      <p className={auth.subtext}>
        Join the ecosystem of high-end financial oversight.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={auth.label}>
            Full Name
          </label>
          <div className={auth.field}>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Alex Morgan"
              autoComplete="name"
              className={auth.input}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className={auth.label}>
            Email Address
          </label>
          <div className={auth.field}>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@curator.io"
              autoComplete="email"
              className={auth.input}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className={auth.label}>
            Create Password
          </label>
          <div className={auth.field}>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              autoComplete="new-password"
              minLength={8}
              className={auth.input}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className={auth.iconButton}
              aria-label={
                showPassword ? 'Hide password field' : 'Show password field'
              }
            >
              {showPassword ? (
                <VisibilityOffOutlinedIcon fontSize="small" />
              ) : (
                <VisibilityOutlinedIcon fontSize="small" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className={auth.label}>
            Confirm Password
          </label>
          <div className={auth.field}>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              autoComplete="new-password"
              minLength={8}
              className={auth.input}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className={auth.iconButton}
              aria-label={
                showConfirmPassword
                  ? 'Hide confirm password field'
                  : 'Show confirm password field'
              }
            >
              {showConfirmPassword ? (
                <VisibilityOffOutlinedIcon fontSize="small" />
              ) : (
                <VisibilityOutlinedIcon fontSize="small" />
              )}
            </button>
          </div>
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 text-[0.78rem] leading-5 text-slate-500">
        <input
          type="checkbox"
          name="agreedToTerms"
          checked={formData.agreedToTerms}
          onChange={handleChange}
          className={auth.checkbox}
          required
        />
        <span>
          I agree to the{' '}
          <a href="/" className={auth.link}>
            Terms of Service
          </a>{' '}
          and acknowledge the{' '}
          <a href="/" className={auth.link}>
            Privacy Policy
          </a>{' '}
          regarding my financial data.
        </span>
      </label>

      <button
        type="submit"
        className={`${auth.primaryButton} mt-7 h-13`}
      >
        <span>Create Account</span>
        <ArrowForwardRoundedIcon fontSize="small" />
      </button>

      <div className="mt-6 flex items-center gap-4">
        <div className={auth.divider} />
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
          Or continue with
        </p>
        <div className={auth.divider} />
      </div>

      <button
        type="button"
        className={`${auth.secondaryButton} mt-5 text-sm`}
      >
        <GoogleIcon fontSize="small" />
        <span>Sign up with Google</span>
      </button>

      <p className="mt-7 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <button type="button" className={auth.link}>
          Log In
        </button>
      </p>
    </form>
  )
}

export default SignUp
