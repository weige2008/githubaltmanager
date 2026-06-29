<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import ThemeSwitch from '@/components/ThemeSwitch.vue'

const router = useRouter()
const app = useAppStore()

const features = [
  { icon: 'Lock', title: 'AES-256 加密', desc: 'Token、密码、邮箱全部加密存储，主密码用 Argon2id 派生密钥。', color: '#005fb8' },
  { icon: 'WarningFilled', title: '封禁检测', desc: '并发调用 GitHub API + 网页主页 + token 验证三方案检测。', color: '#c42b1c' },
  { icon: 'FolderOpened', title: '仓库浏览', desc: '拉取 Token 可见所有仓库，在线浏览文件树、编辑文件并提交。', color: '#107c41' },
  { icon: 'Operation', title: 'Action 扫描', desc: '自动识别账户下所有仓库的 workflow，集中展示状态。', color: '#8b5cf6' },
  { icon: 'AlarmClock', title: '定时执行', desc: 'cron 定时触发 workflow_dispatch，后端持续运行。', color: '#92700c' },
  { icon: 'Promotion', title: '批量操作', desc: '批量给多仓库创建 workflow、批量触发 dispatch。', color: '#0099bc' }
]

const stats = [
  { value: '18', suffix: 'MB', label: '单文件体积' },
  { value: '6', suffix: 'MB', label: '内存占用' },
  { value: '5', suffix: '平台', label: '跨平台支持' },
  { value: '0', suffix: '依赖', label: '无需外部组件' }
]

