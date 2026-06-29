<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { menuRoutes } from '@/router'
import { ElMessageBox } from 'element-plus'

const app = useAppStore()
const route = useRoute()
const router = useRouter()

const isCollapse = ref(false)
const activeMenu = computed(() => '/' + (route.path.split('/')[1] || 'dashboard'))

async function handleLogout() {
  await ElMessageBox.confirm('确定退出登录吗？', '提示', { type: 'warning' })
  app.logout()
  router.push('/login')
}
</script>

<template>
  <el-container class="layout-root">
    <!-- 亚克力侧边栏 -->
    <el-aside :width="isCollapse ? '72px' : '240px'" class="aside">
      <div class="logo-area">
        <div class="logo-box">
          <img src="/favicon.svg" alt="logo" />
        </div>
        <transition name="fade">
          <span v-show="!isCollapse" class="title">GitHub 管理器</span>
        </transition>
      </div>

      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item v-for="item in menuRoutes" :key="item.path" :index="'/' + item.path">
          <el-icon><component :is="(item.meta as any)?.icon" /></el-icon>
          <template #title>{{ (item.meta as any)?.title }}</template>
        </el-menu-item>
      </el-menu>

      <!-- 底部返回主页 -->
      <div class="aside-footer">
        <div class="footer-btn" @click="router.push('/')">
          <el-icon><HomeFilled /></el-icon>
          <span v-show="!isCollapse">返回主页</span>
        </div>
      </div>
    </el-aside>

    <el-container>
      <!-- 顶部栏 -->
      <el-header class="header">
        <div class="header-left">
          <div class="collapse-btn" @click="isCollapse = !isCollapse">
            <el-icon :size="18">
              <Fold v-if="!isCollapse" />
              <Expand v-else />
            </el-icon>
          </div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ (route.meta as any)?.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-dropdown>
            <div class="user-trigger">
              <div class="user-avatar">
                <el-icon><UserFilled /></el-icon>
              </div>
              <span>管理员</span>
              <el-icon class="caret"><CaretBottom /></el-icon>
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
      </el-header>

      <!-- 主内容 -->
      <el-main class="main">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.layout-root { height: 100vh; }

.aside {
  background: linear-gradient(180deg, rgba(20, 30, 60, 0.92) 0%, rgba(15, 22, 45, 0.95) 100%);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  transition: width 0.22s var(--ease-fluent);
  overflow: hidden;
  position: relative;
  z-index: 10;

  // 顶部高光
  &::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(76, 194, 255, 0.4), transparent);
  }
}

.logo-area {
  height: 64px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 22px;
  flex-shrink: 0;
}
.logo-box {
  width: 36px; height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(76, 194, 255, 0.2), rgba(0, 120, 212, 0.15));
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
  img { width: 24px; height: 24px; }
}
.title {
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  letter-spacing: 0.2px;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.15s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.aside .el-menu { flex: 1; padding-top: 8px; }

.aside-footer {
  padding: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}
.footer-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.18s var(--ease-fluent);
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
  }
}

// 顶部栏
.header {
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(30px) saturate(160%);
  -webkit-backdrop-filter: blur(30px) saturate(160%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 24px;
  position: relative;
  z-index: 5;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 18px;
}
.collapse-btn {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  border-radius: var(--radius-md);
  cursor: pointer;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.6);
  transition: all 0.18s var(--ease-fluent);
  &:hover {
    background: rgba(255, 255, 255, 0.8);
    color: var(--fluent-primary);
    transform: scale(1.05);
  }
}

.header-right { display: flex; align-items: center; }
.user-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px 6px 6px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.7);
  cursor: pointer;
  outline: none;
  transition: all 0.18s var(--ease-fluent);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  &:hover { background: rgba(255, 255, 255, 0.85); box-shadow: var(--shadow-sm); }
}
.user-avatar {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4cc2ff, #0078d4);
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px;
}
.caret { font-size: 11px; color: var(--text-tertiary); }

.main {
  background: transparent;
  padding: 22px;
  overflow-y: auto;
}
</style>
