import { cx, dashboardStyles as ui } from '../dashboardStyles'

const iconMap = {
  'Total Net Worth': '💳',
  'Monthly Income': '📈',
  'Total Expenses': '🧾',
}

const MetricCard = ({ title, value, note, tone, progress, progressLabel }) => {
  const isPositive = tone !== 'negative'

  return (
    <article className={cx(ui.surface.card, ui.surface.cardHover)}>
      <div className="inline-flex h-7 w-7 items-center justify-center rounded-[7px] bg-indigo-50 text-[14px]">
        {iconMap[title] || '💠'}
      </div>
      <p className={ui.text.overline}>{title}</p>
      <p className={cx(ui.text.metricValue, 'mt-3')}>{value}</p>
      <p className={cx('mt-2 text-[13px]', isPositive ? 'text-emerald-500' : 'text-rose-500')}>
        {note || progressLabel}
      </p>
      <div className="mt-3 h-1.25 rounded-[99px] bg-slate-100">
        <div
          className={cx('h-full rounded-[99px]', isPositive ? 'bg-emerald-500' : 'bg-rose-500')}
          style={{ width: `${typeof progress === 'number' ? progress : 72}%` }}
        />
      </div>
      {typeof progress === 'number' ? (
        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.06em] text-dashboard-secondary">
          {progressLabel}
        </p>
      ) : null}
      {!progressLabel && !note ? (
        <div className="mt-3 h-1.25 rounded-[99px] bg-slate-100">
          <div className="h-full w-[70%] rounded-[99px] bg-emerald-500" />
        </div>
      ) : null}
    </article>
  )
}

export default MetricCard
