import { useEffect, useMemo, useState } from 'react'
import AppShell from '../_components/AppShell'
import { getNavigationItems } from '../_components/appShellData'
import CategoriesHeader from './_components/CategoriesHeader'
import BudgetOverviewRow from './_components/BudgetOverviewRow'
import CategoryBudgetGrid from './_components/CategoryBudgetGrid'
import CategoryModal from './_components/CategoryModal'
import BudgetModal from './_components/BudgetModal'
import ConfirmModal from '../_components/ConfirmModal'
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from '../../shared/api/categoriesApi'
import { getBudgets, upsertBudget } from '../../shared/api/budgetsApi'
import { formatCurrency, toProfile } from '../../shared/uiData'
import { useAuth } from '../../shared/auth/AuthContext.jsx'

const iconCycle = ['home', 'basket', 'dining', 'movie', 'travel']

const Categories = () => {
  const auth = useAuth()
  const profile = toProfile(auth)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState([])
  const [budgets, setBudgets] = useState([])

  // Refresh budgets function
  const refreshBudgets = async () => {
    const now = new Date()
    const month = now.getUTCMonth() + 1
    const year = now.getUTCFullYear()

    try {
      const budgetList = await getBudgets({ month, year })
      setBudgets(budgetList || [])
    } catch (error) {
      console.error('Failed to refresh budgets:', error)
    }
  }

  // Modal states
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false)
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    let isMounted = true
    const now = new Date()
    const month = now.getUTCMonth() + 1
    const year = now.getUTCFullYear()

    async function loadData() {
      setIsLoading(true)
      setError('')

      try {
        const [categoryList, budgetList] = await Promise.all([
          getCategories(),
          getBudgets({ month, year }),
        ])

        if (!isMounted) {
          return
        }

        setCategories(categoryList || [])
        setBudgets(budgetList || [])
      } catch (fetchError) {
        if (!isMounted) {
          return
        }

        setError(
          fetchError?.error?.message || 'Failed to load categories and budgets',
        )
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  // Refresh budgets every 30 seconds to get latest spending data
  useEffect(() => {
    const interval = setInterval(() => {
      refreshBudgets()
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleOpenCreateModal = () => {
    setSelectedCategory(null)
    setIsCategoryModalOpen(true)
  }

  const handleOpenEditModal = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId)
    setSelectedCategory(category)
    setIsCategoryModalOpen(true)
  }

  const handleOpenBudgetModal = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId)
    const budget = budgets.find((b) => b.categoryId === categoryId)
    setSelectedCategory({ ...category, limitAmount: budget?.limitAmount || '' })
    setIsBudgetModalOpen(true)
  }

  const handleOpenConfirmDelete = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId)
    setSelectedCategory(category)
    setIsConfirmDeleteOpen(true)
  }

  const handleSaveCategory = async (data) => {
    setIsSubmitting(true)
    setError('')

    try {
      if (selectedCategory) {
        const updated = await updateCategory(selectedCategory.id, data)
        setCategories((prev) =>
          prev.map((c) => (c.id === selectedCategory.id ? updated : c)),
        )
      } else {
        const category = await createCategory({
          ...data,
          color: '#39d6cf',
        })
        setCategories((prev) => [category, ...prev])
      }
      setIsCategoryModalOpen(false)
      // Refresh budgets to ensure spending data is up to date
      await refreshBudgets()
    } catch (createError) {
      setError(createError?.error?.message || 'Failed to save category')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return

    setIsSubmitting(true)
    setError('')

    try {
      await deleteCategory(selectedCategory.id)
      setCategories((prev) => prev.filter((c) => c.id !== selectedCategory.id))
      setBudgets((prev) =>
        prev.filter((b) => b.categoryId !== selectedCategory.id),
      )
      setIsConfirmDeleteOpen(false)
    } catch (deleteError) {
      setError(deleteError?.error?.message || 'Failed to delete category')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveBudget = async (limitAmount) => {
    if (!selectedCategory) return

    setIsSubmitting(true)
    setError('')

    try {
      const now = new Date()
      const month = now.getUTCMonth() + 1
      const year = now.getUTCFullYear()

      const updated = await upsertBudget({
        categoryId: selectedCategory.id,
        limitAmount,
        month,
        year,
      })

      setBudgets((prev) => {
        const index = prev.findIndex(
          (b) => b.categoryId === selectedCategory.id,
        )
        if (index > -1) {
          return prev.map((b, i) => (i === index ? updated : b))
        }
        return [...prev, updated]
      })
      setIsBudgetModalOpen(false)
      // Refresh budgets to ensure spending data is up to date
      await refreshBudgets()
    } catch (budgetError) {
      setError(budgetError?.error?.message || 'Failed to set budget')
    } finally {
      setIsSubmitting(false)
    }
  }

  const budgetOverviewCards = useMemo(() => {
    const totalBudget = budgets.reduce(
      (sum, budget) => sum + Number(budget.limitAmount || 0),
      0,
    )
    const overLimit = budgets.filter(
      (budget) =>
        Number(budget.actualSpent || 0) > Number(budget.limitAmount || 0),
    )

    return [
      {
        id: 'monthly-budget',
        type: 'budget',
        eyebrow: 'Total Monthly Budget',
        title: formatCurrency(totalBudget),
        meta: `/ ${budgets.length} categories`,
        progress: Math.min(100, budgets.length * 18),
      },
      {
        id: 'critical-alerts',
        type: 'alert',
        eyebrow: 'Critical Alerts',
        title: `${overLimit.length} Over Limits`,
        detail:
          overLimit.length > 0
            ? overLimit.map((item) => item.category?.name).join(', ')
            : 'All categories are on track',
      },
    ]
  }, [budgets])

  const budgetCategories = useMemo(() => {
    const budgetMap = new Map(
      budgets.map((budget) => [budget.categoryId, budget]),
    )

    return categories.map((category, index) => {
      const budget = budgetMap.get(category.id)
      const limit = Number(budget?.limitAmount || 0)
      const spent = Number(budget?.actualSpent || 0)
      const progress =
        limit > 0 ? Math.round(Math.min((spent / limit) * 100, 100)) : 0

      return {
        id: category.id,
        icon: iconCycle[index % iconCycle.length],
        title: category.name,
        description: 'Custom spending category',
        tag: limit > 0 ? `${progress}% Reached` : 'No Budget',
        tagTone: progress >= 90 ? 'warning' : limit > 0 ? 'accent' : 'neutral',
        progress,
        progressTone:
          progress >= 90 ? 'warning' : progress > 0 ? 'accent' : 'ink',
        sliderPosition: Math.max(8, progress || 20),
        limit: formatCurrency(limit),
        overlineValue:
          limit > 0
            ? `${formatCurrency(spent)} / ${formatCurrency(limit)}`
            : undefined,
      }
    })
  }, [budgets, categories])

  return (
    <AppShell
      navigationItems={getNavigationItems('categories')}
      profile={profile}
      searchPlaceholder="Search categories..."
    >
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <CategoriesHeader
            onCreateCategory={handleOpenCreateModal}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Status Messages */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
              <p className="text-sm text-dashboard-secondary">
                Loading categories...
              </p>
            </div>
          ) : null}
          {error ? (
            <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
              <p className="text-sm text-rose-600">{error}</p>
            </div>
          ) : null}
        </div>

        {/* Budget Overview Section */}
        <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
          <h3 className="mb-4 text-lg font-semibold text-dashboard-ink">
            Budget Overview
          </h3>
          <BudgetOverviewRow items={budgetOverviewCards} />
        </div>

        {/* Categories Grid Section */}
        <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
          <h3 className="mb-4 text-lg font-semibold text-dashboard-ink">
            Categories & Budgets
          </h3>
          <CategoryBudgetGrid
            items={budgetCategories}
            onCreateCategory={handleOpenCreateModal}
            onEditCategory={handleOpenEditModal}
            onDeleteCategory={handleOpenConfirmDelete}
            onSetBudget={handleOpenBudgetModal}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-dashboard-secondary">
            FINTRACK • BUDGET LEDGER ENGINE • ALLOCATION TRACKING ACTIVE
          </p>
        </div>
      </div>

      {/* Modals */}
      <CategoryModal
        key={isCategoryModalOpen ? selectedCategory?.id || 'new' : 'closed'}
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={handleSaveCategory}
        initialData={selectedCategory}
        isSubmitting={isSubmitting}
      />

      <BudgetModal
        key={
          isBudgetModalOpen ? selectedCategory?.id || 'budget' : 'budget-closed'
        }
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
        onSave={handleSaveBudget}
        initialLimit={selectedCategory?.limitAmount}
        categoryName={selectedCategory?.name}
        isSubmitting={isSubmitting}
      />

      <ConfirmModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleDeleteCategory}
        title="Delete Category"
        message={`Are you sure you want to delete "${selectedCategory?.name}"? All related expenses will be uncategorized.`}
        confirmText="Delete"
      />
    </AppShell>
  )
}

export default Categories
