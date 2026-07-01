import { useState } from 'react'
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/app'
import { Button } from '@/components/ui/button'
import { RouteProgress } from '@/components/RouteProgress'
import { ThemeDrawer } from '@/components/ThemeDrawer'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Users, FolderGit2, Clock, Layers, Timer, Settings, LogOut,
  Palette, Github, PanelLeftClose, PanelLeft, X,
} from 'lucide-react'
import { toast } from 'sonner'

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard }
type NavGroupDef = { title: string; items: NavItem[] }

const navGroups: NavGroupDef[] = [
  {
    title: '概览',
    items: [{ to: '/dashboard', label: '仪表盘', icon: LayoutDashboard },
  },
  {
    title: '管理',
    items: [
      { to: '/accounts', label: '账户管理', icon: Users },
      { to: '/repos', label: '仓库浏览', icon: FolderGit2 },
    ],
  },
  {
    title: '自动化',
    items: [
      { to: '/tasks', label: '定时任务', icon: Clock },
      { to: '/batch', label: '批量操作', icon: Layers },
      { to: '/automation', label: '自动化日志', icon: Timer },
    ],
  },
  {
    title: '系统',
    items: [{ to: '/settings', label: '设置', icon: Settings }],
  },
]

export default function MainLayout() {
  const { logout } = useAppStore()
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('sidebar_collapsed') === 'true')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileHover, setProfileHover] = useState(false)

  const toggleCollapse = () => {
    const next = !collapsed
    setCollapsed(next)
    localStorage.setItem('sidebar_collapsed', String(next))
  }

  const handleLogout = () => { logout(); navigate('/login'); toast.success('已退出登录') }

  const activeLabel = (() => {
    for (const g of navGroups) for (const item of g.items) {
      if (location.pathname === item.to || location.pathname.startsWith(item.to + '/')) return item.label
    }
    return '控制台'
  })()

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <RouteProgress />

      {/* ===== Header (full width, above sidebar — matches New API) ===== */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 backdrop-blur-xl z-30">
        <div className="flex items-center gap-3">
          <button className="md:hidden" onClick={() => setMobileOpen(true)}>
            <PanelLeft className="h-5 w-5 text-muted-foreground" />
          </button>
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Github className="h-5 w-5 text-primary shrink-0" />
            <span className="hidden text-sm font-bold tracking-tight sm:block">GitHub 管理器</span>
          </a>
        </div>

        <div className="flex items-center gap-1">
          <h1 className="mr-2 hidden text-sm font-medium text-muted-foreground md:block">{activeLabel}</h1>

          {/* Theme settings */}
          <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(true)}>
            <Palette className="h-5 w-5" />
          </Button>

          {/* Collapse toggle (desktop only) */}
          <Button variant="ghost" size="icon" onClick={toggleCollapse} className="hidden md:flex">
            {collapsed ? <PanelLeft className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </Button>

          {/* Profile dropdown (matches New API's profile-dropdown.tsx) */}
          <div className="relative" onMouseEnter={() => setProfileHover(true)} onMouseLeave={() => setProfileHover(false)}>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-xs font-bold text-white shadow-sm">
              A
            </button>
            <AnimatePresence>
              {profileHover && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1 w-44 rounded-lg border bg-card p-1 shadow-lg"
                >
                  <button onClick={() => navigate('/settings')} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors">
                    <Settings className="h-4 w-4 text-muted-foreground" /> 设置
                  </button>
                  <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-accent transition-colors">
                    <LogOut className="h-4 w-4" /> 退出登录
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* ===== Body (sidebar + main) ===== */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <motion.aside
          animate={{ width: collapsed ? 64 : 240 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hidden shrink-0 flex-col overflow-hidden border-r bg-card/30 backdrop-blur-xl md:flex"
        >
          <nav className="flex-1 overflow-y-auto p-2">
            {navGroups.map((group) => (
              <div key={group.title} className="mb-4">
                {!collapsed && (
                  <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                    {group.title}
                  </p>
                )}
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon
                    const active = location.pathname === item.to || location.pathname.startsWith(item.to + '/')
                    return (
                      <div key={item.to} className="relative group">
                        {active && (
                          <motion.div
                            layoutId="sidebar-active"
                            className="absolute inset-0 rounded-lg bg-primary/10"
                            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                          />
                        )}
                        <NavLink
                          to={item.to}
                          title={collapsed ? item.label : undefined}
                          className="relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/50"
                        >
                          <Icon className="h-4 w-4 shrink-0" style={{ color: active ? 'hsl(var(--primary))' : undefined }} />
                          <AnimatePresence>
                            {!collapsed && (
                              <motion.span
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="truncate whitespace-nowrap"
                                style={{ color: active ? 'hsl(var(--primary))' : undefined }}
                              >{item.label}</motion.span>
                            )}
                          </AnimatePresence>
                        </NavLink>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>
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
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                <div className="flex h-14 items-center justify-between border-b px-4">
                  <div className="flex items-center gap-2">
                    <Github className="h-5 w-5 text-primary" />
                    <span className="text-sm font-bold">GitHub 管理器</span>
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
                </div>
                <nav className="p-2">
                  {navGroups.map((group) => (
                    <div key={group.title} className="mb-4">
                      <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">{group.title}</p>
                      <div className="space-y-0.5">
                        {group.items.map((item) => {
                          const Icon = item.icon
                          const active = location.pathname === item.to || location.pathname.startsWith(item.to + '/')
                          return (
                            <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
                              className={cn('flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                              )}>
                              <Icon className="h-4 w-4 shrink-0" /> {item.label}
                            </NavLink>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                  <button onClick={handleLogout} className="mt-4 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent">
                    <LogOut className="h-4 w-4" /> 退出登录
                  </button>
                </nav>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className="relative flex-1 overflow-auto">
          {/* Top glow (matches New API's glow.tsx) */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-32 bg-gradient-to-b from-primary/5 to-transparent" />

          <main className="relative z-10 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      <ThemeDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  )
}
