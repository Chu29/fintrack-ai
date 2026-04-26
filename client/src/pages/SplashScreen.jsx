import '../index.css'
import SignIn from './_components/SignIn'

const SplashScreen = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020b22] px-6 py-8 text-slate-100 md:px-10 lg:px-16">
      <div
        className="pointer-events-none absolute left-[-18%] top-[-20%] h-128 w-lg rounded-full bg-cyan-400/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-28%] right-[-10%] h-152 w-152 rounded-full bg-blue-500/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_0.9fr]">
        <section className="max-w-2xl pt-6 md:pt-2">
          <p className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200">
            The Digital Curator
          </p>
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-slate-100 sm:text-6xl lg:text-7xl">
            Smart Expenses,
            <span className="mt-1 block bg-linear-to-r from-cyan-300 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">
              Smarter You
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-300/90 sm:text-lg">
            Experience the next evolution of personal finance. FinTrack AI turns
            complex data into editorial insights, crafting your financial
            journey with precision.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="rounded-xl border border-cyan-300/30 bg-linear-to-r from-cyan-400 to-emerald-300 px-7 py-3 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(45,212,191,0.32)] transition hover:-translate-y-0.5"
            >
              Get Started
            </button>
            <button
              type="button"
              className="rounded-xl border border-slate-700 bg-slate-900/80 px-7 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              View Demo
            </button>
          </div>
          <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            <span>Secured by Obsidian</span>
            <span>Trusted by 2M+ Users</span>
          </div>
        </section>

        <section
          className="mx-auto w-full max-w-md rounded-3xl border border-cyan-200/10 bg-slate-900/55 p-7 shadow-[0_24px_80px_rgba(6,19,46,0.65)] backdrop-blur-xl sm:p-9"
          aria-label="Sign in panel"
        >
          <SignIn />
        </section>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.08),transparent_30%),radial-gradient(circle_at_85%_40%,rgba(14,165,233,0.08),transparent_35%)]" />
    </main>
  )
}

export default SplashScreen
