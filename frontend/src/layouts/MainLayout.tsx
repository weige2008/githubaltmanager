import React, { useState, useEffect } from 'react'
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useThemeStore } from '@/store/theme'
import { useSearchStore } from '@/store/search'
import { systemApi } from '@/api'
import { Button } from '@/components/ui/button'
import { ArrowUpCircle } from 'lucide-react'
import { RouteProgress } from '@/components/RouteProgress'
import { ThemeDrawer } from '@/components/ThemeDrawer'
import { cn } from '@/lib/utils'
import { MOTION_TRANSITION } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import {
  LayoutDashboard, Users, FolderGit2, Clock, Layers, Timer, Settings,
  Github, PanelLeft, X, FolderPlus, Activity,
} from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'
import { SearchBox } from '@/components/search-box'
import { NotificationPopover } from '@/components/notification-popover'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { LanguageSwitcher } from '@/components/language-switcher'
import { CommandMenu } from '@/components/command-menu'
import { TopNav } from '@/components/top-nav'
import { SkipToMain } from '@/components/skip-to-main'
import { ErrorBoundary } from '@/components/error-boundary'
import { Palette } from 'lucide-react'

type NavItem = { to: string; labelKey: string; icon: React.ComponentType<{ className?: string }> }
type NavGroupDef = { titleKey: string; items: NavItem[] }

