import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { cx, appStyles as ui } from '../../_components/appStyles'

const CategoriesHeader = ({ onCreateCategory, isSubmitting }) => {
  return (
    <header className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
      <div className="max-w-xl">
        <h1 className={ui.text.pageTitle}>Categories &amp; Budgets</h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Fine-tune your financial engine. Manage spending limits and track
          real-time allocation.
        </p>
      </div>

      <button
        type="button"
        className={cx(ui.action.primary, 'h-13 gap-2 px-5 text-white')}
        onClick={onCreateCategory}
        disabled={isSubmitting}
      >
        <AddRoundedIcon fontSize="small" />
        <span>{isSubmitting ? 'Saving...' : 'New Category'}</span>
      </button>
    </header>
  )
}

export default CategoriesHeader
