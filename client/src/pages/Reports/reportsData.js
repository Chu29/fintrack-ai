export const reportFilters = {
  timePeriods: [
    { id: 'last-30', label: 'Last 30 Days' },
    { id: 'this-year', label: 'This Year', active: true },
    { id: 'custom', label: 'Custom Range' },
  ],
  categories: [
    { label: 'Housing', color: '#3d4b60' },
    { label: 'Dining & Food', color: '#d49857' },
    { label: 'Investment', color: '#4f7d74' },
    { label: 'Lifestyle', color: '#9b8de0' },
  ],
  exports: [
    { id: 'pdf', label: 'PDF Report' },
    { id: 'csv', label: 'CSV Export' },
  ],
}

export const executiveSummary = {
  eyebrow: 'Executive Summary: July 2024',
  status: 'Analysis Active',
  insight:
    "You've maintained a 15% adherence to your housing budget while reducing discretionary dining costs by 14%. A proactive gain from your investment allocation is pushing your month-end savings rate 11% above target.",
  performance: [
    { label: 'Forecast', value: 'Positive', tone: 'positive' },
    { label: 'Alert', value: 'Monitor', tone: 'warning' },
  ],
  recommendation:
    'Reallocate the $320 surplus from utilities to your Vanguard Total Stock Fund to optimize long-term growth.',
}

export const spendingComparison = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  actual: [24, 30, 35, 42, 39, 48],
  budget: [28, 29, 31, 34, 36, 38],
}

export const spendingBreakdown = {
  total: '$12.4k',
  series: [
    { label: 'Housing', value: 45, color: '#3d4b60' },
    { label: 'Dining', value: 28, color: '#d49857' },
    { label: 'Other', value: 27, color: '#b7b0a6' },
  ],
}

export const wealthAccumulation = {
  amount: '+$24,300',
  detail:
    "Wealth is tracking ahead of the savings pace set in May. Your short-term reserve looks currently 8% above target.",
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  values: [14, 18, 26, 30, 38, 44],
}
