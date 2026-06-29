<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { Plus, Refresh, RefreshRight, QuestionFilled, CopyDocument } from '@element-plus/icons-vue'
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

// 引导面板
const guideVisible = ref(false)
const guideStep = ref(0)

const guideSteps = [
  {
    title: '打开 GitHub Token 设置页',
    desc: '点击下方按钮直接跳转到 GitHub 的 Token 创建页面（需先登录 GitHub）。',
    link: 'https://github.com/settings/tokens/new?scopes=repo,workflow,read:user,user,admin:public_key,delete_repo,admin:org,gist,notifications',
    linkText: '打开 GitHub Token 页 →',
    code: ''
  },
  {
    title: '设置 Token 参数',
    desc: '在 Note 填写备注（如 GAM），Expiration 选择有效期（推荐 90 天或 No expiration），然后勾选下方所有 scope 权限：',
    link: '',
    linkText: '',
    code: '☑ repo          (仓库完全读写)\n☑ workflow      (编辑 GitHub Actions)\n☑ read:user     (读取用户信息)\n☑ user          (用户邮箱)\n☑ admin:public_key (SSH 公钥)\n☑ delete_repo   (删除仓库)\n☑ admin:org     (组织管理)\n☑ gist          (Gist)\n☑ notifications (通知)\n☑ write:packages (包发布)\n☑ read:packages  (包读取)\n☑ delete:packages(包删除)\n☑ admin:gpg_key  (GPG 密钥)'
  },
  {
    title: '生成并复制 Token',
    desc: '拉到页面底部点击绿色按钮「Generate token」，生成的 token（以 ghp_ 开头）会显示一次，立即复制：',
    link: '',
    linkText: '',
    code: '⚠ Token 只显示一次！\n请立即复制保存，关闭页面后无法再查看。\n\n格式示例：ghp_A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7'
  },
  {
    title: '粘贴到导入框',
    desc: '关闭引导面板，将复制的 Token 粘贴到上方「GitHub Token」输入框，点击导入即可。',
    link: '',
    linkText: '',
    code: ''
  }
]

const curlScript = `curl -s -H "Authorization: token YOUR_TOKEN" https://api.github.com/user`

function openGuide() {
  guideStep.value = 0
  guideVisible.value = true
}

function nextStep() {
  if (guideStep.value < guideSteps.length - 1) {
    guideStep.value++
  } else {
    guideVisible.value = false
  }
}

function prevStep() {
  if (guideStep.value > 0) guideStep.value--
}

function copyCode(code: string) {
  navigator.clipboard.writeText(code).then(() => {
    ElMessage.success('已复制到剪贴板')
  }).catch(() => {
    ElMessage.warning('复制失败，请手动选择复制')
  })
}

