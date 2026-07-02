import http from './http'

// ===== Types =====
export interface Account {
  id: number
  github_id: number
  github_login: string
  display_name: string
  avatar_url: string
  status: string
  status_reason: string
  token_scopes: string
  last_checked_at: string | null
  note: string
  created_at: string
  updated_at: string
}

export interface AccountSecrets {
  token: string
  password: string
  email: string
}

export const accountApi = {
  list: () => http.get<unknown, Account[]>('/accounts'),
  get: (id: number) => http.get<unknown, Account>(`/accounts/${id}`),
  import: (data: { token: string; password?: string; recovery_email?: string; note?: string }) =>
    http.post<unknown, Account>('/accounts/import', data),
  update: (id: number, data: Partial<{ password?: string; recovery_email?: string; note?: string }>) =>
    http.put<unknown, Account>(`/accounts/${id}`, data),
  remove: (id: number) => http.delete<unknown, { ok: boolean }>(`/accounts/${id}`),
  checkStatus: (id: number) => http.post<unknown, Account>(`/accounts/${id}/check`),
  batchCheck: (ids: number[]) => http.post<unknown, { results: any[] }>('/accounts/batch-check', { ids }),
  getSecrets: (id: number) => http.get<unknown, AccountSecrets>(`/accounts/${id}/secrets`),
}

export const authApi = {
  status: () => http.get<unknown, { isInitialized: boolean }>('/auth/status'),
  setup: (pw: string) => http.post<unknown, { token: string }>('/auth/setup', { masterPassword: pw }),
  login: (pw: string) => http.post<unknown, { token: string }>('/auth/login', { masterPassword: pw }),
  changePassword: (oldPw: string, newPw: string) =>
    http.post<unknown, { ok: boolean }>('/auth/change-password', { oldPassword: oldPw, newPassword: newPw }),
}

export interface Repo {
  id: number
  account_id: number
  owner_login: string
  name: string
  full_name: string
  private: boolean
  fork: boolean
  archived: boolean
  disabled: boolean
  default_branch: string
  html_url: string
  permission: string
}

export interface Workflow {
  id: number
  repository_id: number
  path: string
  filename: string
  name: string
  state: string
  last_run_status: string
  last_run_at: string | null
}

export interface WorkflowInput {
  name: string
  description: string
  required: boolean
  default: string
  type: string
  options: string[] | null
}

export const repoApi = {
  listByAccount: (accId: number) => http.get<unknown, Repo[]>(`/accounts/${accId}/repos`),
  refreshRepos: (accId: number) => http.post<unknown, { total: number }>(`/accounts/${accId}/repos/refresh`),
  listContents: (repoId: number, path?: string) =>
    http.get<unknown, any[]>(`/repos/${repoId}/contents`, { params: { path: path || '' } }),
  getFile: (repoId: number, path: string) =>
    http.get<unknown, any>(`/repos/${repoId}/file`, { params: { path } }),
  updateFile: (repoId: number, data: { path: string; content: string; message: string; sha?: string }) =>
    http.put<unknown, { commit_sha: string }>(`/repos/${repoId}/file`, data),
  listWorkflows: (repoId: number) => http.get<unknown, Workflow[]>(`/repos/${repoId}/workflows`),
  dispatch: (repoId: number, data: { filename: string; ref?: string; inputs?: Record<string, string> }) =>
    http.post<unknown, { ok: boolean }>(`/repos/${repoId}/dispatch`, data),
  getWorkflowInputs: (repoId: number, filename: string) =>
    http.get<unknown, { inputs: WorkflowInput[] }>(`/repos/${repoId}/workflow-inputs`, { params: { filename } }),
}

export interface Task {
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
}

export const taskApi = {
  list: () => http.get<unknown, Task[]>('/tasks'),
  create: (data: any) => http.post<unknown, Task>('/tasks', data),
  update: (id: number, data: any) => http.put<unknown, Task>(`/tasks/${id}`, data),
  remove: (id: number) => http.delete<unknown, { ok: boolean }>(`/tasks/${id}`),
  toggle: (id: number, enabled: boolean) => http.post<unknown, Task>(`/tasks/${id}/toggle`, { enabled }),
  runNow: (id: number) => http.post<unknown, { ok: boolean }>(`/tasks/${id}/run`),
}

export interface TemplateFile {
  path: string
  content: string
}

export const batchApi = {
  createWorkflows: (data: { repo_ids: number[]; filename: string; content: string; commit_message: string }) =>
    http.post<unknown, any>('/batch/create-workflows', data),
  dispatch: (data: { repo_ids: number[]; filename: string; ref?: string }) =>
    http.post<unknown, any>('/batch/dispatch', data),
  fetchTemplate: (data: { account_id: number; owner: string; repo: string; ref?: string }) =>
    http.post<unknown, { files: TemplateFile[]; count: number }>('/batch/fetch-template', data),
  createRepos: (data: { account_ids: number[]; repo_name: string; description?: string; private: boolean; files: TemplateFile[] }) =>
    http.post<unknown, { success: any[]; failed: any[] }>('/batch/create-repos', data),
}

export interface Stats {
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
  overview: () => http.get<unknown, Stats>('/stats/overview'),
}

export interface AutoTaskConfig {
  auto_check_enabled: boolean
  auto_check_interval: number
  auto_sync_enabled: boolean
  auto_sync_interval: number
}

export interface AutoTaskLog {
  id: number
  task_type: string
  status: string
  total_count: number
  success_cnt: number
  failed_cnt: number
  duration_ms: number
  detail: string
  created_at: string
}

export const autoTaskApi = {
  get: () => http.get<unknown, AutoTaskConfig>('/autotask'),
  update: (data: AutoTaskConfig) => http.put<unknown, AutoTaskConfig>('/autotask', data),
  checkNow: () => http.post<unknown, { ok: boolean }>('/autotask/check-now'),
  syncNow: () => http.post<unknown, { ok: boolean }>('/autotask/sync-now'),
  logs: (limit?: number) => http.get<unknown, AutoTaskLog[]>('/autotask/logs', { params: { limit: limit || 50 } }),
  running: () => http.get<unknown, { running: boolean; task?: AutoTaskLog }>('/autotask/running'),
}
