import AppSidebar from './AppSidebar'
import AppTopBar from './AppTopBar'
import { appStyles as ui } from './appStyles'

const AppShell = ({
  children,
  navigationItems,
  primaryAction,
  profile,
  searchPlaceholder,
}) => {
  return (
    <main className={ui.page.shell}>
      <div className={ui.page.canvas}>
        <div className={ui.page.dots} aria-hidden="true" />
        <div className={ui.page.glow} aria-hidden="true" />

        <div className={ui.page.layout}>
          <AppSidebar
            navigationItems={navigationItems}
            primaryAction={primaryAction}
            profile={profile}
          />

          <section className="min-w-0">
            <AppTopBar
              profile={profile}
              searchPlaceholder={searchPlaceholder}
            />
            <div className={ui.page.content}>{children}</div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default AppShell
