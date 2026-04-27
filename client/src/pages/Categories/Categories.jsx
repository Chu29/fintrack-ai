import AppShell from '../_components/AppShell'
import { getNavigationItems, profile } from '../_components/appShellData'
import CategoriesHeader from './_components/CategoriesHeader'
import BudgetOverviewRow from './_components/BudgetOverviewRow'
import CategoryBudgetGrid from './_components/CategoryBudgetGrid'
import {
  budgetOverviewCards,
  budgetCategories,
  categoriesFooterNote,
} from './categoriesData'

const Categories = () => {
  return (
    <AppShell
      navigationItems={getNavigationItems('categories')}
      profile={profile}
      searchPlaceholder="Search categories..."
    >
      <div className="space-y-6">
        <CategoriesHeader />
        <BudgetOverviewRow items={budgetOverviewCards} />
        <CategoryBudgetGrid items={budgetCategories} />
        <p className="pt-1 text-center text-[0.62rem] font-bold uppercase tracking-[0.28em] text-slate-400">
          {categoriesFooterNote}
        </p>
      </div>
    </AppShell>
  )
}

export default Categories
