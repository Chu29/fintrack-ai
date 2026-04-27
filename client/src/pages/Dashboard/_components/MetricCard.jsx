import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import { cx, dashboardStyles as ui } from '../dashboardStyles'

const MetricCard = ({ title, value, note, tone, progress, progressLabel }) => {
  return (
    <article className={cx(ui.surface.card, ui.surface.cardHover, 'p-5')}>
      <p className={ui.text.overline}>{title}</p>

      <p className={cx(ui.text.metricValue, 'mt-4')}>{value}</p>

      {typeof progress === 'number' ? (
        <div className="mt-5 space-y-2">
          <div className="h-1.5 rounded-full bg-dashboard-control">
            <div
              className="h-full rounded-full bg-linear-to-r from-dashboard-accent to-dashboard-progress-end"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-slate-500">{progressLabel}</p>
        </div>
      ) : (
        <div className="mt-5 flex items-center gap-2 text-xs">
          <TrendingUpRoundedIcon
            className={tone === 'positive' ? ui.text.accent : 'text-slate-500'}
            fontSize="inherit"
          />
          <span className={tone === 'positive' ? ui.text.accent : 'text-slate-500'}>
            {note}
          </span>
        </div>
      )}
    </article>
  )
}

export default MetricCard
