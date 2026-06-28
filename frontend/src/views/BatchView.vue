<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { batchApi } from '@/api/task'
import { accountApi } from '@/api/account'
import { repoApi, type Repo } from '@/api/repo'

const loading = ref(false)
const accounts = ref<{ id: number; github_login: string }[]>([])
const allRepos = ref<Repo[]>([])
const selectedAcc = ref<number | null>(null)

const search = ref('')
const filterPrivate = ref(false)
const filterFork = ref<'all' | 'no' | 'only'>('all')

const selected = ref<number[]>([])

const tab = ref('create')
const filename = ref('keepalive.yml')
const commitMsg = ref('Batch create workflow')
const wfContent = ref(`name: Keep Alive
on:
  workflow_dispatch:
  schedule:
    - cron: '0 8 * * *'
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - run: echo "keep alive $(date)"
`)

const dispatchFilename = ref('')
const dispatchRef = ref('main')

const filteredRepos = computed(() => {
  return allRepos.value.filter((r) => {
    if (search.value && !r.full_name.toLowerCase().includes(search.value.toLowerCase())) return false
    if (filterPrivate.value && !r.private) return false
    if (filterFork.value === 'only' && !r.fork) return false
    if (filterFork.value === 'no' && r.fork) return false
    return true
  })
})

async function load() {
  loading.value = true
  try {
    accounts.value = (await accountApi.list()).map((a) => ({ id: a.id, github_login: a.github_login }))
    if (accounts.value.length && selectedAcc.value === null) selectedAcc.value = accounts.value[0].id
  } finally {
    loading.value = false
  }
}

async function loadRepos() {
  if (!selectedAcc.value) return
  allRepos.value = await repoApi.listByAccount(selectedAcc.value)
  selected.value = []
}

watch(selectedAcc, loadRepos)

function encodeUtf8Base64(text: string): string {
  const bytes = new TextEncoder().encode(text)
  let bin = ''
  bytes.forEach((b) => (bin += String.fromCharCode(b)))
  return btoa(bin)
}

async function doCreateWorkflows() {
  if (selected.value.length === 0) {
    ElMessage.warning('请先勾选仓库')
    return
  }
  if (!filename.value || !wfContent.value) {
    ElMessage.warning('请填写文件名和内容')
    return
  }
  await ElMessageBox.confirm(`将为 ${selected.value.length} 个仓库创建 ${filename.value}`, '确认', { type: 'warning' })
  loading.value = true
  try {
    const contentBase64 = encodeUtf8Base64(wfContent.value)
    const res = await batchApi.createWorkflows({
      repo_ids: selected.value,
      filename: filename.value,
      content: contentBase64,
      commit_message: commitMsg.value
    })
    ElMessage.success(`成功 ${res.success.length} 个，失败 ${res.failed.length} 个`)
    if (res.failed.length) console.log('failed', res.failed)
  } finally {
    loading.value = false
  }
}

async function doDispatch() {
  if (selected.value.length === 0) {
    ElMessage.warning('请先勾选仓库')
    return
  }
  if (!dispatchFilename.value) {
    ElMessage.warning('请填写 workflow 文件名')
    return
  }
  await ElMessageBox.confirm(`将触发 ${selected.value.length} 个仓库的 ${dispatchFilename.value}`, '确认', { type: 'warning' })
  loading.value = true
  try {
    const res = await batchApi.dispatch({
      repo_ids: selected.value,
      filename: dispatchFilename.value,
      ref: dispatchRef.value || 'main'
    })
    ElMessage.success(`成功 ${res.success.length} 个，失败 ${res.failed.length} 个`)
  } finally {
    loading.value = false
  }
}

function selectAll() {
  selected.value = filteredRepos.value.map((r) => r.id)
}
function selectNone() {
  selected.value = []
}
function selectWritable() {
  selected.value = filteredRepos.value.filter((r) => ['admin', 'write', 'maintain'].includes(r.permission)).map((r) => r.id)
}

function isWritable(r: Repo) {
  return ['admin', 'write', 'maintain'].includes(r.permission)
}

onMounted(load)
</script>

<template>
  <div class="page-container">
    <el-card shadow="never" class="mb-16">
      <div class="flex items-center gap-12">
        <span>账户:</span>
        <el-select v-model="selectedAcc" placeholder="选择账户" style="width: 200px" :loading="loading">
          <el-option v-for="a in accounts" :key="a.id" :label="a.github_login" :value="a.id" />
        </el-select>
        <el-input v-model="search" placeholder="搜索仓库名" style="width: 220px" clearable />
        <el-checkbox v-model="filterPrivate">仅私有</el-checkbox>
        <el-select v-model="filterFork" style="width: 110px">
          <el-option label="全部" value="all" />
          <el-option label="非 Fork" value="no" />
          <el-option label="仅 Fork" value="only" />
        </el-select>
        <span class="count">共 {{ filteredRepos.length }} / {{ allRepos.length }}，已选 {{ selected.length }}</span>
      </div>
    </el-card>

    <el-card shadow="never" class="mb-16">
      <div class="flex gap-8 mb-12">
        <el-button size="small" @click="selectAll">全选</el-button>
        <el-button size="small" @click="selectNone">取消</el-button>
        <el-button size="small" @click="selectWritable">仅可写</el-button>
      </div>
      <el-table :data="filteredRepos" v-loading="loading" max-height="320" @selection-change="(rows: Repo[]) => (selected = rows.map((r) => r.id))">
        <el-table-column type="selection" width="42" :selectable="isWritable" />
        <el-table-column label="仓库" prop="full_name" min-width="240" />
        <el-table-column label="权限" width="90" prop="permission" />
        <el-table-column label="标记" width="160">
          <template #default="{ row }">
            <el-tag v-if="row.private" size="small" type="warning">私有</el-tag>
            <el-tag v-if="row.fork" size="small">Fork</el-tag>
            <el-tag v-if="row.archived" size="small" type="info">归档</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card shadow="never">
      <el-tabs v-model="tab">
        <el-tab-pane label="批量创建 Workflow" name="create">
          <el-form label-position="top">
            <el-form-item label="文件名 (.yml/.yaml)">
              <el-input v-model="filename" style="width: 280px" />
            </el-form-item>
            <el-form-item label="Commit Message">
              <el-input v-model="commitMsg" style="width: 400px" />
            </el-form-item>
            <el-form-item label="Workflow 内容 (YAML)">
              <el-input v-model="wfContent" type="textarea" :rows="14" :input-style="{ fontFamily: 'Consolas, monospace', fontSize: '13px' }" />
            </el-form-item>
            <el-button type="primary" :loading="loading" @click="doCreateWorkflows">批量创建 ({{ selected.length }} 个仓库)</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="批量触发 Workflow" name="dispatch">
          <el-form label-position="top">
            <el-form-item label="Workflow 文件名">
              <el-input v-model="dispatchFilename" placeholder="deploy.yml" style="width: 280px" />
            </el-form-item>
            <el-form-item label="Ref (分支/Tag)">
              <el-input v-model="dispatchRef" placeholder="main" style="width: 280px" />
            </el-form-item>
            <el-button type="primary" :loading="loading" @click="doDispatch">批量触发 ({{ selected.length }} 个仓库)</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.count { color: #909399; font-size: 13px; }
</style>
