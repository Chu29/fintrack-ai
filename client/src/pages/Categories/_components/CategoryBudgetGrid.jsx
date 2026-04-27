import CategoryBudgetCard from './CategoryBudgetCard'
import AddCategoryCard from './AddCategoryCard'

const CategoryBudgetGrid = ({ items }) => {
  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <CategoryBudgetCard key={item.id} {...item} />
      ))}
      <AddCategoryCard />
    </section>
  )
}

export default CategoryBudgetGrid
