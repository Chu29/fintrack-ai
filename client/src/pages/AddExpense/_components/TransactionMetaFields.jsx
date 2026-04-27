import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import { cx, appStyles as ui } from '../../_components/appStyles'

const TransactionMetaFields = ({
  categories,
  categoryValue,
  dateValue,
  onCategoryChange,
  onDateChange,
}) => {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <div>
        <div className={cx(ui.layout.between, 'mb-3 gap-3')}>
          <p className={ui.form.sectionLabel}>Category</p>
          <span className={ui.badge.accent}>
            <AutoAwesomeRoundedIcon fontSize="inherit" />
            AI Suggest
          </span>
        </div>

        <label className={cx(ui.form.field, 'relative')}>
          <RestaurantRoundedIcon
            className="text-dashboard-accent"
            fontSize="small"
          />
          <select
            value={categoryValue}
            onChange={onCategoryChange}
            className={ui.form.select}
            aria-label="Transaction category"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <KeyboardArrowDownRoundedIcon
            className="pointer-events-none absolute right-4 text-slate-500"
            fontSize="small"
          />
        </label>
      </div>

      <div>
        <p className={ui.form.sectionLabel}>Date</p>

        <label className={ui.form.field}>
          <CalendarMonthRoundedIcon
            className="text-slate-400"
            fontSize="small"
          />
          <input
            type="text"
            value={dateValue}
            onChange={onDateChange}
            placeholder="mm/dd/yyyy"
            className={ui.form.input}
            aria-label="Transaction date"
          />
        </label>
      </div>
    </section>
  )
}

export default TransactionMetaFields
