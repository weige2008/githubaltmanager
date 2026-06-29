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
  <div class="layout">
    <!-- 侧边栏 — Fluent NavigationView (Mica 材质) -->
    <aside class="nav-view" :class="{ collapsed: isCollapse }">
      <div class="nav-header">
        <img src="/favicon.svg" alt="logo" class="nav-logo" />
        <span v-show="!isCollapse" class="nav-title">GitHub 管理器</span>
      </div>

      <nav class="nav-menu">
        <router-link
          v-for="item in menuRoutes"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: activeMenu === item.path }"
        >
          <el-icon :size="18"><component :is="(item.meta as any)?.icon" /></el-icon>
          <span v-show="!isCollapse" class="nav-text">{{ (item.meta as any)?.title }}</span>
        </router-link>
      </nav>

      <div class="nav-footer">
        <button class="nav-item home-btn" @click="router.push('/')">
          <el-icon :size="18"><HomeFilled /></el-icon>
          <span v-show="!isCollapse" class="nav-text">返回主页</span>
        </button>
      </div>
    </aside>

    <!-- 主区域 -->
    <div class="main">
      <!-- 顶栏 — 亚克力 -->
      <header class="topbar">
        <div class="topbar-left">
          <button class="icon-btn" @click="isCollapse = !isCollapse">
            <el-icon :size="16"><Fold v-if="!isCollapse" /><Expand v-else /></el-icon>
          </button>
          <span class="topbar-title">{{ (route.meta as any)?.title || '控制台' }}</span>
        </div>
        <div class="topbar-right">
          <ThemeSwitch />
          <el-dropdown>
            <button class="user-btn">
              <div class="user-ava"><el-icon><UserFilled /></el-icon></div>
              <span>管理员</span>
              <el-icon :size="12" class="caret"><CaretBottom /></el-icon>
            </button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="router.push('/settings')">
                  <el-icon><Setting /></el-icon>&nbsp;设置
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  <el-icon><SwitchButton /></el-icon>&nbsp;退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>

      <!-- 内容 -->
      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

// ===== 侧边栏 — Fluent NavigationView =====
.nav-view {
  width: 230px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--sidebar-bg);
  backdrop-filter: blur(40px) saturate(150%);
  -webkit-backdrop-filter: blur(40px) saturate(150%);
  border-right: 1px solid var(--sidebar-border);
  transition: width 0.2s cubic-bezier(0.1, 0.9, 0.2, 1);
  &.collapsed { width: 56px; }
}

.nav-header {
  height: 56px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  flex-shrink: 0;
}
.nav-logo {
  width: 24px; height: 24px;
  flex-shrink: 0;
}
.nav-title {
  font-size: 14px; font-weight: 600; color: var(--text-primary);
  white-space: nowrap; letter-spacing: 0.1px;
}

.nav-menu {
  flex: 1;
  padding: 4px 8px;
  display: flex;
  flex-direction: column;
  gap: 1px;
  overflow-y: auto;
}

// Fluent 导航项
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 36px;
  padding: 0 12px;
  border-radius: var(--radius-ctrl);
  color: var(--sidebar-text);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  border: none;
  background: transparent;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.12s ease;
  &:hover {
    background: var(--sidebar-item-hover);
    color: var(--text-primary);
  }
  &.active {
    background: var(--sidebar-item-active);
    color: var(--sidebar-text-active);
    font-weight: 600;
    // Fluent 左侧指示条
    box-shadow: inset 2px 0 0 var(--primary);
  }
}
.nav-text { overflow: hidden; }

.nav-footer {
  padding: 8px;
  flex-shrink: 0;
  border-top: 1px solid var(--sidebar-border);
}
.home-btn { width: 100%; }

// ===== 主区域 =====
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

// 顶栏 — 亚克力
.topbar {
  height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: var(--topbar-bg);
  backdrop-filter: blur(30px) saturate(150%);
  -webkit-backdrop-filter: blur(30px) saturate(150%);
  border-bottom: 1px solid var(--sidebar-border);
}
.topbar-left { display: flex; align-items: center; gap: 10px; }

// Fluent 图标按钮
.icon-btn {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  border: none; border-radius: var(--radius-ctrl);
  background: transparent; color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.12s ease;
  &:hover { background: var(--sidebar-item-hover); color: var(--text-primary); }
  &:active { background: var(--surface-active); }
}

.topbar-title {
  font-size: 14px; font-weight: 600; color: var(--text-primary);
}

.topbar-right { display: flex; align-items: center; gap: 8px; }

// 用户胶囊
.user-btn {
  display: flex; align-items: center; gap: 6px;
  height: 32px; padding: 0 8px 0 4px;
  border: none; border-radius: var(--radius-ctrl);
  background: transparent; cursor: pointer;
  font-size: 13px; font-weight: 500; color: var(--text-primary);
  transition: background 0.12s ease;
  &:hover { background: var(--sidebar-item-hover); }
}
.user-ava {
  width: 24px; height: 24px; border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--primary));
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-size: 12px;
}
.caret { color: var(--text-tertiary); }

.content {
  flex: 1; overflow-y: auto;
}
</style>
