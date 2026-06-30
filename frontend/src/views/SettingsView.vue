<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { authApi } from '@/api/auth'
import { autoTaskApi, type AutoTaskConfig } from '@/api/autotask'

const pwdRef = ref<FormInstance>()
const pwdForm = ref({ oldPassword: '', newPassword: '', confirmPassword: '' })
const changing = ref(false)

const rules: FormRules = {
  oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 8, message: '至少 8 位', trigger: 'blur' }
  ],
  confirmPassword: [
    {
      required: true,
      validator: (_r: any, v: string, cb: (e?: Error) => void) => {
        if (!v) return cb(new Error('请再次输入'))
        if (v !== pwdForm.value.newPassword) return cb(new Error('两次不一致'))
        cb()
      },
      trigger: 'blur'
    }
  ]
}

async function changePassword() {
  if (!pwdRef.value) return
  await pwdRef.value.validate()
  changing.value = true
  try {
    await authApi.changePassword({ oldPassword: pwdForm.value.oldPassword, newPassword: pwdForm.value.newPassword })
    ElMessage.success('修改成功')
    pwdForm.value = { oldPassword: '', newPassword: '', confirmPassword: '' }
  } finally {
    changing.value = false
  }
}

// 自动任务
const autoConfig = ref<AutoTaskConfig>({
  auto_check_enabled: false,
  auto_check_interval: 30,
  auto_sync_enabled: true,
  auto_sync_interval: 30
})
const autoLoading = ref(false)

const intervalOptions = [
  { label: '每 30 分钟', value: 30 },
  { label: '每 1 小时', value: 60 },
  { label: '每 3 小时', value: 180 },
  { label: '每 6 小时', value: 360 },
  { label: '每 12 小时', value: 720 },
  { label: '每 24 小时', value: 1440 },
  { label: '每 3 天', value: 4320 },
  { label: '每 7 天', value: 10080 }
]

async function loadAutoConfig() {
  try { autoConfig.value = await autoTaskApi.get() } catch {}
}

async function saveAutoConfig() {
  autoLoading.value = true
  try {
    await autoTaskApi.update(autoConfig.value)
    ElMessage.success('已保存')
  } finally { autoLoading.value = false }
}

async function runCheckNow() {
  await autoTaskApi.checkNow()
  ElMessage.success('已触发全量检测')
}
async function runSyncNow() {
  await autoTaskApi.syncNow()
  ElMessage.success('已触发全量同步')
}

onMounted(loadAutoConfig)
</script>

<template>
  <div class="page-container">
    <el-card shadow="never" class="mb-16">
      <template #header>
        <div class="card-header"><el-icon><AlarmClock /></el-icon><span>自动化任务</span></div>
      </template>

      <div class="auto-section">
        <div class="auto-head">
          <div class="auto-info">
            <el-switch v-model="autoConfig.auto_check_enabled" />
            <div class="auto-text">
              <div class="auto-title">自动检测账户封禁状态</div>
              <div class="auto-desc">按设定间隔对所有账户执行多方案封禁检测</div>
            </div>
          </div>
          <el-button size="small" plain @click="runCheckNow">立即执行</el-button>
        </div>
        <div v-if="autoConfig.auto_check_enabled" class="auto-row">
          <span class="row-label">执行间隔</span>
          <el-select v-model="autoConfig.auto_check_interval" style="width: 160px">
            <el-option v-for="o in intervalOptions" :key="o.value" :label="o.label" :value="o.value" />
          </el-select>
        </div>
      </div>

      <el-divider />

      <div class="auto-section">
        <div class="auto-head">
          <div class="auto-info">
            <el-switch v-model="autoConfig.auto_sync_enabled" />
            <div class="auto-text">
              <div class="auto-title">自动同步仓库</div>
              <div class="auto-desc">按设定间隔拉取所有账户的最新仓库列表</div>
            </div>
          </div>
          <el-button size="small" plain @click="runSyncNow">立即执行</el-button>
        </div>
        <div v-if="autoConfig.auto_sync_enabled" class="auto-row">
          <span class="row-label">执行间隔</span>
          <el-select v-model="autoConfig.auto_sync_interval" style="width: 160px">
            <el-option v-for="o in intervalOptions" :key="o.value" :label="o.label" :value="o.value" />
          </el-select>
        </div>
      </div>

      <div class="auto-save-bar">
        <el-button type="primary" :loading="autoLoading" @click="saveAutoConfig">保存配置</el-button>
      </div>
    </el-card>

    <el-card shadow="never" class="mb-16">
      <template #header>
        <div class="card-header"><el-icon><Lock /></el-icon><span>修改主密码</span></div>
      </template>
      <el-form ref="pwdRef" :model="pwdForm" :rules="rules" label-position="top" style="max-width: 420px">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="pwdForm.oldPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="pwdForm.newPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input v-model="pwdForm.confirmPassword" type="password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="changing" @click="changePassword">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <template #header>
        <div class="card-header"><el-icon><InfoFilled /></el-icon><span>关于</span></div>
      </template>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="项目">GitHub 账户管理器</el-descriptions-item>
        <el-descriptions-item label="技术栈">Vue 3 + Element Plus / Go + Gin + GORM + SQLite</el-descriptions-item>
        <el-descriptions-item label="加密">AES-256-GCM + Argon2id</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.card-header { display: flex; align-items: center; gap: 6px; font-weight: 600; font-size: 15px; }
.auto-section { padding: 4px 0; }
.auto-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.auto-info { display: flex; align-items: center; gap: 14px; }
.auto-title { font-size: 15px; font-weight: 600; color: var(--text-primary); }
.auto-desc { font-size: 13px; color: var(--text-tertiary); margin-top: 2px; }
.auto-row { display: flex; align-items: center; gap: 10px; margin-top: 14px; padding-left: 50px; }
.row-label { font-size: 13px; color: var(--text-secondary); white-space: nowrap; }
.auto-save-bar { margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border); }
</style>
