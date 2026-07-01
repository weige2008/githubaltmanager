import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSearchStore } from '@/store/search'
import { cn } from '@/lib/utils'

interface SearchBoxProps {
  className?: string
}

const SearchBox = ({ className }: SearchBoxProps) => {
  const { t } = useTranslation()
  const { setOpen } = useSearchStore()

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [setOpen])

  return (
    <Button
      variant="outline"
      className={cn(
        'group relative h-8 w-full flex-1 justify-start rounded-md bg-muted/25 text-sm font-normal text-muted-foreground shadow-none hover:bg-accent',
        'sm:w-40 sm:pe-12 md:flex-none lg:w-52 xl:w-64',
        className
      )}
      onClick={() => setOpen(true)}
      aria-label={t('common.search')}
    >
      <Search className="absolute left-1.5 top-1/2 -translate-y-1/2" size={16} aria-hidden="true" />
      <span className="ml-4">{t('common.search')}</span>
      <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium select-none group-hover:bg-accent sm:flex">
        <span className="text-xs">⌘</span>
        K
      </kbd>
    </Button>
  )
}

export { SearchBox }
