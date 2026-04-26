import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import { cx, dashboardStyles as ui } from '../dashboardStyles'

const AlertPanel = ({ label, title, body, savings, cta }) => {
  return (
    <aside className={cx(ui.surface.alert, 'relative overflow-hidden p-6')}>
      <RestaurantRoundedIcon
        className="absolute right-5 top-5 text-slate-400/14"
        sx={{ fontSize: 84 }}
      />

      <div className="relative">
        <div className={ui.layout.row}>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-dashboard-amber text-dashboard-on-amber shadow-dashboard-amber">
            <AutoAwesomeRoundedIcon fontSize="small" />
          </span>
          <p className={cx(ui.text.overlineTight, ui.text.amber)}>{label}</p>
        </div>

        <h2 className="mt-7 max-w-[12ch] text-[2rem] leading-[1.05] font-bold tracking-tight text-slate-100">
          {title}
        </h2>

        <p className={cx(ui.text.body, 'mt-5 max-w-[26ch]')}>
          {body}{' '}
          <span className={cx('font-semibold', ui.text.accent)}>{savings}</span>
        </p>

        <button
          type="button"
          className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-dashboard-alert-button px-5 text-sm font-bold text-dashboard-amber-button transition duration-200 hover:bg-dashboard-alert-button-hover"
        >
          <span>{cta}</span>
          <ArrowOutwardRoundedIcon fontSize="small" />
        </button>
      </div>
    </aside>
  )
}

export default AlertPanel
