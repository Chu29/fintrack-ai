import { cx, dashboardStyles as ui } from '../dashboardStyles'

const BudgetTracker = ({ items }) => {
  return (
    <section className={cx(ui.surface.card)}>
      <h2 className={ui.text.sectionTitle}>Spending Breakdown</h2>

      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <p className={ui.text.label}>{item.label}</p>
              <p className="text-[13px] font-medium text-dashboard-ink">
                {item.spent} / {item.limit}
              </p>
            </div>
            <div className="h-1.25 rounded-[99px] bg-slate-200">
              <div
                className="h-full rounded-[99px]"
                style={{ width: `${item.progress}%`, backgroundColor: item.accent }}
              />
            </div>
            <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-dashboard-secondary">
              {item.progress}% of budget used
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BudgetTracker
