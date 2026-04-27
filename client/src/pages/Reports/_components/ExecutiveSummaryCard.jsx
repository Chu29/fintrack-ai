import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import { cx, appStyles as ui } from '../../_components/appStyles'

const toneClasses = {
  positive: 'bg-dashboard-accent/10 text-dashboard-accent',
  warning: 'bg-dashboard-amber/45 text-dashboard-amber-text',
}

const ExecutiveSummaryCard = ({ eyebrow, status, insight, performance, recommendation }) => {
  return (
    <section className={cx(ui.surface.card, 'p-6')}>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-dashboard-inner text-dashboard-accent">
              <AutoAwesomeRoundedIcon fontSize="small" />
            </span>
            <h2 className="text-2xl font-black tracking-tight text-dashboard-ink">
              {eyebrow}
            </h2>
            <span className="rounded-full bg-dashboard-accent/10 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-dashboard-accent">
              {status}
            </span>
          </div>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600">
            {insight}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {performance.map((item) => (
              <div
                key={item.label}
                className={cx(
                  'rounded-2xl px-4 py-3 text-sm font-semibold',
                  toneClasses[item.tone],
                )}
              >
                <span className="mr-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] opacity-70">
                  {item.label}
                </span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-dashboard-card border border-dashboard-border bg-dashboard-inner p-5 xl:max-w-sm">
          <p className={ui.text.overline}>Priority Recommendation</p>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            {recommendation}
          </p>
        </div>
      </div>
    </section>
  )
}

export default ExecutiveSummaryCard
