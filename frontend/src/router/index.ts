import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAppStore } from '@/stores/app'

// 控制台子路由定义（供菜单和布局共用）
export const consoleChildren: RouteRecordRaw[] = [
  { path: '/dashboard', name: 'dashboard', component: () => import('@/views/DashboardView.vue'), meta: { title: '仪表盘', icon: 'Odometer' } },
  { path: '/accounts', name: 'accounts', component: () => import('@/views/AccountsView.vue'), meta: { title: '账户管理', icon: 'User' } },
  { path: '/accounts/:id', name: 'account-detail', component: () => import('@/views/AccountDetailView.vue'), meta: { title: '账户详情', hidden: true } },
  { path: '/repos', name: 'repos', component: () => import('@/views/ReposView.vue'), meta: { title: '仓库浏览', icon: 'FolderOpened' } },
  { path: '/tasks', name: 'tasks', component: () => import('@/views/TasksView.vue'), meta: { title: '定时任务', icon: 'AlarmClock' } },
  { path: '/batch', name: 'batch', component: () => import('@/views/BatchView.vue'), meta: { title: '批量操作', icon: 'Operation' } },
  { path: '/automation', name: 'automation', component: () => import('@/views/AutomationView.vue'), meta: { title: '自动化日志', icon: 'Timer' } },
  { path: '/settings', name: 'settings', component: () => import('@/views/SettingsView.vue'), meta: { title: '设置', icon: 'Setting' } }
]

const routes: RouteRecordRaw[] = [
  {
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
  // 控制台路由——每条都套 MainLayout
  {
    path: '/dashboard',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [{ path: '', name: 'dashboard', component: () => import('@/views/DashboardView.vue'), meta: { title: '仪表盘', icon: 'Odometer' } }]
  },
  {
    path: '/accounts',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'accounts', component: () => import('@/views/AccountsView.vue'), meta: { title: '账户管理', icon: 'User' } },
      { path: ':id', name: 'account-detail', component: () => import('@/views/AccountDetailView.vue'), meta: { title: '账户详情', hidden: true } }
    ]
  },
  {
    path: '/repos',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [{ path: '', name: 'repos', component: () => import('@/views/ReposView.vue'), meta: { title: '仓库浏览', icon: 'FolderOpened' } }]
  },
  {
    path: '/tasks',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [{ path: '', name: 'tasks', component: () => import('@/views/TasksView.vue'), meta: { title: '定时任务', icon: 'AlarmClock' } }]
  },
  {
    path: '/batch',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [{ path: '', name: 'batch', component: () => import('@/views/BatchView.vue'), meta: { title: '批量操作', icon: 'Operation' } }]
  },
  {
    path: '/settings',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [{ path: '', name: 'settings', component: () => import('@/views/SettingsView.vue'), meta: { title: '设置', icon: 'Setting' } }]
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
  // 需要登录的控制台路由
  const protectedRoutes = ['dashboard', 'accounts', 'account-detail', 'repos', 'tasks', 'batch', 'settings']
  if (protectedRoutes.includes(to.name as string) && !app.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.name === 'login' && app.isLoggedIn) {
    return { name: 'dashboard' }
  }
  if (to.meta.title) {
    document.title = `${to.meta.title} · GitHub 账户管理器`
  }
})

export default router

export const menuRoutes = consoleChildren.filter((r) => !r.meta?.hidden)
