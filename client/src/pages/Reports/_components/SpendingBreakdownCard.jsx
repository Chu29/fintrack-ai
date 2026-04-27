import { cx, appStyles as ui } from '../../_components/appStyles'

const SpendingBreakdownCard = ({ total, series }) => {
  const segmentStops = []
  let current = 0

  series.forEach((item) => {
    const next = current + item.value
    segmentStops.push(`${item.color} ${current}% ${next}%`)
    current = next
  })

  return (
    <section className={cx(ui.surface.card, 'p-5')}>
      <p className={ui.text.overline}>Spending Breakdown</p>

      <div className="mt-6 flex justify-center">
        <div
          className="relative h-36 w-36 rounded-full"
          style={{
            background: `conic-gradient(${segmentStops.join(', ')})`,
          }}
        >
          <div className="absolute inset-[12px] rounded-full bg-white" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[1.8rem] font-black tracking-tight text-dashboard-ink">
              {total}
            </p>
            <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-slate-500">
              Budget Mix
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {series.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-slate-600">{item.label}</span>
            </div>
            <span className="text-sm font-bold text-dashboard-ink">{item.value}%</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SpendingBreakdownCard
