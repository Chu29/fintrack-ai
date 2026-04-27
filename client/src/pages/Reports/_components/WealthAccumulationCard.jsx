import { cx, appStyles as ui } from '../../_components/appStyles'

const CHART_WIDTH = 420
const CHART_HEIGHT = 180
const CHART_PADDING_X = 18
const CHART_PADDING_Y = 20

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

const WealthAccumulationCard = ({ amount, detail, months, values }) => {
  const points = getCoordinates(values)
  const path = buildCurvePath(points)
  const areaPath = `${path} L ${points.at(-1).x} ${CHART_HEIGHT - CHART_PADDING_Y} L ${points[0].x} ${CHART_HEIGHT - CHART_PADDING_Y} Z`

  return (
    <section className={cx(ui.surface.card, 'p-5')}>
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

      <div className="mt-5">
        <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="h-[150px] w-full">
          <defs>
            <linearGradient id="wealth-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(61,75,96,0.24)" />
              <stop offset="100%" stopColor="rgba(61,75,96,0.02)" />
            </linearGradient>
          </defs>

          <path d={areaPath} fill="url(#wealth-fill)" />
          <path
            d={path}
            fill="none"
            stroke="var(--color-dashboard-accent)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>

        <div className="mt-2 grid grid-cols-6 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-slate-500">
          {months.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-600">{detail}</p>
    </section>
  )
}

export default WealthAccumulationCard
