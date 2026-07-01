import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ChevronRight, Sun, Moon, Monitor } from 'lucide-react'
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator,
} from '@/components/ui/command'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useThemeStore } from '@/store/theme'

interface CommandMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface NavEntry {
  title: string
  url: string
}

interface NavSection {
  heading: string
  items: NavEntry[]
}

const CommandMenu = ({ open, onOpenChange }: CommandMenuProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { mode, setMode } = useThemeStore()

  const sections: NavSection[] = [
    {
      heading: t('nav.overview'),
      items: [{ title: t('nav.dashboard'), url: '/dashboard' }],
    },
    {
      heading: t('nav.management'),
      items: [
        { title: t('nav.accounts'), url: '/accounts' },
        { title: t('nav.repos'), url: '/repos' },
      ],
    },
    {
      heading: t('nav.automation'),
      items: [
        { title: t('nav.tasks'), url: '/tasks' },
        { title: t('nav.batch'), url: '/batch' },
        { title: t('nav.automationLogs'), url: '/automation' },
      ],
    },
    {
      heading: t('nav.system'),
      items: [{ title: t('nav.settings'), url: '/settings' }],
    },
  ]

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      onOpenChange(false)
      command()
    },
    [onOpenChange]
  )

  return (
    <CommandDialog modal open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder={t('common.search') + '...'} />
      <CommandList>
        <ScrollArea className="h-72 pe-1">
          <CommandEmpty>{t('common.noData')}</CommandEmpty>
          {sections.map((section) => (
            <CommandGroup key={section.heading} heading={section.heading}>
              {section.items.map((item) => (
                <CommandItem
                  key={item.url}
                  value={item.title}
                  onSelect={() => runCommand(() => navigate(item.url))}
                >
                  <div className="flex size-4 items-center justify-center">
                    <ArrowRight className="size-2 text-muted-foreground/80" />
                  </div>
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading={t('theme.mode')}>
            <CommandItem onSelect={() => runCommand(() => setMode('light'))}>
              <Sun className="mr-2 h-4 w-4" />
              <span>{t('theme.modeLight')}</span>
              {mode === 'light' && <span className="ml-auto">✓</span>}
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setMode('dark'))}>
              <Moon className="mr-2 h-4 w-4 scale-90" />
              <span>{t('theme.modeDark')}</span>
              {mode === 'dark' && <span className="ml-auto">✓</span>}
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setMode('system'))}>
              <Monitor className="mr-2 h-4 w-4" />
              <span>{t('theme.modeSystem')}</span>
              {mode === 'system' && <span className="ml-auto">✓</span>}
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )
}

export { CommandMenu }
