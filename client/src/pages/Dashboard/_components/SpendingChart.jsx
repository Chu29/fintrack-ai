import { cx, dashboardStyles as ui } from '../dashboardStyles'

const CHART_WIDTH = 720
const CHART_HEIGHT = 280
const CHART_PADDING_X = 22
const CHART_PADDING_Y = 28

const getCoordinates = (series) => {
  const maxValue = Math.max(...series.map((point) => point.value))
  const minValue = Math.min(...series.map((point) => point.value))
  const range = Math.max(maxValue - minValue, 1)
  const usableWidth = CHART_WIDTH - CHART_PADDING_X * 2
  const usableHeight = CHART_HEIGHT - CHART_PADDING_Y * 2

  return series.map((point, index) => ({
    ...point,
    x: CHART_PADDING_X + (usableWidth / (series.length - 1)) * index,
    y:
      CHART_HEIGHT -
      CHART_PADDING_Y -
      ((point.value - minValue) / range) * usableHeight,
  }))
}

const buildCurvePath = (points) => {
  if (!points.length) {
    return ''
  }

  return points.reduce((path, point, index, allPoints) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`
    }

    const previousPoint = allPoints[index - 1]
    const controlPointX = (previousPoint.x + point.x) / 2

    return `${path} C ${controlPointX} ${previousPoint.y}, ${controlPointX} ${point.y}, ${point.x} ${point.y}`
  }, '')
}

const SpendingChart = ({ series }) => {
  const coordinates = getCoordinates(series)
  const path = buildCurvePath(coordinates)

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

      <div className="relative mt-8">
        <div className="pointer-events-none absolute inset-0 grid grid-rows-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="border-t border-dashboard-border" />
          ))}
        </div>

        <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="h-65 w-full">
          <defs>
            <linearGradient id="dashboard-curve" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-dashboard-accent)" />
              <stop offset="100%" stopColor="var(--color-dashboard-progress-end)" />
            </linearGradient>
          </defs>

          <path
            d={path}
            fill="none"
            stroke="url(#dashboard-curve)"
            strokeLinecap="round"
            strokeWidth="12"
            opacity="0.12"
          />
          <path
            d={path}
            fill="none"
            stroke="url(#dashboard-curve)"
            strokeLinecap="round"
            strokeWidth="4"
          />

          {coordinates.map((point) => (
            <g key={point.month}>
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

        <div className="mt-3 grid grid-cols-6 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-slate-500">
          {series.map((point) => (
            <span key={point.month}>{point.month}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SpendingChart
