import { cn } from '@/lib/utils'

const SkipToMain = () => (
  <a
    href="#main-content"
    className={cn(
      'sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]',
      'focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground',
      'focus:shadow-lg focus:outline-none'
    )}
  >
    跳到主要内容
  </a>
)

export { SkipToMain }
