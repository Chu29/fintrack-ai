import SyncAltRoundedIcon from '@mui/icons-material/SyncAltRounded'
import { cx, appStyles as ui } from '../../_components/appStyles'

const RecurringExpenseCard = ({ checked, onToggle }) => {
  return (
    <section className={ui.form.toggleCard}>
      <div className={ui.layout.row}>
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-dashboard-accent/12 text-dashboard-accent">
          <SyncAltRoundedIcon fontSize="small" />
        </span>
        <div>
          <p className={ui.text.label}>Recurring Expense</p>
          <p className="mt-1 text-sm text-slate-500">
            Schedule monthly or weekly
          </p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onToggle}
        className={cx(
          ui.form.toggleTrack,
          checked ? ui.form.toggleTrackOn : ui.form.toggleTrackOff,
        )}
      >
        <span
          className={cx(
            ui.form.toggleThumb,
            checked ? ui.form.toggleThumbOn : ui.form.toggleThumbOff,
          )}
        />
      </button>
    </section>
  )
}

export default RecurringExpenseCard
