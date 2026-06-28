import http from './http'

export interface Account {
  id: number
  github_id: number
  github_login: string
  display_name: string
  avatar_url: string
  status: 'active' | 'banned' | 'unknown' | 'error'
  status_reason: string
  token_scopes: string
  last_checked_at: string | null
  note: string
  created_at: string
  updated_at: string
}

export interface AccountDetail extends Account {
  has_password?: boolean
  recovery_masked?: string
  token_masked?: string
  recovery_email_masked?: string
}

export interface ImportByTokenPayload {
  token: string
  password?: string
  recovery_email?: string
  note?: string
}

export const accountApi = {
  list: () => http.get<unknown, Account[]>('/accounts'),
  get: (id: number) => http.get<unknown, AccountDetail>(`/accounts/${id}`),
  create: (payload: ImportByTokenPayload) => http.post<unknown, Account>('/accounts/import', payload),
  update: (id: number, payload: Partial<ImportByTokenPayload>) =>
    http.put<unknown, Account>(`/accounts/${id}`, payload),
  remove: (id: number) => http.delete<unknown, { ok: boolean }>(`/accounts/${id}`),
  checkStatus: (id: number) =>
    http.post<unknown, Account>(`/accounts/${id}/check`),
  batchCheckStatus: (ids: number[]) =>
    http.post<unknown, { results: any[] }>('/accounts/batch-check', { ids })
}
