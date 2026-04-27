import { cx, appStyles as ui } from './appStyles'

export { cx }

export const authStyles = {
  page:
    'relative min-h-screen overflow-hidden bg-dashboard-page px-4 py-10 text-dashboard-ink sm:px-6',
  ambient:
    'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,205,192,0.36),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(205,214,228,0.28),transparent_42%)]',
  topWash:
    'pointer-events-none absolute inset-x-0 top-0 h-48 bg-linear-to-b from-white/75 to-transparent opacity-80',
  brand: 'text-[1.7rem] font-black uppercase tracking-[0.06em] text-dashboard-ink',
  brandSub:
    'mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-slate-500',
  panel:
    'w-full rounded-3xl border border-dashboard-border bg-white/88 p-7 shadow-dashboard-panel backdrop-blur-xl sm:p-8',
  panelCompact:
    'mx-auto w-full max-w-md rounded-3xl border border-dashboard-border bg-white/88 p-7 shadow-dashboard-panel backdrop-blur-xl sm:p-9',
  eyebrow:
    'mb-5 inline-flex rounded-full border border-dashboard-border bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-dashboard-accent',
  heroTitle:
    'text-5xl font-black leading-[0.95] tracking-tight text-dashboard-ink sm:text-6xl lg:text-7xl',
  heroAccent:
    'mt-1 block bg-linear-to-r from-dashboard-ink via-slate-700 to-dashboard-accent bg-clip-text text-transparent',
  heroBody: 'mt-7 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg',
  title: 'text-[1.9rem] font-bold tracking-tight text-dashboard-ink',
  titleCenter:
    'text-center text-[2.1rem] font-extrabold tracking-tight text-dashboard-ink',
  subtext: 'mt-2 max-w-md text-sm leading-6 text-slate-600',
  subtextCenter: 'mt-2 text-center text-[1.03rem] text-slate-600',
  label:
    'mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500',
  labelSm:
    'block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500',
  field:
    'group flex h-12 items-center gap-2 rounded-xl border border-dashboard-border bg-dashboard-control px-4 text-dashboard-ink transition duration-200 hover:border-dashboard-border-hover focus-within:border-dashboard-accent/35 focus-within:shadow-dashboard-focus',
  input:
    'w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none',
  inputLg:
    'w-full bg-transparent text-[1.05rem] text-slate-800 placeholder:text-slate-400 outline-none',
  iconButton:
    'inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dashboard-accent/20',
  primaryButton: cx(ui.action.primary, 'w-full gap-2 rounded-xl px-4 text-white'),
  secondaryButton:
    'flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-dashboard-border bg-white px-4 text-[1.02rem] font-semibold text-slate-700 transition hover:bg-dashboard-nav-hover',
  divider: 'h-px flex-1 bg-dashboard-border',
  dividerText:
    'text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-500',
  link: 'font-semibold text-dashboard-accent transition hover:text-dashboard-accent-soft',
  forgot:
    'text-[11px] font-bold uppercase tracking-[0.11em] text-slate-500 transition hover:text-dashboard-ink',
  checkbox:
    'mt-0.5 h-4 w-4 rounded border border-dashboard-border bg-transparent accent-dashboard-accent',
  ctaPrimary:
    'rounded-xl bg-linear-to-r from-dashboard-accent-strong to-dashboard-accent-end px-7 py-3 text-sm font-bold text-white shadow-dashboard-accent transition hover:-translate-y-0.5 hover:from-dashboard-accent-hover-start hover:to-dashboard-accent-hover-end',
  ctaSecondary:
    'rounded-xl border border-dashboard-border bg-white/90 px-7 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white',
}
