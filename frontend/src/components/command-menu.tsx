import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Sun, Moon, Monitor, Home, Terminal, Bot, FileText } from 'lucide-react'
import {
  Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator,
} from '@/components/ui/command'
import { useThemeStore } from '@/store/theme'

interface CommandMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CommandMenu = ({ open, onOpenChange }: CommandMenuProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { mode, setMode } = useThemeStore()

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      onOpenChange(false)
      command()
    },
    [onOpenChange]
  )

  return (
    <CommandDialog modal open={open} onOpenChange={onOpenChange}>
      <Command>
        <CommandInput placeholder={t('common.search') + '...'} />
        <CommandList>
          <CommandEmpty>{t('common.noData')}</CommandEmpty>

          <CommandGroup heading="主页">
            <CommandItem onSelect={() => runCommand(() => navigate('/'))}>
              <Home className="mr-2 h-4 w-4" />
              <span>主页</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="控制台">
            <CommandItem onSelect={() => runCommand(() => navigate('/dashboard'))}>
              <div className="flex size-4 items-center justify-center">
                <ArrowRight className="size-2 text-muted-foreground/80" />
              </div>
              {t('nav.dashboard')}
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate('/accounts'))}>
              <div className="flex size-4 items-center justify-center">
                <ArrowRight className="size-2 text-muted-foreground/80" />
              </div>
              {t('nav.accounts')}
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate('/repos'))}>
              <div className="flex size-4 items-center justify-center">
                <ArrowRight className="size-2 text-muted-foreground/80" />
              </div>
              {t('nav.repos')}
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="自动化">
            <CommandItem onSelect={() => runCommand(() => navigate('/tasks'))}>
              <div className="flex size-4 items-center justify-center">
                <ArrowRight className="size-2 text-muted-foreground/80" />
              </div>
              {t('nav.tasks')}
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate('/batch'))}>
              <div className="flex size-4 items-center justify-center">
                <ArrowRight className="size-2 text-muted-foreground/80" />
              </div>
              {t('nav.batch')}
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate('/automation'))}>
              <div className="flex size-4 items-center justify-center">
                <ArrowRight className="size-2 text-muted-foreground/80" />
              </div>
              {t('nav.automationLogs')}
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="系统">
            <CommandItem onSelect={() => runCommand(() => navigate('/settings'))}>
              <div className="flex size-4 items-center justify-center">
                <ArrowRight className="size-2 text-muted-foreground/80" />
              </div>
              {t('nav.settings')}
            </CommandItem>
          </CommandGroup>

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
        </CommandList>
      </Command>
    </CommandDialog>
  )
}

export { CommandMenu }
