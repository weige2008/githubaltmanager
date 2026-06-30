import { useState } from 'react'
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/app'
import { Button } from '@/components/ui/button'
import { RouteProgress } from '@/components/RouteProgress'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Users, FolderGit2, Clock, Layers, Timer, Settings, LogOut, Moon, Sun, Github, PanelLeftClose, PanelLeft } from 'lucide-react'
import { toast } from 'sonner'

const navItems = [
  { to: '/dashboard', label: '仪表盘', icon: LayoutDashboard },
  { to: '/accounts', label: '账户管理', icon: Users },
  { to: '/repos', label: '仓库浏览', icon: FolderGit2 },
  { to: '/tasks', label: '定时任务', icon: Clock },
  { to: '/batch', label: '批量操作', icon: Layers },
  { to: '/automation', label: '自动化日志', icon: Timer },
  { to: '/settings', label: '设置', icon: Settings },
]

export default function MainLayout() {
  const { theme, toggleTheme, logout } = useAppStore()
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('sidebar_collapsed') === 'true')

  const toggleCollapse = () => {
    const next = !collapsed
    setCollapsed(next)
    localStorage.setItem('sidebar_collapsed', String(next))
  }

  const handleLogout = () => { logout(); navigate('/login'); toast.success('已退出登录') }

  return (
    <div className="flex h-screen overflow-hidden">
      <RouteProgress />

      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col border-r bg-card/50 backdrop-blur-xl overflow-hidden"
      >
        <div className="flex h-16 items-center gap-2 px-5 border-b shrink-0">
          <a href="/" className="flex items-center gap-2 shrink-0">
            <Github className="h-6 w-6 text-primary shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="font-bold tracking-tight whitespace-nowrap"
                >GitHub 管理器</motion.span>
              )}
            </AnimatePresence>
          </a>
        </div>

        <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
          {navItems.map((item) => {
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
                  className="relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent/50"
                >
                  <Icon className="h-4 w-4 shrink-0" style={{ color: active ? 'hsl(var(--primary))' : undefined }} />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="whitespace-nowrap"
                        style={{ color: active ? 'hsl(var(--primary))' : undefined }}
                      >{item.label}</motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              </div>
            )
          })}
        </nav>

        <div className="border-t p-3 shrink-0 space-y-1">
          <button onClick={toggleCollapse} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent">
            {collapsed ? <PanelLeft className="h-4 w-4 shrink-0" /> : <PanelLeftClose className="h-4 w-4 shrink-0" />}
            <AnimatePresence>
              {!collapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap">折叠</motion.span>}
            </AnimatePresence>
          </button>
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent">
            <LogOut className="h-4 w-4 shrink-0" />
            <AnimatePresence>
              {!collapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap">退出登录</motion.span>}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b px-6 backdrop-blur-xl shrink-0">
          <h1 className="text-lg font-semibold">
            {navItems.find((n) => location.pathname === n.to || location.pathname.startsWith(n.to + '/'))?.label || '控制台'}
          </h1>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </header>

        <main className="flex-1 overflow-auto p-6">
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
  )
}
