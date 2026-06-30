<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { taskApi, type ScheduledTask } from '@/api/task'
import { accountApi } from '@/api/account'
import { repoApi, type Repo } from '@/api/repo'

const loading = ref(false)
const tasks = ref<ScheduledTask[]>([])
const accounts = ref<{ id: number; github_login: string }[]>([])
const repos = ref<Repo[]>([])

const createVisible = ref(false)
const form = ref({
  account_id: null as number | null,
  repository_id: null as number | null,
  workflow_filename: '',
  ref: 'main',
  interval: 1440,
  inputs_json: '',
  enabled: true
})

const intervalOptions = [
  { label: '每 30 分钟', value: 30 },
  { label: '每 1 小时', value: 60 },
  { label: '每 2 小时', value: 120 },
  { label: '每 3 小时', value: 180 },
  { label: '每 6 小时', value: 360 },
  { label: '每 12 小时', value: 720 },
  { label: '每 24 小时', value: 1440 },
  { label: '每 3 天', value: 4320 },
  { label: '每 7 天', value: 10080 }
]

function intervalToCron(min: number): string {
  if (min < 60) return `*/${min} * * * *`
  if (min < 1440) return `0 */${min / 60} * * *`
  if (min === 1440) return '0 0 * * *'
  return `0 0 */${min / 1440} * *`
}

function cronToInterval(cron: string): number {
  const parts = cron.trim().split(/\s+/)
  if (parts.length !== 5) return 1440
  const [min, hour, dom] = parts
  if (min.startsWith('*/')) return parseInt(min.slice(2))
  if (hour.startsWith('*/')) return parseInt(hour.slice(2)) * 60
  if (dom && dom.startsWith('*/')) return parseInt(dom.slice(2)) * 1440
  return 1440
}

async function load() {
  loading.value = true
  try {
    tasks.value = await taskApi.list()
    accounts.value = (await accountApi.list()).map((a) => ({ id: a.id, github_login: a.note && a.note.trim() ? `${a.note.trim()}(${a.github_login})` : a.github_login }))
  } finally {
    loading.value = false
  }
}

async function loadRepos(accId: number) {
  repos.value = await repoApi.listByAccount(accId)
}

function openCreate() {
  form.value = { account_id: null, repository_id: null, workflow_filename: '', ref: 'main', interval: 1440, inputs_json: '', enabled: true }
  createVisible.value = true
}

async function doCreate() {
  if (!form.value.account_id || !form.value.repository_id || !form.value.workflow_filename) {
    ElMessage.warning('请填写完整')
    return
  }
  const cronExpr = intervalToCron(form.value.interval)
  await taskApi.create({
    account_id: form.value.account_id,
    repository_id: form.value.repository_id,
    workflow_filename: form.value.workflow_filename,
    ref: form.value.ref || 'main',
    cron_expr: cronExpr,
    inputs_json: form.value.inputs_json,
    enabled: form.value.enabled
  })
  ElMessage.success('已创建')
  createVisible.value = false
  load()
}

async function toggle(t: ScheduledTask) {
  await taskApi.toggle(t.id, !t.enabled)
  ElMessage.success(t.enabled ? '已禁用' : '已启用')
  load()
}

async function runNow(t: ScheduledTask) {
  await ElMessageBox.confirm(`立即触发 ${t.owner_repo}/${t.workflow_filename}？`, '提示')
  await taskApi.runNow(t.id)
  ElMessage.success('已触发')
  setTimeout(load, 1000)
}

async function remove(t: ScheduledTask) {
  await ElMessageBox.confirm(`删除任务 ${t.owner_repo}/${t.workflow_filename}？`, '警告', { type: 'warning' })
  await taskApi.remove(t.id)
  ElMessage.success('已删除')
  load()
}

function resultType(r: string) {
  return ({ success: 'success', failed: 'danger', running: 'warning' } as any)[r] || 'info'
}

onMounted(load)
</script>

<template>
  <div class="page-container">
    <el-card shadow="never">
      <div class="flex items-center justify-between mb-12">
        <div class="flex gap-8">
          <el-button type="primary" @click="openCreate">新建定时任务</el-button>
          <el-button @click="load">刷新</el-button>
        </div>
        <span class="count">共 {{ tasks.length }} 个任务</span>
      </div>

      <el-table :data="tasks" v-loading="loading" stripe>
        <el-table-column label="账户" width="120">
          <template #default="{ row }">{{ accounts.find(a => a.id === row.account_id)?.github_login || row.account_id }}</template>
        </el-table-column>
        <el-table-column label="仓库/Workflow" min-width="240">
          <template #default="{ row }">
            <div>{{ row.owner_repo }}</div>
            <code class="wf">{{ row.workflow_filename }} @ {{ row.ref }}</code>
          </template>
        </el-table-column>
        <el-table-column label="间隔" width="120">
          <template #default="{ row }"><span class="interval-text">{{ (intervalOptions.find(o => o.value === cronToInterval(row.cron_expr))?.label) || row.cron_expr }}</span></template>
        </el-table-column>
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="row.enabled ? 'success' : 'info'" size="small">{{ row.enabled ? '启用' : '禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="下次执行" width="160">
          <template #default="{ row }">{{ row.next_run_at ? new Date(row.next_run_at).toLocaleString() : '—' }}</template>
        </el-table-column>
        <el-table-column label="最近" width="120">
          <template #default="{ row }">
            <el-tag v-if="row.last_run_result" :type="resultType(row.last_run_result)" size="small">{{ row.last_run_result }}</el-tag>
            <span v-else>—</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="toggle(row as ScheduledTask)">{{ row.enabled ? '禁用' : '启用' }}</el-button>
            <el-button size="small" type="primary" plain @click="runNow(row as ScheduledTask)">立即运行</el-button>
            <el-button size="small" type="danger" plain @click="remove(row as ScheduledTask)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="createVisible" title="新建定时任务" width="560px">
      <el-form :model="form" label-position="top">
        <el-form-item label="账户">
          <el-select v-model="form.account_id" placeholder="选择账户" @change="(v: any) => v && loadRepos(v)">
            <el-option v-for="a in accounts" :key="a.id" :label="a.github_login" :value="a.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="仓库">
          <el-select v-model="form.repository_id" placeholder="选择仓库" filterable>
            <el-option v-for="r in repos" :key="r.id" :label="r.full_name" :value="r.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="Workflow 文件名">
          <el-input v-model="form.workflow_filename" placeholder="deploy.yml" />
        </el-form-item>
        <el-form-item label="分支/Tag">
          <el-input v-model="form.ref" placeholder="main" />
        </el-form-item>
        <el-form-item label="执行间隔">
          <el-select v-model="form.interval" placeholder="选择间隔" style="width: 200px">
            <el-option v-for="o in intervalOptions" :key="o.value" :label="o.label" :value="o.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="Inputs JSON (选填)">
          <el-input v-model="form.inputs_json" type="textarea" :rows="2" placeholder='{"key":"value"}' />
        </el-form-item>
        <el-form-item label="启用">
          <el-switch v-model="form.enabled" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="createVisible = false">取消</el-button>
        <el-button type="primary" @click="doCreate">创建</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.count { color: var(--text-tertiary); font-size: 13px; font-weight: 500;
  background: var(--surface-3); padding: 4px 12px; border-radius: 100px; }
.wf { font-size: 12px; color: var(--text-secondary); }
.interval-text { font-size: 13px; color: var(--text-primary); font-weight: 500; }
</style>
