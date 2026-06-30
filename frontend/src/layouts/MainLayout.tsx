import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store/app'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Users, FolderGit2, Clock, Layers, Timer, Settings, LogOut, Moon, Sun, Github } from 'lucide-react'
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

  const handleLogout = () => {
    logout()
    navigate('/login')
    toast.success('已退出登录')
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="flex w-60 flex-col border-r bg-card/50 backdrop-blur-xl">
        <div className="flex h-16 items-center gap-2 px-5 border-b">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Github className="h-6 w-6 text-primary" />
            <span className="font-bold tracking-tight">GitHub 管理器</span>
          </a>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
        <div className="border-t p-3">
          <Button variant="ghost" size="sm" className="w-full justify-start gap-3" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            退出登录
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-16 items-center justify-between border-b px-6 backdrop-blur-xl">
          <h1 className="text-lg font-semibold">
            {navItems.find((n) => location.pathname === n.to || location.pathname.startsWith(n.to + '/'))?.label || '控制台'}
          </h1>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
