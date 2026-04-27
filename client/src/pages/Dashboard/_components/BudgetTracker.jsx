import { cx, dashboardStyles as ui } from '../dashboardStyles'

const BudgetRing = ({ progress, accent }) => {
  return (
    <div
      className="relative h-14 w-14 rounded-full"
      style={{
        background: `conic-gradient(${accent} 0% ${progress}%, rgba(148, 163, 184, 0.12) ${progress}% 100%)`,
      }}
    >
      <div className="absolute inset-[5px] rounded-full bg-dashboard-ring-inner" />
      <div className="absolute inset-0 flex items-center justify-center text-[0.62rem] font-bold text-slate-600">
        {progress}%
      </div>
    </div>
  )
}

const BudgetTracker = ({ items }) => {
  return (
    <section className={cx(ui.surface.card, 'p-5')}>
      <h2 className={ui.text.sectionTitle}>Budget Tracking</h2>

      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div key={item.label} className={cx(ui.surface.inner, ui.layout.row, 'gap-4 px-3.5 py-3')}>
            <BudgetRing progress={item.progress} accent={item.accent} />
            <div>
              <p className={ui.text.label}>{item.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {item.spent} / {item.limit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BudgetTracker
