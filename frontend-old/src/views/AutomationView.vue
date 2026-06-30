<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { autoTaskApi, type AutoTaskLog, type AutoTaskConfig } from '@/api/autotask'

const loading = ref(false)
const logs = ref<AutoTaskLog[]>([])
const config = ref<AutoTaskConfig | null>(null)
const running = ref<{ running: boolean; task?: AutoTaskLog }>({ running: false })
const autoRefresh = ref(true)
let timer: ReturnType<typeof setInterval> | null = null

const stats = computed(() => {
  const total = logs.value.length
  const success = logs.value.filter((l) => l.status === 'success').length
  const failed = logs.value.filter((l) => l.status === 'failed').length
  const running = logs.value.filter((l) => l.status === 'running').length
  return { total, success, failed, running }
})

async function load() {
  loading.value = true
  try {
    const [logData, cfg, runInfo] = await Promise.all([
      autoTaskApi.logs(100),
      autoTaskApi.get(),
      autoTaskApi.running()
    ])
    logs.value = logData
    config.value = cfg
    running.value = runInfo
  } finally {
    loading.value = false
  }
}

async function runCheck() {
  await autoTaskApi.checkNow()
  ElMessage.success('已触发全量检测')
  setTimeout(load, 1000)
}

async function runSync() {
  await autoTaskApi.syncNow()
  ElMessage.success('已触发全量同步')
  setTimeout(load, 1000)
}

