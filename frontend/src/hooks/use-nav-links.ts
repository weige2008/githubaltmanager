import { useTranslation } from 'react-i18next'
import { LayoutDashboard, Users, FolderGit2, Clock, Layers, Timer, Settings } from 'lucide-react'

export interface NavLink {
  to: string
  labelKey: string
  icon: typeof LayoutDashboard
}

export interface NavGroup {
  titleKey: string
  items: NavLink[]
}

export function useNavLinks(): NavGroup[] {
  const { t } = useTranslation()

  return [
    {
      titleKey: 'nav.overview',
      items: [{ to: '/dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard }],
    },
    {
      titleKey: 'nav.management',
      items: [
        { to: '/accounts', labelKey: 'nav.accounts', icon: Users },
        { to: '/repos', labelKey: 'nav.repos', icon: FolderGit2 },
      ],
    },
    {
      titleKey: 'nav.automation',
      items: [
        { to: '/tasks', labelKey: 'nav.tasks', icon: Clock },
        { to: '/batch', labelKey: 'nav.batch', icon: Layers },
        { to: '/automation', labelKey: 'nav.automationLogs', icon: Timer },
      ],
    },
    {
      titleKey: 'nav.system',
      items: [{ to: '/settings', labelKey: 'nav.settings', icon: Settings }],
    },
  ]
}

