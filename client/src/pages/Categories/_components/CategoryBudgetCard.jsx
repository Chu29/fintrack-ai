import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded'
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded'
import MovieRoundedIcon from '@mui/icons-material/MovieRounded'
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded'
import { cx, appStyles as ui } from '../../_components/appStyles'

const iconMap = {
  home: HomeRoundedIcon,
  basket: ShoppingBasketRoundedIcon,
  dining: RestaurantRoundedIcon,
  movie: MovieRoundedIcon,
  travel: FlightTakeoffRoundedIcon,
}

const toneClasses = {
  neutral: 'bg-dashboard-inner text-slate-500',
  accent: 'bg-dashboard-accent/10 text-dashboard-accent',
  warning: 'bg-dashboard-amber/45 text-dashboard-amber-text',
}

const progressClasses = {
  ink: 'from-dashboard-accent-strong to-dashboard-accent-end',
  accent: 'from-dashboard-accent to-dashboard-progress-end',
  warning: 'from-[#d49857] to-[#a86b3f]',
}

const CategoryBudgetCard = ({
  icon,
  title,
  description,
  tag,
  tagTone,
  progress,
  progressTone,
  sliderPosition,
  limit,
  overlineValue,
}) => {
  const Icon = iconMap[icon]

  return (
    <article
      className={cx(
        ui.surface.card,
        ui.surface.cardHover,
        'flex min-h-72.5 flex-col p-5',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-dashboard-inner text-dashboard-accent">
          <Icon fontSize="small" />
        </span>
        <span
          className={cx(
            'rounded-full px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.18em]',
            toneClasses[tagTone],
          )}
        >
          {tag}
        </span>
      </div>

      <div className="mt-8">
        <h2 className="text-[1.8rem] font-black tracking-tight text-dashboard-ink">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </div>

      <div className="mt-auto">
        <div className="flex items-center justify-between gap-3">
          <p className={ui.text.overline}>Progress</p>
          <p
            className={cx(
              ui.text.overline,
              overlineValue ? 'text-dashboard-amber-text' : 'text-slate-500',
            )}
          >
            {overlineValue || `${progress}%`}
          </p>
        </div>

        <div className="mt-3 h-1.5 rounded-full bg-dashboard-control">
          <div
            className={cx(
              'h-full rounded-full bg-linear-to-r',
              progressClasses[progressTone],
            )}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <p className={ui.text.overline}>Set Budget Limit</p>
          <p className="text-xl font-black tracking-tight text-dashboard-ink">
            {limit}
          </p>
        </div>

        <div className="mt-3 relative h-6">
          <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-dashboard-control" />
          <span
            className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-dashboard-accent shadow-dashboard-accent"
            style={{ left: `calc(${sliderPosition}% - 8px)` }}
          />
        </div>
      </div>
    </article>
  )
}

export default CategoryBudgetCard
