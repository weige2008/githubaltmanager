<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

const router = useRouter()
const app = useAppStore()

const features = [
  { icon: 'Lock', title: 'AES-256-GCM 加密', desc: 'Token、密码、邮箱全部加密存储，主密码用 Argon2id 派生密钥，连数据库泄露也无法解密。', color: '#0078d4' },
  { icon: 'WarningFilled', title: '多方案封禁检测', desc: '并发调用 GitHub API + 网页主页 + token 验证三方案，任一命中即标记封禁，详情可追溯。', color: '#c50f1f' },
  { icon: 'FolderOpened', title: '仓库浏览与编辑', desc: '拉取 Token 可见的所有仓库，在线浏览文件树、编辑文本文件并提交，自动处理 SHA。', color: '#107c41' },
  { icon: 'Operation', title: 'Action 自动扫描', desc: '自动识别账户下所有仓库的 workflow，集中展示状态与最近运行结果。', color: '#8b5cf6' },
  { icon: 'AlarmClock', title: '定时执行', desc: '用 cron 表达式定时触发 workflow_dispatch，后端持续运行，关闭浏览器也不影响。', color: '#c19c00' },
  { icon: 'Promotion', title: '批量操作', desc: '批量给多个仓库创建同一 workflow、批量触发 dispatch，效率倍增。', color: '#0099bc' }
]

const stats = [
  { value: '5', label: '支持平台', suffix: '种' },
  { value: '6', label: 'MB 内存占用', suffix: 'MB' },
  { value: '33', label: 'API 接口', suffix: '个' },
  { value: '100', label: '开源免费', suffix: '%' }
]

function goEnter() {
  if (app.isLoggedIn) router.push('/dashboard')
  else router.push('/login')
}
function goGithub() {
  window.open('https://github.com/weige2008/githubaltmanager', '_blank')
}
</script>

