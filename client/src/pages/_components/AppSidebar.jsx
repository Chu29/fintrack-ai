import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded'
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import { Link } from 'react-router'
import { cx, appStyles as ui } from './appStyles'

const iconMap = {
  dashboard: SpaceDashboardRoundedIcon,
  expense: AddCardRoundedIcon,
  categories: CategoryRoundedIcon,
  reports: BarChartRoundedIcon,
  settings: SettingsRoundedIcon,
}

const AppSidebar = ({ navigationItems, primaryAction, profile }) => {
  return (
    <aside className="border-b border-dashboard-border-soft bg-dashboard-sidebar px-5 py-6 xl:border-b-0 xl:border-r xl:border-dashboard-border xl:px-6 xl:py-7">
      <div className="flex h-full flex-col gap-6">
        <div>
          <p className={ui.text.brand}>FinTrack AI</p>
          <p className={ui.text.brandSub}>The Digital Curator</p>
        </div>

        <nav aria-label="Application navigation" className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
          {navigationItems.map((item) => {
            const Icon = iconMap[item.icon]
            const Component = item.to ? Link : 'button'
            const actionProps = item.to ? { to: item.to } : { type: 'button' }

            return (
              <Component
                key={item.id}
                className={cx(
                  'group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition duration-200',
                  item.active ? ui.surface.navActive : ui.surface.navIdle,
                )}
                {...actionProps}
              >
                <span
                  className={cx(
                    'absolute bottom-2 left-4 right-4 h-px origin-left bg-dashboard-accent transition duration-200 xl:bottom-3 xl:left-auto xl:right-0 xl:top-3 xl:h-8 xl:w-px',
                    item.active ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
                  )}
                  aria-hidden="true"
                />
                <Icon fontSize="small" />
                <span>{item.label}</span>
              </Component>
            )
          })}
        </nav>

        <div className="grid gap-4 xl:mt-auto">
          {primaryAction ? (
            primaryAction.to ? (
              <Link to={primaryAction.to} className={cx(ui.action.primary, 'h-13 px-4')}>
                {primaryAction.label}
              </Link>
            ) : (
              <button type="button" className={cx(ui.action.primary, 'h-13 px-4')}>
                {primaryAction.label}
              </button>
            )
          ) : null}

          <div className={cx(ui.surface.profile, ui.layout.row, 'px-3.5 py-3')}>
            <div className={cx(ui.avatar.base, ui.avatar.md)}>{profile.initials}</div>
            <div className="min-w-0">
              <p className={cx(ui.text.label, 'truncate')}>{profile.name}</p>
              <p className="text-xs text-slate-500">{profile.role}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default AppSidebar
