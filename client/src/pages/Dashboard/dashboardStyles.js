export const cx = (...values) => values.filter(Boolean).join(' ')

export const dashboardStyles = {
  page: {
    shell: 'min-h-screen bg-dashboard-page text-slate-100',
    canvas: 'relative min-h-screen overflow-hidden',
    dots: 'pointer-events-none absolute inset-0 bg-dashboard-dots opacity-30',
    glow: 'pointer-events-none absolute inset-0 bg-dashboard-glow',
    layout: 'relative grid min-h-screen xl:grid-cols-[240px_minmax(0,1fr)]',
    content: 'px-4 py-5 sm:px-6 sm:py-6 lg:px-8',
  },
  surface: {
    card: 'rounded-dashboard-card border border-dashboard-border bg-dashboard-card shadow-dashboard-card',
    cardHover:
      'transition duration-200 hover:-translate-y-0.5 hover:border-dashboard-border-hover',
    elevated:
      'rounded-dashboard-panel border border-dashboard-border bg-dashboard-elevated shadow-dashboard-panel',
    alert:
      'rounded-dashboard-panel border border-dashboard-alert-border bg-dashboard-alert-gradient shadow-dashboard-alert',
    advice:
      'rounded-dashboard-card border border-dashboard-advice-border bg-dashboard-advice-gradient shadow-dashboard-advice',
    inner: 'rounded-2xl border border-dashboard-border-soft bg-dashboard-inner',
    profile: 'rounded-2xl border border-dashboard-border bg-dashboard-profile',
    control: 'border border-dashboard-border bg-dashboard-control',
    segmented: 'rounded-full border border-dashboard-border bg-dashboard-segmented',
    segmentedActive: 'rounded-full bg-dashboard-segmented-active text-slate-200',
    navActive:
      'bg-dashboard-nav-active text-dashboard-accent shadow-dashboard-inset',
    navIdle: 'text-slate-400 hover:bg-dashboard-nav-hover hover:text-slate-200',
  },
  text: {
    brand: 'text-[1.55rem] font-black tracking-tight text-dashboard-accent',
    brandSub:
      'mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-slate-500',
    overline:
      'text-[0.6rem] font-bold uppercase tracking-[0.22em] text-slate-500',
    overlineTight:
      'text-[0.62rem] font-bold uppercase tracking-[0.18em] text-slate-500',
    overlineWide:
      'text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-500',
    sectionTitle: 'text-lg font-bold tracking-tight text-slate-100',
    featureTitle: 'text-xl font-bold tracking-tight text-slate-100',
    metricValue: 'text-[2rem] font-bold tracking-tight text-slate-100',
    label: 'text-sm font-semibold text-slate-200',
    muted: 'text-sm text-slate-500',
    body: 'text-sm leading-6 text-slate-300/82',
    bodyStrong: 'text-sm leading-6 text-slate-200',
    accent: 'text-dashboard-accent',
    amber: 'text-dashboard-amber-text',
  },
  action: {
    primary:
      'inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-dashboard-accent-strong to-dashboard-accent-end text-sm font-bold text-dashboard-on-accent shadow-dashboard-accent transition duration-200 hover:-translate-y-0.5 hover:from-dashboard-accent-hover-start hover:to-dashboard-accent-hover-end',
    fab: 'inline-flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-r from-dashboard-accent-strong to-dashboard-accent-end text-dashboard-fab-text shadow-dashboard-accent-fab transition duration-200 hover:-translate-y-0.5 hover:from-dashboard-accent-hover-start hover:to-dashboard-accent-hover-end',
    link: 'text-[0.7rem] font-bold uppercase tracking-[0.18em] text-dashboard-accent transition hover:text-dashboard-accent-soft',
    iconButton:
      'transition duration-200 hover:border-dashboard-accent/35 hover:text-dashboard-accent',
  },
  avatar: {
    base: 'flex items-center justify-center rounded-full bg-dashboard-avatar font-black text-dashboard-ink',
    sm: 'h-9 w-9 text-xs',
    md: 'h-11 w-11 text-sm',
  },
  layout: {
    row: 'flex items-center gap-3',
    between: 'flex items-center justify-between gap-4',
  },
}
