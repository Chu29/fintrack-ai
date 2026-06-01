import http from '../http'

export async function getBudgets(params) {
  const { data } = await http.get('/budgets', { params })
  return data.budgets
}

export async function upsertBudget(payload) {
  const { data } = await http.put('/budgets', payload)
  return data.budget
}

export async function deleteBudget(budgetId) {
  const { data } = await http.delete(`/budgets/${budgetId}`)
  return data
}

