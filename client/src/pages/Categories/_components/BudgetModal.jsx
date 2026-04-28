import { useState } from 'react'
import Modal from '../../_components/Modal'
import { cx, appStyles as ui } from '../../_components/appStyles'

const BudgetModal = ({ isOpen, onClose, onSave, initialLimit, categoryName, isSubmitting }) => {
  const [limit, setLimit] = useState(initialLimit || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    const limitAmount = parseFloat(limit)
    if (isNaN(limitAmount) || limitAmount < 0) return
    onSave(limitAmount)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Budget for ${categoryName}`}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="budget-limit" className={ui.form.sectionLabel}>
            Monthly Limit
          </label>
          <div className={ui.form.amountRow}>
            <span className={ui.form.currency}>$</span>
            <input
              id="budget-limit"
              type="number"
              step="0.01"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              placeholder="0.00"
              className={ui.form.amountInput}
              autoFocus
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className={cx(ui.action.secondary, 'px-5')}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={cx(ui.action.primary, 'px-5')}
            disabled={isSubmitting || limit === ''}
          >
            {isSubmitting ? 'Updating...' : 'Set Budget'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default BudgetModal
