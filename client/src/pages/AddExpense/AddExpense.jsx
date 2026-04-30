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
      <form
        onSubmit={handleSubmit}
        className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]"
      >
        <div className="max-w-2xl space-y-7">
          <AddExpenseHeader />
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
          <AmountField
            value={formData.amount}
            onChange={handleChange('amount')}
          />
          <TransactionMetaFields
            categories={expenseCategories}
            categoryValue={formData.category}
            dateValue={formData.date}
            onCategoryChange={handleChange('category')}
            onDateChange={handleChange('date')}
          />
          <RecurringExpenseCard
            checked={formData.recurring}
            onToggle={handleToggleRecurring}
          />
          <InternalNotesField
            value={formData.notes}
            onChange={handleChange('notes')}
          />
        </div>

        <div className="space-y-6">
          <ExpenseActions
            onDiscard={handleDiscard}
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    </AppShell>
  )
}

export default AddExpense
