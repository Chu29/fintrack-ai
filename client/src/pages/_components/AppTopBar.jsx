import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import { cx, appStyles as ui } from './appStyles'

const AppTopBar = ({ profile }) => {
  const dateLabel = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date())

  return (
    <header className="border-b border-dashboard-border bg-dashboard-card px-6 py-3.5 xl:ml-52.5">
      <div className="flex items-center justify-between gap-4">
        <div></div>
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 items-center rounded-full border border-dashboard-border bg-dashboard-control px-3 text-[11px] font-medium uppercase tracking-[0.06em] text-dashboard-secondary">
            {dateLabel}
          </span>
          <button
            type="button"
            className={cx(
              'inline-flex h-9 w-9 items-center justify-center rounded-[10px] text-dashboard-secondary',
              ui.surface.control,
              ui.action.iconButton,
            )}
            aria-label="Notifications"
          >
            <NotificationsRoundedIcon fontSize="small" />
          </button>
          <span className={cx(ui.avatar.base, ui.avatar.sm)}>
            {profile.initials}
          </span>
        </div>
      </div>
    </header>
  )
}

export default AppTopBar