<template>
  <div class="landing">
    <!-- 顶部导航 -->
    <header class="nav">
      <div class="nav-inner">
        <div class="brand">
          <img src="/favicon.svg" alt="logo" />
          <span>GitHub 账户管理器</span>
        </div>
        <nav class="nav-links">
          <a href="#features">功能</a>
          <a href="#deploy">部署</a>
          <a href="https://github.com/weige2008/githubaltmanager" target="_blank">文档</a>
        </nav>
        <el-button type="primary" round @click="goEnter">
          {{ app.isLoggedIn ? '进入控制台' : '立即登录' }}
          <el-icon style="margin-left:4px"><ArrowRightBold /></el-icon>
        </el-button>
      </div>
    </header>

    <!-- Hero 区 -->
    <section class="hero">
      <div class="hero-content">
        <div class="badge glass-card-2">
          <span class="dot"></span>
          v1.0.0 · Fluent 2 设计语言 · 单文件部署
        </div>
        <h1>让 GitHub 账户管理<br /><span class="gradient-text">轻盈而强大</span></h1>
        <p class="subtitle">
          一个现代的、原生体验的 GitHub 多账户管理中枢。Token 加密导入、封禁检测、
          仓库浏览、Action 定时执行与批量创建——全部装进一个 18MB 的可执行文件。
        </p>
        <div class="hero-cta">
          <el-button type="primary" size="large" round @click="goEnter">
            <el-icon style="margin-right:6px"><Monitor /></el-icon>
            {{ app.isLoggedIn ? '进入控制台' : '开始使用' }}
          </el-button>
          <el-button size="large" round @click="goGithub">
            <el-icon style="margin-right:6px"><Link /></el-icon>
            查看源码
          </el-button>
        </div>

        <!-- 数据条 -->
        <div class="stats-bar glass-card hover-lift">
          <div v-for="s in stats" :key="s.label" class="stat-item">
            <div class="stat-value">{{ s.value }}<span class="suffix">{{ s.suffix }}</span></div>
            <div class="stat-label">{{ s.label }}</div>
          </div>
        </div>
      </div>

      <!-- 右侧视觉装饰：模拟控制台卡片 -->
      <div class="hero-visual">
        <div class="mock-card glass-card hover-lift">
          <div class="mock-titlebar">
            <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
            <span class="mock-path">githubaltmanager · 控制台</span>
          </div>
          <div class="mock-body">
            <div class="mock-row">
              <div class="mock-avatar">W</div>
              <div>
                <div class="mock-line w-60">weige2008</div>
                <div class="mock-line w-40 muted-text">正常 · Token 有效</div>
              </div>
              <span class="mock-tag green">active</span>
            </div>
            <div class="mock-row">
              <div class="mock-avatar alt">A</div>
              <div>
                <div class="mock-line w-50">alt-account-01</div>
                <div class="mock-line w-30 muted-text">封禁 · 已检测</div>
              </div>
              <span class="mock-tag red">banned</span>
            </div>
            <div class="mock-chart">
              <div class="bar" v-for="n in 7" :key="n" :style="{ height: 20 + ((n * 17) % 60) + 'px' }"></div>
            </div>
          </div>
        </div>
        <div class="mock-float mock-float-1 glass-card"></div>
        <div class="mock-float mock-float-2 glass-card"></div>
      </div>
    </section>

    <!-- 功能特性 -->
    <section id="features" class="section">
      <h2 class="section-title">为效率而生的六大能力</h2>
      <p class="section-sub">从加密导入到批量执行，覆盖 GitHub 账户管理的完整工作流</p>
      <div class="feature-grid">
        <div v-for="f in features" :key="f.title" class="feature-card glass-card hover-lift">
          <div class="feature-icon" :style="{ background: f.color + '1a', color: f.color }">
            <el-icon :size="26"><component :is="f.icon" /></el-icon>
          </div>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 部署区 -->
    <section id="deploy" class="section">
      <h2 class="section-title">三秒部署，到处运行</h2>
      <p class="section-sub">单文件二进制，无需 Node.js / 数据库 / Web 服务器，下载即用</p>
      <div class="deploy-grid">
        <div class="deploy-card glass-card hover-lift">
          <div class="deploy-no">1</div>
          <h3>Linux / macOS</h3>
          <pre class="code-block">curl -fsSL https://raw.githubusercontent.com/<br />weige2008/githubaltmanager/main/deploy.sh <br />-o deploy.sh && bash deploy.sh</pre>
        </div>
        <div class="deploy-card glass-card hover-lift">
          <div class="deploy-no">2</div>
          <h3>Windows</h3>
          <pre class="code-block">Invoke-WebRequest https://raw.githubusercontent.com/<br />weige2008/githubaltmanager/main/deploy.ps1 <br />-OutFile deploy.ps1<br />powershell -File deploy.ps1</pre>
        </div>
        <div class="deploy-card glass-card hover-lift">
          <div class="deploy-no">3</div>
          <h3>Docker</h3>
          <pre class="code-block">git clone https://github.com/<br />weige2008/githubaltmanager.git<br />cd githubaltmanager<br />docker compose up -d</pre>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="cta-card glass-card">
        <h2>准备好接管你的 GitHub 账户了吗？</h2>
        <p>立即登录，体验系统级原生质感的账户管理中枢</p>
        <el-button type="primary" size="large" round @click="goEnter">
          进入控制台
          <el-icon style="margin-left:6px"><ArrowRightBold /></el-icon>
        </el-button>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="brand small">
          <img src="/favicon.svg" alt="logo" />
          <span>GitHub Alt Manager</span>
        </div>
        <div class="footer-links">
          <a href="https://github.com/weige2008/githubaltmanager" target="_blank">GitHub</a>
          <a href="https://github.com/weige2008/githubaltmanager/releases" target="_blank">Releases</a>
          <a href="https://github.com/weige2008/githubaltmanager/blob/main/README.md" target="_blank">文档</a>
          <a href="https://github.com/weige2008/githubaltmanager/blob/main/LICENSE" target="_blank">MIT License</a>
        </div>
        <div class="copyright">© 2026 weige2008 · Built with Go + Vue 3</div>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.landing { min-height: 100vh; overflow-x: hidden; }