const SIDEBAR_WIDTH = '13rem'
const SIDEBAR_WIDTH_ICON = '2.75rem'

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
      { to: '/workflow-runs', labelKey: 'nav.workflowRuns', icon: Activity },
    ],
  },
  {
    titleKey: 'nav.automation',
    items: [
      { to: '/tasks', labelKey: 'nav.tasks', icon: Clock },
      { to: '/batch', labelKey: 'nav.batch', icon: Layers },
      { to: '/batch-repos', labelKey: 'nav.batchRepos', icon: FolderPlus },
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
  const [mobileOpen, setMobileOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { isOpen: commandOpen, setOpen: setCommandOpen } = useSearchStore()
  const reducedMotion = useReducedMotion()

  // Check for updates
  const [hasUpdate, setHasUpdate] = useState(false)
  const [latestVersion, setLatestVersion] = useState('')
  useEffect(() => {
    systemApi.checkUpdate().then(info => { if (info.has_update) { setHasUpdate(true); setLatestVersion(info.latest) } }).catch(() => {})
  }, [])

  const toggleSidebar = () => {
    const next = !collapsed
    setCollapsed(next)
    localStorage.setItem('sidebar_collapsed', String(next))
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault()
        toggleSidebar()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [collapsed])

  const isFloating = sidebarMode === 'floating'
  const sidebarWidth = collapsed ? SIDEBAR_WIDTH_ICON : SIDEBAR_WIDTH

  const renderNavLink = (item: NavItem, isMobile: boolean) => {
    const Icon = item.icon
    const active = location.pathname === item.to || location.pathname.startsWith(item.to + '/')
    return (
      <NavLink
        key={item.to}
        to={item.to}
        onClick={() => isMobile && setMobileOpen(false)}
        data-active={active}
        className={cn(
          'flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm transition-colors',
          'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          active && 'bg-sidebar-accent font-medium text-sidebar-accent-foreground',
          !active && 'text-sidebar-foreground',
          collapsed && !isMobile && 'h-8 w-8 justify-center p-2'
        )}
      >
        <Icon className="size-4 shrink-0" />
        {(!collapsed || isMobile) && (
          <span className="min-w-0 flex-1 truncate">{t(item.labelKey)}</span>
        )}
      </NavLink>
    )
  }

  const motionProps = reducedMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 } }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <RouteProgress />
      <SkipToMain />
      <TooltipProvider delayDuration={0}>
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />

      {/* ===== Header (matching New API: transparent, SidebarTrigger first) ===== */}
      <header className="sticky top-0 z-40 flex h-12 w-full shrink-0 items-center gap-1.5 px-2 sm:gap-2 sm:px-3">
        {/* Sidebar Trigger */}
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => collapsed ? toggleSidebar() : (window.innerWidth < 768 ? setMobileOpen(true) : toggleSidebar())}
        >
          <PanelLeft className="size-4" />
        </Button>

        {/* Brand */}
        <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Github className="size-5 shrink-0" />
          <span className="hidden text-sm font-bold tracking-tight sm:block">{t('common.appName')}</span>
        </a>

        {/* Right cluster */}
        <div className="ms-auto flex items-center gap-1 sm:gap-2">
          {/* Top Navigation (desktop only, right before search — matching New API) */}
          <div className="me-1 hidden lg:block">
            <TopNav />
          </div>
          <div className="hidden md:block">
            <SearchBox />
          </div>
          <NotificationPopover />
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" className="size-8" onClick={() => setDrawerOpen(true)}>
            <Palette className="size-4" />
          </Button>
          {/* Update badge */}
          {hasUpdate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => navigate('/settings')} className="relative flex size-8 items-center justify-center rounded-md text-warning hover:bg-muted">
                  <ArrowUpCircle className="h-4 w-4" />
                  <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warning opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-warning" />
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent>新版本可用：{latestVersion}</TooltipContent>
            </Tooltip>
          )}
          <ProfileDropdown />
        </div>
      </header>

      {/* ===== Body ===== */}
      <div className="flex min-h-0 w-full flex-1">
        {/* Desktop Sidebar (matching New API sidebar.tsx pattern) */}
        <div
          className={cn(
            'group peer relative hidden shrink-0 text-sidebar-foreground md:block',
          )}
          data-state={collapsed ? 'collapsed' : 'expanded'}
          data-collapsible={collapsed ? 'icon' : ''}
          data-variant={isFloating ? 'floating' : 'sidebar'}
          data-side="left"
        >
          {/* Gap placeholder */}
          <div
            className="relative bg-transparent transition-[width] duration-200 ease-linear"
            style={{ width: sidebarWidth }}
          />
          {/* Fixed sidebar container */}
          <div
            className={cn(
              'fixed bottom-0 left-0 top-12 z-10 hidden flex-col transition-[width] duration-200 ease-linear md:flex',
              isFloating && 'p-2'
            )}
            style={{ width: sidebarWidth }}
          >
            <div
              className={cn(
                'flex size-full flex-col bg-sidebar',
                isFloating && 'rounded-lg shadow-sm ring-1 ring-sidebar-border',
                !isFloating && !collapsed && 'border-r border-sidebar-border',
              )}
            >
              {/* Sidebar content */}
              <div className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-auto py-2">
                {navGroups.map((group) => (
                  <div key={group.titleKey} className="relative flex w-full min-w-0 flex-col p-2">
                    {/* Group label */}
                    <div
                      className={cn(
                        'flex h-8 shrink-0 items-center rounded-md px-2 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/70',
                        'transition-[margin,opacity] duration-200 ease-linear',
                        collapsed && 'pointer-events-none -mt-8 opacity-0'
                      )}
                    >
                      {t(group.titleKey)}
                    </div>
                    {/* Menu items */}
                    <ul className="flex w-full min-w-0 flex-col gap-0">
                      {group.items.map((item) => (
                        <li key={item.to} className="group/menu-item relative">
                          {collapsed ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                {renderNavLink(item, false)}
                              </TooltipTrigger>
                              <TooltipContent side="right" align="center">
                                {t(item.labelKey)}
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            renderNavLink(item, false)
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Footer: deploy time */}
              {!collapsed && (
                <div className="shrink-0 border-t border-sidebar-border p-2">
                  <p className="px-2 text-[10px] font-mono text-sidebar-foreground/40">
                    {new Date(__BUILD_TIME__).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              )}

              {/* Sidebar Rail (invisible toggle bar at the edge) */}
              <button
                data-sidebar="rail"
                aria-label="Toggle Sidebar"
                tabIndex={-1}
                onClick={toggleSidebar}
                title="Toggle Sidebar"
                className={cn(
                  'absolute inset-y-0 right-0 z-20 hidden w-4 cursor-pointer transition-all ease-linear sm:flex',
                  'after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] after:-translate-x-1/2',
                  'after:bg-transparent after:transition-colors hover:after:bg-sidebar-border'
                )}
              />
            </div>
          </div>
        </div>

        {/* Mobile sidebar drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                className="absolute left-0 top-0 h-full w-[17rem] bg-sidebar text-sidebar-foreground shadow-2xl"
                initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                transition={MOTION_TRANSITION}
              >
                <div className="flex h-12 items-center justify-between border-b border-sidebar-border px-3">
                  <div className="flex items-center gap-2">
                    <Github className="size-5" />
                    <span className="text-sm font-bold">{t('common.appName')}</span>
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="size-5" />
                  </button>
                </div>
                <div className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-auto py-2">
                  {navGroups.map((group) => (
                    <div key={group.titleKey} className="relative flex w-full min-w-0 flex-col p-2">
                      <div className="flex h-8 shrink-0 items-center rounded-md px-2 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/70">
                        {t(group.titleKey)}
                      </div>
                      <ul className="flex w-full min-w-0 flex-col gap-0">
                        {group.items.map((item) => (
                          <li key={item.to} className="group/menu-item relative">
                            {renderNavLink(item, true)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main content (SidebarInset equivalent) */}
        <main
          className={cn(
            'relative flex w-full flex-1 flex-col overflow-auto bg-background',
            isFloating && 'md:m-2 md:ml-0 md:rounded-xl md:shadow-sm',
            contentLayout === 'centered' && 'mx-auto max-w-[1280px]'
          )}
        >
          {/* Top glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-32 bg-gradient-to-b from-primary/5 to-transparent" />

          <div id="main-content" className="relative z-10 flex-1 p-6">
            <ErrorBoundary resetKey={location.pathname}>
              <AnimatePresence mode="wait">
                <motion.div key={location.pathname} {...motionProps} transition={MOTION_TRANSITION}>
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </ErrorBoundary>
          </div>
        </main>
      </div>

      <ThemeDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </TooltipProvider>
    </div>
  )
}
