<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { menuRoutes } from '@/router'
import { ElMessageBox } from 'element-plus'
import ThemeSwitch from '@/components/ThemeSwitch.vue'

const app = useAppStore()
const route = useRoute()
const router = useRouter()

const isCollapse = ref(false)
const activeMenu = computed(() => {
  const seg = route.path.split('/')[1] || 'dashboard'
  return '/' + seg
})

async function handleLogout() {
  await ElMessageBox.confirm('确定退出登录吗？', '提示', { type: 'warning' })
  app.logout()
  router.push('/login')
}
</script>

<template>
  <div class="layout-root">
    <aside class="sidebar" :class="{ collapsed: isCollapse }">
      <div class="logo-area">
        <div class="logo-box">
          <img src="/favicon.svg" alt="logo" />
        </div>
        <span v-show="!isCollapse" class="logo-text">GitHub 管理器</span>
      </div>

      <nav class="menu">
        <router-link
          v-for="item in menuRoutes"
          :key="item.path"
          :to="item.path"
          class="menu-item"
          :class="{ active: activeMenu === item.path }"
        >
          <el-icon :size="18"><component :is="(item.meta as any)?.icon" /></el-icon>
          <span v-show="!isCollapse" class="menu-label">{{ (item.meta as any)?.title }}</span>
        </router-link>
      </nav>

      <div class="sidebar-bottom">
        <button class="home-btn" @click="router.push('/')">
          <el-icon><HomeFilled /></el-icon>
          <span v-show="!isCollapse">返回主页</span>
        </button>
      </div>
    </aside>

    <div class="main-area">
      <header class="topbar">
        <div class="topbar-left">
          <button class="collapse-btn" @click="isCollapse = !isCollapse">
            <el-icon :size="18"><Fold v-if="!isCollapse" /><Expand v-else /></el-icon>
          </button>
          <span class="page-title">{{ (route.meta as any)?.title || '控制台' }}</span>
        </div>
        <div class="topbar-right">
          <ThemeSwitch />
          <el-dropdown>
            <div class="user-pill">
              <div class="user-icon"><el-icon><UserFilled /></el-icon></div>
              <span>管理员</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="router.push('/settings')">
                  <el-icon><Setting /></el-icon> 设置
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  <el-icon><SwitchButton /></el-icon> 退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>

      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-root {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 220px;
  background: var(--sidebar-bg);
  backdrop-filter: blur(40px);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: width 0.2s ease;
  &.collapsed { width: 64px; }
}

.logo-area {
  height: 60px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
  flex-shrink: 0;
}
.logo-box {
  width: 32px; height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  img { width: 22px; height: 22px; }
}
.logo-text {
  font-size: 14px; font-weight: 700; color: #fff;
  white-space: nowrap; letter-spacing: 0.2px;
}

.menu {
  flex: 1;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  height: 40px;
  border-radius: var(--radius-md);
  color: var(--sidebar-text);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.15s ease;
  white-space: nowrap;
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
  }
  &.active {
    background: var(--sidebar-active);
    color: #fff;
  }
}
.menu-label { overflow: hidden; }

.sidebar-bottom {
  padding: 12px;
  flex-shrink: 0;
}
.home-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 14px;
  border: none;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--sidebar-text);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s ease;
  &:hover { background: rgba(255, 255, 255, 0.08); color: #fff; }
}

.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.topbar {
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: var(--surface);
  backdrop-filter: blur(var(--blur-amount)) saturate(var(--blur-saturate));
  border-bottom: 1px solid var(--surface-border-soft);
}
.topbar-left {
  display: flex;
  align-items: center;
  gap: 14px;
}
.collapse-btn {
  width: 34px; height: 34px;
  border: 1px solid var(--surface-border-soft);
  border-radius: var(--radius-sm);
  background: var(--surface-3);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s ease;
  &:hover { color: var(--primary); border-color: var(--primary); }
}
.page-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 14px;
}
.user-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px 4px 4px;
  border-radius: 100px;
  background: var(--surface-2);
  border: 1px solid var(--surface-border-soft);
  cursor: pointer;
  outline: none;
  transition: all 0.15s ease;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  &:hover { background: var(--surface-hover); }
}
.user-icon {
  width: 26px; height: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--primary));
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}
</style>
