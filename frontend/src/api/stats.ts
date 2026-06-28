import http from './http'

export interface Overview {
  total: number
  active: number
  banned: number
  error: number
  unknown: number
  repos: number
  workflows: number
  tasks: number
  tasks_enabled: number
}

export const statsApi = {
  overview: () => http.get<unknown, Overview>('/stats/overview')
}
