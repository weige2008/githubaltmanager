import { type Account } from '@/api'

export function displayName(acc: Pick<Account, 'note' | 'github_login'>): string {
  return acc.note?.trim() ? `${acc.note.trim()}(${acc.github_login})` : acc.github_login
}

export function shortName(acc: Pick<Account, 'note' | 'github_login'>): string {
  return acc.note?.trim() || acc.github_login
}

export function getPinnedIds(): number[] {
  try { return JSON.parse(localStorage.getItem('gam-pinned-accounts') || '[]') } catch { return [] }
}

export function getSortMode(): string {
  return localStorage.getItem('gam-account-sort') || 'default'
}

const statusOrder: Record<string, number> = { banned: 0, error: 1, unknown: 2, active: 3 }

export function sortAccounts<T extends Account>(accounts: T[]): T[] {
  const pinnedIds = getPinnedIds()
  const mode = getSortMode()
  let list = [...accounts]

  switch (mode) {
    case 'name':
      list.sort((a, b) => displayName(a).localeCompare(displayName(b)))
      break
    case 'status':
      list.sort((a, b) => (statusOrder[a.status] ?? 9) - (statusOrder[b.status] ?? 9))
      break
    case 'checked':
      list.sort((a, b) => {
        if (!a.last_checked_at) return 1
        if (!b.last_checked_at) return -1
        return new Date(b.last_checked_at).getTime() - new Date(a.last_checked_at).getTime()
      })
      break
    case 'created':
      list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      break
  }

  if (pinnedIds.length > 0) {
    list.sort((a, b) => {
      const ap = pinnedIds.includes(a.id) ? 0 : 1
      const bp = pinnedIds.includes(b.id) ? 0 : 1
      return ap - bp
    })
  }

  return list
}
