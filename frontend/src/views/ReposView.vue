<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import { repoApi, type DirEntry, type FileContent, type Repo, type Workflow, type WorkflowInput } from '@/api/repo'
import { accountApi } from '@/api/account'

const route = useRoute()
const accLoading = ref(false)
const accounts = ref<{ id: number; github_login: string }[]>([])
const selectedAcc = ref<number | null>(null)
const repos = ref<Repo[]>([])
const selectedRepo = ref<number | null>(null)

const pathStack = ref<string[]>([])
const entries = ref<DirEntry[]>([])
const fileLoading = ref(false)
const currentFile = ref<FileContent | null>(null)
const editorText = ref('')
const commitMsg = ref('')
const saving = ref(false)
const workflows = ref<Workflow[]>([])
const wfVisible = ref(false)

const repoDetail = computed(() => repos.value.find((r) => r.id === selectedRepo.value))
const syncing = ref(false)

async function syncRepos() {
  if (!selectedAcc.value) return
  syncing.value = true
  try {
    const res = await repoApi.refreshRepos(selectedAcc.value)
    ElMessage.success(`同步完成：${res.total} 个仓库`)
    await loadRepos()
  } catch {
  } finally {
    syncing.value = false
  }
}

async function loadAccounts() {
  accLoading.value = true
  try {
    const list = await accountApi.list()
    accounts.value = list.map((a) => ({ id: a.id, github_login: a.github_login }))
    if (accounts.value.length && selectedAcc.value === null) {
      selectedAcc.value = accounts.value[0].id
    }
  } finally {
    accLoading.value = false
  }
}

async function loadRepos() {
  if (!selectedAcc.value) return
  repos.value = await repoApi.listByAccount(selectedAcc.value)
  if (route.query.rid) {
    const rid = Number(route.query.rid)
    if (repos.value.find((r) => r.id === rid)) selectedRepo.value = rid
  }
  if (!selectedRepo.value && repos.value.length) selectedRepo.value = repos.value[0].id
}

watch(selectedAcc, loadRepos)

async function loadDir() {
  if (!selectedRepo.value) return
  const path = pathStack.value.join('/')
  entries.value = await repoApi.listContents(selectedRepo.value, path)
  currentFile.value = null
  editorText.value = ''
}

watch(selectedRepo, async () => {
  pathStack.value = []
  await loadDir()
})

function clickEntry(e: DirEntry) {
  if (e.type === 'dir') {
    pathStack.value.push(e.name)
    loadDir()
  } else if (e.type === 'file') {
    openFile(e.path)
  }
}

function goUp(idx: number) {
  pathStack.value = pathStack.value.slice(0, idx)
  loadDir()
}

async function openFile(path: string) {
  if (!selectedRepo.value) return
  fileLoading.value = true
  try {
    const fc = await repoApi.getFile(selectedRepo.value, path)
    currentFile.value = fc
    if (fc.encoding === 'base64') {
      editorText.value = decodeBase64Utf8(fc.content)
    } else {
      editorText.value = fc.content
    }
    commitMsg.value = ''
  } finally {
    fileLoading.value = false
  }
}

function decodeBase64Utf8(b64: string): string {
  try {
    const bin = atob(b64.replace(/\n/g, ''))
    const bytes = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
    return new TextDecoder('utf-8').decode(bytes)
  } catch {
    return b64
  }
}

function encodeUtf8Base64(text: string): string {
  const bytes = new TextEncoder().encode(text)
  let bin = ''
  bytes.forEach((b) => (bin += String.fromCharCode(b)))
  return btoa(bin)
}

async function saveFile() {
  if (!selectedRepo.value || !currentFile.value) return
  if (!commitMsg.value) {
    ElMessage.warning('请填写 commit message')
    return
  }
  saving.value = true
  try {
    const content = encodeUtf8Base64(editorText.value)
    await repoApi.updateFile(selectedRepo.value, {
      path: currentFile.value.path,
      content,
      message: commitMsg.value,
      sha: currentFile.value.sha
    })
    ElMessage.success('已提交')
    openFile(currentFile.value.path)
  } finally {
    saving.value = false
  }
}

async function loadWorkflows() {
  if (!selectedRepo.value) return
  workflows.value = await repoApi.listWorkflows(selectedRepo.value)
  wfVisible.value = true
}

const dispatchLoading = ref(false)

