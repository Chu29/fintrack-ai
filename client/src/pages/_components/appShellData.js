const navigationBase = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', to: '/dashboard' },
  { id: 'expense', label: 'Add Expense', icon: 'expense', to: '/add-expense' },
  { id: 'categories', label: 'Categories', icon: 'categories', to: '/categories' },
  { id: 'reports', label: 'Reports', icon: 'reports', to: '/reports' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
]

export const getNavigationItems = (activeId) =>
  navigationBase.map((item) => ({ ...item, active: item.id === activeId }))

export const profile = {
  name: 'Alex Rivera',
  role: 'Premium Curator',
  initials: 'AR',
}

export const dashboardSidebarAction = {
  label: 'New Transaction',
  to: '/add-expense',
}
