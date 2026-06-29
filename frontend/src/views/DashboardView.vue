<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { statsApi, type Overview } from '@/api/stats'

const loading = ref(false)
const data = ref<Overview>({ total: 0, active: 0, banned: 0, error: 0, unknown: 0, repos: 0, workflows: 0, tasks: 0, tasks_enabled: 0 })

const cards = [
  { key: 'total', label: '账户总数', icon: 'User', color: '#0078d4', sub: '已导入' },
  { key: 'active', label: '正常', icon: 'CircleCheck', color: '#2ea043', sub: 'status active' },
  { key: 'banned', label: '封禁异常', icon: 'WarningFilled', color: '#e54d4d', sub: 'banned/error' },
  { key: 'tasks_enabled', label: '启用任务', icon: 'AlarmClock', color: '#8b5cf6', sub: '定时任务' }
]

const actions = [
  { title: '导入账户', icon: 'UserFilled', to: '/accounts', color: '#0078d4' },
  { title: '浏览仓库', icon: 'FolderOpened', to: '/repos', color: '#2ea043' },
  { title: '定时任务', icon: 'AlarmClock', to: '/tasks', color: '#8b5cf6' },
  { title: '批量操作', icon: 'Operation', to: '/batch', color: '#c19c00' }
]

const overviews = [
  { key: 'repos', label: '仓库总数', icon: 'Files', color: '#0078d4' },
  { key: 'workflows', label: 'Workflow', icon: 'Operation', color: '#8b5cf6' },
  { key: 'tasks', label: '定时任务', icon: 'AlarmClock', color: '#c19c00' },
  { key: 'unknown', label: '未知状态', icon: 'QuestionFilled', color: '#909399' }
]

async function load() {
  loading.value = true
  try { data.value = await statsApi.overview() } finally { loading.value = false }
}
onMounted(load)
</script>

<template>
  <div class="page-container" v-loading="loading">
    <div class="stat-row">
      <div v-for="c in cards" :key="c.key" class="stat-card glass-card hover-lift">
        <div class="sc-icon" :style="{ background: c.color + '22', color: c.color }">
          <el-icon :size="22"><component :is="c.icon" /></el-icon>
        </div>
        <div class="sc-body">
          <div class="sc-num">{{ (data as any)[c.key] }}</div>
          <div class="sc-label">{{ c.label }}</div>
          <div class="sc-sub">{{ c.sub }}</div>
        </div>
      </div>
    </div>

    <div class="bottom-row">
      <div class="panel glass-card">
        <div class="panel-head">快捷操作</div>
        <div class="action-list">
          <div v-for="a in actions" :key="a.title" class="action-item" @click="$router.push(a.to)">
            <div class="ai-icon" :style="{ background: a.color + '20', color: a.color }">
              <el-icon :size="20"><component :is="a.icon" /></el-icon>
            </div>
            <span class="ai-label">{{ a.title }}</span>
            <el-icon class="ai-arrow"><ArrowRightBold /></el-icon>
          </div>
        </div>
      </div>

      <div class="panel glass-card">
        <div class="panel-head">数据概览</div>
        <div class="ov-list">
          <div v-for="o in overviews" :key="o.key" class="ov-item">
            <div class="ov-icon" :style="{ background: o.color + '18', color: o.color }">
              <el-icon><component :is="o.icon" /></el-icon>
            </div>
            <span class="ov-label">{{ o.label }}</span>
            <span class="ov-val">{{ (data as any)[o.key] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stat-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}
.stat-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  border-radius: var(--radius-lg);
}
.sc-icon {
  width: 48px; height: 48px;
  border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.sc-num { font-size: 26px; font-weight: 800; color: var(--text-primary); line-height: 1.1; }
.sc-label { font-size: 14px; font-weight: 600; color: var(--text-primary); }
.sc-sub { font-size: 11px; color: var(--text-tertiary); }

.bottom-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.panel {
  border-radius: var(--radius-lg);
  padding: 20px;
}
.panel-head {
  font-size: 15px; font-weight: 700; color: var(--text-primary);
  margin-bottom: 14px; padding-bottom: 12px;
  border-bottom: 1px solid var(--surface-border-soft);
}

.action-list { display: flex; flex-direction: column; gap: 6px; }
.action-item {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 14px;
  border-radius: var(--radius-md);
  background: var(--surface-3);
  border: 1px solid var(--surface-border-soft);
  cursor: pointer;
  transition: all 0.15s ease;
  &:hover {
    background: var(--surface-hover);
    border-color: var(--primary);
    .ai-arrow { opacity: 1; transform: translateX(0); }
  }
}
.ai-icon {
  width: 36px; height: 36px; border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
}
.ai-label { flex: 1; font-size: 14px; font-weight: 500; color: var(--text-primary); }
.ai-arrow { opacity: 0; transform: translateX(-6px); color: var(--text-tertiary); transition: all 0.15s ease; }

.ov-list { display: flex; flex-direction: column; gap: 4px; }
.ov-item {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 8px;
  border-radius: var(--radius-sm);
  &:hover { background: var(--surface-3); }
}
.ov-icon {
  width: 32px; height: 32px; border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
}
.ov-label { flex: 1; font-size: 14px; color: var(--text-secondary); }
.ov-val { font-size: 20px; font-weight: 800; color: var(--text-primary); }

@media (max-width: 1024px) {
  .stat-row { grid-template-columns: repeat(2, 1fr); }
  .bottom-row { grid-template-columns: 1fr; }
}
</style>
