import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '@/api'
import { useAppStore } from '@/store/app'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Lock, ArrowRight, Github, Shield, Zap, Clock, Folder, Layers, Terminal } from 'lucide-react'
import { toast } from 'sonner'

const features = [
  { icon: Lock, title: 'AES-256 加密', desc: 'Token、密码、邮箱全部加密存储，主密码用 Argon2id 派生密钥' },
  { icon: Shield, title: '封禁检测', desc: '多方案并发检测：GitHub API + 网页主页 + token 验证' },
  { icon: Folder, title: '仓库浏览', desc: '在线浏览文件树、编辑文件、自动扫描所有 Action workflow' },
  { icon: Clock, title: '定时执行', desc: '间隔模式定时触发 workflow_dispatch，后端持续运行' },
  { icon: Layers, title: '批量操作', desc: '批量给多个仓库创建 workflow 或触发 dispatch' },
  { icon: Zap, title: '自动化', desc: '自动检测账户状态、自动同步仓库，带执行日志' },
]

const deploys = [
  { os: 'Linux / macOS', cmd: 'curl -fsSL https://raw.githubusercontent.com/weige2008/githubaltmanager/main/deploy.sh -o deploy.sh && bash deploy.sh' },
  { os: 'Windows', cmd: 'powershell -c "iwr https://raw.githubusercontent.com/weige2008/githubaltmanager/main/deploy.ps1 -OutFile deploy.ps1; .\deploy.ps1"' },
  { os: 'Docker', cmd: 'docker compose up -d --build' },
]

export default function LandingPage() {
  const navigate = useNavigate()
  const { token, theme, toggleTheme } = useAppStore()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => { authApi.status().then((d) => setInitialized(d.isInitialized)).catch(() => {}) }, [])
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark') }, [theme])

  const goEnter = () => navigate(token ? '/dashboard' : '/login')

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
        <div className="absolute -left-40 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-20 top-40 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-xs text-muted-foreground mb-6">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" /> v2.0 · React 重写 · 单文件部署
          </div>
          <h1 className="text-5xl font-black tracking-tight sm:text-6xl">
            让 GitHub 账户管理<br /><span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">轻盈而强大</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Token 加密导入、封禁检测、仓库浏览、Action 定时执行与批量创建——全部装进一个 18MB 的可执行文件。
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button size="lg" onClick={goEnter}>{token ? '进入控制台' : '开始使用'} <ArrowRight className="ml-2 h-5 w-5" /></Button>
            <Button size="lg" variant="outline" onClick={() => window.open('https://github.com/weige2008/githubaltmanager', '_blank')}>
              <Github className="mr-2 h-5 w-5" /> 查看源码
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold">六大核心能力</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => { const Icon = f.icon; return (
            <Card key={f.title} className="transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"><Icon className="h-6 w-6 text-primary" /></div>
                <h3 className="mb-2 font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          )})}
        </div>
      </section>

      {/* Deploy */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold">三秒部署，到处运行</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {deploys.map((d) => (
            <Card key={d.os}><CardContent className="p-6">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground"><Terminal className="h-4 w-4" /> {d.os}</div>
              <pre className="rounded-md bg-zinc-900 p-3 text-xs text-zinc-300 overflow-x-auto"><code>{d.cmd}</code></pre>
            </CardContent></Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <Card className="bg-primary/5"><CardContent className="p-12">
          <h2 className="text-2xl font-bold">准备好接管你的 GitHub 账户了吗？</h2>
          <p className="mt-2 text-muted-foreground">立即体验系统级原生质感的账户管理中枢</p>
          <Button size="lg" className="mt-6" onClick={goEnter}>进入控制台 <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </CardContent></Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © 2026 weige2008 · MIT License · Built with React + Go
      </footer>
    </div>
  )
}