// 顶部导航
.nav {
  position: sticky; top: 0; z-index: 50;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(30px) saturate(160%);
  -webkit-backdrop-filter: blur(30px) saturate(160%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.7);
}
.nav-inner {
  max-width: 1280px; margin: 0 auto; padding: 14px 32px;
  display: flex; align-items: center; justify-content: space-between; gap: 24px;
}
.brand {
  display: flex; align-items: center; gap: 10px;
  font-weight: 700; font-size: 16px; color: var(--text-primary);
  img { width: 28px; height: 28px; }
  &.small { font-size: 14px; img { width: 22px; height: 22px; } }
}
.nav-links {
  display: flex; gap: 28px; margin-right: auto; margin-left: 40px;
  a { color: var(--text-secondary); font-weight: 500; font-size: 14px;
      &:hover { color: var(--fluent-primary); } }
}

// Hero
.hero {
  max-width: 1280px; margin: 0 auto; padding: 80px 32px 60px;
  display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center;
}
.badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 14px; border-radius: 100px; font-size: 12px;
  color: var(--text-secondary); margin-bottom: 24px;
  .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--status-success);
         box-shadow: 0 0 0 3px rgba(16, 124, 65, 0.15); }
}
h1 {
  font-size: 56px; line-height: 1.1; font-weight: 800; margin: 0 0 24px;
  letter-spacing: -1.5px; color: var(--text-primary);
}
.gradient-text {
  background: linear-gradient(120deg, #0078d4 0%, #4cc2ff 50%, #8b5cf6 100%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}
.subtitle {
  font-size: 18px; line-height: 1.65; color: var(--text-secondary);
  max-width: 540px; margin: 0 0 36px;
}
.hero-cta { display: flex; gap: 14px; margin-bottom: 48px; }

// 数据条
.stats-bar {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; padding: 22px 32px;
}
.stat-item { text-align: center; }
.stat-value { font-size: 30px; font-weight: 800; color: var(--fluent-primary);
  .suffix { font-size: 16px; color: var(--text-tertiary); margin-left: 2px; } }
.stat-label { font-size: 12px; color: var(--text-tertiary); margin-top: 2px; }

// 右侧视觉
.hero-visual { position: relative; min-height: 420px; }
.mock-card {
  position: relative; z-index: 3; border-radius: var(--radius-lg);
  overflow: hidden; transform: perspective(1000px) rotateY(-6deg) rotateX(2deg);
}
.mock-titlebar {
  display: flex; align-items: center; gap: 8px; padding: 12px 16px;
  background: rgba(255, 255, 255, 0.5); border-bottom: 1px solid rgba(0,0,0,0.05);
  .dot { width: 12px; height: 12px; border-radius: 50%; }
  .dot.red { background: #ff5f57; } .dot.yellow { background: #febc2e; } .dot.green { background: #28c840; }
  .mock-path { margin-left: 12px; font-size: 12px; color: var(--text-tertiary); font-family: 'Cascadia Code', monospace; }
}
.mock-body { padding: 18px; display: flex; flex-direction: column; gap: 14px; }
.mock-row {
  display: flex; align-items: center; gap: 12px; padding: 10px 12px;
  background: rgba(255, 255, 255, 0.4); border-radius: var(--radius-md);
}
.mock-avatar {
  width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg, #4cc2ff, #0078d4); color: #fff;
  display: flex; align-items: center; justify-content: center; font-weight: 700;
  &.alt { background: linear-gradient(135deg, #f09, #933); }
}
.mock-line { height: 10px; border-radius: 4px; background: rgba(0,0,0,0.1); margin-bottom: 6px; }
.mock-line.w-60 { width: 60%; } .mock-line.w-50 { width: 50%; }
.mock-line.w-40 { width: 40%; } .mock-line.w-30 { width: 30%; }
.muted-text { background: rgba(0,0,0,0.06); }
.mock-tag {
  margin-left: auto; padding: 3px 10px; border-radius: 100px; font-size: 11px; font-weight: 600;
  &.green { background: rgba(16, 124, 65, 0.15); color: var(--status-success); }
  &.red { background: rgba(197, 15, 31, 0.12); color: var(--status-danger); }
}
.mock-chart { display: flex; align-items: flex-end; gap: 8px; padding: 12px 8px 4px; height: 90px; }
.bar {
  flex: 1; border-radius: 4px 4px 2px 2px;
  background: linear-gradient(180deg, rgba(76,194,255,0.6), rgba(0,120,212,0.4));
}
.mock-float {
  position: absolute; z-index: 2;
  &.mock-float-1 { width: 80px; height: 80px; right: -10px; top: 30px;
    background: linear-gradient(135deg, rgba(76,194,255,0.5), rgba(0,120,212,0.3)); }
  &.mock-float-2 { width: 60px; height: 60px; left: -20px; bottom: 40px;
    background: linear-gradient(135deg, rgba(139,92,246,0.4), rgba(76,194,255,0.3)); }
}

// 通用 section
.section { max-width: 1280px; margin: 0 auto; padding: 80px 32px; }
.section-title {
  text-align: center; font-size: 38px; font-weight: 800; margin: 0 0 14px;
  letter-spacing: -0.8px; color: var(--text-primary);
}
.section-sub {
  text-align: center; font-size: 17px; color: var(--text-secondary);
  max-width: 640px; margin: 0 auto 56px;
}

// 功能卡片
.feature-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px;
}
.feature-card {
  padding: 32px 28px; border-radius: var(--radius-lg);
  h3 { font-size: 19px; font-weight: 700; margin: 18px 0 10px; color: var(--text-primary); }
  p { font-size: 14px; line-height: 1.7; color: var(--text-secondary); margin: 0; }
}
.feature-icon {
  width: 56px; height: 56px; border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center;
}

// 部署
.deploy-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.deploy-card {
  padding: 30px 28px; position: relative;
  h3 { font-size: 18px; font-weight: 700; margin: 16px 0 16px; color: var(--text-primary); }
}
.deploy-no {
  width: 36px; height: 36px; border-radius: 50%;
  background: linear-gradient(135deg, #4cc2ff, #0078d4); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 16px;
  box-shadow: 0 4px 12px rgba(0, 120, 212, 0.3);
}
.code-block {
  background: rgba(10, 20, 50, 0.88); color: #e3e9f5;
  padding: 16px 18px; border-radius: var(--radius-md);
  font-family: 'Cascadia Code', 'JetBrains Mono', Consolas, monospace;
  font-size: 12.5px; line-height: 1.7; margin: 0; overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

// CTA
.cta-section { max-width: 1280px; margin: 0 auto; padding: 40px 32px 100px; }
.cta-card {
  padding: 64px 40px; text-align: center; border-radius: var(--radius-xl);
  background: linear-gradient(135deg, rgba(0,120,212,0.08), rgba(139,92,246,0.06)),
              var(--glass-bg-1);
  h2 { font-size: 32px; font-weight: 800; margin: 0 0 12px; color: var(--text-primary); }
  p { font-size: 16px; color: var(--text-secondary); margin: 0 0 28px; }
}

// 页脚
.footer {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
}
.footer-inner {
  max-width: 1280px; margin: 0 auto; padding: 28px 32px;
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;
}
.footer-links { display: flex; gap: 24px;
  a { color: var(--text-secondary); font-size: 13px; &:hover { color: var(--fluent-primary); } }
}
.copyright { font-size: 12px; color: var(--text-tertiary); }

// 响应式
@media (max-width: 1024px) {
  .hero { grid-template-columns: 1fr; gap: 40px; padding: 50px 24px 40px; }
  .hero-visual { min-height: 360px; }
  h1 { font-size: 42px; }
  .feature-grid, .deploy-grid { grid-template-columns: repeat(2, 1fr); }
  .nav-links { display: none; }
}
@media (max-width: 640px) {
  h1 { font-size: 34px; }
  .section-title { font-size: 28px; }
  .feature-grid, .deploy-grid { grid-template-columns: 1fr; }
  .stats-bar { grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .hero-cta { flex-direction: column; }
  .footer-inner { flex-direction: column; text-align: center; }
}
</style>