function openLink(url: string) {
  window.open(url, '_blank')
}

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
          <el-button :icon="QuestionFilled" @click="openGuide">如何获取 Token？</el-button>
          <el-button :icon="Refresh" @click="batchCheck">批量检测</el-button>
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
            <el-button size="small" @click="router.push(`/accounts/${row.id}`)">详情</el-button>
            <el-button size="small" type="primary" plain @click="checkStatus(row.id)">检测</el-button>
            <el-button size="small" type="danger" plain @click="remove(row.id, row.github_login)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 空状态引导 -->
      <el-empty v-if="!loading && accounts.length === 0" description="还没有导入任何账户">
        <template #image>
          <el-icon :size="56" color="var(--text-tertiary)"><UserFilled /></el-icon>
        </template>
        <div class="empty-actions">
          <el-button type="primary" :icon="Plus" @click="openImport">导入第一个账户</el-button>
          <el-button :icon="QuestionFilled" @click="openGuide">不知道怎么获取 Token？</el-button>
        </div>
      </el-empty>
    </el-card>

    <!-- 导入对话框 -->
    <el-dialog v-model="importVisible" title="导入 GitHub 账户" width="540px" class="import-dialog">
      <div class="import-guide-hint" @click="openGuide">
        <el-icon><QuestionFilled /></el-icon>
        <span>不知道怎么获取 Token？点击查看详细图文引导</span>
        <el-icon class="arrow"><ArrowRightBold /></el-icon>
      </div>

      <el-form ref="importRef" :model="importForm" :rules="rules" label-position="top">
        <el-form-item label="GitHub Token（必填）" prop="token">
          <el-input v-model="importForm.token" type="password" show-password placeholder="ghp_xxx 或 github_pat_xxx" size="large" />
          <div class="field-hint">
            <span>需包含 scope: </span>
            <el-tag size="small" class="scope-chip">repo</el-tag>
            <el-tag size="small" class="scope-chip">workflow</el-tag>
            <el-tag size="small" class="scope-chip">read:user</el-tag>
            <a href="https://github.com/settings/tokens/new?scopes=repo,workflow,read:user" target="_blank" class="quick-link">一键创建 →</a>
          </div>
        </el-form-item>
        <el-form-item label="账户密码（选填）" class="mt-16">
          <el-input v-model="importForm.password" type="password" show-password placeholder="GitHub 账户登录密码" />
        </el-form-item>
        <el-form-item label="密保邮箱（选填）">
          <el-input v-model="importForm.recovery_email" placeholder="recovery@example.com" />
        </el-form-item>
        <el-form-item label="备注（选填）">
          <el-input v-model="importForm.note" type="textarea" :rows="2" placeholder="自定义备注，如「主账户」" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="importVisible = false">取消</el-button>
        <el-button type="primary" :loading="importing" @click="doImport">导入</el-button>
      </template>
    </el-dialog>

    <!-- 引导面板 -->
    <el-dialog v-model="guideVisible" title="获取 GitHub Token 引导" width="600px" class="guide-dialog">
      <div class="guide-content">
        <!-- 步骤指示器 -->
        <div class="guide-steps-bar">
          <div
            v-for="(step, i) in guideSteps"
            :key="i"
            class="gs-dot"
            :class="{ active: guideStep === i, done: guideStep > i }"
          >
            <span v-if="guideStep > i">✓</span>
            <span v-else>{{ i + 1 }}</span>
          </div>
          <div class="gs-line" :style="{ width: (guideStep / (guideSteps.length - 1)) * 100 + '%' }"></div>
        </div>

        <!-- 当前步骤内容 -->
        <div class="guide-step-content anim-fade-up" :key="guideStep">
          <div class="gsc-header">
            <span class="gsc-num">{{ guideStep + 1 }}</span>
            <h3>{{ guideSteps[guideStep].title }}</h3>
          </div>
          <p class="gsc-desc">{{ guideSteps[guideStep].desc }}</p>

          <!-- 外链按钮 -->
          <div v-if="guideSteps[guideStep].link" class="gsc-link-btn" @click="openLink(guideSteps[guideStep].link)">
            <el-icon><Link /></el-icon>
            <span>{{ guideSteps[guideStep].linkText }}</span>
          </div>

          <!-- 代码块 -->
          <div v-if="guideSteps[guideStep].code" class="gsc-code-block">
            <div class="code-head">
              <span>提示内容</span>
              <button class="copy-btn" @click="copyCode(guideSteps[guideStep].code)">
                <el-icon><CopyDocument /></el-icon> 复制
              </button>
            </div>
            <pre>{{ guideSteps[guideStep].code }}</pre>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="guide-footer">
          <el-button v-if="guideStep > 0" @click="prevStep">上一步</el-button>
          <span class="step-info">{{ guideStep + 1 }} / {{ guideSteps.length }}</span>
          <el-button v-if="guideStep < guideSteps.length - 1" type="primary" @click="nextStep">下一步</el-button>
          <el-button v-else type="primary" @click="guideVisible = false; importVisible = true">开始导入</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.toolbar { padding: 4px 0 16px; }
