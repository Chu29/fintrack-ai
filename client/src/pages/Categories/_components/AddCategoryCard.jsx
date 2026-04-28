import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { cx } from '../../_components/appStyles'

const AddCategoryCard = ({ onCreateCategory, isSubmitting }) => {
  return (
    <button
      type="button"
      className={cx(
        'flex min-h-72.5 flex-col items-center justify-center rounded-dashboard-card border border-dashed border-dashboard-border bg-white/45 px-8 py-10 text-center transition duration-200 hover:border-dashboard-accent/40 hover:bg-white/80',
      )}
      onClick={onCreateCategory}
      disabled={isSubmitting}
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-dashboard-control text-slate-400">
        <AddRoundedIcon />
      </span>
      <p className="mt-7 text-xl font-black tracking-tight text-dashboard-ink">
        {isSubmitting ? 'Saving Category...' : 'Add New Category'}
      </p>
      <p className="mt-3 max-w-[18ch] text-sm leading-6 text-slate-500">
        Create a custom bucket to track specific spending habits.
      </p>
    </button>
  )
}

export default AddCategoryCard
