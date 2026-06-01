import { cx, appStyles as ui } from '../../_components/appStyles'

const SpendingBreakdownCard = ({ total, series }) => {
  return (
    <section className={cx(ui.surface.card)}>
      <p className={ui.text.overline}>Spending Breakdown</p>
      <p className="mt-2 text-[26px] font-semibold text-dashboard-ink">{total}</p>

      <div className="mt-4 space-y-4">
        {series.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className={ui.text.label}>{item.label}</span>
              <span className="text-[13px] font-medium text-dashboard-ink">{item.value}%</span>
            </div>
            <div className="h-1.25 rounded-[99px] bg-slate-200">
              <div
                className="h-full rounded-[99px]"
                style={{ width: `${item.value}%`, backgroundColor: item.color }}
              />
            </div>
            <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-dashboard-secondary">
              {item.value}% of budget
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SpendingBreakdownCard
