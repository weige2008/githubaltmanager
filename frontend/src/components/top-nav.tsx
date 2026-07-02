import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

interface TopNavLink {
  title: string
  href: string
  external?: boolean
}

export function TopNav() {
  const { t } = useTranslation()
  const location = useLocation()

  const topNavLinks: TopNavLink[] = [
    { title: t('landing.nav.home'), href: '/' },
    { title: t('landing.nav.console'), href: '/dashboard' },
    { title: t('landing.nav.automation'), href: '/tasks' },
    { title: t('landing.nav.docs'), href: 'https://github.com/weige2008/githubaltmanager', external: true },
  ]

  return (
    <nav className="flex items-center gap-0.5">
      {topNavLinks.map((link) => {
        const active = !link.external && (location.pathname === link.href || location.pathname.startsWith(link.href + '/'))
        return (
          <Link
            key={link.href}
            to={link.href}
            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={cn(
              'relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              active
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {link.title}
          </Link>
        )
      })}
    </nav>
  )
}
