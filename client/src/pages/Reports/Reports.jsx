import { useEffect, useMemo, useState } from 'react'
import AppShell from '../_components/AppShell'
import {
  dashboardSidebarAction,
  getNavigationItems,
} from '../_components/appShellData'
import ReportsFilterRail from './_components/ReportsFilterRail'
import FinancialPerformanceCard from './_components/FinancialPerformanceCard'
import SpendingComparisonChart from './_components/SpendingComparisonChart'
import SpendingBreakdownCard from './_components/SpendingBreakdownCard'
import WealthAccumulationCard from './_components/WealthAccumulationCard'
import { reportFilters as defaultFilters } from './reportsData'
import {
  getBudgetVsActual,
  getMonthlyTrend,
  getSpendingByCategory,
} from '../../shared/api/reportsApi'
import { useAuth } from '../../shared/auth/AuthContext.jsx'
import { formatCurrency, monthLabel, toProfile } from '../../shared/uiData'

const Reports = () => {
  const auth = useAuth()
  const profile = toProfile(auth)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [reportFilters, setReportFilters] = useState(defaultFilters)
  const [performanceSummary, setPerformanceSummary] = useState({
    eyebrow: 'Performance Summary',
    status: 'Live Status',
    insight: 'Loading report data...',
    performance: [
      { label: 'Forecast', value: 'Pending', tone: 'positive' },
      { label: 'Alert', value: 'Monitor', tone: 'warning' },
    ],
    recommendation: 'Gathering current spend and budget behavior.',
  })
  const [spendingComparison, setSpendingComparison] = useState({
    months: [],
    actual: [],
    budget: [],
  })
  const [spendingBreakdown, setSpendingBreakdown] = useState({
    total: formatCurrency(0),
    series: [],
  })
  const [wealthAccumulation, setWealthAccumulation] = useState({
    amount: '+$0.00',
    detail: 'No trend data available yet.',
    months: [],
    values: [],
  })

  useEffect(() => {
    let isMounted = true
    const now = new Date()
    const month = now.getUTCMonth() + 1
    const year = now.getUTCFullYear()

    async function loadReports() {
      setIsLoading(true)
      setError('')

      try {
        const [trendData, spendingData, budgetData] = await Promise.all([
          getMonthlyTrend({ year }),
          getSpendingByCategory({ month, year }),
          getBudgetVsActual({ month, year }),
        ])

        if (!isMounted) {
          return
        }

        const trend = trendData.trend || []
        const months = trend.map((item) => monthLabel(item.month))
        const actual = trend.map((item) => Number(item.totalSpent || 0))
        const budgetTotal = (budgetData.budgetVsActual || []).reduce(
          (sum, item) => sum + Number(item.limitAmount || 0),
          0
        )
        const monthlyBudgetLine = trend.map(() =>
          Number((budgetTotal > 0 ? budgetTotal : actual.reduce((a, b) => a + b, 0) / 12).toFixed(2))
        )

        const breakdownSource = spendingData.spendingByCategory || []
        const totalSpent = breakdownSource.reduce(
          (sum, item) => sum + Number(item.totalSpent || 0),
          0
        )
        const breakdownSeries = breakdownSource.map((item, index) => ({
          label: item.name,
          value:
            totalSpent > 0
              ? Math.max(1, Math.round((Number(item.totalSpent || 0) / totalSpent) * 100))
              : 0,
          color: item.color || ['#3d4b60', '#d49857', '#4f7d74', '#9b8de0'][index % 4],
        }))

        const cumulative = []
        actual.reduce((sum, value) => {
          const next = sum + value
          cumulative.push(next)
          return next
        }, 0)

        const latestMonthSpend = actual[actual.length - 1] || 0
        const latestMonthBudget = monthlyBudgetLine[monthlyBudgetLine.length - 1] || 0
        const adherence =
          latestMonthBudget > 0
            ? Math.round((1 - latestMonthSpend / latestMonthBudget) * 100)
            : 0

        setReportFilters({
          ...defaultFilters,
          categories: breakdownSeries.map((item) => ({
            label: item.label,
            color: item.color,
          })),
        })
        setPerformanceSummary({
          eyebrow: `Performance Summary: ${monthLabel(month)} ${year}`,
          status: 'Live Data',
          insight: `Your current month spend is ${formatCurrency(
            latestMonthSpend
          )} against a budget of ${formatCurrency(latestMonthBudget)}.`,
          performance: [
            {
              label: 'Forecast',
              value: latestMonthSpend <= latestMonthBudget ? 'Positive' : 'At Risk',
              tone: latestMonthSpend <= latestMonthBudget ? 'positive' : 'warning',
            },
            {
              label: 'Adherence',
              value: `${adherence}%`,
              tone: adherence >= 0 ? 'positive' : 'warning',
            },
          ],
          recommendation:
            latestMonthSpend <= latestMonthBudget
              ? 'Maintain current category allocations to preserve this trajectory.'
              : 'Trim variable spending categories to recover monthly budget adherence.',
        })
        setSpendingComparison({
          months,
          actual,
          budget: monthlyBudgetLine,
        })
        setSpendingBreakdown({
          total: formatCurrency(totalSpent),
          series: breakdownSeries,
        })
        setWealthAccumulation({
          amount: `+${formatCurrency(cumulative[cumulative.length - 1] || 0)}`,
          detail:
            'Cumulative spend trend based on month-by-month report aggregates.',
          months,
          values: cumulative,
        })
      } catch (fetchError) {
        if (!isMounted) {
          return
        }

        setError(fetchError?.error?.message || 'Failed to load report data')
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadReports()

    return () => {
      isMounted = false
    }
  }, [])

  const hasReportData = useMemo(
    () => spendingComparison.months.length > 0 || spendingBreakdown.series.length > 0,
    [spendingBreakdown.series.length, spendingComparison.months.length]
  )

  return (
    <AppShell
      navigationItems={getNavigationItems('reports')}
      primaryAction={dashboardSidebarAction}
      profile={profile}
      searchPlaceholder="Search analytics..."
    >
      {isLoading ? (
        <p className="mb-4 text-sm text-slate-500">Loading reports...</p>
      ) : null}
      {error ? (
        <p className="mb-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</p>
      ) : null}
      <div className="grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)]">
        <ReportsFilterRail filters={reportFilters} />

        <div className="space-y-6">
          <FinancialPerformanceCard {...performanceSummary} />
          {hasReportData ? (
            <SpendingComparisonChart {...spendingComparison} />
          ) : (
            <p className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-500">
              No report data available for the selected period.
            </p>
          )}

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
