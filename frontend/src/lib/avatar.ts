export function getAvatarUrl(login: string, size = 40): string {
  return `https://avatars.githubusercontent.com/${encodeURIComponent(login)}?s=${size}&v=4`
}

export function getRepoUrl(login: string, repo: string): string {
  return `https://github.com/${encodeURIComponent(login)}/${encodeURIComponent(repo)}`
}

export function getUserUrl(login: string): string {
  return `https://github.com/${encodeURIComponent(login)}`
}
