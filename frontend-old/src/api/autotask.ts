import http from './http'

export interface AutoTaskConfig {
  auto_check_enabled: boolean
  auto_check_interval: number
  auto_sync_enabled: boolean
  auto_sync_interval: number
}

export interface AutoTaskLog {
  id: number
  task_type: 'check' | 'sync'
  status: 'running' | 'success' | 'failed'
  total_count: number
  success_cnt: number
  failed_cnt: number
  duration_ms: number
  detail: string
  created_at: string
  updated_at: string
}

export const autoTaskApi = {
  get: () => http.get<unknown, AutoTaskConfig>('/autotask'),
  update: (payload: AutoTaskConfig) => http.put<unknown, AutoTaskConfig>('/autotask', payload),
  checkNow: () => http.post<unknown, { ok: boolean; msg: string }>('/autotask/check-now'),
  syncNow: () => http.post<unknown, { ok: boolean; msg: string }>('/autotask/sync-now'),
  logs: (limit = 50) => http.get<unknown, AutoTaskLog[]>('/autotask/logs', { params: { limit } }),
  running: () => http.get<unknown, { running: boolean; task?: AutoTaskLog }>('/autotask/running')
}
