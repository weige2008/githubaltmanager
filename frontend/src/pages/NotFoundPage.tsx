import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-8xl font-black text-primary">404</h1>
      <p className="text-lg text-muted-foreground">页面不存在</p>
      <Link to="/"><Button>返回首页</Button></Link>
    </div>
  )
}