function toggleAutoRefresh() {
  autoRefresh.value = !autoRefresh.value
  if (autoRefresh.value) {
    timer = setInterval(load, 5000)
  } else if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function statusTag(s: string) {
  return ({ success: 'success', failed: 'danger', running: 'warning' } as any)[s] || 'info'
}
function statusText(s: string) {
  return ({ success: '成功', failed: '失败', running: '执行中' } as any)[s] || s
}
function taskTypeText(t: string) {
  return ({ check: '封禁检测', sync: '仓库同步' } as any)[t] || t
}
function taskTypeIcon(t: string) {
  return ({ check: 'WarningFilled', sync: 'Refresh' } as any)[t] || 'Operation'
}
function formatDuration(ms: number) {
  if (ms < 1000) return ms + 'ms'
  return (ms / 1000).toFixed(1) + 's'
}
function formatTime(t: string) {
  return new Date(t).toLocaleString()
}
function formatInterval(min: number) {
  if (min < 60) return `每 ${min} 分钟`
  if (min < 1440) return `每 ${min / 60} 小时`
  return `每 ${min / 1440} 天`
}

onMounted(() => {
  load()
  if (autoRefresh.value) {
    timer = setInterval(load, 5000)
  }
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="page-container" v-loading="loading">
    <!-- 状态概览 -->
    <div class="stat-row">
      <div class="stat-card glass-card">
        <div class="sc-icon" style="background: rgba(0,95,184,0.12); color: #005fb8">
          <el-icon :size="20"><Operation /></el-icon>
        </div>
        <div>
          <div class="sc-num">{{ stats.total }}</div>
          <div class="sc-label">总执行次数</div>
        </div>
      </div>
      <div class="stat-card glass-card">
        <div class="sc-icon" style="background: rgba(16,124,65,0.12); color: #107c41">
          <el-icon :size="20"><CircleCheck /></el-icon>
        </div>
        <div>
          <div class="sc-num">{{ stats.success }}</div>
          <div class="sc-label">成功</div>
        </div>
      </div>
      <div class="stat-card glass-card">
        <div class="sc-icon" style="background: rgba(196,43,28,0.1); color: #c42b1c">
          <el-icon :size="20"><CircleClose /></el-icon>
        </div>
        <div>
          <div class="sc-num">{{ stats.failed }}</div>
          <div class="sc-label">失败</div>
        </div>
      </div>
      <div class="stat-card glass-card">
        <div class="sc-icon" style="background: rgba(146,112,12,0.14); color: #92700c">
          <el-icon :size="20"><Loading /></el-icon>
        </div>
        <div>
          <div class="sc-num">{{ stats.running }}</div>
          <div class="sc-label">执行中</div>
        </div>
      </div>
    </div>

    <!-- 当前状态 + 手动触发 -->
    <el-card shadow="never" class="mb-16">
      <template #header>
        <div class="card-header">
          <el-icon><Monitor /></el-icon>
          <span>任务状态</span>
          <el-tag v-if="running.running" type="warning" size="small" class="ml-8">
            <el-icon class="loading-spin"><Loading /></el-icon> 执行中
          </el-tag>
        </div>
      </template>
      <div class="status-grid">
        <div class="status-item">
          <div class="si-label">自动检测</div>
          <div class="si-value">
            <el-tag :type="config?.auto_check_enabled ? 'success' : 'info'" size="small">
              {{ config?.auto_check_enabled ? '已启用' : '已禁用' }}
            </el-tag>
            <span v-if="config?.auto_check_enabled" class="si-interval">
              {{ formatInterval(config.auto_check_interval) }}
            </span>
          </div>
          <el-button size="small" plain @click="runCheck">立即检测</el-button>
        </div>
        <div class="status-item">
          <div class="si-label">自动同步</div>
          <div class="si-value">
            <el-tag :type="config?.auto_sync_enabled ? 'success' : 'info'" size="small">
              {{ config?.auto_sync_enabled ? '已启用' : '已禁用' }}
            </el-tag>
            <span v-if="config?.auto_sync_enabled" class="si-interval">
              {{ formatInterval(config.auto_sync_interval) }}
            </span>
          </div>
          <el-button size="small" plain @click="runSync">立即同步</el-button>
        </div>
      </div>
    </el-card>

    <!-- 执行日志 -->
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <el-icon><Document /></el-icon>
          <span>执行日志</span>
          <span class="auto-refresh" @click="toggleAutoRefresh">
            {{ autoRefresh ? '◉ 自动刷新' : '○ 手动' }}
          </span>
        </div>
      </template>

      <el-table :data="logs" max-height="600">
        <el-table-column label="类型" width="120">
          <template #default="{ row }">
            <div class="log-type">
              <el-icon :size="14"><component :is="taskTypeIcon(row.task_type)" /></el-icon>
              <span>{{ taskTypeText(row.task_type) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="statusTag(row.status)" size="small">{{ statusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="结果" width="140">
          <template #default="{ row }">
            <span v-if="row.task_type === 'sync'">
              ✓ {{ row.success_cnt }} / ✗ {{ row.failed_cnt }} ({{ row.total_count }} 仓库)
            </span>
            <span v-else>
              ✓ {{ row.success_cnt }} / ✗ {{ row.failed_cnt }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="耗时" width="80">
          <template #default="{ row }">{{ row.duration_ms ? formatDuration(row.duration_ms) : '—' }}</template>
        </el-table-column>
        <el-table-column label="时间" width="160">
          <template #default="{ row }">{{ formatTime(row.created_at) }}</template>
        </el-table-column>
        <el-table-column label="详情" min-width="200">
          <template #default="{ row }">
            <pre v-if="row.detail" class="log-detail">{{ row.detail }}</pre>
            <span v-else class="muted">—</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.card-header { display: flex; align-items: center; gap: 6px; font-weight: 600; font-size: 15px; }
.ml-8 { margin-left: 8px; }
.loading-spin { animation: spin 1s linear infinite; }

.stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 16px; }
.stat-card { display: flex; align-items: center; gap: 14px; padding: 16px 18px; border-radius: var(--radius-card); }
.sc-icon { width: 42px; height: 42px; border-radius: var(--radius-ctrl); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.sc-num { font-size: 24px; font-weight: 700; color: var(--text-primary); }
.sc-label { font-size: 13px; color: var(--text-secondary); }

.status-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.status-item { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 12px 16px; background: var(--surface-3); border-radius: var(--radius-ctrl); }
.si-label { font-size: 14px; font-weight: 600; color: var(--text-primary); }
.si-value { display: flex; align-items: center; gap: 8px; }
.si-interval { font-size: 13px; color: var(--text-secondary); }

.auto-refresh { margin-left: auto; font-size: 12px; color: var(--text-tertiary); cursor: pointer; user-select: none; }

.log-type { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; }
.log-detail {
  font-family: 'Cascadia Code', Consolas, monospace;
  font-size: 11px; line-height: 1.5; color: var(--text-secondary);
  white-space: pre-wrap; word-break: break-all;
  margin: 0; max-height: 80px; overflow-y: auto;
}

@media (max-width: 768px) {
  .stat-row { grid-template-columns: repeat(2, 1fr); }
  .status-grid { grid-template-columns: 1fr; }
}
</style>
