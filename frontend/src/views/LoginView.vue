<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { authApi } from '@/api/auth'
import { useAppStore } from '@/stores/app'
import ThemeSwitch from '@/components/ThemeSwitch.vue'

const app = useAppStore()
const router = useRouter()
const route = useRoute()

const loading = ref(false)
const isSetupMode = ref(false)
const formRef = ref<FormInstance>()

const form = ref({ masterPassword: '', confirmPassword: '' })

const rules: FormRules = {
  masterPassword: [
    { required: true, message: '请输入主密码', trigger: 'blur' },
    { min: 8, message: '密码至少 8 位', trigger: 'blur' }
  ],
  confirmPassword: [
    {
      required: true,
      validator: (_r: any, value: string, cb: (e?: Error) => void) => {
        if (!value) return cb(new Error('请再次输入密码'))
        if (value !== form.value.masterPassword) return cb(new Error('两次输入不一致'))
        cb()
      },
      trigger: 'blur'
    }
  ]
}

async function checkStatus() {
  try {
    const status = await authApi.status()
    isSetupMode.value = !status.isInitialized
    app.initialized = status.isInitialized
  } catch {
    isSetupMode.value = true
  }
}

async function handleSubmit() {
  if (!formRef.value) return
  await formRef.value.validate()
  loading.value = true
  try {
    if (isSetupMode.value) {
      const res = await authApi.setup({ masterPassword: form.value.masterPassword })
      app.setToken(res.token)
      ElMessage.success('初始化成功')
    } else {
      const res = await authApi.login({ masterPassword: form.value.masterPassword })
      app.setToken(res.token)
      ElMessage.success('登录成功')
    }
    router.replace((route.query.redirect as string) || '/dashboard')
  } finally {
    loading.value = false
  }
}

onMounted(checkStatus)
</script>

<template>
  <div class="login-page">
    <div class="top-bar">
      <button class="back-btn" @click="router.push('/')">
        <el-icon><ArrowLeftBold /></el-icon> 主页
      </button>
      <ThemeSwitch />
    </div>

    <div class="login-card glass-card">
      <div class="login-header">
        <div class="logo-circle">
          <img src="/favicon.svg" alt="logo" />
        </div>
        <h2>GitHub 管理器</h2>
        <p>{{ isSetupMode ? '首次使用，请设置主密码' : '请输入主密码登录' }}</p>
      </div>

      <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent="handleSubmit">
        <el-form-item label="主密码" prop="masterPassword">
          <el-input v-model="form.masterPassword" type="password" show-password size="large"
            placeholder="请输入主密码" @keyup.enter="handleSubmit" />
        </el-form-item>
        <el-form-item v-if="isSetupMode" label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" show-password size="large"
            placeholder="再次输入主密码" @keyup.enter="handleSubmit" />
        </el-form-item>
        <el-alert v-if="isSetupMode" type="warning" :closable="false" class="mb-16" show-icon>
          主密码用于加密所有数据，<b>忘记后无法找回</b>。
        </el-alert>
        <el-button type="primary" size="large" style="width:100%" :loading="loading" @click="handleSubmit">
          {{ isSetupMode ? '完成初始化' : '登 录' }}
        </el-button>
      </el-form>

      <div class="login-foot">
        <el-icon><Lock /></el-icon>
        <span>AES-256-GCM · Argon2id</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.top-bar {
  position: absolute; top: 20px; left: 0; right: 0;
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 24px;
}
.back-btn {
  display: flex; align-items: center; gap: 4px;
  padding: 6px 14px; border-radius: 100px;
  background: var(--surface-2);
  border: 1px solid var(--surface-border-soft);
  color: var(--text-secondary); font-size: 13px; font-weight: 500;
  cursor: pointer; transition: all 0.15s ease;
  &:hover { color: var(--primary); background: var(--surface-hover); }
}

.login-card {
  width: 400px;
  padding: 36px 32px 24px;
  border-radius: var(--radius-lg);
}
.login-header { text-align: center; margin-bottom: 24px; }
.logo-circle {
  width: 60px; height: 60px; margin: 0 auto 14px;
  border-radius: 16px;
  background: var(--primary-light);
  display: flex; align-items: center; justify-content: center;
  img { width: 34px; height: 34px; }
}
h2 { margin: 0 0 4px; font-size: 20px; font-weight: 700; color: var(--text-primary); }
p { margin: 0; font-size: 14px; color: var(--text-secondary); }
.login-foot {
  margin-top: 20px; padding-top: 16px;
  border-top: 1px solid var(--surface-border-soft);
  display: flex; align-items: center; justify-content: center; gap: 6px;
  font-size: 11px; color: var(--text-tertiary);
}
</style>
