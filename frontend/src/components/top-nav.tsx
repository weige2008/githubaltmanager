import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

interface TopNavLink {
  title: string
  href: string
}

function useTopNavLinks(): TopNavLink[] {
  const { t } = useTranslation()
  return [
    { title: t('nav.dashboard'), href: '/dashboard' },
    { title: t('nav.accounts'), href: '/accounts' },
    { title: t('nav.tasks'), href: '/tasks' },
    { title: t('nav.automationLogs'), href: '/automation' },
    { title: t('nav.settings'), href: '/settings' },
  ]
}

export function TopNav() {
  const links = useTopNavLinks()
  const location = useLocation()

  return (
    <nav className="flex items-center gap-1">
      {links.map((link) => {
        const active = location.pathname === link.href || location.pathname.startsWith(link.href + '/')
        return (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              'relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              active
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {link.title}
            {active && (
              <span className="absolute inset-x-1 -bottom-[1px] h-0.5 rounded-full bg-primary" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
