import { cx, dashboardStyles as ui } from '../dashboardStyles'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const SpendingChart = ({ series }) => {
  return (
    <section className={cx(ui.surface.elevated)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className={ui.text.featureTitle}>Monthly Spending Trends</h2>
          <p className={cx(ui.text.muted, 'mt-1')}>
            Visualizing your financial velocity over 6 months
          </p>
        </div>

        <div className={cx(ui.surface.segmented, ui.text.overlineTight, 'inline-flex w-fit items-center p-1')}>
          <span className={cx(ui.surface.segmentedActive, 'px-3 py-1.5')}>6M</span>
          <span className="px-3 py-1.5">1Y</span>
        </div>
      </div>

      <div className="mt-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="spending-area-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-dashboard-accent)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="var(--color-dashboard-accent)" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--color-dashboard-border)" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--color-dashboard-secondary)', fontSize: 11, fontWeight: 500 }}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ stroke: 'var(--color-dashboard-border)' }}
              contentStyle={{
                borderRadius: 10,
                border: '1px solid var(--color-dashboard-border)',
                fontSize: '12px',
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-dashboard-accent)"
              strokeWidth={3}
              fill="url(#spending-area-fill)"
              dot={{ r: 3, fill: 'var(--color-dashboard-accent)' }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default SpendingChart
