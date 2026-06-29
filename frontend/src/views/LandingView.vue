<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import ThemeSwitch from '@/components/ThemeSwitch.vue'

const router = useRouter()
const app = useAppStore()

const features = [
  { icon: 'Lock', title: 'AES-256 加密', desc: 'Token、密码、邮箱全部加密存储，主密码用 Argon2id 派生密钥。', color: '#0078d4' },
  { icon: 'WarningFilled', title: '封禁检测', desc: '并发调用 GitHub API + 网页主页 + token 验证三方案检测。', color: '#e54d4d' },
  { icon: 'FolderOpened', title: '仓库浏览', desc: '拉取 Token 可见所有仓库，在线浏览文件树、编辑文件并提交。', color: '#2ea043' },
  { icon: 'Operation', title: 'Action 扫描', desc: '自动识别账户下所有仓库的 workflow，集中展示状态。', color: '#8b5cf6' },
  { icon: 'AlarmClock', title: '定时执行', desc: 'cron 定时触发 workflow_dispatch，后端持续运行。', color: '#c19c00' },
  { icon: 'Promotion', title: '批量操作', desc: '批量给多仓库创建 workflow、批量触发 dispatch。', color: '#0099bc' }
]

function goEnter() {
  router.push(app.isLoggedIn ? '/dashboard' : '/login')
}
function goGithub() {
  window.open('https://github.com/weige2008/githubaltmanager', '_blank')
}
</script>

<template>
  <div class="landing">
    <header class="nav">
      <div class="nav-inner">
        <div class="brand">
          <img src="/favicon.svg" alt="logo" />
          <span>GitHub 管理器</span>
        </div>
        <nav class="nav-links">
          <a href="#features">功能</a>
          <a href="#deploy">部署</a>
        </nav>
        <div class="nav-right">
          <ThemeSwitch />
          <el-button type="primary" round size="small" @click="goEnter">
            {{ app.isLoggedIn ? '控制台' : '登录' }}
          </el-button>
        </div>
      </div>
    </header>

    <section class="hero">
      <div class="hero-left">
        <div class="badge">
          <span class="badge-dot"></span>
          v1.0.0 · 双主题 · 单文件部署
        </div>
        <h1>让 GitHub 账户管理<br /><span class="grad-text">轻盈而强大</span></h1>
        <p class="subtitle">
          现代、原生体验的多账户管理中枢。Token 加密导入、封禁检测、仓库浏览、
          Action 定时执行与批量创建——全部装进一个可执行文件。
        </p>
        <div class="hero-btns">
          <el-button type="primary" size="large" round @click="goEnter">
            {{ app.isLoggedIn ? '进入控制台' : '开始使用' }}
          </el-button>
          <el-button size="large" round @click="goGithub">
            查看源码
          </el-button>
        </div>
      </div>
      <div class="hero-right">
        <div class="mock glass-card">
          <div class="mock-bar">
            <i></i><i></i><i></i>
            <span>控制台预览</span>
          </div>
          <div class="mock-content">
            <div class="mock-stat">
              <div class="ms-num">12</div>
              <div class="ms-label">账户总数</div>
            </div>
            <div class="mock-row" v-for="n in 3" :key="n">
              <div class="ms-avatar" :class="'a' + n">{{ String.fromCharCode(64 + n) }}</div>
              <div class="ms-info">
                <div class="ms-line" :style="{ width: 50 + n * 10 + '%' }"></div>
                <div class="ms-sub" :style="{ width: 30 + n * 5 + '%' }"></div>
              </div>
              <span class="ms-status" :class="n === 2 ? 'bad' : 'ok'">{{ n === 2 ? '封禁' : '正常' }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="section">
      <h2 class="sec-title">六大核心能力</h2>
      <div class="feat-grid">
        <div v-for="f in features" :key="f.title" class="feat-card glass-card hover-lift">
          <div class="feat-icon" :style="{ background: f.color + '20', color: f.color }">
            <el-icon :size="24"><component :is="f.icon" /></el-icon>
          </div>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <section id="deploy" class="section">
      <h2 class="sec-title">三秒部署，到处运行</h2>
      <div class="deploy-grid">
        <div class="deploy-card glass-card">
          <h3>Linux / macOS</h3>
          <pre>curl -fsSL https://raw.githubusercontent.com
/weige2008/githubaltmanager/main/deploy.sh
-o deploy.sh &amp;&amp; bash deploy.sh</pre>
        </div>
        <div class="deploy-card glass-card">
          <h3>Windows</h3>
          <pre>Invoke-WebRequest https://raw.githubusercontent.com
/weige2008/githubaltmanager/main/deploy.ps1
-OutFile deploy.ps1
powershell -File deploy.ps1</pre>
        </div>
        <div class="deploy-card glass-card">
          <h3>Docker</h3>
          <pre>docker compose up -d --build
# 访问 http://localhost:8080</pre>
        </div>
      </div>
    </section>

    <footer class="footer">
      <span>© 2026 weige2008 · MIT License · Built with Go + Vue 3</span>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.landing { min-height: 100vh; overflow-x: hidden; }

.nav {
  position: sticky; top: 0; z-index: 50;
  background: var(--topbar-bg, var(--surface));
  backdrop-filter: blur(var(--blur)) saturate(var(--blur-sat));
  border-bottom: 1px solid var(--sidebar-border, var(--border));
}
.nav-inner {
  max-width: 1200px; margin: 0 auto; padding: 12px 32px;
  display: flex; align-items: center; gap: 20px;
}
.brand {
  display: flex; align-items: center; gap: 8px;
  font-weight: 700; font-size: 15px; color: var(--text-primary);
  img { width: 24px; height: 24px; }
}
.nav-links {
  display: flex; gap: 24px; margin-left: auto;
  a { color: var(--text-secondary); font-size: 14px; font-weight: 500;
      &:hover { color: var(--primary); } }
}
.nav-right { display: flex; align-items: center; gap: 12px; }

.hero {
  max-width: 1200px; margin: 0 auto; padding: 80px 32px 60px;
  display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px;
  align-items: center;
}
.badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 12px; border-radius: var(--radius-ctrl); font-size: 12px;
  background: var(--surface-2); border: 1px solid var(--border);
  color: var(--text-secondary); margin-bottom: 20px;
}
.badge-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #2ea043; box-shadow: 0 0 0 3px rgba(46, 160, 67, 0.15);
}
h1 {
  font-size: 48px; line-height: 1.15; font-weight: 800; margin: 0 0 20px;
  letter-spacing: -1px; color: var(--text-primary);
}
.grad-text {
  background: linear-gradient(120deg, var(--primary), var(--accent));
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}
.subtitle {
  font-size: 17px; line-height: 1.6; color: var(--text-secondary);
  max-width: 500px; margin: 0 0 32px;
}
.hero-btns { display: flex; gap: 12px; }

