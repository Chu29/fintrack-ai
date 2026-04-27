import WalletRoundedIcon from '@mui/icons-material/WalletRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded'
import { cx, appStyles as ui } from '../../_components/appStyles'

const iconMap = {
  alert: WarningAmberRoundedIcon,
  savings: SavingsRoundedIcon,
}

const BudgetInsightCard = ({ type, eyebrow, title, meta, detail, progress }) => {
  const AccentIcon = iconMap[type]

  if (type === 'budget') {
    return (
      <article className={cx(ui.surface.card, 'p-5')}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className={ui.text.overline}>{eyebrow}</p>
            <div className="mt-3 flex items-end gap-2">
              <p className="text-[2.1rem] font-black tracking-tight text-dashboard-ink">
                {title}
              </p>
              <p className="pb-1 text-sm font-semibold text-slate-500">{meta}</p>
            </div>
          </div>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-dashboard-inner text-dashboard-accent">
            <WalletRoundedIcon fontSize="small" />
          </span>
        </div>

        <div className="mt-5 h-1.5 rounded-full bg-dashboard-control">
          <div
            className="h-full rounded-full bg-linear-to-r from-dashboard-accent to-dashboard-progress-end"
            style={{ width: `${progress}%` }}
          />
        </div>
      </article>
    )
  }

  return (
    <article className={cx(ui.surface.card, 'p-5')}>
      <p className={ui.text.overline}>{eyebrow}</p>
      <div className="mt-4 flex items-start gap-3">
        <span
          className={cx(
            'inline-flex h-11 w-11 items-center justify-center rounded-2xl',
            type === 'alert'
              ? 'bg-dashboard-amber/45 text-dashboard-amber-text'
              : 'bg-dashboard-inner text-dashboard-accent',
          )}
        >
          <AccentIcon fontSize="small" />
        </span>

        <div>
          <p className="text-xl font-black tracking-tight text-dashboard-ink">
            {title}
          </p>
          <p className="mt-1 text-sm text-slate-500">{detail}</p>
        </div>
      </div>
    </article>
  )
}

export default BudgetInsightCard
