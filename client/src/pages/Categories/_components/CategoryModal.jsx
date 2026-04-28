import { useState } from 'react'
import Modal from '../../_components/Modal'
import { cx, appStyles as ui } from '../../_components/appStyles'

const CategoryModal = ({ isOpen, onClose, onSave, initialData, isSubmitting }) => {
  const [name, setName] = useState(initialData?.name || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onSave({ name: name.trim() })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Category' : 'New Category'}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="category-name" className={ui.form.sectionLabel}>
            Category Name
          </label>
          <div className={ui.form.field}>
            <input
              id="category-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Groceries, Subscriptions"
              className={ui.form.input}
              autoFocus
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
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
            disabled={isSubmitting || !name.trim()}
          >
            {isSubmitting ? 'Saving...' : 'Save Category'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default CategoryModal
