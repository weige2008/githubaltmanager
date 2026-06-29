import http from './http'

export interface AutoTaskConfig {
  auto_check_enabled: boolean
  auto_check_cron: string
  auto_sync_enabled: boolean
  auto_sync_cron: string
}

export const autoTaskApi = {
  get: () => http.get<unknown, AutoTaskConfig>('/autotask'),
  update: (payload: AutoTaskConfig) => http.put<unknown, AutoTaskConfig>('/autotask', payload),
  checkNow: () => http.post<unknown, { ok: boolean; msg: string }>('/autotask/check-now'),
  syncNow: () => http.post<unknown, { ok: boolean; msg: string }>('/autotask/sync-now')
}
