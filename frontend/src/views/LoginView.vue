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

onMounted(checkStatus)
</script>

<template>
  <div class="login-root">
    <div class="login-card">
      <div class="login-header">
        <img src="/favicon.svg" alt="logo" />
        <h2>GitHub 账户管理器</h2>
        <p class="subtitle">{{ isSetupMode ? '首次使用，请设置主密码' : '请输入主密码登录' }}</p>
      </div>

      <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent="handleSubmit">
        <el-form-item label="主密码" prop="masterPassword">
          <el-input v-model="form.masterPassword" type="password" show-password placeholder="请输入主密码" @keyup.enter="handleSubmit" />
        </el-form-item>

        <el-form-item v-if="isSetupMode" label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" show-password placeholder="再次输入主密码" @keyup.enter="handleSubmit" />
        </el-form-item>

        <el-alert v-if="isSetupMode" type="warning" :closable="false" class="tip">
          主密码用于加密所有 token / 密码，<b>忘记后无法找回</b>。请妥善保管。
        </el-alert>

        <el-button type="primary" :loading="loading" class="submit-btn" @click="handleSubmit">
          {{ isSetupMode ? '完成初始化' : '登 录' }}
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-root {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1f2a44 0%, #24292e 100%);
}

.login-card {
  width: 400px;
  padding: 40px 32px 32px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
}

.login-header {
  text-align: center;
  margin-bottom: 24px;

  img {
    width: 56px;
    height: 56px;
  }

  h2 {
    margin: 12px 0 4px;
    font-size: 20px;
    color: #303133;
  }

  .subtitle {
    color: #909399;
    font-size: 13px;
    margin: 0;
  }
}

.tip {
  margin-bottom: 16px;
}

.submit-btn {
  width: 100%;
}
</style>
