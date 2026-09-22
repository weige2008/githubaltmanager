export interface ExportedAccount {
  id: number
  github_id: number
  login: string
  display_name: string
  status: string
  status_reason: string
  group: string
  note: string
  token: string
  password: string
  recovery_email: string
  token_scopes: string
  github_created_at: string | null
  last_checked_at: string | null
  created_at: string
  updated_at: string
  html_url: string
}

const fmtTime = (s: string | null) => (s ? new Date(s).toLocaleString() : '—')

export function formatAccountText(a: ExportedAccount): string {
  return [
    '──────────────────────────────',
    `账户 #${a.id} · ${a.login}`,
    '──────────────────────────────',
    `登录名:        ${a.login}`,
    `GitHub ID:     ${a.github_id}`,
    `显示名:        ${a.display_name || '—'}`,
    `状态:          ${a.status}`,
    `状态原因:      ${a.status_reason || '—'}`,
    `分组:          ${a.group || '—'}`,
    `备注:          ${a.note || '—'}`,
    `Token:         ${a.token || '—'}`,
    `密码:          ${a.password || '—'}`,
    `恢复邮箱:      ${a.recovery_email || '—'}`,
    `Token Scopes:  ${a.token_scopes || '—'}`,
    `注册时间:      ${fmtTime(a.github_created_at)}`,
    `导入时间:      ${fmtTime(a.created_at)}`,
    `最后检测:      ${fmtTime(a.last_checked_at)}`,
    `主页:          ${a.html_url}`,
    '',
  ].join('\n')
}

export function formatAccountsText(items: ExportedAccount[]): string {
  const header = `GitHub Alt Manager 账户导出 · ${items.length} 个账户 · ${new Date().toLocaleString()}\n\n`
  return header + items.map(formatAccountText).join('\n')
}

export function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
