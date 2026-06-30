import http from './http'

export interface ScheduledTask {
  id: number
  account_id: number
  repository_id: number
  owner_repo: string
  workflow_filename: string
  ref: string
  cron_expr: string
  inputs_json: string
  enabled: boolean
  next_run_at: string | null
  last_run_at: string | null
  last_run_result: string
  last_error: string
  created_at: string
}

export interface BatchCreateWorkflowsPayload {
  repo_ids: number[]
  filename: string
  content: string
  commit_message: string
  branch?: string
}

export const taskApi = {
  list: () => http.get<unknown, ScheduledTask[]>('/tasks'),
  create: (payload: Partial<ScheduledTask>) => http.post<unknown, ScheduledTask>('/tasks', payload),
  update: (id: number, payload: Partial<ScheduledTask>) =>
    http.put<unknown, ScheduledTask>(`/tasks/${id}`, payload),
  remove: (id: number) => http.delete<unknown, { ok: boolean }>(`/tasks/${id}`),
  toggle: (id: number, enabled: boolean) =>
    http.post<unknown, ScheduledTask>(`/tasks/${id}/toggle`, { enabled }),
  runNow: (id: number) => http.post<unknown, { ok: boolean }>(`/tasks/${id}/run`)
}

export const batchApi = {
  createWorkflows: (payload: BatchCreateWorkflowsPayload) =>
    http.post<unknown, { success: number[]; failed: { repo_id: number; error: string }[] }>(
      '/batch/create-workflows',
      payload
    ),
  dispatch: (payload: { repo_ids: number[]; filename: string; ref?: string; inputs?: Record<string, any> }) =>
    http.post<unknown, { success: number[]; failed: { repo_id: number; error: string }[] }>(
      '/batch/dispatch',
      payload
    )
}
