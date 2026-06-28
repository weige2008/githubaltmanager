<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { authApi } from '@/api/auth'

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
    ElMessage.success('修改成功，所有数据已用新密码重新加密')
    pwdForm.value = { oldPassword: '', newPassword: '', confirmPassword: '' }
  } finally {
    changing.value = false
  }
}
</script>

<template>
  <div class="page-container">
    <el-card shadow="never" class="mb-16" header="修改主密码">
      <el-alert type="warning" :closable="false" class="mb-16">
        修改主密码会自动用新密码重新加密所有已存储的 token / 密码 / 邮箱。请牢记新密码。
      </el-alert>
      <el-form ref="pwdRef" :model="pwdForm" :rules="rules" label-width="120px" style="max-width: 480px">
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

    <el-card shadow="never" header="关于">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="项目">GitHub 账户管理器</el-descriptions-item>
        <el-descriptions-item label="技术栈">Vue 3 + Vite + Element Plus / Go + Gin + GORM + SQLite</el-descriptions-item>
        <el-descriptions-item label="加密">AES-256-GCM + Argon2id</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>
