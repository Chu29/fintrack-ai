import axios from 'axios'
import { getCurrentIdToken } from './firebaseClient'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use(async (config) => {
  const token = await getCurrentIdToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

http.interceptors.response.use(
  (response) => {
    const payload = response.data

    if (payload && typeof payload === 'object' && 'ok' in payload) {
      return payload
    }

    return {
      ok: true,
      data: payload,
      error: null,
      requestId: response.headers?.['x-request-id'] ?? null,
    }
  },
  (error) => {
    const status = error.response?.status ?? 0
    const payload = error.response?.data

    const normalized =
      payload && typeof payload === 'object' && 'ok' in payload
        ? payload
        : {
            ok: false,
            error: {
              code: 'HTTP_ERROR',
              message: error.message || 'Request failed',
            },
            requestId: error.response?.headers?.['x-request-id'] ?? null,
          }

    if (status === 401 && typeof window !== 'undefined') {
      const publicPaths = new Set(['/', '/create-account'])
      if (!publicPaths.has(window.location.pathname)) {
        window.location.assign('/')
      }
    }

    return Promise.reject({ ...normalized, status })
  }
)

export default http

