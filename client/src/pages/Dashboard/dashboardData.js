export const balanceSummary = {
  total: '$142,580.00',
  income: '$12,400',
  expenses: '$4,820',
  savings: '$7,580',
}

export const statCards = [
  {
    title: 'Total Net Worth',
    value: '$142,580.00',
    note: '+2.4% from last month',
    tone: 'positive',
  },
  {
    title: 'Monthly Income',
    value: '$12,400',
    note: '+8.1% from last month',
    tone: 'positive',
  },
  {
    title: 'Total Expenses',
    value: '$4,820',
    note: '+3.2% from last month',
    tone: 'negative',
  },
]

export const smartAdvice = {
  badge: 'Smart Advice',
  body: 'You have $2,400 idle in savings. Move to Market Fund for 4.2% APY?',
}

export const spendingSeries = [
  { month: 'Jan', value: 18 },
  { month: 'Feb', value: 44 },
  { month: 'Mar', value: 52 },
  { month: 'Apr', value: 34 },
  { month: 'May', value: 38 },
  { month: 'Jun', value: 66 },
]

export const alertPanel = {
  label: 'AI Alert',
  title: 'Food spend up 15% try meal prep?',
  body: 'Your dining out frequency increased significantly last week. Switching to home cooking on weeknights could save you',
  savings: '$340/mo.',
  cta: 'View Meal Plans',
}

export const budgetItems = [
  {
    label: 'Rent & Utilities',
    spent: '$2,250',
    limit: '$2,500',
    progress: 80,
    accent: '#39d6cf',
  },
  {
    label: 'Groceries',
    spent: '$320',
    limit: '$800',
    progress: 40,
    accent: '#f2b861',
  },
  {
    label: 'Entertainment',
    spent: '$125',
    limit: '$500',
    progress: 25,
    accent: '#5468ff',
  },
]

export const transactions = [
  {
    merchant: 'Whole Foods Market',
    category: 'Groceries',
    dateLabel: 'Oct 24, 2023',
    amount: '-$142.50',
    type: 'expense',
    icon: 'cart',
  },
  {
    merchant: 'Netflix Premium',
    category: 'Entertainment',
    dateLabel: 'Oct 23, 2023',
    amount: '-$19.99',
    type: 'expense',
    icon: 'movies',
  },
  {
    merchant: 'Shell Gasoline',
    category: 'Transport',
    dateLabel: 'Oct 22, 2023',
    amount: '-$54.00',
    type: 'expense',
    icon: 'fuel',
  },
  {
    merchant: 'Stripe Payout',
    category: 'Income',
    dateLabel: 'Oct 21, 2023',
    amount: '+$3,200.00',
    type: 'income',
    icon: 'income',
  },
]
