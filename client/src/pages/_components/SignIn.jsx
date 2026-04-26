import GoogleIcon from '@mui/icons-material/Google'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import EmailIcon from '@mui/icons-material/Email'

const SignIn = () => {
  return (
    <>
      <h2 className="text-center text-[2.1rem] font-extrabold tracking-tight text-slate-100">
        Welcome Back
      </h2>
      <p className="mt-2 text-center text-[1.03rem] text-slate-300/70">
        Secure access to your wealth portfolio
      </p>

      <button
        type="button"
        className="mt-8 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/5 bg-slate-700/35 px-4 text-[1.02rem] font-semibold text-slate-200 transition hover:bg-slate-700/50"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <p className="my-7 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-400/80">
        Or email
      </p>

      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
        <label
          htmlFor="email"
          className="block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-300/80"
        >
          Email address
        </label>
        <div className="flex h-12 items-center gap-2 rounded-xl border border-[#0e3653] bg-[#020f2d] px-3.5 focus-within:border-cyan-300/70">
          <EmailIcon />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="curator@fintrack.ai"
            className="w-full bg-transparent text-[1.05rem] text-slate-200 placeholder:text-slate-500/80 outline-none"
          />
        </div>

        <div className="mt-2 flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-300/80"
          >
            Password
          </label>
          <button
            type="button"
            className="text-[11px] font-bold uppercase tracking-[0.11em] text-amber-300 transition hover:text-amber-200"
          >
            Forgot?
          </button>
        </div>
        <div className="flex h-12 items-center gap-2 rounded-xl border border-[#0e3653] bg-[#020f2d] px-3.5 focus-within:border-cyan-300/70">
          <LockOpenIcon />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            className="w-full bg-transparent text-[1.05rem] text-slate-200 placeholder:text-slate-500/80 outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-400/5 px-4 text-xl font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
        >
          <span className="leading-none">Sign In</span>
          <span aria-hidden="true" className="text-lg leading-none"></span>
        </button>
      </form>

      <p className="mt-7 text-center text-[1.03rem] text-slate-300/70">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          className="font-semibold text-cyan-300 transition hover:text-cyan-200"
        >
          Create Account
        </button>
      </p>
    </>
  )
}

export default SignIn
