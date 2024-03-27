import { auth } from '@/apis/auth'
import { ROUTES } from '@/constants'
import { ELang } from '@/types/share'
import axios from 'axios'

const http_client = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

http_client.interceptors.request.use(
  function (config) {
    const lang = localStorage.getItem('lang') || ELang.EN

    config.headers['Accept-Language'] = lang
    config.headers['lang'] = lang

    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

http_client.interceptors.response.use(
  function (response) {
    return response.data
  },
  async function (error) {
    const originalRequest = error.config

    if (
      Object.values(ROUTES.AUTH).some((route) =>
        window.location.pathname.includes(route),
      )
    ) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true

        const tokens = await auth.refreshToken().then((r) => {
          return r.data
        })

        http_client.defaults.headers.common['Authorization'] =
          `Bearer ${tokens?.accessToken}`

        return http_client(originalRequest)
      } catch (error) {
        const prevHref = window.location.href
        window.location.href = `/login?redirect=${encodeURIComponent(prevHref)}`
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)

export default http_client
