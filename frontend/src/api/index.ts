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
  group: string
  deleted_at: string | null
  created_at: string
  updated_at: string
}

export interface AccountSecrets {
  token: string
  password: string
  email: string
}

export const accountApi = {
  list: (group?: string) => http.get<unknown, Account[]>('/accounts', { params: group ? { group } : {} }),
  get: (id: number) => http.get<unknown, Account>(`/accounts/${id}`),
  import: (data: { token: string; password?: string; recovery_email?: string; note?: string; group?: string }) =>
    http.post<unknown, Account>('/accounts/import', data),
  update: (id: number, data: Partial<{ password?: string; recovery_email?: string; note?: string; group?: string }>) =>
    http.put<unknown, Account>(`/accounts/${id}`, data),
  remove: (id: number) => http.delete<unknown, { ok: boolean }>(`/accounts/${id}`),
  restore: (id: number) => http.post<unknown, { ok: boolean }>(`/accounts/${id}/restore`),
  checkStatus: (id: number) => http.post<unknown, Account>(`/accounts/${id}/check`),
  batchCheck: (ids: number[]) => http.post<unknown, { results: any[] }>('/accounts/batch-check', { ids }),
  batchCheckGroup: (group?: string) => http.post<unknown, { results: any[]; total: number }>('/accounts/batch-check-group', { group: group || '' }),
  getSecrets: (id: number) => http.get<unknown, AccountSecrets>(`/accounts/${id}/secrets`),
  listGroups: () => http.get<unknown, string[]>('/accounts/groups'),
  listRecycleBin: () => http.get<unknown, Account[]>('/accounts/recycle-bin'),
  permanentDelete: (id: number) => http.delete<unknown, { ok: boolean }>(`/accounts/recycle-bin/${id}`),
  cleanRecycleBin: () => http.post<unknown, { ok: boolean; cleaned_before: string }>('/accounts/recycle-bin/clean'),
}

export interface APIKey {
  id: number
  name: string
  key_prefix: string
  enabled: boolean
  last_used_at: string | null
  expires_at: string | null
  created_at: string
}

export const apiKeyApi = {
  list: () => http.get<unknown, APIKey[]>('/apikeys'),
  create: (data: { name: string; expires_in_days?: number }) =>
    http.post<unknown, APIKey & { key: string; note: string }>('/apikeys', data),
  remove: (id: number) => http.delete<unknown, { ok: boolean }>(`/apikeys/${id}`),
  toggle: (id: number) => http.put<unknown, { ok: boolean; enabled: boolean }>(`/apikeys/${id}/toggle`),
}

export interface VersionInfo {
  current: string
  latest: string
  has_update: boolean
  download_url: string
  release_notes: string
}

export interface WorkflowRun {
  id: number
  name: string
  head_branch: string
  status: string
  conclusion: string | null
  created_at: string
  updated_at: string
  html_url: string
  event: string
  head_commit: { message: string; id: string }
}

export interface WorkflowStep {
  name: string
  status: string
  conclusion: string | null
  number: number
}

export interface WorkflowJob {
  id: number
  name: string
  status: string
  conclusion: string | null
  started_at: string
  completed_at: string | null
  html_url: string
  steps: WorkflowStep[]
}

export const runsApi = {
  list: (repoId: number, perPage?: number) =>
    http.get<unknown, { total_count: number; workflow_runs: WorkflowRun[] }>(`/repos/${repoId}/runs`, { params: { per_page: perPage || 20 } }),
  jobs: (repoId: number, runId: number) =>
    http.get<unknown, { total_count: number; jobs: WorkflowJob[] }>(`/repos/${repoId}/runs/${runId}/jobs`),
  logs: (repoId: number, runId: number) =>
    http.get<unknown, { url: string }>(`/repos/${repoId}/runs/${runId}/logs`),
  jobLogs: (repoId: number, runId: number, jobId: number) =>
    http.get<unknown, { logs: string }>(`/repos/${repoId}/runs/${runId}/jobs/${jobId}/logs`),
  cancel: (repoId: number, runId: number) =>
    http.post<unknown, { ok: boolean }>(`/repos/${repoId}/runs/${runId}/cancel`),
}

export const systemApi = {
  getVersion: () => http.get<unknown, { current: string; os: string; arch: string }>('/system/version'),
  checkUpdate: () => http.get<unknown, VersionInfo>('/system/check-update'),
  selfUpdate: () => http.post<unknown, { ok: boolean; message: string; release: string }>('/system/update'),
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

export interface SecretEntry {
  name: string
  value: string
}

export const batchApi = {
  createWorkflows: (data: { repo_ids: number[]; filename: string; content: string; commit_message: string }) =>
    http.post<unknown, any>('/batch/create-workflows', data),
  dispatch: (data: { repo_ids: number[]; filename: string; ref?: string; inputs?: Record<string, string> }) =>
    http.post<unknown, any>('/batch/dispatch', data),
  fetchTemplate: (data: { account_id: number; owner: string; repo: string; ref?: string }) =>
    http.post<unknown, { files: TemplateFile[]; count: number }>('/batch/fetch-template', data),
  createRepos: (data: { account_ids: number[]; repo_name: string; description?: string; private: boolean; files: TemplateFile[]; secrets?: SecretEntry[]; count?: number }) =>
    http.post<unknown, { success: any[]; failed: any[] }>('/batch/create-repos', data),
  updateRepos: (data: { repo_ids: number[]; template_owner: string; template_repo: string; template_ref?: string }) =>
    http.post<unknown, { success: any[]; failed: any[] }>('/batch/update-repos', data),
  toggleVisibility: (data: { repo_ids: number[]; is_private: boolean }) =>
    http.post<unknown, { success: any[]; failed: any[] }>('/batch/toggle-visibility', data),
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
  auto_check_last_at?: string | null
  auto_sync_last_at?: string | null
  auto_check_groups?: string
  auto_sync_groups?: string
  recycle_bin_enabled?: boolean
  recycle_bin_days?: number
  recycle_bin_last_clean?: string | null
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
