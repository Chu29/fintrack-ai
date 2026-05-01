import { useEffect, useState } from 'react'
import AppShell from '../_components/AppShell'
import { getNavigationItems } from '../_components/appShellData'
import AddExpenseHeader from './_components/AddExpenseHeader'
import AmountField from './_components/AmountField'
import TransactionMetaFields from './_components/TransactionMetaFields'
import RecurringExpenseCard from './_components/RecurringExpenseCard'
import InternalNotesField from './_components/InternalNotesField'
import ExpenseActions from './_components/ExpenseActions'
import { createExpense } from '../../shared/api/expensesApi'
import { getCategories } from '../../shared/api/categoriesApi'
import { useAuth } from '../../shared/auth/AuthContext.jsx'
import { toProfile } from '../../shared/uiData'

const initialFormData = {
  category: '',
  date: '',
  recurring: false,
  notes: '',
}

const AddExpense = () => {
  const auth = useAuth()
  const profile = toProfile(auth)
  const [formData, setFormData] = useState(initialFormData)
  const [expenseCategories, setExpenseCategories] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadCategories() {
      try {
        const categories = await getCategories()
        if (!isMounted) {
          return
        }

        const mapped = categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))

        setExpenseCategories(mapped)
        setFormData((prev) => ({
          ...prev,
          category: mapped[0]?.value || '',
        }))
      } catch (error) {
        if (!isMounted) {
          return
        }

        setErrorMessage(error?.error?.message || 'Failed to load categories')
      }
    }

    loadCategories()

    return () => {
      isMounted = false
    }
  }, [])

  const handleChange = (name) => (event) => {
    const { value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleToggleRecurring = () => {
    setFormData((prev) => ({
      ...prev,
      recurring: !prev.recurring,
    }))
  }

  const handleDiscard = () => {
    setFormData(initialFormData)
    setStatusMessage('')
    setErrorMessage('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsSubmitting(true)
    setStatusMessage('')
    setErrorMessage('')

    try {
      await createExpense({
        amount: formData.amount,
        categoryId: formData.category || null,
        spentAt: formData.date
          ? new Date(formData.date).toISOString()
          : new Date().toISOString(),
        note: formData.notes || null,
      })

      setStatusMessage('Expense saved successfully.')
      setFormData((prev) => ({
        ...initialFormData,
        category: prev.category,
      }))
    } catch (error) {
      setErrorMessage(error?.error?.message || 'Failed to save expense')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AppShell
      navigationItems={getNavigationItems('expense')}
      profile={profile}
      searchPlaceholder="Search transactions..."
    >
      <div className="mx-auto max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header Section */}
          <div className="text-center">
            <AddExpenseHeader />
          </div>

          {/* Status Messages */}
          <div className="space-y-3">
            {statusMessage ? (
              <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {statusMessage}
              </p>
            ) : null}
            {errorMessage ? (
              <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
                {errorMessage}
              </p>
            ) : null}
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            {/* Left Column - Main Form */}
            <div className="space-y-6">
              {/* Amount Section - Prominent */}
              <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
                <AmountField
                  value={formData.amount}
                  onChange={handleChange('amount')}
                />
              </div>

              {/* Transaction Details */}
              <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
                <h3 className="mb-4 text-lg font-semibold text-dashboard-ink">
                  Transaction Details
                </h3>
                <TransactionMetaFields
                  categories={expenseCategories}
                  categoryValue={formData.category}
                  dateValue={formData.date}
                  onCategoryChange={handleChange('category')}
                  onDateChange={handleChange('date')}
                />
              </div>

              {/* Additional Options */}
              <div className="space-y-4">
                <RecurringExpenseCard
                  checked={formData.recurring}
                  onToggle={handleToggleRecurring}
                />
                <InternalNotesField
                  value={formData.notes}
                  onChange={handleChange('notes')}
                />
              </div>
            </div>

            {/* Right Column - Actions & Summary */}
            <div className="space-y-6">
              {/* Quick Summary Card */}
              <div className="rounded-2xl border border-dashboard-border bg-dashboard-card p-6 shadow-dashboard-card">
                <h3 className="mb-4 text-lg font-semibold text-dashboard-ink">
                  Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-dashboard-secondary">
                      Amount:
                    </span>
                    <span className="text-sm font-semibold text-dashboard-ink">
                      {formData.amount ? `$${formData.amount}` : '$0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-dashboard-secondary">
                      Category:
                    </span>
                    <span className="text-sm font-semibold text-dashboard-ink">
                      {expenseCategories.find(
                        (c) => c.value === formData.category,
                      )?.label || 'None'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-dashboard-secondary">
                      Date:
                    </span>
                    <span className="text-sm font-semibold text-dashboard-ink">
                      {formData.date
                        ? new Date(formData.date).toLocaleDateString()
                        : 'Today'}
                    </span>
                  </div>
                  {formData.recurring && (
                    <div className="flex justify-between">
                      <span className="text-sm text-dashboard-secondary">
                        Recurring:
                      </span>
                      <span className="text-sm font-semibold text-dashboard-accent">
                        Yes
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <ExpenseActions
                onDiscard={handleDiscard}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </form>
      </div>
    </AppShell>
  )
}

export default AddExpense
