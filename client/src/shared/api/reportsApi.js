import http from '../http'

export async function getSpendingByCategory(params) {
  const { data } = await http.get('/reports/spending-by-category', { params })
  return data
}

export async function getMonthlyTrend(params) {
  const { data } = await http.get('/reports/monthly-spend-trend', { params })
  return data
}

export async function getBudgetVsActual(params) {
  const { data } = await http.get('/reports/budget-vs-actual', { params })
  return data
}

