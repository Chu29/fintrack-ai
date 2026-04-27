export const cx = (...values) => values.filter(Boolean).join(' ')

export const appStyles = {
  page: {
    shell: 'min-h-screen bg-dashboard-page text-dashboard-ink',
    canvas: 'min-h-screen',
    dots: 'hidden',
    glow: 'hidden',
    layout: 'min-h-screen',
    content: 'px-6 py-6 xl:ml-[210px]',
  },
  surface: {
    card: 'rounded-[10px] border border-dashboard-border bg-dashboard-card p-4 shadow-dashboard-card',
    cardHover:
      'transition-colors duration-200 hover:border-dashboard-border-hover',
    elevated:
      'rounded-[10px] border border-dashboard-border bg-dashboard-elevated p-4 shadow-dashboard-panel',
    alert:
      'rounded-[10px] border border-dashboard-alert-border bg-dashboard-card p-4 shadow-dashboard-alert',
    advice:
      'rounded-[10px] border border-dashboard-advice-border bg-dashboard-card p-4 shadow-dashboard-advice',
    inner: 'rounded-[10px] border border-dashboard-border bg-dashboard-inner',
    profile: 'rounded-[10px] border border-white/10 bg-dashboard-profile',
    control: 'rounded-[10px] border border-dashboard-border bg-dashboard-control',
    segmented: 'rounded-[10px] border border-dashboard-border bg-dashboard-segmented',
    segmentedActive: 'rounded-[8px] bg-dashboard-segmented-active text-dashboard-ink',
    navActive:
      'border-l-[3px] border-dashboard-accent bg-dashboard-nav-active text-white',
    navIdle: 'text-dashboard-secondary hover:bg-dashboard-nav-hover hover:text-white',
  },
  text: {
    brand: 'text-[15px] font-semibold text-white',
    brandSub:
      'mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-dashboard-section',
    overline:
      'text-[11px] font-medium uppercase tracking-[0.08em] text-dashboard-secondary',
    overlineTight:
      'text-[11px] font-medium uppercase tracking-[0.06em] text-dashboard-secondary',
    overlineWide:
      'text-[11px] font-medium uppercase tracking-[0.06em] text-dashboard-secondary',
    pageEyebrow:
      'text-[11px] font-medium uppercase tracking-[0.08em] text-dashboard-secondary',
    pageTitle: 'mt-2 text-[15px] font-semibold text-dashboard-ink',
    sectionTitle: 'text-[15px] font-semibold text-dashboard-ink',
    featureTitle: 'text-[15px] font-semibold text-dashboard-ink',
    metricValue: 'text-[26px] font-semibold text-dashboard-ink',
    label: 'text-[13px] font-medium text-dashboard-ink',
    muted: 'text-[13px] font-normal text-dashboard-secondary',
    body: 'text-[13px] leading-5 font-normal text-dashboard-secondary',
    bodyStrong: 'text-[13px] leading-5 font-normal text-dashboard-ink',
    accent: 'text-dashboard-accent',
    amber: 'text-dashboard-secondary',
  },
  action: {
    primary:
      'inline-flex items-center justify-center rounded-[10px] bg-dashboard-accent px-4 text-[13px] font-medium text-dashboard-on-accent transition duration-200 hover:bg-dashboard-accent-hover-start',
    secondary:
      'inline-flex items-center justify-center rounded-[10px] border border-dashboard-border bg-white text-[13px] font-medium text-dashboard-secondary transition duration-200 hover:border-dashboard-border-hover hover:text-dashboard-ink',
    fab: 'inline-flex h-11 w-11 items-center justify-center rounded-[10px] bg-dashboard-accent text-dashboard-fab-text shadow-dashboard-accent-fab transition duration-200 hover:bg-dashboard-accent-hover-start',
    link: 'text-[11px] font-medium uppercase tracking-[0.06em] text-dashboard-accent transition hover:text-dashboard-accent-soft',
    iconButton:
      'transition duration-200 hover:border-dashboard-accent/35 hover:text-dashboard-accent',
  },
  avatar: {
    base: 'flex items-center justify-center rounded-full bg-dashboard-avatar font-semibold text-white',
    sm: 'h-9 w-9 text-xs',
    md: 'h-11 w-11 text-sm',
  },
  badge: {
    accent:
      'inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-dashboard-accent',
    amber:
      'rounded-full border border-dashboard-amber-border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-dashboard-amber-soft',
  },
  form: {
    sectionLabel:
      'mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-dashboard-secondary',
    amountRow: 'mt-2 flex items-end gap-3 border-b border-dashboard-border pb-4',
    currency: 'pb-1 text-[26px] font-medium text-dashboard-ghost',
    amountInput:
      'w-full bg-transparent text-[32px] leading-none font-semibold text-dashboard-ghost outline-none placeholder:text-dashboard-ghost/70',
    field:
      'flex h-11 items-center gap-3 rounded-[10px] border border-dashboard-border bg-dashboard-control px-3.5 text-dashboard-ink transition duration-200 focus-within:border-dashboard-accent/35 focus-within:shadow-dashboard-focus',
    select:
      'w-full appearance-none bg-transparent pr-8 text-[13px] font-normal text-dashboard-ink outline-none',
    input:
      'w-full bg-transparent text-[13px] font-normal text-dashboard-ink placeholder:text-dashboard-secondary outline-none',
    textArea:
      'min-h-30 w-full rounded-[10px] border border-dashboard-border bg-dashboard-control px-4 py-3 text-[13px] text-dashboard-ink placeholder:text-dashboard-secondary outline-none transition duration-200 focus:border-dashboard-accent/35 focus:shadow-dashboard-focus resize-none',
    toggleCard:
      'flex items-center justify-between gap-4 rounded-[10px] border border-dashboard-border bg-dashboard-card px-4 py-4',
    toggleTrack: 'relative inline-flex h-6 w-11 items-center rounded-full transition duration-200',
    toggleTrackOn: 'bg-dashboard-accent',
    toggleTrackOff: 'bg-slate-300',
    toggleThumb: 'h-5 w-5 rounded-full bg-white shadow-sm transition duration-200',
    toggleThumbOn: 'translate-x-5',
    toggleThumbOff: 'translate-x-1',
    uploadZone:
      'relative overflow-hidden rounded-[10px] border border-dashed border-dashboard-border bg-dashboard-control px-6 py-8 text-center',
    progressTrack: 'h-[5px] rounded-[99px] bg-slate-200',
    progressBar: 'h-full rounded-[99px] bg-dashboard-accent',
    statusCard:
      'rounded-[10px] border border-dashboard-border bg-dashboard-inner px-4 py-3',
  },
  layout: {
    row: 'flex items-center gap-3',
    between: 'flex items-center justify-between gap-4',
  },
}
