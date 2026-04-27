import AppShell from '../_components/AppShell'
import {
  dashboardSidebarAction,
  getNavigationItems,
  profile,
} from '../_components/appShellData'
import ReportsFilterRail from './_components/ReportsFilterRail'
import ExecutiveSummaryCard from './_components/ExecutiveSummaryCard'
import SpendingComparisonChart from './_components/SpendingComparisonChart'
import SpendingBreakdownCard from './_components/SpendingBreakdownCard'
import WealthAccumulationCard from './_components/WealthAccumulationCard'
import {
  reportFilters,
  executiveSummary,
  spendingComparison,
  spendingBreakdown,
  wealthAccumulation,
} from './reportsData'

const Reports = () => {
  return (
    <AppShell
      navigationItems={getNavigationItems('reports')}
      primaryAction={dashboardSidebarAction}
      profile={profile}
      searchPlaceholder="Search analytics..."
    >
      <div className="grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)]">
        <ReportsFilterRail filters={reportFilters} />

        <div className="space-y-6">
          <ExecutiveSummaryCard {...executiveSummary} />
          <SpendingComparisonChart {...spendingComparison} />

          <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
            <SpendingBreakdownCard {...spendingBreakdown} />
            <WealthAccumulationCard {...wealthAccumulation} />
          </div>
        </div>
      </div>
    </AppShell>
  )
}

export default Reports
