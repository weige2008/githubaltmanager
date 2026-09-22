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

type T = (key: string, opts?: Record<string, unknown>) => string

const fmtTime = (s: string | null) => (s ? new Date(s).toLocaleString() : '—')

function localizedStatus(a: ExportedAccount, t: T): string {
  const map: Record<string, string> = {
    active: t('accounts.statusActive'),
    banned: t('accounts.statusBanned'),
    restricted: t('accounts.statusRestricted'),
    token_expired: t('accounts.statusTokenExpired'),
    error: t('accounts.statusError'),
    unknown: t('accounts.statusUnknown'),
  }
  return map[a.status] || a.status
}

export function formatAccountText(a: ExportedAccount, t: T): string {
  const N = '—'
  return [
    '──────────────────────────────',
    `${t('export.account')} #${a.id} · ${a.login}`,
    '──────────────────────────────',
    `${t('export.login')}: ${a.login}`,
    `${t('export.githubId')}: ${a.github_id}`,
    `${t('export.displayName')}: ${a.display_name || N}`,
    `${t('export.status')}: ${localizedStatus(a, t)}`,
    `${t('export.statusReason')}: ${a.status_reason || N}`,
    `${t('export.group')}: ${a.group || N}`,
    `${t('export.note')}: ${a.note || N}`,
    `${t('export.token')}: ${a.token || N}`,
    `${t('export.password')}: ${a.password || N}`,
    `${t('export.recoveryEmail')}: ${a.recovery_email || N}`,
    `${t('export.scopes')}: ${a.token_scopes || N}`,
    `${t('export.registeredAt')}: ${fmtTime(a.github_created_at)}`,
    `${t('export.importedAt')}: ${fmtTime(a.created_at)}`,
    `${t('export.lastCheckedAt')}: ${fmtTime(a.last_checked_at)}`,
    `${t('export.profile')}: ${a.html_url}`,
    '',
  ].join('\n')
}

export function formatAccountsText(items: ExportedAccount[], t: T): string {
  const header = `GitHub Alt Manager · ${t('export.title')} · ${t('export.count', { count: items.length })} · ${new Date().toLocaleString()}\n\n`
  return header + items.map(a => formatAccountText(a, t)).join('\n')
}

export function downloadText(filename: string, content: string) {
  // 前置 UTF-8 BOM：否则 Windows 记事本/Excel 按 GBK 打开会乱码
  const blob = new Blob(['\uFEFF' + content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
