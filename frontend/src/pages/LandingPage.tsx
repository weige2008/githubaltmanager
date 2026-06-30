import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { authApi } from '@/api'
import { useAppStore } from '@/store/app'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Lock, ArrowRight, Github, Shield, Zap, Clock, Folder, Layers, Terminal, Activity, MemoryStick, Cpu, CheckCircle } from 'lucide-react'

const features = [
  { icon: Lock, title: 'AES-256 加密', desc: 'Token、密码、邮箱全部加密存储，主密码用 Argon2id 派生密钥' },
  { icon: Shield, title: '封禁检测', desc: '多方案并发检测：GitHub API + 网页主页 + token 验证' },
  { icon: Folder, title: '仓库浏览', desc: '在线浏览文件树、编辑文件、自动扫描所有 Action workflow' },
  { icon: Clock, title: '定时执行', desc: '间隔模式定时触发 workflow_dispatch，后端持续运行' },
  { icon: Layers, title: '批量操作', desc: '批量给多个仓库创建 workflow 或触发 dispatch' },
  { icon: Zap, title: '自动化', desc: '自动检测账户状态、自动同步仓库，带执行日志' },
]

const steps = [
  { n: 1, title: '导入 Token', desc: '粘贴 GitHub Token，系统自动验证并加密存储', icon: Lock },
  { n: 2, title: '检测状态', desc: '多方案并发检测账户是否封禁', icon: Shield },
  { n: 3, title: '扫描仓库', desc: '自动拉取所有仓库和 Action workflow', icon: Folder },
  { n: 4, title: '定时执行', desc: '设置间隔定时触发或批量创建 Action', icon: Clock },
]

const stats = [
  { value: '18', unit: 'MB', label: '单文件体积', icon: Cpu },
  { value: '6', unit: 'MB', label: '内存占用', icon: MemoryStick },
  { value: '5', unit: '平台', label: '跨平台支持', icon: Activity },
  { value: '0', unit: '依赖', label: '无需外部组件', icon: CheckCircle },
]

