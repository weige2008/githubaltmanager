<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { statsApi, type Overview } from '@/api/stats'

const loading = ref(false)
const data = ref<Overview>({ total: 0, active: 0, banned: 0, error: 0, unknown: 0, repos: 0, workflows: 0, tasks: 0, tasks_enabled: 0 })

const statCards = [
  { key: 'total', title: '账户总数', icon: 'User', color: '#0078d4', gradient: 'linear-gradient(135deg, #4cc2ff, #0078d4)', desc: '已导入的 GitHub 账户' },
  { key: 'active', title: '正常账户', icon: 'CircleCheck', color: '#107c41', gradient: 'linear-gradient(135deg, #54ae8a, #107c41)', desc: '状态为 active' },
  { key: 'banned', title: '封禁异常', icon: 'WarningFilled', color: '#c50f1f', gradient: 'linear-gradient(135deg, #ff8a8a, #c50f1f)', desc: '状态为 banned/error' },
  { key: 'tasks_enabled', title: '启用任务', icon: 'AlarmClock', color: '#8b5cf6', gradient: 'linear-gradient(135deg, #c4a8ff, #8b5cf6)', desc: '启用中的定时任务' }
]

const quickActions = [
  { title: '导入 GitHub 账户', desc: '通过 Token 安全导入', icon: 'UserFilled', to: '/accounts', color: '#0078d4' },
  { title: '浏览仓库文件', desc: '查看与编辑仓库内容', icon: 'FolderOpened', to: '/repos', color: '#107c41' },
  { title: '定时任务调度', desc: 'cron 触发 workflow', icon: 'AlarmClock', to: '/tasks', color: '#8b5cf6' },
  { title: '批量创建 Action', desc: '多仓库一键创建', icon: 'Operation', to: '/batch', color: '#c19c00' }
]

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
    <!-- 欢迎区 -->
    <div class="welcome glass-card mb-24">
      <div class="welcome-text">
        <h1>欢迎回来 👋</h1>
        <p>这里是你的 GitHub 账户管理中枢，所有数据已加密保护。</p>
      </div>
      <div class="welcome-deco">
        <div class="deco-orb orb-a"></div>
        <div class="deco-orb orb-b"></div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="stat-grid mb-24">
      <div
        v-for="s in statCards"
        :key="s.key"
        class="stat-card glass-card hover-lift"
      >
        <div class="stat-icon-wrap" :style="{ background: s.gradient }">
          <el-icon :size="24"><component :is="s.icon" /></el-icon>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ (data as any)[s.key] }}</div>
          <div class="stat-title">{{ s.title }}</div>
          <div class="stat-desc">{{ s.desc }}</div>
        </div>
      </div>
    </div>

    <!-- 快捷操作 + 数据概览 -->
    <div class="content-grid">
      <div class="quick-actions glass-card">
        <div class="card-title">
          <el-icon><Promotion /></el-icon>
          <span>快捷操作</span>
        </div>
        <div class="action-grid">
          <div
            v-for="a in quickActions"
            :key="a.title"
            class="action-item hover-lift"
            @click="$router.push(a.to)"
          >
            <div class="action-icon" :style="{ background: a.color + '1a', color: a.color }">
              <el-icon :size="22"><component :is="a.icon" /></el-icon>
            </div>
            <div class="action-text">
              <div class="action-title">{{ a.title }}</div>
              <div class="action-desc">{{ a.desc }}</div>
            </div>
            <el-icon class="action-arrow"><ArrowRightBold /></el-icon>
          </div>
        </div>
      </div>

      <div class="overview glass-card">
        <div class="card-title">
          <el-icon><DataAnalysis /></el-icon>
          <span>数据概览</span>
        </div>
        <div class="overview-rows">
          <div class="overview-row">
            <div class="ov-icon" style="background: rgba(0,120,212,0.12); color: #0078d4"><el-icon><Files /></el-icon></div>
            <div class="ov-info">
              <div class="ov-label">仓库总数</div>
              <div class="ov-sub">已同步的 GitHub 仓库</div>
            </div>
            <div class="ov-value">{{ data.repos }}</div>
          </div>
          <div class="overview-row">
            <div class="ov-icon" style="background: rgba(139,92,246,0.12); color: #8b5cf6"><el-icon><Operation /></el-icon></div>
            <div class="ov-info">
              <div class="ov-label">Workflow 总数</div>
              <div class="ov-sub">扫描到的 Action</div>
            </div>
            <div class="ov-value">{{ data.workflows }}</div>
          </div>
          <div class="overview-row">
            <div class="ov-icon" style="background: rgba(193,156,0,0.14); color: #c19c00"><el-icon><AlarmClock /></el-icon></div>
            <div class="ov-info">
              <div class="ov-label">定时任务总数</div>
              <div class="ov-sub">含已禁用任务</div>
            </div>
            <div class="ov-value">{{ data.tasks }}</div>
          </div>
          <div class="overview-row">
            <div class="ov-icon" style="background: rgba(120,120,130,0.14); color: #909399"><el-icon><QuestionFilled /></el-icon></div>
            <div class="ov-info">
              <div class="ov-label">未知状态账户</div>
              <div class="ov-sub">尚未检测的账户</div>
            </div>
            <div class="ov-value">{{ data.unknown }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 欢迎横幅
.welcome {
  position: relative;
  overflow: hidden;
  padding: 32px 36px;
  border-radius: var(--radius-xl);
  background:
    linear-gradient(120deg, rgba(0, 120, 212, 0.08), rgba(139, 92, 246, 0.06)),
    var(--glass-bg-1);
}
.welcome-text {
  position: relative; z-index: 2;
  h1 { font-size: 26px; font-weight: 800; margin: 0 0 8px; letter-spacing: -0.5px; }
  p { font-size: 14px; color: var(--text-secondary); margin: 0; }
}
.welcome-deco {
  position: absolute; right: -20px; top: -40px;
  width: 240px; height: 200px; pointer-events: none;
}
.deco-orb {
  position: absolute; border-radius: 50%; filter: blur(40px);
  &.orb-a { width: 160px; height: 160px; background: rgba(76, 194, 255, 0.4); right: 40px; top: 0; }
  &.orb-b { width: 120px; height: 120px; background: rgba(139, 92, 246, 0.35); right: -20px; top: 80px; }
}

// 统计卡片
.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}
.stat-card {
  display: flex; align-items: center; gap: 18px;
  padding: 22px 24px;
  border-radius: var(--radius-lg);
}
.stat-icon-wrap {
  width: 56px; height: 56px; border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center;
  color: #fff; flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}
.stat-value { font-size: 30px; font-weight: 800; color: var(--text-primary); letter-spacing: -1px; line-height: 1.1; }
.stat-title { font-size: 14px; font-weight: 600; color: var(--text-primary); margin-top: 2px; }
.stat-desc { font-size: 12px; color: var(--text-tertiary); margin-top: 2px; }

// 内容双栏
.content-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 18px;
}

