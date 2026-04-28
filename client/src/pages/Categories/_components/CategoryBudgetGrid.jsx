import CategoryBudgetCard from './CategoryBudgetCard'
import AddCategoryCard from './AddCategoryCard'

const CategoryBudgetGrid = ({ items, onCreateCategory, onEditCategory, onDeleteCategory, onSetBudget, isSubmitting }) => {
  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <CategoryBudgetCard
          key={item.id}
          {...item}
          onEdit={onEditCategory}
          onDelete={onDeleteCategory}
          onSetBudget={onSetBudget}
        />
      ))}
      <AddCategoryCard onCreateCategory={onCreateCategory} isSubmitting={isSubmitting} />
    </section>
  )
}

export default CategoryBudgetGrid
