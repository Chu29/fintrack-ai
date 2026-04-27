import { cx, appStyles as ui } from '../../_components/appStyles'

const CHART_WIDTH = 760
const CHART_HEIGHT = 300
const CHART_PADDING_X = 28
const CHART_PADDING_Y = 30

const getCoordinates = (series) => {
  const maxValue = Math.max(...series)
  const minValue = Math.min(...series)
  const range = Math.max(maxValue - minValue, 1)
  const usableWidth = CHART_WIDTH - CHART_PADDING_X * 2
  const usableHeight = CHART_HEIGHT - CHART_PADDING_Y * 2

  return series.map((value, index, all) => ({
    x: CHART_PADDING_X + (usableWidth / (all.length - 1)) * index,
    y:
      CHART_HEIGHT -
      CHART_PADDING_Y -
      ((value - minValue) / range) * usableHeight,
  }))
}

const buildCurvePath = (points) =>
  points.reduce((path, point, index, allPoints) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`
    }

    const previousPoint = allPoints[index - 1]
    const controlPointX = (previousPoint.x + point.x) / 2

    return `${path} C ${controlPointX} ${previousPoint.y}, ${controlPointX} ${point.y}, ${point.x} ${point.y}`
  }, '')

const SpendingComparisonChart = ({ months, actual, budget }) => {
  const actualPoints = getCoordinates(actual)
  const budgetPoints = getCoordinates(budget)
  const actualPath = buildCurvePath(actualPoints)
  const budgetPath = buildCurvePath(budgetPoints)

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

      <div className="relative mt-8">
        <div className="pointer-events-none absolute inset-0 grid grid-rows-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="border-t border-dashboard-border" />
          ))}
        </div>

        <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="h-70 w-full">
          <path
            d={budgetPath}
            fill="none"
            stroke="var(--color-dashboard-amber-text)"
            strokeLinecap="round"
            strokeWidth="3"
            opacity="0.55"
            strokeDasharray="7 10"
          />
          <path
            d={actualPath}
            fill="none"
            stroke="var(--color-dashboard-accent)"
            strokeLinecap="round"
            strokeWidth="4"
          />

          {actualPoints.map((point, index) => (
            <g key={months[index]}>
              <circle cx={point.x} cy={point.y} r="6" fill="white" />
              <circle
                cx={point.x}
                cy={point.y}
                r="3"
                fill="var(--color-dashboard-accent)"
              />
            </g>
          ))}
        </svg>

        <div className="mt-3 grid grid-cols-6 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-slate-500">
          {months.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SpendingComparisonChart
