import GoogleIcon from '@mui/icons-material/Google'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import EmailIcon from '@mui/icons-material/Email'
import { authStyles as auth } from './authStyles'

const SignIn = () => {
  return (
    <>
      <h2 className={auth.titleCenter}>Welcome Back</h2>
      <p className={auth.subtextCenter}>
        Secure access to your wealth portfolio
      </p>

      <button
        type="button"
        className={`${auth.secondaryButton} mt-8`}
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <p className={`${auth.dividerText} my-7`}>
        Or email
      </p>

      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="email" className={auth.labelSm}>
          Email address
        </label>
        <div className={auth.field}>
          <EmailIcon />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="curator@fintrack.ai"
            className={auth.inputLg}
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
            placeholder="********"
            className={auth.inputLg}
          />
        </div>

        <button
          type="submit"
          className={`${auth.primaryButton} mt-3 h-12 text-base`}
        >
          <span className="leading-none">Sign In</span>
          <span aria-hidden="true" className="text-lg leading-none"></span>
        </button>
      </form>

      <p className="mt-7 text-center text-[1.03rem] text-slate-600">
        Don&apos;t have an account?{' '}
        <button type="button" className={auth.link}>
          Create Account
        </button>
      </p>
    </>
  )
}

export default SignIn
