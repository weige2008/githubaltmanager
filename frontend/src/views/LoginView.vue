<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { authApi } from '@/api/auth'
import { useAppStore } from '@/stores/app'

const app = useAppStore()
const router = useRouter()
const route = useRoute()

const loading = ref(false)
const isSetupMode = ref(false)
const formRef = ref<FormInstance>()

const form = ref({
  masterPassword: '',
  confirmPassword: ''
})

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
    const redirect = (route.query.redirect as string) || '/dashboard'
    router.replace(redirect)
  } finally {
    loading.value = false
  }
}

function goHome() {
  router.push('/')
}

onMounted(checkStatus)
</script>

<template>
  <div class="login-root">
    <!-- 背景装饰光斑 -->
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>
    <div class="bg-orb orb-3"></div>

    <!-- 返回主页 -->
    <div class="back-home" @click="goHome">
      <el-icon><ArrowLeftBold /></el-icon>
      <span>返回主页</span>
    </div>

    <div class="login-card glass-card hover-lift">
      <div class="login-header">
        <div class="logo-orb">
          <img src="/favicon.svg" alt="logo" />
        </div>
        <h2>GitHub 账户管理器</h2>
        <p class="subtitle">
          {{ isSetupMode ? '首次使用，请设置主密码' : '欢迎回来，请输入主密码登录' }}
        </p>
      </div>

      <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent="handleSubmit">
        <el-form-item label="主密码" prop="masterPassword">
          <el-input
            v-model="form.masterPassword"
            type="password"
            show-password
            size="large"
            placeholder="请输入主密码"
            @keyup.enter="handleSubmit"
          />
        </el-form-item>

        <el-form-item v-if="isSetupMode" label="确认密码" prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            show-password
            size="large"
            placeholder="再次输入主密码"
            @keyup.enter="handleSubmit"
          />
        </el-form-item>

        <el-alert v-if="isSetupMode" type="warning" :closable="false" class="tip" show-icon>
          主密码用于加密所有 token / 密码，<b>忘记后无法找回</b>。请用密码管理器妥善保管。
        </el-alert>

        <el-button type="primary" size="large" :loading="loading" class="submit-btn" @click="handleSubmit">
          {{ isSetupMode ? '完成初始化' : '登 录' }}
        </el-button>
      </el-form>

      <div class="login-footer">
        <el-icon><Lock /></el-icon>
        <span>AES-256-GCM 端到端加密 · Argon2id 密钥派生</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-root {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

// 背景光斑
.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.55;
  pointer-events: none;
  animation: float 14s ease-in-out infinite;
}
.orb-1 {
  width: 480px; height: 480px;
  background: radial-gradient(circle, rgba(0, 120, 212, 0.5), transparent 70%);
  top: -120px; left: -100px;
}
.orb-2 {
  width: 560px; height: 560px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent 70%);
  bottom: -180px; right: -120px;
  animation-delay: -5s;
}
.orb-3 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(76, 194, 255, 0.35), transparent 70%);
  top: 40%; left: 50%;
  animation-delay: -9s;
}
@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -40px) scale(1.05); }
  66% { transform: translate(-20px, 30px) scale(0.97); }
}

.back-home {
  position: absolute; top: 24px; left: 28px; z-index: 10;
  display: flex; align-items: center; gap: 6px;
  color: var(--text-secondary); cursor: pointer;
  font-size: 13px; font-weight: 500;
  padding: 8px 14px; border-radius: 100px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  transition: all 0.2s var(--ease-fluent);
  &:hover { color: var(--fluent-primary); background: rgba(255, 255, 255, 0.8); transform: translateX(-2px); }
}

.login-card {
  width: 440px;
  padding: 44px 40px 32px;
  position: relative;
  z-index: 5;
  border-radius: var(--radius-xl);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}
.logo-orb {
  width: 72px; height: 72px;
  margin: 0 auto 18px;
  border-radius: 22px;
  background: linear-gradient(135deg, rgba(76, 194, 255, 0.25), rgba(0, 120, 212, 0.2));
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 120, 212, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.9);
  img { width: 40px; height: 40px; }
}
h2 {
  margin: 0 0 6px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.3px;
  color: var(--text-primary);
}
.subtitle {
  color: var(--text-secondary);
  font-size: 14px;
  margin: 0;
}

.tip {
  margin-bottom: 18px;
  border-radius: var(--radius-md);
}

.submit-btn {
  width: 100%;
  height: 46px;
  font-size: 15px;
  font-weight: 600;
  border-radius: var(--radius-md) !important;
}

.login-footer {
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-tertiary);
}
</style>