.hero-right { display: flex; justify-content: center; }
.mock {
  width: 100%; max-width: 380px;
  border-radius: var(--radius-lg); overflow: hidden;
}
.mock-bar {
  display: flex; align-items: center; gap: 6px; padding: 10px 14px;
  background: var(--surface-3); border-bottom: 1px solid var(--surface-border-soft);
  i { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.2); }
  i:nth-child(1) { background: #ff5f57; } i:nth-child(2) { background: #febc2e; } i:nth-child(3) { background: #28c840; }
  span { margin-left: 10px; font-size: 11px; color: var(--text-tertiary); }
}
.mock-content { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.mock-stat {
  text-align: center; padding: 12px;
  background: var(--primary-light); border-radius: var(--radius-md);
}
.ms-num { font-size: 28px; font-weight: 800; color: var(--primary); }
.ms-label { font-size: 12px; color: var(--text-tertiary); }
.mock-row {
  display: flex; align-items: center; gap: 10px; padding: 8px 10px;
  background: var(--surface-3); border-radius: var(--radius-sm);
}
.ms-avatar {
  width: 30px; height: 30px; border-radius: 50%; color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700; flex-shrink: 0;
  &.a1 { background: linear-gradient(135deg, #4cc2ff, #0078d4); }
  &.a2 { background: linear-gradient(135deg, #ff8a8a, #c50f1f); }
  &.a3 { background: linear-gradient(135deg, #c4a8ff, #8b5cf6); }
}
.ms-info { flex: 1; }
.ms-line { height: 8px; border-radius: 4px; background: var(--surface-border); margin-bottom: 5px; }
.ms-sub { height: 6px; border-radius: 3px; background: var(--surface-border-soft); }
.ms-status {
  font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 100px;
  &.ok { background: rgba(46, 160, 67, 0.15); color: #2ea043; }
  &.bad { background: rgba(197, 15, 31, 0.15); color: #f87171; }
}

.section { max-width: 1200px; margin: 0 auto; padding: 60px 32px; }
.sec-title {
  text-align: center; font-size: 32px; font-weight: 800; margin: 0 0 40px;
  letter-spacing: -0.5px; color: var(--text-primary);
}

.feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.feat-card {
  padding: 24px 20px; border-radius: var(--radius-lg);
  h3 { font-size: 17px; font-weight: 700; margin: 14px 0 8px; color: var(--text-primary); }
  p { font-size: 13px; line-height: 1.6; color: var(--text-secondary); margin: 0; }
}
.feat-icon {
  width: 48px; height: 48px; border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center;
}

.deploy-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.deploy-card {
  padding: 24px; border-radius: var(--radius-lg);
  h3 { font-size: 16px; font-weight: 700; margin: 0 0 14px; color: var(--text-primary); }
  pre {
    background: rgba(10, 14, 26, 0.85); color: #c8d3f0;
    padding: 14px; border-radius: var(--radius-sm);
    font-size: 12px; line-height: 1.6; margin: 0; overflow-x: auto;
    font-family: 'Cascadia Code', Consolas, monospace;
  }
}

.footer {
  text-align: center; padding: 40px 32px;
  border-top: 1px solid var(--border);
  color: var(--text-tertiary); font-size: 13px;
}

@media (max-width: 900px) {
  .hero { grid-template-columns: 1fr; padding: 50px 20px 40px; }
  h1 { font-size: 34px; }
  .feat-grid, .deploy-grid { grid-template-columns: 1fr; }
  .nav-links { display: none; }
}
</style>
