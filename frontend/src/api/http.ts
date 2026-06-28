import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export interface ApiResult<T = any> {
  ok: boolean
  data: T
}

export interface ApiErrorBody {
  code: number
  error: string
  message: string
  detail?: any
}

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
})

// 请求拦截：注入 JWT
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('gam_token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截：统一错误处理
service.interceptors.response.use(
  (response: AxiosResponse<ApiResult>) => {
    const body = response.data
    return body.data as any
  },
  (error) => {
    const status = error.response?.status
    const body: ApiErrorBody = error.response?.data
    if (status === 401) {
      localStorage.removeItem('gam_token')
      ElMessage.error('登录已失效，请重新登录')
      // 避免在登录页死循环
      if (!window.location.hash.includes('/login') && !window.location.pathname.includes('/login')) {
        setTimeout(() => window.location.reload(), 800)
      }
    } else if (body?.message) {
      ElMessage.error(body.message)
    } else {
      ElMessage.error(error.message || '网络异常')
    }
    return Promise.reject(body || error)
  }
)

export default service
