import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import LabelRoundedIcon from '@mui/icons-material/LabelRounded'
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded'
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded'
import TableViewRoundedIcon from '@mui/icons-material/TableViewRounded'
import { cx, appStyles as ui } from '../../_components/appStyles'

const exportIconMap = {
  pdf: PictureAsPdfRoundedIcon,
  csv: TableViewRoundedIcon,
}

const ReportsFilterRail = ({ filters }) => {
  return (
    <aside className="space-y-4">
      <section className={cx(ui.surface.card)}>
        <div className={ui.layout.row}>
          <AccessTimeRoundedIcon className="text-dashboard-accent" fontSize="small" />
          <p className={ui.text.overline}>Time Period</p>
        </div>

        <div className="mt-4 space-y-2">
          {filters.timePeriods.map((option) => (
            <button
              key={option.id}
              type="button"
              className={cx(
                'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold transition duration-200',
                option.active
                  ? 'bg-dashboard-accent text-white shadow-dashboard-accent'
                  : 'bg-dashboard-control text-slate-600 hover:bg-dashboard-nav-hover',
              )}
            >
              <span>{option.label}</span>
              {option.active ? (
                <span className="h-2 w-2 rounded-full bg-white" />
              ) : null}
            </button>
          ))}
        </div>
      </section>

      <section className={cx(ui.surface.card)}>
        <div className={ui.layout.row}>
          <LabelRoundedIcon className="text-dashboard-accent" fontSize="small" />
          <p className={ui.text.overline}>Categories</p>
        </div>

        <div className="mt-4 space-y-3">
          {filters.categories.map((category) => (
            <div key={category.label} className="flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-sm font-medium text-slate-600">
                {category.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className={cx(ui.surface.card)}>
        <div className={ui.layout.row}>
          <FileDownloadRoundedIcon
            className="text-dashboard-accent"
            fontSize="small"
          />
          <p className={ui.text.overline}>Export Data</p>
        </div>

        <div className="mt-4 grid gap-3">
          {filters.exports.map((item) => {
            const Icon = exportIconMap[item.id]

            return (
              <button
                key={item.id}
                type="button"
                className="flex items-center gap-3 rounded-2xl bg-dashboard-control px-4 py-3 text-left text-sm font-semibold text-slate-700 transition duration-200 hover:bg-dashboard-nav-hover"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-dashboard-accent shadow-dashboard-card">
                  <Icon fontSize="small" />
                </span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </section>
    </aside>
  )
}

export default ReportsFilterRail