const deploys = [
  { os: 'Linux / macOS', icon: 'Monitor', code: '$ curl -fsSL https://raw.githubusercontent.com\n/weige2008/githubaltmanager/main/deploy.sh\n-o deploy.sh && bash deploy.sh' },
  { os: 'Windows', icon: 'Platform', code: '> Invoke-WebRequest https://raw.githubusercontent.com\n/weige2008/githubaltmanager/main/deploy.ps1\n-OutFile deploy.ps1\npowershell -File deploy.ps1' },
  { os: 'Docker', icon: 'Cpu', code: '$ docker compose up -d --build\n# 访问 http://localhost:8080' }
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
    <!-- 导航 -->
    <header class="nav">
      <div class="nav-inner">
        <div class="brand">
          <img src="/favicon.svg" alt="logo" />
          <span>GitHub 管理器</span>
        </div>
        <nav class="nav-links">
          <a href="#features">功能</a>
          <a href="#deploy">部署</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div class="nav-right">
          <ThemeSwitch />
          <el-button type="primary" size="small" @click="goEnter">
            {{ app.isLoggedIn ? '控制台' : '登录' }}
          </el-button>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg-orbs">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
      </div>
      <div class="hero-inner">
        <div class="hero-left">
          <div class="badge anim-fade-up">
            <span class="badge-dot"></span>
            v1.0.0 · 双主题 · 单文件部署
          </div>
          <h1 class="anim-fade-up delay-1">让 GitHub 账户管理<br /><span class="grad-text">轻盈而强大</span></h1>
          <p class="subtitle anim-fade-up delay-2">
            现代、原生体验的多账户管理中枢。Token 加密导入、封禁检测、仓库浏览、
            Action 定时执行与批量创建——全部装进一个可执行文件。
          </p>
          <div class="hero-btns anim-fade-up delay-3">
            <el-button type="primary" size="large" @click="goEnter">
              <el-icon style="margin-right:4px"><Monitor /></el-icon>
              {{ app.isLoggedIn ? '进入控制台' : '开始使用' }}
            </el-button>
            <el-button size="large" @click="goGithub">
              <el-icon style="margin-right:4px"><Link /></el-icon>
              查看源码
            </el-button>
          </div>
        </div>

        <!-- 右侧模拟控制台 — 3D 倾斜 -->
        <div class="hero-right tilt-container anim-fade-scale delay-2">
          <div class="mock-window tilt-card">
            <div class="mock-titlebar">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
              <span class="mock-title">控制台预览</span>
            </div>
            <div class="mock-sidebar">
              <div class="ms-item active"></div>
              <div class="ms-item"></div>
              <div class="ms-item"></div>
              <div class="ms-item"></div>
            </div>
            <div class="mock-main">
              <div class="mock-cards">
                <div class="mock-card-skel" v-for="n in 3" :key="n">
                  <div class="skel-icon" :style="{ background: ['#005fb8','#107c41','#8b5cf6'][n-1] }"></div>
                  <div class="skel-lines">
                    <div class="skel-l1"></div>
                    <div class="skel-l2"></div>
                  </div>
                </div>
              </div>
              <div class="mock-chart">
                <div class="bar" v-for="n in 8" :key="n" :style="{ height: 15 + ((n * 23) % 50) + 'px' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 数据条 -->
      <div class="stats-bar anim-fade-up delay-4">
        <div v-for="(s, i) in stats" :key="s.label" class="stat-item" :style="{ animationDelay: 0.2 + i * 0.08 + 's' }">
          <span class="stat-val">{{ s.value }}</span>
          <span class="stat-unit">{{ s.suffix }}</span>
          <span class="stat-lbl">{{ s.label }}</span>
        </div>
      </div>
    </section>

    <!-- 功能 -->
    <section id="features" class="section">
      <div class="sec-head">
        <h2>六大核心能力</h2>
        <p>从加密导入到批量执行，覆盖 GitHub 账户管理的完整工作流</p>
      </div>
      <div class="feat-grid">
        <div
          v-for="(f, i) in features"
          :key="f.title"
          v-reveal="{ delay: i * 80 }"
          class="feat-card glass-card hover-lift"
        >
          <div class="feat-icon" :style="{ background: f.color + '18', color: f.color }">
            <el-icon :size="24"><component :is="f.icon" /></el-icon>
          </div>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 部署 -->
    <section id="deploy" class="section">
      <div class="sec-head">
        <h2>三秒部署，到处运行</h2>
        <p>单文件二进制，无需 Node.js / 数据库 / Web 服务器，下载即用</p>
      </div>
      <div class="deploy-grid">
        <div
          v-for="(d, i) in deploys"
          :key="d.os"
          v-reveal="{ delay: i * 100 }"
          class="deploy-card glass-card"
        >
          <div class="deploy-os">
            <el-icon :size="20"><component :is="d.icon" /></el-icon>
            <h3>{{ d.os }}</h3>
          </div>
          <pre>{{ d.code }}</pre>
        </div>
      </div>
    </section>

    <!-- 工作流时间线 -->
    <section id="workflow" class="section">
      <div class="sec-head">
        <h2>四步上手</h2>
        <p>从导入到自动化，简单几步接管所有 GitHub 账户</p>
      </div>
      <div class="timeline">
        <div class="timeline-line"></div>
        <div
          v-for="(step, i) in [
            { n: 1, title: '导入 Token', desc: '粘贴 GitHub Token，系统自动验证并加密存储', icon: 'Key' },
            { n: 2, title: '检测状态', desc: '多方案并发检测账户是否封禁', icon: 'View' },
            { n: 3, title: '扫描仓库', desc: '自动拉取所有仓库和 Action workflow', icon: 'Search' },
            { n: 4, title: '定时执行', desc: '设置 cron 定时触发或批量创建 Action', icon: 'AlarmClock' }
          ]"
          :key="step.n"
          v-reveal="{ delay: i * 120 }"
          class="timeline-step"
          :class="{ left: i % 2 === 0 }"
        >
          <div class="timeline-dot">
            <span>{{ step.n }}</span>
          </div>
          <div class="timeline-card glass-card">
            <div class="ts-icon">
              <el-icon :size="20"><component :is="step.icon" /></el-icon>
            </div>
            <div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section">
      <div class="cta-card glass-card" v-reveal>
        <h2>准备好接管你的 GitHub 账户了吗？</h2>
        <p>立即体验系统级原生质感的账户管理中枢</p>
        <el-button type="primary" size="large" @click="goEnter">
          进入控制台
          <el-icon style="margin-left:4px"><ArrowRightBold /></el-icon>
        </el-button>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="brand">
          <img src="/favicon.svg" alt="logo" />
          <span>GitHub Alt Manager</span>
        </div>
        <div class="footer-links">
          <a href="https://github.com/weige2008/githubaltmanager" target="_blank">GitHub</a>
          <a href="https://github.com/weige2008/githubaltmanager/releases" target="_blank">Releases</a>
          <a href="https://github.com/weige2008/githubaltmanager/blob/main/README.md" target="_blank">文档</a>
        </div>
        <span class="copyright">© 2026 weige2008 · MIT License</span>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.landing { min-height: 100vh; overflow-x: hidden; }

// 导航
.nav {
  position: sticky; top: 0; z-index: 50;
  background: var(--topbar-bg, var(--surface));
  backdrop-filter: blur(var(--blur)) saturate(var(--blur-sat));
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  max-width: 1140px; margin: 0 auto; padding: 0 24px;
  height: 56px; display: flex; align-items: center; gap: 16px;
}
.brand {
  display: flex; align-items: center; gap: 8px;
  font-weight: 700; font-size: 15px; color: var(--text-primary);
  img { width: 24px; height: 24px; }
}
.nav-links {
  display: flex; gap: 28px; margin-left: auto;
  a { color: var(--text-secondary); font-size: 14px; font-weight: 500; transition: color 0.15s;
      &:hover { color: var(--primary); } }
}
.nav-right { display: flex; align-items: center; gap: 10px; }

