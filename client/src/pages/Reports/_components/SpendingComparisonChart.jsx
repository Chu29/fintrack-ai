import { cx, appStyles as ui } from '../../_components/appStyles'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const SpendingComparisonChart = ({ months, actual, budget }) => {
  const chartData = months.map((month, index) => ({
    month,
    actual: actual[index],
    budget: budget[index],
  }))

  return (
    <section className={cx(ui.surface.elevated)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className={ui.text.featureTitle}>Actual vs Budget Spending</h2>
          <p className="mt-1 text-sm text-slate-500">
            Cross-category monthly rebalancing
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-slate-500">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-dashboard-accent" />
            Actual
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-dashboard-amber-text" />
            Budget
          </span>
        </div>
      </div>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
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
            <Legend
              verticalAlign="top"
              height={20}
              wrapperStyle={{ fontSize: '11px', fontWeight: 500, color: 'var(--color-dashboard-secondary)' }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              name="Actual"
              stroke="var(--color-dashboard-accent)"
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="budget"
              name="Budget"
              stroke="var(--color-dashboard-secondary)"
              strokeDasharray="6 6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

export default SpendingComparisonChart
