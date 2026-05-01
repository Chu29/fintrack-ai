import http from '../http.js'

export async function updateProfile(data) {
  const response = await http.patch('/auth/me', data)
  return response.data.user
}
