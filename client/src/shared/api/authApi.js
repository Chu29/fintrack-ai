import http from '../http'

export async function createSession() {
  const { data } = await http.post('/auth/session', {})
  return data.user
}

export async function getMe() {
  const { data } = await http.get('/auth/me')
  return data.user
}

export async function logoutSession() {
  const { data } = await http.post('/auth/logout', {})
  return data
}

