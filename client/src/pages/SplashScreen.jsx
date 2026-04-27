import '../index.css'
import SignIn from './_components/SignIn'
import { authStyles as auth } from './_components/authStyles'

const SplashScreen = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-dashboard-page px-6 py-8 text-dashboard-ink md:px-10 lg:px-16">
      <div
        className="pointer-events-none absolute left-[-18%] top-[-20%] h-128 w-lg rounded-full bg-[rgba(217,205,192,0.48)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-28%] right-[-10%] h-152 w-152 rounded-full bg-[rgba(205,214,228,0.42)] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_0.9fr]">
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
          <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            <span>Secured by Obsidian</span>
            <span>Trusted by 2M+ Users</span>
          </div>
        </section>

        <section
          className={auth.panelCompact}
          aria-label="Sign in panel"
        >
          <SignIn />
        </section>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(217,205,192,0.16),transparent_30%),radial-gradient(circle_at_85%_40%,rgba(205,214,228,0.14),transparent_35%)]" />
    </main>
  )
}

export default SplashScreen
