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
    <el-aside :width="isCollapse ? '64px' : '220px'" class="aside">
      <div class="logo">
        <img src="/favicon.svg" alt="logo" />
        <span v-show="!isCollapse" class="title">GitHub 管理器</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        background-color="#24292e"
        text-color="#c9d1d9"
        active-text-color="#58a6ff"
      >
        <el-menu-item v-for="item in menuRoutes" :key="item.path" :index="'/' + item.path">
          <el-icon><component :is="(item.meta as any)?.icon" /></el-icon>
          <template #title>{{ (item.meta as any)?.title }}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <div class="header-left">
          <el-icon class="collapse-btn" @click="isCollapse = !isCollapse">
            <Fold v-if="!isCollapse" />
            <Expand v-else />
          </el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ (route.meta as any)?.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-dropdown>
            <span class="user-trigger">
              <el-icon><UserFilled /></el-icon>
              <span style="margin-left: 6px">管理员</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="router.push('/settings')">设置</el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main class="main">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.layout-root {
  height: 100vh;
}

.aside {
  background-color: #24292e;
  transition: width 0.2s;
  overflow: hidden;
}

.logo {
  height: 56px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 18px;
  color: #fff;

  img {
    width: 28px;
    height: 28px;
  }

  .title {
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
  }
}

.aside :deep(.el-menu) {
  border-right: none;
}

.header {
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.collapse-btn {
  font-size: 18px;
  cursor: pointer;
  color: #606266;

  &:hover {
    color: #409eff;
  }
}

.header-right {
  display: flex;
  align-items: center;
}

.user-trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: #606266;
  outline: none;
}

.main {
  background-color: #f5f7fa;
  padding: 16px;
  overflow-y: auto;
}
</style>