.card-title {
  display: flex; align-items: center; gap: 10px;
  font-size: 15px; font-weight: 700; color: var(--text-primary);
  margin-bottom: 18px; padding-bottom: 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

// 快捷操作
.action-grid { display: flex; flex-direction: column; gap: 8px; }
.action-item {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
  &:hover {
    background: rgba(255, 255, 255, 0.75);
    border-color: rgba(0, 120, 212, 0.25);
    transform: translateX(3px);
    .action-arrow { opacity: 1; transform: translateX(0); color: var(--fluent-primary); }
  }
}
.action-icon {
  width: 44px; height: 44px; border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.action-title { font-size: 14px; font-weight: 600; color: var(--text-primary); }
.action-desc { font-size: 12px; color: var(--text-tertiary); margin-top: 2px; }
.action-text { flex: 1; }
.action-arrow {
  opacity: 0; transform: translateX(-6px);
  color: var(--text-tertiary);
  transition: all 0.2s var(--ease-out);
}

// 数据概览
.overview-rows { display: flex; flex-direction: column; gap: 4px; }
.overview-row {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 12px;
  border-radius: var(--radius-md);
  transition: background 0.18s var(--ease-fluent);
  &:hover { background: rgba(0, 120, 212, 0.04); }
}
.ov-icon {
  width: 40px; height: 40px; border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}
.ov-info { flex: 1; }
.ov-label { font-size: 14px; font-weight: 600; color: var(--text-primary); }
.ov-sub { font-size: 12px; color: var(--text-tertiary); margin-top: 1px; }
.ov-value {
  font-size: 24px; font-weight: 800; color: var(--text-primary);
  letter-spacing: -0.5px;
}

@media (max-width: 1024px) {
  .stat-grid { grid-template-columns: repeat(2, 1fr); }
  .content-grid { grid-template-columns: 1fr; }
}
</style>
