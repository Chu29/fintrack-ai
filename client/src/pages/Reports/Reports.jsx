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
  const initialDate = useMemo(() => new Date(), [])
  const currentMonth = initialDate.getUTCMonth() + 1
  const currentYear = initialDate.getUTCFullYear()
  const defaultTimePeriodId =
    defaultFilters.timePeriods.find((option) => option.active)?.id ??
    defaultFilters.timePeriods[0]?.id
  const [activeTimePeriodId, setActiveTimePeriodId] = useState(
    defaultTimePeriodId,
  )
  const [customRange, setCustomRange] = useState({
    month: currentMonth,
    year: currentYear,
  })
  const [reportCategories, setReportCategories] = useState(
    defaultFilters.categories,
  )
  const reportFilters = useMemo(
    () => ({
      ...defaultFilters,
      timePeriods: defaultFilters.timePeriods.map((option) => ({
        ...option,
        active: option.id === activeTimePeriodId,
      })),
      categories: reportCategories,
    }),
    [activeTimePeriodId, reportCategories],
  )
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
  const handleTimePeriodChange = (periodId) => {
    if (!periodId || periodId === activeTimePeriodId) {
      return
    }

    setActiveTimePeriodId(periodId)
  }

  const handleCustomRangeChange = (range) => {
    const monthValue = Number(range.month)
    const yearValue = Number(range.year)

    setCustomRange((prev) => ({
      month:
        Number.isFinite(monthValue) && monthValue >= 1 && monthValue <= 12
          ? monthValue
          : prev.month,
      year:
        Number.isFinite(yearValue) && yearValue >= 2000 && yearValue <= 9999
          ? yearValue
          : prev.year,
    }))
  }

  const handleExport = (type) => {
    if (type === 'csv') {
      const headers = ['Month', 'Actual Spending', 'Budget Limit']
      const rows = spendingComparison.months.map((month, index) => [
        month,
        spendingComparison.actual[index],
        spendingComparison.budget[index],
      ])

      const csvContent = [
        headers.join(','),
        ...rows.map((row) => row.join(',')),
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.setAttribute('href', url)
      link.setAttribute(
        'download',
        `fintrack-report-${activeTimePeriodId}-${new Date()
          .toISOString()
          .slice(0, 10)}.csv`,
      )
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      alert(`${type.toUpperCase()} Export coming soon. Please use CSV for now.`)
    }
  }

  useEffect(() => {
    let isMounted = true
    const resolveReportWindow = () => {
      if (activeTimePeriodId === 'last-30') {
        const anchor = new Date(Date.UTC(currentYear, currentMonth - 1, 1))
        anchor.setUTCDate(anchor.getUTCDate() - 30)
        return {
          month: anchor.getUTCMonth() + 1,
          year: anchor.getUTCFullYear(),
        }
      }

      if (activeTimePeriodId === 'custom') {
        return {
          month: customRange.month || currentMonth,
          year: customRange.year || currentYear,
        }
      }

      return { month: currentMonth, year: currentYear }
    }

    const { month, year } = resolveReportWindow()

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
          0,
        )
        const monthlyBudgetLine = trend.map(() =>
          Number(
            (budgetTotal > 0
              ? budgetTotal
              : actual.reduce((a, b) => a + b, 0) / 12
            ).toFixed(2),
          ),
        )

        const breakdownSource = spendingData.spendingByCategory || []
        const totalSpent = breakdownSource.reduce(
          (sum, item) => sum + Number(item.totalSpent || 0),
          0,
        )
        const breakdownSeries = breakdownSource.map((item, index) => ({
          label: item.name,
          value:
            totalSpent > 0
              ? Math.max(
                  1,
                  Math.round((Number(item.totalSpent || 0) / totalSpent) * 100),
                )
              : 0,
          color:
            item.color ||
            ['#3d4b60', '#d49857', '#4f7d74', '#9b8de0'][index % 4],
        }))

        const cumulative = []
        actual.reduce((sum, value) => {
          const next = sum + value
          cumulative.push(next)
          return next
        }, 0)

        const latestMonthSpend = actual[actual.length - 1] || 0
        const latestMonthBudget =
          monthlyBudgetLine[monthlyBudgetLine.length - 1] || 0
        const adherence =
          latestMonthBudget > 0
            ? Math.round((1 - latestMonthSpend / latestMonthBudget) * 100)
            : 0

        setReportCategories(
          breakdownSeries.map((item) => ({
            label: item.label,
            color: item.color,
          })),
        )
        setPerformanceSummary({
          eyebrow: `Performance Summary: ${monthLabel(month)} ${year}`,
          status: 'Live Data',
          insight: `Your current month spend is ${formatCurrency(
            latestMonthSpend,
          )} against a budget of ${formatCurrency(latestMonthBudget)}.`,
          performance: [
            {
              label: 'Forecast',
              value:
                latestMonthSpend <= latestMonthBudget ? 'Positive' : 'At Risk',
              tone:
                latestMonthSpend <= latestMonthBudget ? 'positive' : 'warning',
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
  }, [activeTimePeriodId, customRange, currentMonth, currentYear])

  const hasReportData = useMemo(
    () =>
      spendingComparison.months.length > 0 ||
      spendingBreakdown.series.length > 0,
    [spendingBreakdown.series.length, spendingComparison.months.length],
  )

  return (
    <AppShell
      navigationItems={getNavigationItems('reports')}
      primaryAction={dashboardSidebarAction}
      profile={profile}
      searchPlaceholder="Search analytics..."
    >
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Status Messages */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
              <p className="text-sm text-dashboard-secondary">
                Loading reports...
              </p>
            </div>
          ) : null}
          {error ? (
            <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
              <p className="text-sm text-rose-600">{error}</p>
            </div>
          ) : null}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Left Column - Filters */}
          <div className="lg:sticky lg:top-6 lg:h-fit">
            <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
              <h3 className="mb-4 text-lg font-semibold text-dashboard-ink">
                Filters
              </h3>
              <ReportsFilterRail
                filters={reportFilters}
                onTimePeriodChange={handleTimePeriodChange}
                customRange={customRange}
                onCustomRangeChange={handleCustomRangeChange}
                onExport={handleExport}
              />
            </div>
          </div>

          {/* Right Column - Reports Content */}
          <div className="space-y-6">
            {/* Performance Summary */}
            <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
              <FinancialPerformanceCard {...performanceSummary} />
            </div>

            {/* Spending Comparison Chart */}
            <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
              <h3 className="mb-4 text-lg font-semibold text-dashboard-ink">
                Spending Comparison
              </h3>
              {hasReportData ? (
                <SpendingComparisonChart {...spendingComparison} />
              ) : (
                <p className="text-sm text-dashboard-secondary">
                  No report data available for the selected period.
                </p>
              )}
            </div>

            {/* Bottom Cards Grid */}
            <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
              {/* Spending Breakdown */}
              <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
                <h3 className="mb-4 text-lg font-semibold text-dashboard-ink">
                  Spending Breakdown
                </h3>
                <SpendingBreakdownCard {...spendingBreakdown} />
              </div>

              {/* Wealth Accumulation */}
              <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
                <h3 className="mb-4 text-lg font-semibold text-dashboard-ink">
                  Wealth Accumulation
                </h3>
                <WealthAccumulationCard {...wealthAccumulation} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

export default Reports