.toolbar .count {
  color: var(--text-tertiary); font-size: 13px; font-weight: 500;
  background: var(--surface-3); padding: 4px 12px; border-radius: 100px;
}
.acc-cell { display: flex; align-items: center; gap: 10px; }
.acc-login { font-weight: 600; color: var(--text-primary); font-size: 14px; }
.acc-name { font-size: 12px; color: var(--text-tertiary); margin-top: 1px; }
.token-mask {
  font-size: 12px; color: var(--text-secondary);
  background: var(--surface-3); padding: 2px 8px; border-radius: var(--radius-ctrl);
}

// 空状态
.empty-actions { display: flex; gap: 10px; justify-content: center; }

// 导入对话框内的引导入口
.import-guide-hint {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 14px; margin-bottom: 16px;
  background: var(--primary-light); border: 1px solid var(--border);
  border-radius: var(--radius-ctrl);
  color: var(--primary); font-size: 13px; font-weight: 500;
  cursor: pointer; transition: all 0.15s ease;
  &:hover { background: var(--surface-hover); }
  .arrow { margin-left: auto; }
}

// Token 字段提示
.field-hint {
  display: flex; align-items: center; flex-wrap: wrap; gap: 4px;
  margin-top: 6px; font-size: 12px; color: var(--text-tertiary);
}
.scope-chip { margin: 0 2px; }
.quick-link { margin-left: 8px; color: var(--primary); font-weight: 600; }

// 引导对话框
.guide-content { min-height: 280px; }

// 步骤指示器
.guide-steps-bar {
  position: relative; display: flex; justify-content: space-between;
  margin-bottom: 28px; padding: 0 20px;
}
.gs-line {
  position: absolute; top: 16px; left: 36px; height: 2px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0; border-radius: 2px;
}
.gs-dot {
  position: relative; z-index: 1;
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--surface-3); border: 2px solid var(--border);
  color: var(--text-tertiary); font-size: 13px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.3s ease;
  &.active {
    background: var(--primary); border-color: var(--primary); color: #fff;
    box-shadow: 0 0 0 4px var(--primary-light);
  }
  &.done {
    background: var(--primary); border-color: var(--primary); color: #fff;
  }
}

// 步骤内容
.guide-step-content {
  min-height: 200px;
}
.gsc-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.gsc-num {
  width: 24px; height: 24px; border-radius: 50%;
  background: var(--primary-light); color: var(--primary);
  font-size: 12px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
.gsc-header h3 { margin: 0; font-size: 16px; font-weight: 700; color: var(--text-primary); }
.gsc-desc { font-size: 14px; line-height: 1.6; color: var(--text-secondary); margin: 0 0 16px; }

// 外链按钮
.gsc-link-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 10px 16px; margin-bottom: 14px;
  background: var(--primary); color: #fff;
  border-radius: var(--radius-ctrl); font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.15s ease;
  &:hover { filter: brightness(1.1); }
}

// 代码块
.gsc-code-block {
  border-radius: var(--radius-ctrl); overflow: hidden;
  border: 1px solid var(--border);
}
.code-head {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 14px; background: var(--surface-3);
  font-size: 12px; color: var(--text-tertiary);
}
.copy-btn {
  display: flex; align-items: center; gap: 4px;
  border: none; background: var(--surface-hover); color: var(--primary);
  padding: 3px 10px; border-radius: var(--radius-ctrl);
  font-size: 11px; font-weight: 600; cursor: pointer;
  transition: all 0.12s ease;
  &:hover { filter: brightness(1.15); }
}
.gsc-code-block pre {
  margin: 0; padding: 14px; background: rgba(10, 14, 26, 0.85);
  color: #c8d3f0; font-size: 12px; line-height: 1.7; overflow-x: auto;
  font-family: 'Cascadia Code', Consolas, monospace;
  white-space: pre-wrap; word-break: break-all;
}

// 引导底部
.guide-footer {
  display: flex; align-items: center; justify-content: space-between; width: 100%;
}
.step-info { font-size: 13px; color: var(--text-tertiary); font-weight: 600; }
</style>