// Hero
.hero {
  position: relative; overflow: hidden;
  padding: 0 24px;
}
.hero-bg-orbs {
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
}
.orb {
  position: absolute; border-radius: 50%; filter: blur(70px); opacity: 0.6;
}
.orb-1 { width: 360px; height: 360px; top: -60px; right: 10%;
  background: radial-gradient(circle, var(--primary), transparent 70%); }
.orb-2 { width: 320px; height: 320px; bottom: -40px; left: 5%;
  background: radial-gradient(circle, var(--accent), transparent 70%); }

.hero-inner {
  position: relative; z-index: 1; max-width: 1140px; margin: 0 auto;
  padding: 64px 0 32px;
  display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;
}
.badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 500;
  background: var(--surface-2); border: 1px solid var(--border);
  color: var(--text-secondary); margin-bottom: 20px;
}
.badge-dot {
  width: 6px; height: 6px; border-radius: 50%; background: #2ea043;
  box-shadow: 0 0 0 3px rgba(46, 160, 67, 0.15);
}
h1 {
  font-size: 44px; line-height: 1.12; font-weight: 800; margin: 0 0 18px;
  letter-spacing: -1px; color: var(--text-primary);
}
.grad-text {
  background: linear-gradient(120deg, var(--primary), var(--accent));
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}
.subtitle {
  font-size: 16px; line-height: 1.65; color: var(--text-secondary);
  max-width: 480px; margin: 0 0 28px;
}
.hero-btns { display: flex; gap: 10px; }

