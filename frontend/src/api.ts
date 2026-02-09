import axios from 'axios'
import { useAuthStore } from './stores/auth'
import router from './router'

const api = axios.create({
  baseURL: 'https://interview.techliana.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(config => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = authStore.token
  }
  return config
})

api.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    const authStore = useAuthStore()
    authStore.clearToken()
    router.push('/login')
  }
  return Promise.reject(error)
})

export default api
