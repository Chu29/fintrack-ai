import SaveRoundedIcon from '@mui/icons-material/SaveRounded'
import { cx, appStyles as ui } from '../../_components/appStyles'

const ExpenseActions = ({ onDiscard, isSubmitting }) => {
  return (
    <section className="space-y-4">
      <button
        type="submit"
        className={cx(ui.action.primary, 'h-14 w-full gap-3 rounded-[22px] text-base')}
        disabled={isSubmitting}
      >
        <SaveRoundedIcon fontSize="small" />
        <span>{isSubmitting ? 'Saving...' : 'Save Expense'}</span>
      </button>

      <button
        type="button"
        onClick={onDiscard}
        className={cx(ui.action.secondary, 'h-12 w-full rounded-[22px]')}
        disabled={isSubmitting}
      >
        Discard Changes
      </button>
    </section>
  )
}

export default ExpenseActions
