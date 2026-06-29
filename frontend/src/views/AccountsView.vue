<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { Plus, Refresh, RefreshRight } from '@element-plus/icons-vue'
import { accountApi, type Account } from '@/api/account'

const router = useRouter()
const loading = ref(false)
const accounts = ref<Account[]>([])

const importVisible = ref(false)
const importRef = ref<FormInstance>()
const importing = ref(false)
const importForm = ref({
  token: '',
  password: '',
  recovery_email: '',
  note: ''
})

const rules: FormRules = {
  token: [{ required: true, message: '请输入 GitHub Token', trigger: 'blur' }]
}

async function load() {
  loading.value = true
  try {
    accounts.value = await accountApi.list()
  } finally {
    loading.value = false
  }
}

function openImport() {
  importForm.value = { token: '', password: '', recovery_email: '', note: '' }
  importVisible.value = true
}

async function doImport() {
  if (!importRef.value) return
  await importRef.value.validate()
  importing.value = true
  try {
    const acc = await accountApi.create({
      token: importForm.value.token,
      password: importForm.value.password || undefined,
      recovery_email: importForm.value.recovery_email || undefined,
      note: importForm.value.note || undefined
    })
    ElMessage.success(`导入成功：${acc.github_login}`)
    importVisible.value = false
    load()
  } finally {
    importing.value = false
  }
}

async function checkStatus(id: number) {
  loading.value = true
  try {
    const acc = await accountApi.checkStatus(id)
    ElMessage.success(`检测完成：${acc.status}`)
    load()
  } catch {
    // 拦截器已提示
  } finally {
    loading.value = false
  }
}

async function batchCheck() {
  const selected = selection.value
  if (selected.length === 0) {
    ElMessage.warning('请先勾选账户')
    return
  }
  await ElMessageBox.confirm(`确定批量检测 ${selected.length} 个账户？`, '提示', { type: 'warning' })
  loading.value = true
  try {
    const res = await accountApi.batchCheckStatus(selected.map((a) => a.id))
    const ok = res.results.filter((r: any) => r.ok).length
    ElMessage.success(`检测完成：${ok}/${res.results.length} 正常`)
    load()
  } finally {
    loading.value = false
  }
}

async function remove(id: number, login: string) {
  await ElMessageBox.confirm(`确定删除账户 ${login}？关联的仓库/任务也会删除`, '警告', { type: 'warning' })
  await accountApi.remove(id)
  ElMessage.success('已删除')
  load()
}

const selection = ref<Account[]>([])
function onSelectionChange(rows: Account[]) {
  selection.value = rows
}

function statusType(s: string) {
  return ({ active: 'success', banned: 'danger', error: 'warning', unknown: 'info' } as any)[s] || 'info'
}
function statusText(s: string) {
  return ({ active: '正常', banned: '封禁', error: '异常', unknown: '未知' } as any)[s] || s
}

onMounted(load)
</script>

<template>
  <div class="page-container">
    <el-card shadow="never">
      <div class="toolbar flex items-center justify-between mb-12">
        <div class="flex items-center gap-12">
          <el-button type="primary" :icon="Plus" @click="openImport">导入账户</el-button>
          <el-button :icon="Refresh" @click="batchCheck">批量检测状态</el-button>
          <el-button :icon="RefreshRight" @click="load">刷新</el-button>
        </div>
        <span class="count">共 {{ accounts.length }} 个账户</span>
      </div>

      <el-table :data="accounts" v-loading="loading" @selection-change="onSelectionChange" stripe>
        <el-table-column type="selection" width="42" />
        <el-table-column label="账户" min-width="200">
          <template #default="{ row }">
            <div class="acc-cell">
              <el-avatar :size="32" :src="row.avatar_url">
                {{ row.github_login?.[0]?.toUpperCase() }}
              </el-avatar>
              <div>
                <div class="acc-login">{{ row.github_login }}</div>
                <div class="acc-name">{{ row.display_name }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="statusType(row.status)" size="small">{{ statusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Token" width="180">
          <template #default="{ row }">
            <code class="token-mask">{{ row.token_masked || '****' }}</code>
          </template>
        </el-table-column>
        <el-table-column label="最后检测" width="160">
          <template #default="{ row }">
            {{ row.last_checked_at ? new Date(row.last_checked_at).toLocaleString() : '—' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="router.push(`/app/accounts/${row.id}`)">详情</el-button>
            <el-button size="small" type="primary" plain @click="checkStatus(row.id)">检测</el-button>
            <el-button size="small" type="danger" plain @click="remove(row.id, row.github_login)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="importVisible" title="导入 GitHub 账户" width="520px">
      <el-alert type="info" :closable="false" class="mb-12">
        通过 Token 导入，系统会自动调用 <code>/user</code> 验证并拉取账户信息。
      </el-alert>
      <el-form ref="importRef" :model="importForm" :rules="rules" label-position="top">
        <el-form-item label="GitHub Token (必填)" prop="token">
          <el-input v-model="importForm.token" type="password" show-password placeholder="ghp_xxx 或 github_pat_xxx" />
        </el-form-item>
        <el-form-item label="账户密码 (选填)">
          <el-input v-model="importForm.password" type="password" show-password placeholder="GitHub 账户登录密码" />
        </el-form-item>
        <el-form-item label="密保邮箱 (选填)">
          <el-input v-model="importForm.recovery_email" placeholder="recovery@example.com" />
        </el-form-item>
        <el-form-item label="备注 (选填)">
          <el-input v-model="importForm.note" type="textarea" :rows="2" placeholder="自定义备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="importVisible = false">取消</el-button>
        <el-button type="primary" :loading="importing" @click="doImport">导入</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.toolbar .count { color: #909399; font-size: 13px; }
.acc-cell { display: flex; align-items: center; gap: 10px; }
.acc-login { font-weight: 600; color: #303133; }
.acc-name { font-size: 12px; color: #909399; }
.token-mask { font-size: 12px; color: #606266; }
</style>
