<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { accountApi, type AccountDetail } from '@/api/account'
import { repoApi, type Repo } from '@/api/repo'

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)

const loading = ref(false)
const acc = ref<AccountDetail | null>(null)
const repos = ref<Repo[]>([])
const activeTab = ref('repos')

async function loadAccount() {
  loading.value = true
  try {
    acc.value = await accountApi.get(id)
  } finally {
    loading.value = false
  }
}

async function loadRepos() {
  try {
    repos.value = await repoApi.listByAccount(id)
  } catch {}
}

async function refreshRepos() {
  await ElMessageBox.confirm('从 GitHub 重新拉取该账户所有仓库？可能耗时较长', '提示')
  loading.value = true
  try {
    const res = await repoApi.refreshRepos(id)
    ElMessage.success(`已同步 ${res.total} 个仓库`)
    loadRepos()
  } finally {
    loading.value = false
  }
}

async function scanWorkflows() {
  await ElMessageBox.confirm('扫描该账户所有仓库的 Action？并发请求可能触发限流', '提示')
  loading.value = true
  try {
    const res = await repoApi.scanWorkflows(id)
    ElMessage.success(`扫描完成，识别 ${res.total} 个 workflow`)
  } finally {
    loading.value = false
  }
}

async function checkStatus() {
  loading.value = true
  try {
    acc.value = await accountApi.checkStatus(id)
    ElMessage.success(`检测完成：${acc.value.status}`)
  } finally {
    loading.value = false
  }
}

function statusType(s: string) {
  return ({ active: 'success', banned: 'danger', error: 'warning', unknown: 'info' } as any)[s] || 'info'
}
function statusText(s: string) {
  return ({ active: '正常', banned: '封禁', error: '异常', unknown: '未知' } as any)[s] || s
}

onMounted(async () => {
  await loadAccount()
  loadRepos()
})
</script>

<template>
  <div class="page-container" v-loading="loading">
    <el-page-header @back="router.push('/app/accounts')" class="mb-16">
      <template #content>
        <span class="ph-title">
          <el-avatar :size="28" :src="acc?.avatar_url">{{ acc?.github_login?.[0]?.toUpperCase() }}</el-avatar>
          {{ acc?.github_login || '加载中' }}
          <el-tag v-if="acc" :type="statusType(acc.status)" size="small">{{ statusText(acc.status) }}</el-tag>
        </span>
      </template>
      <template #extra>
        <el-button size="small" @click="checkStatus">检测状态</el-button>
      </template>
    </el-page-header>

    <el-card v-if="acc" shadow="never" class="mb-16">
      <el-descriptions :column="3" border>
        <el-descriptions-item label="GitHub ID">{{ acc.github_id }}</el-descriptions-item>
        <el-descriptions-item label="登录名">{{ acc.github_login }}</el-descriptions-item>
        <el-descriptions-item label="显示名">{{ acc.display_name }}</el-descriptions-item>
        <el-descriptions-item label="Token">{{ acc.token_masked }}</el-descriptions-item>
        <el-descriptions-item label="Token 权限">
          <el-tag v-for="s in (acc.token_scopes || '').split(',').filter(Boolean)" :key="s" size="small" class="scope-tag">{{ s }}</el-tag>
          <span v-if="!acc.token_scopes">—</span>
        </el-descriptions-item>
        <el-descriptions-item label="已存密码">{{ acc.has_password ? '是' : '否' }}</el-descriptions-item>
        <el-descriptions-item label="密保邮箱">{{ acc.recovery_masked || '—' }}</el-descriptions-item>
        <el-descriptions-item label="最后检测">{{ acc.last_checked_at ? new Date(acc.last_checked_at).toLocaleString() : '—' }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ acc.note || '—' }}</el-descriptions-item>
        <el-descriptions-item label="状态详情" :span="3">{{ acc.status_reason || '—' }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="never">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="仓库" name="repos">
          <div class="flex items-center justify-between mb-12">
            <span class="count">共 {{ repos.length }} 个仓库</span>
            <div class="flex gap-8">
              <el-button size="small" type="primary" plain @click="refreshRepos">同步仓库</el-button>
              <el-button size="small" @click="scanWorkflows">扫描 Workflows</el-button>
            </div>
          </div>
          <el-table :data="repos" stripe max-height="500">
            <el-table-column label="仓库" min-width="220">
              <template #default="{ row }">
                <a :href="row.html_url" target="_blank" class="repo-link">{{ row.full_name }}</a>
                <div class="repo-flags">
                  <el-tag v-if="row.private" size="small" type="warning">私有</el-tag>
                  <el-tag v-if="row.fork" size="small">Fork</el-tag>
                  <el-tag v-if="row.archived" size="small" type="info">归档</el-tag>
                  <el-tag v-if="row.disabled" size="small" type="danger">禁用</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="默认分支" width="120" prop="default_branch" />
            <el-table-column label="权限" width="90">
              <template #default="{ row }">{{ row.permission || '—' }}</template>
            </el-table-column>
            <el-table-column label="操作" width="100" fixed="right">
              <template #default="{ row }">
                <el-button size="small" link @click="router.push(`/app/repos?rid=${row.id}`)">浏览</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.ph-title { display: inline-flex; align-items: center; gap: 8px; }
.count { color: #909399; font-size: 13px; }
.scope-tag { margin-right: 4px; }
.repo-link { color: #409eff; }
.repo-flags { margin-top: 4px; display: flex; gap: 4px; flex-wrap: wrap; }
</style>