async function dispatchWf(filename: string) {
  if (!selectedRepo.value) return
  dispatchLoading.value = true
  try {
    const res = await repoApi.getWorkflowInputs(selectedRepo.value, filename)
    const inputs = (res && res.inputs) || []
    if (inputs.length > 0) {
      openDispatchDialog(filename, inputs)
    } else {
      await repoApi.dispatchWorkflow(selectedRepo.value, { filename })
      ElMessage.success(`已触发 ${filename}`)
    }
  } catch (err: any) {
    // 获取参数失败，尝试直接触发
    try {
      await repoApi.dispatchWorkflow(selectedRepo.value, { filename })
      ElMessage.success(`已触发 ${filename}`)
    } catch (e: any) {
      const msg = e?.message || ''
      if (msg.includes('Required input') || msg.includes('422')) {
        // 确实需要参数，弹出手动输入
        ElMessage.warning('该 Workflow 需要参数，请手动填写')
        openDispatchDialog(filename, [])
      }
    }
  } finally {
    dispatchLoading.value = false
  }
}

// 参数触发对话框
const dispatchVisible = ref(false)
const dispatchTarget = ref('')
const dispatchParamDefs = ref<WorkflowInput[]>([])
const dispatchParamValues = ref<Record<string, string>>({})
const dispatching = ref(false)

function openDispatchDialog(filename: string, inputs: WorkflowInput[]) {
  dispatchTarget.value = filename
  dispatchParamDefs.value = inputs
  // 预填默认值
  const vals: Record<string, string> = {}
  for (const inp of inputs) {
    vals[inp.name] = inp.default || ''
  }
  dispatchParamValues.value = vals
  dispatchVisible.value = true
}

function openDispatchWithInputs(filename: string) {
  if (!selectedRepo.value) return
  dispatchWf(filename)
}

async function doDispatchWithInputs() {
  if (!selectedRepo.value || !dispatchTarget.value) return
  // 检查必填项
  for (const inp of dispatchParamDefs.value) {
    if (inp.required && !dispatchParamValues.value[inp.name]) {
      ElMessage.warning(`请填写必填参数: ${inp.name}`)
      return
    }
  }
  // 构造 inputs（只包含非空值）
  const inputs: Record<string, string> = {}
  for (const [k, v] of Object.entries(dispatchParamValues.value)) {
    if (v !== '') inputs[k] = v
  }
  dispatching.value = true
  try {
    await repoApi.dispatchWorkflow(selectedRepo.value, {
      filename: dispatchTarget.value,
      inputs: Object.keys(inputs).length > 0 ? inputs : undefined
    })
    ElMessage.success(`已触发 ${dispatchTarget.value}`)
    dispatchVisible.value = false
  } catch {} finally {
    dispatching.value = false
  }
}

const isTextFile = computed(() => {
  if (!currentFile.value) return false
  const p = currentFile.value.path.toLowerCase()
  return /\.(md|txt|ya?ml|json|js|ts|go|py|sh|html|css|xml|ini|toml|dockerfile|gitignore|env|conf)$/i.test(p) || /readme/i.test(p)
})

onMounted(loadAccounts)
</script>

