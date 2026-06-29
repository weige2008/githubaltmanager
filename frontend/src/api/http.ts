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
    const url = error.config?.url || ''
    const body: ApiErrorBody = error.response?.data

    if (status === 401) {
      // 登录/设置接口的 401 = 密码错误，不要清除 token / 刷新页面
      if (url.includes('/auth/login') || url.includes('/auth/setup')) {
        ElMessage.error(body?.message || '密码错误')
      } else {
        // 其他接口的 401 = token 过期
        localStorage.removeItem('gam_token')
        ElMessage.error('登录已失效，请重新登录')
        if (!window.location.pathname.includes('/login')) {
          setTimeout(() => { window.location.href = '/login' }, 800)
        }
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
