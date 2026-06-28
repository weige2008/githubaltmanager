import http from './http'

export interface SetupPayload {
  masterPassword: string
}

export interface LoginPayload {
  masterPassword: string
}

export interface AuthStatus {
  isInitialized: boolean
}

export const authApi = {
  status: () => http.get<unknown, AuthStatus>('/auth/status'),
  setup: (payload: SetupPayload) => http.post<unknown, { token: string }>('/auth/setup', payload),
  login: (payload: LoginPayload) => http.post<unknown, { token: string }>('/auth/login', payload),
  changePassword: (payload: { oldPassword: string; newPassword: string }) =>
    http.post<unknown, { ok: boolean }>('/auth/change-password', payload)
}
