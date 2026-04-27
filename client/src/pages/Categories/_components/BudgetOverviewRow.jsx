import BudgetInsightCard from './BudgetInsightCard'

const BudgetOverviewRow = ({ items }) => {
  return (
    <section className="grid gap-4 xl:grid-cols-3">
      {items.map((item) => (
        <BudgetInsightCard key={item.id} {...item} />
      ))}
    </section>
  )
}

export default BudgetOverviewRow
