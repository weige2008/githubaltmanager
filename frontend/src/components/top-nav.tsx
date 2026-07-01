import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface TopNavLink {
  title: string
  href: string
  external?: boolean
}

const topNavLinks: TopNavLink[] = [
  { title: '主页', href: '/' },
  { title: '控制台', href: '/dashboard' },
  { title: '自动化', href: '/tasks' },
  { title: '文档', href: 'https://github.com/weige2008/githubaltmanager', external: true },
]

export function TopNav() {
  const location = useLocation()

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
