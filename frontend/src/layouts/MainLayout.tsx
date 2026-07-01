import React, { useState } from 'react'
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/store/app'
import { useThemeStore } from '@/store/theme'
import { Button } from '@/components/ui/button'
import { RouteProgress } from '@/components/RouteProgress'
import { ThemeDrawer } from '@/components/ThemeDrawer'
import { cn } from '@/lib/utils'
import { MOTION_TRANSITION, PAGE_TRANSITION } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import {
  LayoutDashboard, Users, FolderGit2, Clock, Layers, Timer, Settings,
  Github, PanelLeftClose, PanelLeft, X,
} from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider, TooltipProvider as Provider } from '@/components/ui/tooltip'
import { SearchBox } from '@/components/search-box'
import { NotificationPopover } from '@/components/notification-popover'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeQuickSwitcher } from '@/components/theme-quick-switcher'
import { LanguageSwitcher } from '@/components/language-switcher'
import { CommandMenu } from '@/components/command-menu'
import { SkipToMain } from '@/components/skip-to-main'
import { SidebarRail } from '@/components/sidebar-rail'
import { ErrorBoundary } from '@/components/error-boundary'

type NavItem = { to: string; labelKey: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }
type NavGroupDef = { titleKey: string; items: NavItem[] }

const navGroups: NavGroupDef[] = [
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

export default function MainLayout() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { contentLayout, sidebarMode } = useThemeStore()
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('sidebar_collapsed') === 'true')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const reducedMotion = useReducedMotion()

  const toggleCollapse = () => {
    const next = !collapsed
    setCollapsed(next)
    localStorage.setItem('sidebar_collapsed', String(next))
  }

  const activeLabel = (() => {
    for (const g of navGroups) for (const item of g.items) {
      if (location.pathname === item.to || location.pathname.startsWith(item.to + '/')) return t(item.labelKey)
    }
    return t('nav.dashboard')
  })()

  const motionProps = reducedMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 } }

  const sidebarAnim = reducedMotion
    ? { animate: { width: collapsed ? 64 : 240 } }
    : { animate: { width: collapsed ? 64 : 240 }, transition: MOTION_TRANSITION }

  const isFloating = sidebarMode === 'floating'

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <RouteProgress />
      <SkipToMain />
      <Provider>
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />

      {/* ===== Header ===== */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 backdrop-blur-xl z-30">
        <div className="flex items-center gap-3">
          <button className="md:hidden" onClick={() => setMobileOpen(true)}>
            <PanelLeft className="h-5 w-5 text-muted-foreground" />
          </button>
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Github className="h-5 w-5 text-primary shrink-0" />
            <span className="hidden text-sm font-bold tracking-tight sm:block">{t('common.appName')}</span>
          </a>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Search */}
          <div className="hidden md:block">
            <SearchBox />
          </div>

          <h1 className="mx-2 hidden text-sm font-medium text-muted-foreground lg:block">{activeLabel}</h1>

          {/* Language */}
          <LanguageSwitcher />

          {/* Notifications */}
          <NotificationPopover />

          {/* Theme */}
          <ThemeQuickSwitcher onOpenDrawer={() => setDrawerOpen(true)} />

          {/* Collapse toggle (desktop only) */}
          <Button variant="ghost" size="icon" onClick={toggleCollapse} className="hidden md:flex">
            {collapsed ? <PanelLeft className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </Button>

          {/* Profile */}
          <ProfileDropdown />
        </div>
      </header>

      {/* ===== Body ===== */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <motion.aside
          {...sidebarAnim}
          className={cn(
            'layout-sidebar relative hidden shrink-0 flex-col overflow-hidden border-r bg-card/30 backdrop-blur-xl md:flex',
            isFloating && 'my-2 ml-2 rounded-lg border shadow-sm'
          )}
        >
          <nav className="flex-1 overflow-y-auto p-2">
            {navGroups.map((group) => (
              <div key={group.titleKey} className="mb-4">
                {!collapsed && (
                  <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                    {t(group.titleKey)}
                  </p>
                )}
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon
                    const active = location.pathname === item.to || location.pathname.startsWith(item.to + '/')
                    const linkContent = (
                      <NavLink to={item.to} className="relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/50">
                        <Icon className="h-4 w-4 shrink-0" style={{ color: active ? 'hsl(var(--primary))' : undefined }} />
                        <AnimatePresence>
                          {!collapsed && (
                            <motion.span
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                              className="truncate whitespace-nowrap"
                              style={{ color: active ? 'hsl(var(--primary))' : undefined }}
                            >{t(item.labelKey)}</motion.span>
                          )}
                        </AnimatePresence>
                      </NavLink>
                    )
                    return (
                      <div key={item.to} className="relative group">
                        {active && (
                          <motion.div
                            layoutId="sidebar-active"
                            className="absolute inset-0 rounded-lg bg-primary/10"
                            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                          />
                        )}
                        {collapsed ? (
                          <Tooltip>
                            <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                            <TooltipContent side="right">{t(item.labelKey)}</TooltipContent>
                          </Tooltip>
                        ) : (
                          linkContent
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Sidebar Rail */}
          <SidebarRail />
        </motion.aside>

        {/* Mobile sidebar drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)} />
              <motion.div className="absolute left-0 top-0 h-full w-64 border-r bg-card shadow-2xl"
                initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                transition={MOTION_TRANSITION}>
                <div className="flex h-14 items-center justify-between border-b px-4">
                  <div className="flex items-center gap-2">
                    <Github className="h-5 w-5 text-primary" />
                    <span className="text-sm font-bold">{t('common.appName')}</span>
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
                </div>
                <nav className="p-2">
                  {navGroups.map((group) => (
                    <div key={group.titleKey} className="mb-4">
                      <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">{t(group.titleKey)}</p>
                      <div className="space-y-0.5">
                        {group.items.map((item) => {
                          const Icon = item.icon
                          const active = location.pathname === item.to || location.pathname.startsWith(item.to + '/')
                          return (
                            <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
                              className={cn('flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                              )}>
                              <Icon className="h-4 w-4 shrink-0" /> {t(item.labelKey)}
                            </NavLink>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </nav>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className={cn('layout-main relative flex-1 overflow-auto', isFloating && 'm-2')}>
          {/* Top glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-32 bg-gradient-to-b from-primary/5 to-transparent" />

          <main id="main-content" className={cn('relative z-10 p-6', contentLayout === 'centered' && 'mx-auto max-w-[1280px]')}>
            <ErrorBoundary>
              <AnimatePresence mode="wait">
                <motion.div key={location.pathname} {...motionProps} transition={MOTION_TRANSITION}>
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </ErrorBoundary>
          </main>
        </div>
      </div>

      <ThemeDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </Provider>
    </div>
  )
}
