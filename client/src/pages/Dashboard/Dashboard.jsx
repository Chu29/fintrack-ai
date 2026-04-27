import MetricCard from './_components/MetricCard'
import AdviceCard from './_components/AdviceCard'
import SpendingChart from './_components/SpendingChart'
import AlertPanel from './_components/AlertPanel'
import BudgetTracker from './_components/BudgetTracker'
import TransactionsTable from './_components/TransactionsTable'
import {
  statCards,
  smartAdvice,
  spendingSeries,
  alertPanel,
  budgetItems,
  transactions,
} from './dashboardData'
import AppShell from '../_components/AppShell'
import {
  dashboardSidebarAction,
  getNavigationItems,
  profile,
} from '../_components/appShellData'

const Dashboard = () => {
  return (
    <AppShell
      navigationItems={getNavigationItems('dashboard')}
      primaryAction={dashboardSidebarAction}
      profile={profile}
    >
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
    </AppShell>
  )
}

export default Dashboard
