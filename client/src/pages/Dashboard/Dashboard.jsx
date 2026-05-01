import { useEffect, useMemo, useState } from 'react'
import MetricCard from './_components/MetricCard'
import BalanceHeroCard from './_components/BalanceHeroCard'
import SpendingChart from './_components/SpendingChart'
import BudgetTracker from './_components/BudgetTracker'
import TransactionsTable from './_components/TransactionsTable'
import AppShell from '../_components/AppShell'
import {
  dashboardSidebarAction,
  getNavigationItems,
} from '../_components/appShellData'
import { getBudgetVsActual } from '../../shared/api/reportsApi'
import { getExpenses } from '../../shared/api/expensesApi'
import { getMonthlyTrend } from '../../shared/api/reportsApi'
import { useAuth } from '../../shared/auth/AuthContext.jsx'
import { formatCurrency, monthLabel, toProfile } from '../../shared/uiData'

const Dashboard = () => {
  const auth = useAuth()
  const profile = toProfile(auth)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [spendingSeries, setSpendingSeries] = useState([])
  const [budgetItems, setBudgetItems] = useState([])
  const [transactions, setTransactions] = useState([])
  const [totals, setTotals] = useState({
    totalBudget: 0,
    totalSpent: 0,
    monthlyIncome: 0,
    savings: 0,
  })

  useEffect(() => {
    let isMounted = true

    async function loadDashboard() {
      setIsLoading(true)
      setError('')

      try {
        const now = new Date()
        const month = now.getUTCMonth() + 1
        const year = now.getUTCFullYear()

        const [trendResponse, budgetResponse, expensesResponse] =
          await Promise.all([
            getMonthlyTrend({ year }),
            getBudgetVsActual({ month, year }),
            getExpenses({ page: 1, pageSize: 8 }),
          ])

        if (!isMounted) {
          return
        }

        const trend = (trendResponse.trend || []).map((item) => ({
          month: monthLabel(item.month),
          value: Number(item.totalSpent || 0),
        }))

        const budgetVsActual = budgetResponse.budgetVsActual || []
        const totalBudget = budgetVsActual.reduce(
          (sum, item) => sum + Number(item.limitAmount || 0),
          0,
        )
        const totalSpent = budgetVsActual.reduce(
          (sum, item) => sum + Number(item.actualSpent || 0),
          0,
        )
        const monthlyIncome = totalBudget * 1.25
        const savings = Math.max(monthlyIncome - totalSpent, 0)

        setSpendingSeries(
          trend.length
            ? trend
            : [{ month: monthLabel(month), value: totalSpent }],
        )
        setBudgetItems(
          budgetVsActual.map((item) => {
            const limit = Number(item.limitAmount || 0)
            const spent = Number(item.actualSpent || 0)
            const ratio = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0

            return {
              label: item.categoryName,
              spent: formatCurrency(spent),
              limit: formatCurrency(limit),
              progress: Math.round(ratio),
              accent:
                ratio > 90 ? '#d0674f' : ratio > 70 ? '#f2b861' : '#39d6cf',
            }
          }),
        )
        setTransactions(
          (expensesResponse.expenses || []).map((expense) => ({
            merchant: expense.note || expense.category?.name || 'Expense',
            category: expense.category?.name || 'Uncategorized',
            dateLabel: new Date(expense.spentAt).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            }),
            amount: `-${formatCurrency(expense.amount)}`,
            type: 'expense',
            icon: expense.category?.name?.toLowerCase().includes('transport')
              ? 'fuel'
              : expense.category?.name?.toLowerCase().includes('entertain')
                ? 'movies'
                : 'cart',
          })),
        )
        setTotals({
          totalBudget,
          totalSpent,
          monthlyIncome,
          savings,
        })
      } catch (fetchError) {
        if (!isMounted) {
          return
        }

        setError(fetchError?.error?.message || 'Failed to load dashboard data')
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadDashboard()

    return () => {
      isMounted = false
    }
  }, [])

  const balanceSummary = useMemo(
    () => ({
      total: formatCurrency(totals.totalBudget),
      income: formatCurrency(totals.monthlyIncome),
      expenses: formatCurrency(totals.totalSpent),
      savings: formatCurrency(totals.savings),
    }),
    [totals],
  )

  const statCards = useMemo(
    () => [
      {
        title: 'Total Net Worth',
        value: formatCurrency(totals.totalBudget),
        note: 'Calculated from active monthly budgets',
        tone: 'positive',
      },
      {
        title: 'Monthly Income',
        value: formatCurrency(totals.monthlyIncome),
        note: 'Estimated at 125% of planned budget',
        tone: 'positive',
      },
      {
        title: 'Total Expenses',
        value: formatCurrency(totals.totalSpent),
        note: 'Actual spend this month',
        tone: 'negative',
      },
    ],
    [totals],
  )

  if (isLoading) {
    return (
      <AppShell
        navigationItems={getNavigationItems('dashboard')}
        primaryAction={dashboardSidebarAction}
        profile={profile}
      >
        <p className="text-sm text-slate-500">Loading dashboard data...</p>
      </AppShell>
    )
  }

  return (
    <AppShell
      navigationItems={getNavigationItems('dashboard')}
      primaryAction={dashboardSidebarAction}
      profile={profile}
    >
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Error Messages */}
        {error ? (
          <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
            <p className="text-sm text-rose-600">{error}</p>
          </div>
        ) : null}

        {/* Top Section - Balance and Metrics */}
        <div className="space-y-6">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,1fr))]">
            <BalanceHeroCard {...balanceSummary} />
            {statCards.map((card) => (
              <MetricCard key={card.title} {...card} />
            ))}
          </div>
        </div>

        {/* Chart Section */}
        <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
          <SpendingChart series={spendingSeries} />
        </div>

        {/* Bottom Section - Budget and Transactions */}
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* Budget Tracker */}
          <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
            <h3 className="mb-4 text-lg font-semibold text-dashboard-ink">
              Budget Overview
            </h3>
            <BudgetTracker items={budgetItems} />
          </div>

          {/* Recent Transactions */}
          <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
            <h3 className="mb-4 text-lg font-semibold text-dashboard-ink">
              Recent Transactions
            </h3>
            <TransactionsTable items={transactions} />
          </div>
        </div>
      </div>
    </AppShell>
  )
}

export default Dashboard
