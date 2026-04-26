import Sidebar from './_components/Sidebar'
import TopBar from './_components/TopBar'
import MetricCard from './_components/MetricCard'
import AdviceCard from './_components/AdviceCard'
import SpendingChart from './_components/SpendingChart'
import AlertPanel from './_components/AlertPanel'
import BudgetTracker from './_components/BudgetTracker'
import TransactionsTable from './_components/TransactionsTable'
import {
  navigationItems,
  profile,
  statCards,
  smartAdvice,
  spendingSeries,
  alertPanel,
  budgetItems,
  transactions,
} from './dashboardData'
import { dashboardStyles as ui } from './dashboardStyles'

const Dashboard = () => {
  return (
    <main className={ui.page.shell}>
      <div className={ui.page.canvas}>
        <div className={ui.page.dots} aria-hidden="true" />
        <div className={ui.page.glow} aria-hidden="true" />

        <div className={ui.page.layout}>
          <Sidebar navigationItems={navigationItems} profile={profile} />

          <section className="min-w-0">
            <TopBar profile={profile} />

            <div className={ui.page.content}>
              <div className="grid gap-4 xl:grid-cols-[repeat(3,minmax(0,1fr))_220px]">
                {statCards.map((card) => (
                  <MetricCard key={card.title} {...card} />
                ))}
                <AdviceCard {...smartAdvice} />
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
                <SpendingChart series={spendingSeries} />
                <AlertPanel {...alertPanel} />
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
                <BudgetTracker items={budgetItems} />
                <TransactionsTable items={transactions} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
