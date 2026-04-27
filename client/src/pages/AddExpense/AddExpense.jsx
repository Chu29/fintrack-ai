import { useState } from 'react'
import AppShell from '../_components/AppShell'
import {
  getNavigationItems,
  profile,
} from '../_components/appShellData'
import AddExpenseHeader from './_components/AddExpenseHeader'
import AmountField from './_components/AmountField'
import TransactionMetaFields from './_components/TransactionMetaFields'
import RecurringExpenseCard from './_components/RecurringExpenseCard'
import InternalNotesField from './_components/InternalNotesField'
import ReceiptIntelligencePanel from './_components/ReceiptIntelligencePanel'
import ExpenseActions from './_components/ExpenseActions'
import { expenseCategories, receiptInsight } from './addExpenseData'

const initialFormData = {
  amount: '0.00',
  category: expenseCategories[0].value,
  date: '',
  recurring: false,
  notes: '',
}

const AddExpense = () => {
  const [formData, setFormData] = useState(initialFormData)

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
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Expense entry payload:', formData)
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
          <ReceiptIntelligencePanel {...receiptInsight} />
          <ExpenseActions onDiscard={handleDiscard} />
        </div>
      </form>
    </AppShell>
  )
}

export default AddExpense
