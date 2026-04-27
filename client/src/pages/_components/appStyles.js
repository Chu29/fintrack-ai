export const cx = (...values) => values.filter(Boolean).join(' ')

export const appStyles = {
  page: {
    shell: 'min-h-screen bg-dashboard-page text-dashboard-ink',
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
    pageEyebrow:
      'text-[0.72rem] font-bold uppercase tracking-[0.22em] text-dashboard-accent',
    pageTitle:
      'mt-2 text-[2.7rem] font-black tracking-tight text-dashboard-ink sm:text-[3.15rem]',
    sectionTitle: 'text-lg font-bold tracking-tight text-dashboard-ink',
    featureTitle: 'text-xl font-bold tracking-tight text-dashboard-ink',
    metricValue: 'text-[2rem] font-bold tracking-tight text-dashboard-ink',
    label: 'text-sm font-semibold text-slate-800',
    muted: 'text-sm text-slate-500',
    body: 'text-sm leading-6 text-slate-600',
    bodyStrong: 'text-sm leading-6 text-slate-700',
    accent: 'text-dashboard-accent',
    amber: 'text-dashboard-amber-text',
  },
  action: {
    primary:
      'inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-dashboard-accent-strong to-dashboard-accent-end text-sm font-bold text-dashboard-on-accent shadow-dashboard-accent transition duration-200 hover:-translate-y-0.5 hover:from-dashboard-accent-hover-start hover:to-dashboard-accent-hover-end',
    secondary:
      'inline-flex items-center justify-center rounded-2xl bg-dashboard-control text-sm font-semibold text-slate-500 transition duration-200 hover:bg-dashboard-nav-hover hover:text-dashboard-ink',
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
  badge: {
    accent:
      'inline-flex items-center gap-1.5 rounded-full bg-dashboard-accent/10 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-dashboard-accent',
    amber:
      'rounded-full border border-dashboard-amber-border px-2.5 py-1 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-dashboard-amber-soft',
  },
  form: {
    sectionLabel:
      'mb-3 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-slate-500',
    amountRow: 'mt-4 flex items-end gap-4 border-b border-dashboard-border-hover pb-5',
    currency: 'pb-2 text-4xl font-light text-dashboard-ghost sm:text-5xl',
    amountInput:
      'w-full bg-transparent text-[4rem] leading-none font-black tracking-tight text-dashboard-ghost outline-none placeholder:text-dashboard-ghost/70 sm:text-[5.25rem]',
    field:
      'flex h-14 items-center gap-3 rounded-2xl border border-dashboard-border bg-dashboard-control px-4 text-slate-800 transition duration-200 focus-within:border-dashboard-accent/35 focus-within:shadow-dashboard-focus',
    select:
      'w-full appearance-none bg-transparent pr-8 text-sm font-semibold text-slate-800 outline-none',
    input:
      'w-full bg-transparent text-sm font-semibold text-slate-800 placeholder:text-slate-500 outline-none',
    textArea:
      'min-h-32 w-full rounded-dashboard-card border border-dashboard-border bg-dashboard-control px-5 py-4 text-sm text-slate-800 placeholder:text-slate-500 outline-none transition duration-200 focus:border-dashboard-accent/35 focus:shadow-dashboard-focus resize-none',
    toggleCard:
      'flex items-center justify-between gap-4 rounded-dashboard-card border border-dashboard-border bg-dashboard-card px-5 py-5 shadow-dashboard-card',
    toggleTrack:
      'relative inline-flex h-8 w-14 items-center rounded-full transition duration-200',
    toggleTrackOn: 'bg-dashboard-accent/30',
    toggleTrackOff: 'bg-dashboard-control',
    toggleThumb: 'h-6 w-6 rounded-full bg-white shadow-sm transition duration-200',
    toggleThumbOn: 'translate-x-7',
    toggleThumbOff: 'translate-x-1',
    uploadZone:
      'relative overflow-hidden rounded-dashboard-card border border-dashed border-dashboard-border bg-dashboard-control px-6 py-10 text-center',
    progressTrack: 'h-1.5 rounded-full bg-black/6',
    progressBar: 'h-full rounded-full bg-linear-to-r from-dashboard-accent-strong to-dashboard-accent-end',
    statusCard:
      'rounded-dashboard-card border border-dashboard-border bg-dashboard-inner px-4 py-3',
  },
  layout: {
    row: 'flex items-center gap-3',
    between: 'flex items-center justify-between gap-4',
  },
}
