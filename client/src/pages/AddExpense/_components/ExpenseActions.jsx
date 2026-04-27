import SaveRoundedIcon from '@mui/icons-material/SaveRounded'
import { cx, appStyles as ui } from '../../_components/appStyles'

const ExpenseActions = ({ onDiscard }) => {
  return (
    <section className="space-y-4">
      <button
        type="submit"
        className={cx(ui.action.primary, 'h-14 w-full gap-3 rounded-[22px] text-base')}
      >
        <SaveRoundedIcon fontSize="small" />
        <span>Save Expense</span>
      </button>

      <button
        type="button"
        onClick={onDiscard}
        className={cx(ui.action.secondary, 'h-12 w-full rounded-[22px]')}
      >
        Discard Changes
      </button>
    </section>
  )
}

export default ExpenseActions