// 模拟窗口
.hero-right { display: flex; justify-content: center; }
.mock-window {
  width: 100%; max-width: 440px; border-radius: var(--radius-card); overflow: hidden;
  background: var(--surface); backdrop-filter: blur(var(--blur)) saturate(var(--blur-sat));
  border: 1px solid var(--border); box-shadow: var(--shadow-flyout);
  display: grid; grid-template-columns: 48px 1fr; grid-template-rows: 32px 1fr;
}
.mock-titlebar {
  grid-column: 1 / -1; display: flex; align-items: center; gap: 6px; padding: 0 12px;
  background: var(--surface-3); border-bottom: 1px solid var(--border);
  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .dot.red { background: #ff5f57; } .dot.yellow { background: #febc2e; } .dot.green { background: #28c840; }
  .mock-title { margin-left: 8px; font-size: 11px; color: var(--text-tertiary); }
}
.mock-sidebar {
  background: var(--surface-3); border-right: 1px solid var(--border);
  padding: 8px 0; display: flex; flex-direction: column; gap: 4px; align-items: center;
  .ms-item {
    width: 28px; height: 28px; border-radius: var(--radius-ctrl);
    background: var(--surface-2);
    &.active { background: var(--primary-light); border: 1px solid var(--border); }
  }
}
.mock-main { padding: 14px; display: flex; flex-direction: column; gap: 12px; }
.mock-cards { display: flex; flex-direction: column; gap: 8px; }
.mock-card-skel { display: flex; align-items: center; gap: 10px; padding: 8px;
  background: var(--surface-3); border-radius: var(--radius-ctrl); }
.skel-icon { width: 28px; height: 28px; border-radius: 6px; flex-shrink: 0; opacity: 0.7; }
.skel-lines { flex: 1; }
.skel-l1 { height: 8px; border-radius: 4px; background: var(--border-strong); margin-bottom: 5px; width: 60%; }
.skel-l2 { height: 6px; border-radius: 3px; background: var(--border); width: 40%; }
.mock-chart { display: flex; align-items: flex-end; gap: 6px; height: 70px; padding: 4px 0; }
.bar { flex: 1; border-radius: 3px 3px 1px 1px; background: linear-gradient(180deg, var(--accent), var(--primary)); opacity: 0.5; }

// 数据条
.stats-bar {
  position: relative; z-index: 1; max-width: 1140px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
  padding: 0 0 48px;
}
.stat-item {
  text-align: center; padding: 16px;
  border-right: 1px solid var(--border);
  animation: fadeInUp 0.5s ease both;
  &:last-child { border-right: none; }
}
.stat-val { font-size: 28px; font-weight: 800; color: var(--text-primary); }
.stat-unit { font-size: 15px; color: var(--text-tertiary); margin-left: 2px; }
.stat-lbl { display: block; font-size: 12px; color: var(--text-tertiary); margin-top: 2px; }

// Section
.section { max-width: 1140px; margin: 0 auto; padding: 56px 24px; }
.sec-head { text-align: center; margin-bottom: 36px;
  h2 { font-size: 30px; font-weight: 800; margin: 0 0 8px; letter-spacing: -0.5px; color: var(--text-primary); }
  p { font-size: 15px; color: var(--text-secondary); margin: 0; }
}

// 功能卡片
.feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.feat-card {
  padding: 24px; border-radius: var(--radius-card);
  h3 { font-size: 16px; font-weight: 700; margin: 14px 0 6px; color: var(--text-primary); }
  p { font-size: 13px; line-height: 1.6; color: var(--text-secondary); margin: 0; }
}
.feat-icon {
  width: 44px; height: 44px; border-radius: var(--radius-card);
  display: flex; align-items: center; justify-content: center;
}

// 部署
.deploy-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.deploy-card {
  padding: 24px; border-radius: var(--radius-card);
}
.deploy-os {
  display: flex; align-items: center; gap: 8px; margin-bottom: 14px; color: var(--text-secondary);
  h3 { font-size: 15px; font-weight: 600; margin: 0; color: var(--text-primary); }
}
pre {
  background: rgba(10, 14, 26, 0.88); color: #c8d3f0;
  padding: 14px; border-radius: var(--radius-ctrl); margin: 0; overflow-x: auto;
  font-family: 'Cascadia Code', Consolas, monospace; font-size: 12px; line-height: 1.65;
  .prompt { color: var(--accent, #4cc2ff); font-weight: 700; }
  .comment { color: #6b7591; }
}

// CTA
.cta-section { padding-top: 24px; }
.cta-card {
  padding: 48px 32px; text-align: center; border-radius: var(--radius-card);
  background: linear-gradient(135deg, var(--primary-light), var(--surface));
  h2 { font-size: 26px; font-weight: 800; margin: 0 0 8px; color: var(--text-primary); }
  p { font-size: 15px; color: var(--text-secondary); margin: 0 0 24px; }
}

// 工作流时间线
.timeline {
  position: relative; max-width: 720px; margin: 0 auto; padding: 16px 0;
}
.timeline-line {
  position: absolute; left: 50%; top: 0; bottom: 0; width: 2px;
  background: linear-gradient(180deg, transparent, var(--primary), var(--accent), transparent);
  transform: translateX(-50%);
  opacity: 0.5;
}
.timeline-step {
  position: relative; width: 50%; padding: 16px 32px;
  &.left { text-align: right; }
  &:not(.left) { margin-left: 50%; }
}
.timeline-dot {
  position: absolute; top: 24px;
  width: 36px; height: 36px; border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 800;
  box-shadow: 0 0 20px rgba(0, 120, 212, 0.3), 0 0 0 4px var(--bg-base);
  z-index: 2;
}
.timeline-step.left .timeline-dot { right: -18px; }
.timeline-step:not(.left) .timeline-dot { left: -18px; }
.timeline-card {
  display: flex; align-items: center; gap: 14px; padding: 16px 18px; border-radius: var(--radius-card);
}
.ts-icon {
  width: 40px; height: 40px; border-radius: var(--radius-ctrl);
  background: var(--primary-light); color: var(--primary);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.timeline-step.left .ts-icon { order: 2; }
.timeline-card h3 { font-size: 15px; font-weight: 700; margin: 0 0 4px; color: var(--text-primary); }
.timeline-card p { font-size: 13px; color: var(--text-secondary); margin: 0; }
.timeline-step.left .timeline-card > div:last-child { text-align: right; }

// 页脚
.footer { border-top: 1px solid var(--border); margin-top: 24px; }
.footer-inner {
  max-width: 1140px; margin: 0 auto; padding: 24px;
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
}
.footer-links { display: flex; gap: 20px;
  a { color: var(--text-secondary); font-size: 13px; &:hover { color: var(--primary); } }
}
.copyright { font-size: 12px; color: var(--text-tertiary); }

@media (max-width: 900px) {
  .hero-inner { grid-template-columns: 1fr; gap: 32px; padding: 40px 0 24px; }
  h1 { font-size: 32px; }
  .feat-grid, .deploy-grid { grid-template-columns: 1fr; }
  .nav-links { display: none; }
  .stats-bar { grid-template-columns: repeat(2, 1fr); }
  .stat-item:nth-child(2) { border-right: none; }
  .footer-inner { flex-direction: column; text-align: center; }
  // 移动端时间线简化
  .timeline-line { left: 18px; }
  .timeline-step { width: 100%; padding: 12px 12px 12px 48px; text-align: left !important;
    &.left { text-align: left !important; } margin-left: 0 !important;
  }
  .timeline-step.left .timeline-dot { right: auto; left: 0; }
  .timeline-step:not(.left) .timeline-dot { left: 0; }
  .timeline-step.left .ts-icon { order: 0; }
  .timeline-step.left .timeline-card > div:last-child { text-align: left; }
  // 移动端关闭 3D 倾斜
  .tilt-card { transform: none !important; }
}
</style>
