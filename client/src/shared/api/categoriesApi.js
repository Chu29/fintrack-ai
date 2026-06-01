import http from '../http'

export async function getCategories() {
  const { data } = await http.get('/categories')
  return data.categories
}

export async function createCategory(payload) {
  const { data } = await http.post('/categories', payload)
  return data.category
}

export async function updateCategory(categoryId, payload) {
  const { data } = await http.patch(`/categories/${categoryId}`, payload)
  return data.category
}

export async function deleteCategory(categoryId) {
  const { data } = await http.delete(`/categories/${categoryId}`)
  return data
}

