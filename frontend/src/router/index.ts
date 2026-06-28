import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAppStore } from '@/stores/app'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { public: true, title: '登录' }
  },
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    redirect: '/dashboard',
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
  routes
})

router.beforeEach((to) => {
  const app = useAppStore()
  if (!to.meta.public && !app.isLoggedIn) {
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

// 导出菜单项（供侧边栏使用）
export const menuRoutes = routes
  .find((r) => r.path === '/')
  ?.children?.filter((r) => !r.meta?.hidden) ?? []