const deploys = [
  { os: 'Linux / macOS', cmd: 'curl -fsSL https://raw.githubusercontent.com/weige2008/githubaltmanager/main/deploy.sh -o deploy.sh && bash deploy.sh' },
  { os: 'Windows', cmd: 'powershell -c "iwr https://raw.githubusercontent.com/weige2008/githubaltmanager/main/deploy.ps1 -OutFile deploy.ps1; .\\deploy.ps1"' },
  { os: 'Docker', cmd: 'docker compose up -d --build' },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const { token, theme, toggleTheme } = useAppStore()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => { authApi.status().then((d) => setInitialized(d.isInitialized)).catch(() => {}) }, [])
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark') }, [theme])

  const goEnter = () => navigate(token ? '/dashboard' : '/login')
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } } }

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2 font-bold"><Github className="h-6 w-6 text-primary" /><span>GitHub 管理器</span></div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>{theme === 'dark' ? '☀️' : '🌙'}</Button>
            <Button size="sm" onClick={goEnter}>{token ? '控制台' : '登录'} <ArrowRight className="ml-1 h-4 w-4" /></Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -left-40 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute -right-20 top-40 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <motion.div
          initial="hidden" animate="visible" variants={stagger}
          className="relative mx-auto max-w-6xl px-6 py-24 text-center"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-xs text-muted-foreground mb-6">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" /> v2.0 · React 重写 · 单文件部署
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl font-black tracking-tight sm:text-6xl">
            让 GitHub 账户管理<br /><span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">轻盈而强大</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Token 加密导入、封禁检测、仓库浏览、Action 定时执行与批量创建——全部装进一个 18MB 的可执行文件。
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex justify-center gap-3">
            <Button size="lg" onClick={goEnter}>{token ? '进入控制台' : '开始使用'} <ArrowRight className="ml-2 h-5 w-5" /></Button>
            <Button size="lg" variant="outline" onClick={() => window.open('https://github.com/weige2008/githubaltmanager', '_blank')}>
              <Github className="mr-2 h-5 w-5" /> 查看源码
            </Button>
          </motion.div>

          {/* 3D Mock */}
          <motion.div variants={fadeUp} className="mx-auto mt-12 max-w-md" style={{ perspective: '1000px' }}>
            <motion.div
              initial={{ rotateY: -12, rotateX: 5, opacity: 0 }}
              animate={{ rotateY: -8, rotateX: 3, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotateY: 0, rotateX: 0, y: -4 }}
              className="rounded-xl border bg-card p-1 shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center gap-1.5 rounded-t-lg bg-muted/50 px-4 py-2">
                <div className="h-3 w-3 rounded-full bg-red-400" /><div className="h-3 w-3 rounded-full bg-yellow-400" /><div className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-muted-foreground">控制台预览</span>
              </div>
              <div className="space-y-2 p-4 text-left">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg bg-muted/30 p-2">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                    <div className="flex-1 space-y-1">
                      <div className="h-2.5 w-3/4 rounded bg-muted" />
                      <div className="h-2 w-1/2 rounded bg-muted/50" />
                    </div>
                    <div className={`h-4 w-12 rounded-full ${i === 1 ? 'bg-red-500/30' : 'bg-green-500/30'}`} />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-auto grid max-w-4xl grid-cols-2 divide-x border-y md:grid-cols-4"
        >
          {stats.map((s) => { const Icon = s.icon; return (
            <div key={s.label} className="flex flex-col items-center py-6">
              <Icon className="mb-1 h-5 w-5 text-muted-foreground" />
              <div className="text-3xl font-black">{s.value}<span className="ml-1 text-base text-muted-foreground">{s.unit}</span></div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          )})}
        </motion.div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-12 text-center text-3xl font-bold">六大核心能力</motion.h2>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => { const Icon = f.icon; return (
            <motion.div key={f.title} variants={fadeUp} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Card className="h-full transition-shadow hover:shadow-lg"><CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"><Icon className="h-6 w-6 text-primary" /></div>
                <h3 className="mb-2 font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent></Card>
            </motion.div>
          )})}
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-12 text-center text-3xl font-bold">四步上手</motion.h2>
        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-primary to-transparent" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-8">
            {steps.map((step, i) => { const Icon = step.icon; return (
              <motion.div key={step.n} variants={fadeUp} className={`flex items-center gap-6 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${i % 2 === 0 ? 'text-right' : ''}`}>
                  <Card><CardContent className="flex items-center gap-3 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><Icon className="h-5 w-5 text-primary" /></div>
                    <div><h3 className="font-semibold text-sm">{step.title}</h3><p className="text-xs text-muted-foreground">{step.desc}</p></div>
                  </CardContent></Card>
                </div>
                <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-500 text-sm font-bold text-white shadow-lg" style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.4)' }}>{step.n}</div>
                <div className="w-1/2" />
              </motion.div>
            )})}
          </motion.div>
        </div>
      </section>

      {/* Deploy */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-12 text-center text-3xl font-bold">三秒部署</motion.h2>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-4 md:grid-cols-3">
          {deploys.map((d) => (
            <motion.div key={d.os} variants={fadeUp} whileHover={{ y: -4 }}>
              <Card><CardContent className="p-6">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground"><Terminal className="h-4 w-4" /> {d.os}</div>
                <pre className="rounded-md bg-zinc-900 p-3 text-xs text-zinc-300 overflow-x-auto"><code>{d.cmd}</code></pre>
              </CardContent></Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <Card className="bg-primary/5"><CardContent className="p-12">
            <h2 className="text-2xl font-bold">准备好接管你的 GitHub 账户了吗？</h2>
            <p className="mt-2 text-muted-foreground">立即体验系统级原生质感的账户管理中枢</p>
            <Button size="lg" className="mt-6" onClick={goEnter}>进入控制台 <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </CardContent></Card>
        </motion.div>
      </section>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">© 2026 weige2008 · MIT License · Built with React + Go</footer>
    </div>
  )
}
