const BalanceHeroCard = ({ total, income, expenses, savings }) => {
  return (
    <section className="rounded-[10px] border border-[#2a2f48] bg-[linear-gradient(140deg,#1a1d2e_0%,#1f2340_55%,#252a4e_100%)] p-4 text-white">
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-indigo-200/90">
        Total Balance
      </p>
      <p className="mt-2 text-[32px] leading-none font-semibold">{total}</p>

      <div className="mt-4 grid grid-cols-3 gap-4 border-t border-white/15 pt-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/70">Income</p>
          <p className="mt-1 text-[13px] font-medium text-emerald-300">{income}</p>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/70">Expenses</p>
          <p className="mt-1 text-[13px] font-medium text-rose-300">{expenses}</p>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/70">Savings</p>
          <p className="mt-1 text-[13px] font-medium text-indigo-200">{savings}</p>
        </div>
      </div>
    </section>
  )
}

export default BalanceHeroCard