<template>
  <div class="page-container">
    <el-card shadow="never" class="mb-16">
      <div class="flex items-center gap-12">
        <span>账户:</span>
        <el-select v-model="selectedAcc" placeholder="选择账户" style="width: 200px" :loading="accLoading">
          <el-option v-for="a in accounts" :key="a.id" :label="a.github_login" :value="a.id" />
        </el-select>
        <el-button size="small" :icon="Refresh" :loading="syncing" @click="syncRepos" :disabled="!selectedAcc">
          {{ syncing ? '同步中...' : '同步仓库' }}
        </el-button>
        <template v-if="repos.length > 0">
          <span>仓库:</span>
          <el-select v-model="selectedRepo" placeholder="选择仓库" style="width: 320px" filterable>
            <el-option v-for="r in repos" :key="r.id" :label="r.full_name" :value="r.id" />
          </el-select>
          <el-button size="small" @click="loadWorkflows" :disabled="!selectedRepo">Workflows</el-button>
          <a v-if="repoDetail" :href="repoDetail.html_url" target="_blank" class="gh-link">在 GitHub 打开 ↗</a>
        </template>
      </div>
      <!-- 空状态：仓库未同步 -->
      <div v-if="selectedAcc && repos.length === 0 && !syncing" class="empty-repos">
        <el-icon :size="32" color="var(--text-tertiary)"><FolderOpened /></el-icon>
        <p>该账户还没有同步过仓库</p>
        <el-button type="primary" size="small" :icon="Refresh" @click="syncRepos">立即同步</el-button>
      </div>
    </el-card>

    <el-row :gutter="16" v-if="selectedRepo">
      <el-col :xs="24" :md="9">
        <el-card shadow="never">
          <template #header>
            <div class="breadcrumb">
              <el-link :underline="false" @click="goUp(-1)">/</el-link>
              <template v-for="(seg, i) in pathStack" :key="i">
                <span class="sep">/</span>
                <el-link :underline="false" @click="goUp(i + 1)">{{ seg }}</el-link>
              </template>
            </div>
          </template>
          <div class="file-list" v-loading="fileLoading">
            <div
              v-for="e in entries"
              :key="e.sha"
              class="file-row"
              :class="{ dir: e.type === 'dir' }"
              @click="clickEntry(e)"
            >
              <el-icon><Folder v-if="e.type === 'dir'" /><Document v-else /></el-icon>
              <span class="fname">{{ e.name }}</span>
            </div>
            <el-empty v-if="entries.length === 0" description="空目录" :image-size="60" />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="15">
        <el-card shadow="never" v-loading="fileLoading">
          <template #header>
            <span v-if="currentFile">{{ currentFile.path }}</span>
            <span v-else class="muted">选择文件查看/编辑</span>
          </template>
          <template v-if="currentFile">
            <div v-if="!isTextFile" class="binary-tip">
              <el-alert type="info" :closable="false">该文件可能是二进制文件（{{ currentFile.size }} 字节），编辑可能不可用。</el-alert>
            </div>
            <el-input
              v-model="editorText"
              type="textarea"
              :rows="22"
              :input-style="{ fontFamily: 'Consolas, Monaco, monospace', fontSize: '13px' }"
              class="editor"
            />
            <div class="commit-bar flex items-center gap-8 mt-16">
              <el-input v-model="commitMsg" placeholder="commit message" style="flex: 1" />
              <el-button type="primary" :loading="saving" @click="saveFile">提交修改</el-button>
            </div>
          </template>
          <el-empty v-else description="点击左侧文件查看内容" :image-size="80" />
        </el-card>
      </el-col>
    </el-row>

    <el-dialog v-model="wfVisible" title="Workflows" width="640px">
      <el-table :data="workflows" stripe>
        <el-table-column label="文件" prop="filename" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.state === 'active' ? 'success' : 'info'" size="small">{{ row.state }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="最近运行" min-width="120">
          <template #default="{ row }">{{ row.last_run_status || '—' }}</template>
        </el-table-column>
        <el-table-column label="操作" width="90">
          <template #default="{ row }">
            <el-button size="small" type="primary" link :loading="dispatchLoading" @click="dispatchWf(row.filename)">触发</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 触发参数对话框（自动渲染表单） -->
    <el-dialog v-model="dispatchVisible" :title="`触发 ${dispatchTarget}`" width="540px">
      <div v-if="dispatchParamDefs.length === 0" class="muted">
        该 workflow 无需额外参数，直接点击触发即可。
      </div>
      <el-form v-else label-position="top">
        <el-form-item
          v-for="param in dispatchParamDefs"
          :key="param.name"
          :label="param.name + (param.required ? ' *' : '')"
        >
          <!-- choice 类型 → 下拉 -->
          <el-select
            v-if="param.type === 'choice' && param.options && param.options.length > 0"
            v-model="dispatchParamValues[param.name]"
            :placeholder="param.description || '请选择'"
            style="width: 100%"
          >
            <el-option v-for="opt in param.options" :key="opt" :label="opt" :value="opt" />
          </el-select>
          <!-- boolean 类型 → 开关 -->
          <el-switch
            v-else-if="param.type === 'boolean'"
            v-model="dispatchParamValues[param.name]"
            active-value="true"
            inactive-value="false"
          />
          <!-- 默认 → 文本输入 -->
          <el-input
            v-else
            v-model="dispatchParamValues[param.name]"
            :placeholder="param.description || param.default || '请输入'"
          />
          <div v-if="param.description" class="param-desc">{{ param.description }}</div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dispatchVisible = false">取消</el-button>
        <el-button type="primary" :loading="dispatching" @click="doDispatchWithInputs">触发</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.gh-link { color: var(--primary); font-size: 13px; font-weight: 500; }
.empty-repos {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 32px 16px; text-align: center;
  p { color: var(--text-tertiary); font-size: 13px; margin: 0; }
}
.breadcrumb { display: flex; align-items: center; flex-wrap: wrap; gap: 2px; }
.breadcrumb .sep { color: var(--text-tertiary); margin: 0 2px; }
.file-list { max-height: 480px; overflow-y: auto; }
.file-row {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 10px; cursor: pointer; border-radius: var(--radius-ctrl);
  transition: background 0.12s ease;
  &:hover { background: var(--primary-lighter); }
  &.dir .fname { font-weight: 600; color: var(--primary); }
}
.fname { font-size: 13px; color: var(--text-secondary); }
.muted { color: var(--text-tertiary); }
.editor :deep(textarea) { tab-size: 2; }
.commit-bar { margin-top: 12px; }
.param-desc { font-size: 12px; color: var(--text-tertiary); margin-top: 2px; }
</style>
