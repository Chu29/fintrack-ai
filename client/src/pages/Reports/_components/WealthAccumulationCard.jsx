import { cx, appStyles as ui } from '../../_components/appStyles'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const WealthAccumulationCard = ({ amount, detail, months, values }) => {
  const chartData = months.map((month, index) => ({
    month,
    value: values[index],
  }))

  return (
    <section className={cx(ui.surface.card)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={ui.text.overline}>Wealth Accumulation</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-dashboard-accent">
            {amount}
          </p>
        </div>
        <span className="rounded-full bg-dashboard-inner px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-slate-500">
          YTD
        </span>
      </div>

      <div className="mt-4 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 6, right: 6, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="wealth-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-dashboard-accent)" stopOpacity={0.22} />
                <stop offset="100%" stopColor="var(--color-dashboard-accent)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--color-dashboard-border)" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--color-dashboard-secondary)', fontSize: 10, fontWeight: 500 }}
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
              fill="url(#wealth-fill)"
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-600">{detail}</p>
    </section>
  )
}

export default WealthAccumulationCard
