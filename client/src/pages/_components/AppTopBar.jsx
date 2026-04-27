import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import { cx, appStyles as ui } from './appStyles'

const AppTopBar = ({ profile, searchPlaceholder = 'Search insights...' }) => {
  return (
    <header className="border-b border-dashboard-border px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label
          className={cx(
            'group flex h-12 w-full max-w-xl items-center gap-3 rounded-full px-4 transition duration-200',
            ui.surface.control,
            'focus-within:border-dashboard-accent/55 focus-within:shadow-dashboard-focus',
          )}
        >
          <SearchRoundedIcon className="text-slate-500 transition group-focus-within:text-dashboard-accent" />
          <input
            type="search"
            placeholder={searchPlaceholder}
            className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 outline-none"
          />
        </label>

        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <button
            type="button"
            className={cx(
              'inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-400',
              ui.surface.control,
              ui.action.iconButton,
            )}
            aria-label="Notifications"
          >
            <NotificationsRoundedIcon fontSize="small" />
          </button>

          <button
            type="button"
            className={cx(
              'flex items-center gap-3 rounded-full px-2.5 py-1.5 text-left transition duration-200',
              ui.surface.control,
              ui.action.iconButton,
            )}
          >
            <span className="hidden text-sm font-semibold text-slate-300 sm:block">
              Profile
            </span>
            <span className={cx(ui.avatar.base, ui.avatar.sm)}>
              {profile.initials}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default AppTopBar
