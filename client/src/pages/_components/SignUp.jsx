import React from 'react'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import GoogleIcon from '@mui/icons-material/Google'

const SignUp = ({
  formData,
  handleChange,
  handleSubmit,
  showPassword,
  showConfirmPassword,
  setShowPassword,
  setShowConfirmPassword,
}) => {
  const labelClass =
    'mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400'
  const fieldShellClass =
    'group flex h-12 items-center rounded-xl border border-[#1b2d43] bg-[#121d30] px-4 text-slate-100 transition duration-200 hover:border-[#29435f] focus-within:-translate-y-px focus-within:border-[#35d3cb]/70 focus-within:shadow-[0_0_0_3px_rgba(53,211,203,0.12)]'
  const inputClass =
    'w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 outline-none'
  const iconButtonClass =
    'inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35d3cb]/50'
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-3xl border border-[#223449] bg-[linear-gradient(180deg,rgba(25,38,56,0.95),rgba(19,31,47,0.98))] p-7 shadow-[0_32px_90px_rgba(3,10,23,0.52)] backdrop-blur-xl sm:p-8"
    >
      <h1 className="text-[1.9rem] font-bold tracking-tight text-slate-100">
        Create your ledger
      </h1>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
        Join the ecosystem of high-end financial oversight.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full Name
          </label>
          <div className={fieldShellClass}>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Alex Morgan"
              autoComplete="name"
              className={inputClass}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address
          </label>
          <div className={fieldShellClass}>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@curator.io"
              autoComplete="email"
              className={inputClass}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>
            Create Password
          </label>
          <div className={fieldShellClass}>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              autoComplete="new-password"
              minLength={8}
              className={inputClass}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className={iconButtonClass}
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
          <label htmlFor="confirmPassword" className={labelClass}>
            Confirm Password
          </label>
          <div className={fieldShellClass}>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              autoComplete="new-password"
              minLength={8}
              className={inputClass}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className={iconButtonClass}
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

      <label className="mt-5 flex items-start gap-3 text-[0.78rem] leading-5 text-slate-400">
        <input
          type="checkbox"
          name="agreedToTerms"
          checked={formData.agreedToTerms}
          onChange={handleChange}
          className="mt-0.5 h-4 w-4 rounded border border-[#2b3f56] bg-transparent accent-dashboard-accent"
          required
        />
        <span>
          I agree to the{' '}
          <a
            href="/"
            className="text-dashboard-accent transition hover:text-[#63e3da]"
          >
            Terms of Service
          </a>{' '}
          and acknowledge the{' '}
          <a
            href="/"
            className="text-dashboard-accent transition hover:text-[#63e3da]"
          >
            Privacy Policy
          </a>{' '}
          regarding my financial data.
        </span>
      </label>

      <button
        type="submit"
        className="mt-7 inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#44d7cd] to-[#24c8bd] px-4 text-sm font-bold text-[#06252b] shadow-[0_10px_30px_rgba(36,200,189,0.25)] transition duration-200 hover:-translate-y-0.5 hover:from-[#57e0d7] hover:to-[#30d7cb]"
      >
        <span>Create Account</span>
        <ArrowForwardRoundedIcon fontSize="small" />
      </button>

      <div className="mt-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-700/60" />
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
          Or continue with
        </p>
        <div className="h-px flex-1 bg-slate-700/60" />
      </div>

      <button
        type="button"
        className="mt-5 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#1f3046] bg-[#182437] text-sm font-medium text-slate-300 transition duration-200 hover:border-[#2b435f] hover:bg-[#1d2a3d]"
      >
        <GoogleIcon fontSize="small" />
        <span>Sign up with Google</span>
      </button>

      <p className="mt-7 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <button
          type="button"
          className="font-semibold text-dashboard-accent transition hover:text-[#63e3da]"
        >
          Log In
        </button>
      </p>
    </form>
  )
}

export default SignUp
