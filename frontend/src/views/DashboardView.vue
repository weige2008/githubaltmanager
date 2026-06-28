<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { statsApi, type Overview } from '@/api/stats'

const loading = ref(false)
const data = ref<Overview>({ total: 0, active: 0, banned: 0, error: 0, unknown: 0, repos: 0, workflows: 0, tasks: 0, tasks_enabled: 0 })

const stats = ref([
  { key: 'total', title: '账户总数', icon: 'User', color: '#409eff', desc: '已导入的 GitHub 账户' },
  { key: 'active', title: '正常账户', icon: 'CircleCheck', color: '#67c23a', desc: '状态为 active' },
  { key: 'banned', title: '封禁/异常', icon: 'WarningFilled', color: '#f56c6c', desc: '状态为 banned/error' },
  { key: 'tasks_enabled', title: '启用任务', icon: 'AlarmClock', color: '#e6a23c', desc: '启用中的定时任务' }
])

async function load() {
  loading.value = true
  try {
    data.value = await statsApi.overview()
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="page-container" v-loading="loading">
    <el-row :gutter="16">
      <el-col v-for="s in stats" :key="s.key" :xs="12" :sm="12" :md="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-body">
            <div class="stat-icon" :style="{ backgroundColor: s.color + '1a', color: s.color }">
              <el-icon :size="24"><component :is="s.icon" /></el-icon>
            </div>
            <div class="stat-text">
              <div class="stat-value">{{ (data as any)[s.key] }}</div>
              <div class="stat-title">{{ s.title }}</div>
              <div class="stat-desc">{{ s.desc }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16" class="mt-16">
      <el-col :xs="24" :md="12">
        <el-card shadow="never">
          <template #header>数据概览</template>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="仓库总数">{{ data.repos }}</el-descriptions-item>
            <el-descriptions-item label="Workflow 总数">{{ data.workflows }}</el-descriptions-item>
            <el-descriptions-item label="定时任务总数">{{ data.tasks }}</el-descriptions-item>
            <el-descriptions-item label="未知状态账户">{{ data.unknown }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="12">
        <el-card shadow="never">
          <template #header>快速操作</template>
          <div class="actions">
            <el-button type="primary" @click="$router.push('/accounts')">账户管理</el-button>
            <el-button @click="$router.push('/repos')">仓库浏览</el-button>
            <el-button @click="$router.push('/tasks')">定时任务</el-button>
            <el-button @click="$router.push('/batch')">批量操作</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.stat-card { margin-bottom: 16px; }
.stat-body { display: flex; align-items: center; gap: 16px; }
.stat-icon {
  width: 56px; height: 56px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.stat-value { font-size: 26px; font-weight: 700; color: #303133; }
.stat-title { font-size: 14px; color: #606266; }
.stat-desc { font-size: 12px; color: #909399; margin-top: 2px; }
.actions { display: flex; flex-wrap: wrap; gap: 12px; }
</style>
