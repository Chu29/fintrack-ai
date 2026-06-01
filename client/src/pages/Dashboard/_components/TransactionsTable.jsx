import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import LocalMoviesRoundedIcon from '@mui/icons-material/LocalMoviesRounded'
import LocalGasStationRoundedIcon from '@mui/icons-material/LocalGasStationRounded'
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useNavigate } from 'react-router'
import { cx, dashboardStyles as ui } from '../dashboardStyles'

const iconMap = {
  cart: ShoppingCartRoundedIcon,
  movies: LocalMoviesRoundedIcon,
  fuel: LocalGasStationRoundedIcon,
  income: PaymentsRoundedIcon,
}

const TransactionsTable = ({ items }) => {
  const navigate = useNavigate()

  return (
    <section className={cx(ui.surface.card, 'relative pb-18')}>
      <div className={ui.layout.between}>
        <h2 className={ui.text.sectionTitle}>Recent Transactions</h2>
        <button
          type="button"
          className={ui.action.link}
          onClick={() => navigate('/reports')}
        >
          View All
        </button>
      </div>

      <div className="mt-5 hidden grid-cols-[minmax(0,1.8fr)_120px] gap-4 border-b border-dashboard-border pb-3 text-[11px] font-medium uppercase tracking-[0.06em] text-dashboard-secondary md:grid">
        <span>Transaction</span>
        <span className="text-right">Amount</span>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((item) => {
          const Icon = iconMap[item.icon]
          const isIncome = item.type === 'income'

          return (
            <div
              key={`${item.merchant}-${item.dateLabel}`}
              className={cx(
                ui.surface.inner,
                ui.surface.cardHover,
                'grid gap-4 px-3 py-3 md:grid-cols-[minmax(0,1.8fr)_120px] md:items-center',
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-[9px] ${
                    isIncome
                      ? 'bg-dashboard-income-bg text-dashboard-success'
                      : 'bg-dashboard-expense-bg text-dashboard-danger'
                  }`}
                >
                  <Icon fontSize="small" />
                </span>

                <div className="min-w-0">
                  <p className={cx(ui.text.label, 'truncate')}>
                    {item.merchant}
                  </p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.06em] text-dashboard-secondary">
                    {item.dateLabel}
                  </p>
                </div>
              </div>

              <p
                className={`text-[13px] font-medium md:text-right ${
                  isIncome ? 'text-dashboard-success' : 'text-dashboard-danger'
                }`}
              >
                {item.amount}
              </p>
            </div>
          )
        })}
      </div>

      <button
        type="button"
        className={cx(ui.action.fab, 'absolute bottom-4 right-4')}
        aria-label="Add transaction"
        onClick={() => navigate('/add-expense')}
      >
        <AddRoundedIcon />
      </button>
    </section>
  )
}

export default TransactionsTable
