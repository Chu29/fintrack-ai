import { cx, appStyles as ui } from './appStyles'

export { cx }

export const authStyles = {
  page:
    'relative min-h-screen overflow-hidden bg-dashboard-page px-4 py-10 text-dashboard-ink sm:px-6',
  ambient: 'hidden',
  topWash: 'hidden',
  brand: 'text-[15px] font-semibold uppercase tracking-[0.06em] text-dashboard-ink',
  brandSub:
    'mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-dashboard-secondary',
  panel:
    'w-full rounded-[10px] border border-dashboard-border bg-white p-6 shadow-dashboard-panel sm:p-6',
  panelCompact:
    'mx-auto w-full max-w-md rounded-[10px] border border-dashboard-border bg-white p-6 shadow-dashboard-panel sm:p-6',
  eyebrow:
    'mb-4 inline-flex rounded-full border border-dashboard-border bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-dashboard-accent',
  heroTitle:
    'text-4xl font-semibold leading-[1.05] text-dashboard-ink sm:text-5xl',
  heroAccent:
    'mt-1 block bg-linear-to-r from-dashboard-ink to-dashboard-accent bg-clip-text text-transparent',
  heroBody: 'mt-5 max-w-xl text-[13px] leading-6 text-dashboard-secondary',
  title: 'text-[15px] font-semibold text-dashboard-ink',
  titleCenter:
    'text-center text-[15px] font-semibold text-dashboard-ink',
  subtext: 'mt-2 max-w-md text-[13px] leading-5 text-dashboard-secondary',
  subtextCenter: 'mt-2 text-center text-[13px] text-dashboard-secondary',
  label:
    'mb-2 block text-[11px] font-medium uppercase tracking-[0.08em] text-dashboard-secondary',
  labelSm:
    'block text-[11px] font-medium uppercase tracking-[0.08em] text-dashboard-secondary',
  field:
    'group flex h-11 items-center gap-2 rounded-[10px] border border-dashboard-border bg-dashboard-control px-3 text-dashboard-ink transition duration-200 hover:border-dashboard-border-hover focus-within:border-dashboard-accent/35 focus-within:shadow-dashboard-focus',
  input:
    'w-full bg-transparent text-[13px] text-dashboard-ink placeholder:text-dashboard-secondary outline-none',
  inputLg:
    'w-full bg-transparent text-[13px] text-dashboard-ink placeholder:text-dashboard-secondary outline-none',
  iconButton:
    'inline-flex h-8 w-8 items-center justify-center rounded-full text-dashboard-secondary transition hover:text-dashboard-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dashboard-accent/20',
  primaryButton: cx(ui.action.primary, 'w-full gap-2 rounded-xl px-4 text-white'),
  secondaryButton:
    'flex h-11 w-full items-center justify-center gap-3 rounded-[10px] border border-dashboard-border bg-white px-4 text-[13px] font-medium text-dashboard-ink transition hover:bg-slate-50',
  divider: 'h-px flex-1 bg-dashboard-border',
  dividerText:
    'text-center text-[11px] font-medium uppercase tracking-[0.08em] text-dashboard-secondary',
  link: 'font-semibold text-dashboard-accent transition hover:text-dashboard-accent-soft',
  forgot:
    'text-[11px] font-medium uppercase tracking-[0.08em] text-dashboard-secondary transition hover:text-dashboard-ink',
  checkbox:
    'mt-0.5 h-4 w-4 rounded border border-dashboard-border bg-transparent accent-dashboard-accent',
  ctaPrimary:
    'rounded-[10px] bg-dashboard-accent px-7 py-3 text-[13px] font-medium text-white shadow-dashboard-accent transition hover:bg-dashboard-accent-hover-start',
  ctaSecondary:
    'rounded-[10px] border border-dashboard-border bg-white px-7 py-3 text-[13px] font-medium text-dashboard-ink transition hover:bg-slate-50',
}
