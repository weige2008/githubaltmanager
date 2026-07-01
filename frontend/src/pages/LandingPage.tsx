import { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { authApi } from '@/api'
import { useAppStore } from '@/store/app'
import { Button } from '@/components/ui/button'
import {
  Lock, Shield, Zap, Clock, Folder, Layers, Terminal, Activity, MemoryStick,
  Cpu, CheckCircle, ArrowRight, BookOpen, Github, KeyRound, FolderGit2, Settings,
  TrendingUp, Eye, Workflow, Server,
} from 'lucide-react'

// ===== Scroll-triggered fade up animation =====
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ===== IntersectionObserver counter =====
function Counter({ end, suffix = '', duration = 1600 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  const animate = useCallback(() => {
    const el = ref.current
    if (!el) return
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      el.textContent = `${Math.round(eased * end)}${suffix}`
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, suffix])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = `${end}${suffix}`
      return
    }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started.current) { started.current = true; animate(); obs.unobserve(el) } },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [animate, end, suffix])

  return <span ref={ref} className="tabular-nums">0{suffix}</span>
}

// ===== Hero terminal demo =====
function HeroTerminalDemo() {
  return (
    <div className="w-full rounded-xl border border-border/40 bg-card shadow-2xl overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border/40 bg-muted/30 px-4 py-3">
        <div className="h-3.5 w-3.5 rounded-full bg-red-400/70" />
        <div className="h-3.5 w-3.5 rounded-full bg-yellow-400/70" />
        <div className="h-3.5 w-3.5 rounded-full bg-green-400/70" />
        <span className="ml-2 text-xs font-medium text-muted-foreground">GAM Console</span>
      </div>
      <div className="space-y-3 p-5">
        {/* Stat row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '账户', value: '12', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: '正常', value: '10', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
            { label: '仓库', value: '48', icon: Folder, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          ].map((s) => { const Icon = s.icon; return (
            <div key={s.label} className={`flex items-center gap-2 rounded-lg ${s.bg} p-3`}>
              <Icon className={`h-4 w-4 ${s.color}`} />
              <div>
                <div className="text-lg font-bold leading-none">{s.value}</div>
                <div className="text-[10px] text-muted-foreground">{s.label}</div>
              </div>
            </div>
          )})}
        </div>

        {/* Account rows */}
        {[
          { status: '正常', color: 'text-green-500', bg: 'bg-green-500/10', progress: 85 },
          { status: '封禁', color: 'text-red-500', bg: 'bg-red-500/10', progress: 20 },
          { status: '正常', color: 'text-green-500', bg: 'bg-green-500/10', progress: 70 },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border border-border/30 bg-muted/15 p-3 transition-colors hover:bg-muted/30">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-xs font-bold text-white shadow" />
            <div className="flex-1 space-y-2">
              <div className="h-2.5 w-3/5 rounded bg-muted" />
              <div className="flex items-center gap-2">
                <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${row.bg} ${row.color}`}>{row.status}</span>
                <div className="h-1 flex-1 rounded-full bg-muted">
                  <div className="h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${row.progress}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Chart */}
        <div className="flex items-end gap-1.5 rounded-lg border border-border/30 bg-muted/15 p-3" style={{ height: 60 }}>
          {[40, 65, 30, 80, 55, 70, 45, 60, 35, 75].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-blue-500/50 to-purple-500/50 transition-all duration-300 hover:from-blue-500/70 hover:to-purple-500/70" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()
  const { token, theme, toggleTheme } = useAppStore()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => { authApi.status().then((d) => setInitialized(d.isInitialized)).catch(() => {}) }, [])
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark') }, [theme])

  const goEnter = () => navigate(token ? '/dashboard' : '/login')

  const stats = [
    { end: 50, suffix: '+', label: 'GitHub API 接口覆盖' },
    { end: 5, suffix: '', label: '跨平台支持' },
    { end: 33, suffix: '', label: 'REST API 端点' },
    { end: 256, suffix: '-bit', label: 'AES 加密强度' },
  ]

  const bentoFeatures = [
    {
      num: '01', title: '闪电同步', span: 'md:col-span-2', icon: <Zap className="size-4 text-blue-400" />,
      desc: '并发拉取所有仓库和 Action workflow，8 个 goroutine 并行加速',
      visual: (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {['Repo Sync', 'Status Check', 'Action Scan', 'File Edit', 'Batch Ops', 'Auto Trigger'].map((n) => (
            <div key={n} className="flex items-center justify-center rounded-lg border border-border/30 bg-muted/20 px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-blue-500/30 hover:bg-blue-500/5">{n}</div>
          ))}
        </div>
      ),
    },
    {
      num: '02', title: '安全加密', span: 'md:col-span-1', icon: <Shield className="size-4 text-emerald-400" />,
      desc: 'AES-256-GCM 加密存储，Argon2id 密钥派生',
      visual: (
        <div className="mt-4 flex items-center justify-center">
          <div className="relative">
            <div className="flex size-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
              <Lock className="size-7 text-emerald-500/70" strokeWidth={1.5} />
            </div>
            <div className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-emerald-500">
              <CheckCircle className="size-2.5 text-white" strokeWidth={3} />
            </div>
          </div>
        </div>
      ),
    },
    {
      num: '03', title: '智能检测', span: 'md:col-span-1', icon: <Eye className="size-4 text-violet-400" />,
      desc: '多方案并发检测封禁状态',
      visual: (
        <div className="mt-4 space-y-2">
          {['API /user', 'Web Profile', 'Token Verify'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex size-6 items-center justify-center rounded-full text-[10px] font-bold ${i === 1 ? 'border border-blue-500/30 bg-blue-500/20 text-blue-500' : 'border border-border/40 bg-muted text-muted-foreground'}`}>{i + 1}</div>
              <div className="h-px flex-1 bg-border/40" />
              <span className="text-xs text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      num: '04', title: '自动化引擎', span: 'md:col-span-2', icon: <Workflow className="size-4 text-amber-400" />,
      desc: '自动检测、自动同步、定时触发，无需人工干预',
      visual: (
        <div className="mt-4 flex items-center gap-3">
          <div className="flex -space-x-2">
            {['Auto', 'Cron', 'Log', 'Sync'].map((n) => (
              <div key={n} className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-muted to-muted/60 text-[9px] font-bold text-muted-foreground">{n}</div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Server className="size-3.5 text-blue-500" /> 全天候运行
          </div>
        </div>
      ),
    },
  ]

  const additionalFeatures = [
    { icon: <TrendingUp className="size-5" strokeWidth={1.5} />, title: '数据可视化', desc: 'Recharts 图表实时展示状态分布' },
    { icon: <FolderGit2 className="size-5" strokeWidth={1.5} />, title: '仓库浏览', desc: '在线文件树 + 代码编辑器' },
    { icon: <Layers className="size-5" strokeWidth={1.5} />, title: '批量操作', desc: '多仓库一键创建/触发' },
    { icon: <Github className="size-5" strokeWidth={1.5} />, title: '开源免费', desc: 'MIT License，自部署' },
  ]

  const steps = [
    { num: '1', title: '导入 Token', desc: '粘贴 GitHub Token，系统自动验证并加密存储', icon: <KeyRound className="size-6" strokeWidth={1.5} /> },
    { num: '2', title: '检测与同步', desc: '多方案检测封禁状态，自动同步所有仓库', icon: <Settings className="size-6" strokeWidth={1.5} /> },
    { num: '3', title: '定时执行', desc: '设置间隔自动触发 Action，查看执行日志', icon: <Activity className="size-6" strokeWidth={1.5} /> },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ===== Nav ===== */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2 font-bold">
            <Github className="h-6 w-6 text-primary" />
            <span>GitHub 管理器</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="text-muted-foreground">
              {theme === 'dark' ? '☀️' : '🌙'}
            </Button>
            <a href="https://github.com/weige2008/githubaltmanager" target="_blank" rel="noreferrer">
              <Button variant="outline" size="sm" className="gap-1.5 border-border/50">
                <Github className="size-4" /> GitHub
              </Button>
            </a>
            <Button size="sm" className="gap-1.5" onClick={goEnter}>
              {token ? '控制台' : '登录'}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative z-10 overflow-hidden px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Radial gradient background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-25 dark:opacity-[0.12]" style={{
          background: [
            'radial-gradient(ellipse 60% 50% at 20% 20%, hsl(217 91% 60% / 0.8) 0%, transparent 70%)',
            'radial-gradient(ellipse 50% 40% at 80% 15%, hsl(199 89% 48% / 0.6) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 35% at 40% 80%, hsl(258 90% 66% / 0.4) 0%, transparent 70%)',
          ].join(', '),
        }} />
        {/* Grid pattern */}
        <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.08]" style={{
          backgroundImage: 'linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 30%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 30%, black 20%, transparent 100%)',
        }} />

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-12">
          {/* Left */}
          <div className="flex flex-col items-start text-left">
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1.5 text-[11px] font-medium text-blue-600 shadow-xs dark:border-blue-400/20 dark:text-blue-400"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
              </span>
              GitHub 账户管理中枢
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.06 }}
              className="text-[clamp(2.25rem,4.5vw,3.25rem)] leading-[1.15] font-bold tracking-tight"
            >
              安全管理你的
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
                GitHub 账户
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-[15px]"
            >
              Token 加密导入、封禁检测、仓库浏览、Action 定时执行与批量创建——全部装进一个 18MB 的可执行文件，开箱即用。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button className="group h-11 rounded-lg px-5" onClick={goEnter}>
                {token ? '进入控制台' : '开始使用'}
                <ArrowRight className="ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
              <Button variant="outline" className="h-11 rounded-lg border-border/50 px-5" onClick={() => window.open('https://github.com/weige2008/githubaltmanager', '_blank')}>
                <BookOpen className="mr-1.5 size-4 text-muted-foreground" /> 文档
              </Button>
            </motion.div>

            {/* Supported apps */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-10 w-full max-w-xl"
            >
              <div className="mb-4 flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50">技术栈</span>
                <p className="text-xs leading-relaxed text-muted-foreground/60">React + Tailwind + Go + Gin + GORM + SQLite，单文件部署</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {['Linux', 'Windows', 'macOS', 'ARM64'].map((n) => (
                  <div key={n} className="flex cursor-default items-center gap-2 rounded-full border border-border/40 bg-muted/15 px-5 py-2.5 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-border hover:bg-muted/30">
                    <Cpu className="size-4 text-blue-400" /> {n}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Terminal Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.32 }}
            className="flex w-full justify-center"
          >
            <div className="mt-8 lg:mt-0">
              <HeroTerminalDemo />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <div className="relative z-10 border-y border-border/40 bg-muted/10">
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center">
                <span className="text-2xl font-bold tracking-tight md:text-3xl">
                  <Counter end={s.end} suffix={s.suffix} />
                </span>
                <span className="mt-1.5 text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Features (Bento Grid) ===== */}
      <section className="relative z-10 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeUp className="mb-16 max-w-lg">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">核心功能</p>
            <h2 className="text-2xl leading-tight font-bold tracking-tight md:text-3xl">
              为效率而生
              <br />
              <span className="text-muted-foreground">从导入到自动化</span>
            </h2>
          </FadeUp>

          {/* Bento grid */}
          <div className="grid gap-px overflow-hidden rounded-xl border border-border/40 bg-border/40 md:grid-cols-3">
            {bentoFeatures.map((f, i) => (
              <FadeUp key={f.num} delay={i * 0.1} className={`group bg-background p-7 transition-colors duration-300 hover:bg-muted/20 md:p-8 ${f.span}`}>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-md border border-border/40 bg-muted text-[10px] font-semibold tabular-nums text-muted-foreground">{f.num}</span>
                  <h3 className="text-sm font-semibold">{f.title}</h3>
                  {f.icon}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                {f.visual}
              </FadeUp>
            ))}
          </div>

          {/* Additional features row */}
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {additionalFeatures.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.1} className="group flex flex-col items-center text-center">
                <div className="mb-3 flex size-12 items-center justify-center rounded-xl border border-border/50 bg-muted/30 text-muted-foreground transition-colors group-hover:text-foreground">
                  {f.icon}
                </div>
                <h3 className="mb-1.5 text-sm font-semibold">{f.title}</h3>
                <p className="max-w-[200px] text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className="relative z-10 border-t border-border/40 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <FadeUp className="mb-16 text-center md:mb-20">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">使用流程</p>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">三步上手</h2>
          </FadeUp>

          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            {steps.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.15} className="relative flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="flex size-16 items-center justify-center rounded-2xl border border-border/50 bg-muted/30 text-muted-foreground transition-colors">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                    {step.num}
                  </div>
                </div>
                <h3 className="mb-2 text-base font-semibold">{step.title}</h3>
                <p className="max-w-[240px] text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative z-10 overflow-hidden px-6 py-24 md:py-32">
        <div aria-hidden className="absolute inset-0 -z-10 opacity-20 dark:opacity-[0.08]" style={{
          background: [
            'radial-gradient(ellipse 50% 50% at 30% 50%, hsl(217 91% 60% / 0.7) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 40% at 70% 40%, hsl(199 89% 48% / 0.5) 0%, transparent 70%)',
          ].join(', '),
        }} />
        <FadeUp className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl leading-tight font-bold tracking-tight md:text-4xl">
            准备好接管你的
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">GitHub 账户了吗？</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            立即体验系统级原生质感的账户管理中枢
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button className="group rounded-lg" onClick={goEnter}>
              {token ? '进入控制台' : '开始使用'}
              <ArrowRight className="ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
            <Button variant="outline" className="rounded-lg border-border/50" onClick={() => window.open('https://github.com/weige2008/githubaltmanager/releases', '_blank')}>
              下载
            </Button>
          </div>
        </FadeUp>
      </section>

      {/* ===== Footer ===== */}
      <footer className="relative z-10 border-t border-border/40">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            <div>
              <h4 className="mb-3 text-sm font-semibold">项目</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://github.com/weige2008/githubaltmanager" className="hover:text-foreground">GitHub</a></li>
                <li><a href="https://github.com/weige2008/githubaltmanager/releases" className="hover:text-foreground">Releases</a></li>
                <li><a href="https://github.com/weige2008/githubaltmanager/blob/main/README.md" className="hover:text-foreground">README</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">文档</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://github.com/weige2008/githubaltmanager/blob/main/README.md#-快速部署" className="hover:text-foreground">快速部署</a></li>
                <li><a href="https://github.com/weige2008/githubaltmanager/blob/main/README.md#-使用指南" className="hover:text-foreground">使用指南</a></li>
                <li><a href="https://github.com/weige2008/githubaltmanager/blob/main/README.md#-配置项" className="hover:text-foreground">配置项</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">技术栈</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>React 19 + Tailwind</li>
                <li>Go + Gin + GORM</li>
                <li>AES-256-GCM + Argon2id</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">关于</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>MIT License</li>
                <li>v2.0.0</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-6">
            <span className="text-xs text-muted-foreground">© 2026 weige2008. All Rights Reserved.</span>
            <a href="https://github.com/weige2008/githubaltmanager" className="text-muted-foreground hover:text-foreground">
              <Github className="size-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
