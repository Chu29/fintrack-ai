import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import { cx, dashboardStyles as ui } from '../dashboardStyles'

const AdviceCard = ({ badge, body }) => {
  return (
    <aside className={cx(ui.surface.advice)}>
      <div className={cx(ui.layout.between, 'gap-3')}>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-dashboard-amber text-dashboard-on-amber">
          <AutoAwesomeRoundedIcon fontSize="small" />
        </span>
        <span className="rounded-full border border-dashboard-amber-border px-2.5 py-1 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-dashboard-amber-soft">
          {badge}
        </span>
      </div>

      <p className={cx(ui.text.bodyStrong, 'mt-5')}>{body}</p>
    </aside>
  )
}

export default AdviceCard
