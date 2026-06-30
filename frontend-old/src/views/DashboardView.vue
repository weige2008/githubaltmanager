<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { statsApi, type Overview } from '@/api/stats'
import CountUp from '@/components/CountUp.vue'

const loading = ref(false)
const data = ref<Overview>({ total: 0, active: 0, banned: 0, error: 0, unknown: 0, repos: 0, workflows: 0, tasks: 0, tasks_enabled: 0 })

const cards = [
  { key: 'total', label: '账户总数', icon: 'User', color: '#005fb8', sub: '已导入' },
  { key: 'active', label: '正常', icon: 'CircleCheck', color: '#107c41', sub: 'active' },
  { key: 'banned', label: '封禁异常', icon: 'WarningFilled', color: '#c42b1c', sub: 'banned / error' },
  { key: 'tasks_enabled', label: '启用任务', icon: 'AlarmClock', color: '#8b5cf6', sub: '定时任务' }
]

const actions = [
  { title: '导入账户', icon: 'UserFilled', to: '/accounts', color: '#005fb8' },
  { title: '浏览仓库', icon: 'FolderOpened', to: '/repos', color: '#107c41' },
  { title: '定时任务', icon: 'AlarmClock', to: '/tasks', color: '#8b5cf6' },
  { title: '批量操作', icon: 'Operation', to: '/batch', color: '#92700c' }
]

const overviews = [
  { key: 'repos', label: '仓库总数', icon: 'Files', color: '#005fb8' },
  { key: 'workflows', label: 'Workflow', icon: 'Operation', color: '#8b5cf6' },
  { key: 'tasks', label: '定时任务', icon: 'AlarmClock', color: '#92700c' },
  { key: 'unknown', label: '未知状态', icon: 'QuestionFilled', color: '#717171' }
]

async function load() {
  loading.value = true
  try { data.value = await statsApi.overview() } finally { loading.value = false }
}
onMounted(load)
</script>

<template>
  <div class="page-container" v-loading="loading">
    <!-- 统计卡片 — 阶梯入场 -->
    <div class="stat-grid">
      <div
        v-for="(c, i) in cards"
        :key="c.key"
        class="stat-card glass-card"
        :class="'anim-fade-up delay-' + (i + 1)"
      >
        <div class="sc-icon" :style="{ background: c.color + '14', color: c.color }">
          <el-icon :size="22"><component :is="c.icon" /></el-icon>
        </div>
        <div class="sc-body">
          <div class="sc-num">
            <CountUp :value="(data as any)[c.key]" :duration="600" />
          </div>
          <div class="sc-label">{{ c.label }}</div>
        </div>
        <div class="sc-sub">{{ c.sub }}</div>
        <!-- 底部装饰渐变线 -->
        <div class="sc-line" :style="{ background: c.color }"></div>
      </div>
    </div>

    <!-- 下方双栏 -->
    <div class="bottom-grid">
      <!-- 快捷操作 -->
      <div class="panel glass-card anim-fade-up delay-5">
        <div class="panel-head">
          <el-icon><Promotion /></el-icon>
          <span>快捷操作</span>
        </div>
        <div class="action-list">
          <div
            v-for="(a, i) in actions"
            :key="a.title"
            class="action-item"
            :style="{ animationDelay: 0.3 + i * 0.06 + 's' } 
"
            @click="$router.push(a.to)"
          >
            <div class="ai-icon" :style="{ background: a.color + '14', color: a.color }">
              <el-icon :size="18"><component :is="a.icon" /></el-icon>
            </div>
            <span class="ai-label">{{ a.title }}</span>
            <el-icon class="ai-arrow"><ArrowRightBold /></el-icon>
          </div>
        </div>
      </div>

      <!-- 数据概览 -->
      <div class="panel glass-card anim-fade-up delay-6">
        <div class="panel-head">
          <el-icon><DataAnalysis /></el-icon>
          <span>数据概览</span>
        </div>
        <div class="ov-list">
          <div v-for="o in overviews" :key="o.key" class="ov-item">
            <div class="ov-icon" :style="{ background: o.color + '12', color: o.color }">
              <el-icon><component :is="o.icon" /></el-icon>
            </div>
            <span class="ov-label">{{ o.label }}</span>
            <span class="ov-val">
              <CountUp :value="(data as any)[o.key]" :duration="500" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stat-grid {
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
  border-radius: var(--radius-card);
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.22s ease, transform 0.22s ease;
  &:hover {
    transform: var(--hover-transform);
    box-shadow: var(--shadow-hover);
    .sc-line { opacity: 1; transform: scaleX(1); }
  }
}
.sc-line {
  position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
  opacity: 0.3; transform: scaleX(0.3);
  transition: opacity 0.3s, transform 0.3s;
  border-radius: 2px;
}
.sc-icon {
  width: 44px; height: 44px;
  border-radius: var(--radius-card);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.sc-body { flex: 1; }
.sc-num {
  font-size: 26px; font-weight: 700; color: var(--text-primary);
  line-height: 1.1; letter-spacing: -0.5px;
}
.sc-label { font-size: 13px; color: var(--text-secondary); margin-top: 2px; }
.sc-sub {
  font-size: 11px; color: var(--text-tertiary);
  align-self: flex-start; margin-top: 2px;
}

.bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.panel { border-radius: var(--radius-card); padding: 18px 20px; }
.panel-head {
  display: flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 600; color: var(--text-primary);
  margin-bottom: 14px; padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.action-list { display: flex; flex-direction: column; gap: 4px; }
.action-item {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 12px;
  border-radius: var(--radius-ctrl);
  cursor: pointer;
  animation: fadeInLeft 0.4s ease both;
  transition: background 0.15s ease;
  &:hover {
    background: var(--primary-lighter);
    .ai-arrow { opacity: 1; transform: translateX(0); }
    .ai-icon { transform: scale(1.1); }
  }
}
.ai-icon {
  width: 32px; height: 32px; border-radius: var(--radius-ctrl);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.ai-label { flex: 1; font-size: 14px; font-weight: 500; color: var(--text-primary); }
.ai-arrow {
  opacity: 0; transform: translateX(-4px);
  color: var(--text-tertiary); transition: all 0.2s ease;
}

.ov-list { display: flex; flex-direction: column; gap: 2px; }
.ov-item {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 8px;
  border-radius: var(--radius-ctrl);
  transition: background 0.15s ease;
  &:hover { background: var(--primary-lighter); }
}
.ov-icon {
  width: 28px; height: 28px; border-radius: var(--radius-ctrl);
  display: flex; align-items: center; justify-content: center;
  font-size: 15px;
}
.ov-label { flex: 1; font-size: 14px; color: var(--text-secondary); }
.ov-val { font-size: 20px; font-weight: 700; color: var(--text-primary); }

@media (max-width: 1024px) {
  .stat-grid { grid-template-columns: repeat(2, 1fr); }
  .bottom-grid { grid-template-columns: 1fr; }
}
</style>
