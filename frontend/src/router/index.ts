import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAppStore } from '@/stores/app'

const routes: RouteRecordRaw[] = [
  {
    // 公开主页（无需登录）
    path: '/',
    name: 'landing',
    component: () => import('@/views/LandingView.vue'),
    meta: { public: true, title: 'GitHub 账户管理器' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { public: true, title: '登录' }
  },
  {
    // 控制台根路径，重定向到 dashboard
    path: '/app',
    component: () => import('@/layouts/MainLayout.vue'),
    redirect: '/app/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/DashboardView.vue'),
        meta: { title: '仪表盘', icon: 'Odometer' }
      },
      {
        path: 'accounts',
        name: 'accounts',
        component: () => import('@/views/AccountsView.vue'),
        meta: { title: '账户管理', icon: 'User' }
      },
      {
        path: 'accounts/:id',
        name: 'account-detail',
        component: () => import('@/views/AccountDetailView.vue'),
        meta: { title: '账户详情', hidden: true }
      },
      {
        path: 'repos',
        name: 'repos',
        component: () => import('@/views/ReposView.vue'),
        meta: { title: '仓库浏览', icon: 'FolderOpened' }
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: () => import('@/views/TasksView.vue'),
        meta: { title: '定时任务', icon: 'AlarmClock' }
      },
      {
        path: 'batch',
        name: 'batch',
        component: () => import('@/views/BatchView.vue'),
        meta: { title: '批量操作', icon: 'Operation' }
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/views/SettingsView.vue'),
        meta: { title: '设置', icon: 'Setting' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { public: true, title: '404' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (_to.hash) return { el: _to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  const app = useAppStore()
  // 受保护路由：必须登录
  if (!to.meta.public && !app.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  // 已登录用户访问登录页 → 直接进控制台
  if (to.name === 'login' && app.isLoggedIn) {
    return { name: 'dashboard' }
  }
  // 兼容旧路径（无 /app 前缀）→ 重定向到 /app/xxx
  if (app.isLoggedIn && to.matched.length === 0 && !to.meta.public) {
    const guess = '/app' + to.fullPath
    return { path: guess }
  }
  if (to.meta.title) {
    document.title = `${to.meta.title} · GitHub 账户管理器`
  }
})

export default router

// 侧边栏菜单项（仅控制台子路由，过滤 hidden）
export const menuRoutes =
  routes
    .find((r) => r.path === '/app')
    ?.children?.filter((r) => !r.meta?.hidden) ?? []
