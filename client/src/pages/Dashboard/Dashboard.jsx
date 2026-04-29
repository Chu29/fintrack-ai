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

        const [trendResponse, budgetResponse, expensesResponse] = await Promise.all([
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
          0
        )
        const totalSpent = budgetVsActual.reduce(
          (sum, item) => sum + Number(item.actualSpent || 0),
          0
        )
        const monthlyIncome = totalBudget * 1.25
        const savings = Math.max(monthlyIncome - totalSpent, 0)

        setSpendingSeries(trend.length ? trend : [{ month: monthLabel(month), value: totalSpent }])
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
          })
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
            icon:
              expense.category?.name?.toLowerCase().includes('transport')
                ? 'fuel'
                : expense.category?.name?.toLowerCase().includes('entertain')
                  ? 'movies'
                  : 'cart',
          }))
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
    [totals]
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
    [totals]
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
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,1fr))]">
        <BalanceHeroCard {...balanceSummary} />
        {statCards.map((card) => (
          <MetricCard key={card.title} {...card} />
        ))}
      </div>

      <div className="mt-6">
        <SpendingChart series={spendingSeries} />
      </div>

      {error ? (
        <p className="mt-6 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {error}
        </p>
      ) : null}

      <div className="mt-6 grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <BudgetTracker items={budgetItems} />
        <TransactionsTable items={transactions} />
      </div>
    </AppShell>
  )
}

export default Dashboard
