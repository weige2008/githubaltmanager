import http from './http'

export interface Repo {
  id: number
  account_id: number
  github_id: number
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

export interface DirEntry {
  name: string
  path: string
  type: 'file' | 'dir' | 'symlink' | 'submodule'
  size: number
  sha: string
}

export interface FileContent {
  path: string
  sha: string
  content: string
  encoding: string
  size: number
  html_url: string
}

export interface Workflow {
  id: number
  account_id: number
  repository_id: number
  path: string
  filename: string
  name: string
  state: string
  triggers: string
  last_run_status: string
  last_run_at: string | null
}

export const repoApi = {
  listByAccount: (accountId: number) =>
    http.get<unknown, Repo[]>(`/accounts/${accountId}/repos`),
  refreshRepos: (accountId: number) =>
    http.post<unknown, { total: number }>(`/accounts/${accountId}/repos/refresh`),

  listContents: (repoId: number, path = '') =>
    http.get<unknown, DirEntry[]>(`/repos/${repoId}/contents`, { params: { path } }),
  getFile: (repoId: number, path: string) =>
    http.get<unknown, FileContent>(`/repos/${repoId}/file`, { params: { path } }),
  updateFile: (repoId: number, payload: { path: string; content: string; message: string; sha?: string; branch?: string }) =>
    http.put<unknown, { commit_sha: string }>(`/repos/${repoId}/file`, payload),

  listWorkflows: (repoId: number) =>
    http.get<unknown, Workflow[]>(`/repos/${repoId}/workflows`),
  scanWorkflows: (accountId: number) =>
    http.post<unknown, { total: number }>(`/accounts/${accountId}/scan-workflows`),
  createWorkflow: (repoId: number, payload: { filename: string; content: string; commit_message: string; branch?: string }) =>
    http.post<unknown, { path: string }>(`/repos/${repoId}/workflows`, payload),
  dispatchWorkflow: (repoId: number, payload: { filename: string; ref?: string; inputs?: Record<string, any> }) =>
    http.post<unknown, { ok: boolean }>(`/repos/${repoId}/dispatch`, payload)
}
