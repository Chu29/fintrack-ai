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
    <aside className="fixed left-0 top-0 z-20 hidden h-screen w-52.5 border-r border-white/10 bg-dashboard-sidebar px-4 py-6 xl:flex">
      <div className="flex h-full w-full flex-col gap-6">
        <div>
          <p className={ui.text.brand}>FinTrack AI</p>
          <p className={ui.text.brandSub}>The Digital Curator</p>
        </div>

        <div>
          <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.08em] text-dashboard-section">
            Main
          </p>
          <nav aria-label="Application navigation" className="grid gap-1">
          {navigationItems.map((item) => {
            const Icon = iconMap[item.icon]
            const Component = item.to ? Link : 'button'
            const actionProps = item.to ? { to: item.to } : { type: 'button' }

            return (
              <Component
                key={item.id}
                className={cx(
                  'group relative flex items-center gap-3 rounded-r-[10px] px-3 py-2.5 text-left text-[13px] font-medium transition duration-200',
                  item.active ? ui.surface.navActive : ui.surface.navIdle,
                )}
                {...actionProps}
              >
                <span
                  className={cx(
                    'absolute inset-y-1 left-0 w-0.75 origin-left rounded-r bg-dashboard-accent transition duration-200',
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
        </div>

        <div className="mt-auto grid gap-4">
          {primaryAction ? (
            primaryAction.to ? (
              <Link to={primaryAction.to} className={cx(ui.action.primary, 'h-10 px-4')}>
                {primaryAction.label}
              </Link>
            ) : (
              <button type="button" className={cx(ui.action.primary, 'h-10 px-4')}>
                {primaryAction.label}
              </button>
            )
          ) : null}

          <div className={cx(ui.surface.profile, ui.layout.row, 'px-3 py-3')}>
            <div className={cx(ui.avatar.base, ui.avatar.md)}>{profile.initials}</div>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-white">{profile.name}</p>
              <p className="text-[11px] text-dashboard-secondary">{profile.role}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default AppSidebar
