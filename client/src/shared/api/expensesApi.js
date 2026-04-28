import http from '../http'

export async function getExpenses(params = {}) {
  const { data } = await http.get('/expenses', { params })
  return data
}

export async function createExpense(payload) {
  const { data } = await http.post('/expenses', payload)
  return data.expense
}

export async function updateExpense(expenseId, payload) {
  const { data } = await http.patch(`/expenses/${expenseId}`, payload)
  return data.expense
}

export async function deleteExpense(expenseId) {
  const { data } = await http.delete(`/expenses/${expenseId}`)
  return data
}

