import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Sun, Moon, Monitor, Home, Users, FolderGit2, Activity, Clock, Layers, FolderPlus, Star, Timer, Settings, KeyRound, Lock, Info, FileCode2 } from 'lucide-react'
import {
  Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator,
} from '@/components/ui/command'
import { useThemeStore } from '@/store/theme'

interface CommandMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface CommandEntry {
  label: string
  to: string
  icon?: React.ComponentType<{ className?: string }>
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

  // 全量页面 + 设置子页签（数据驱动；新增页面/子设置时同步这里）
  const groups: { heading: string; items: CommandEntry[] }[] = [
    {
      heading: t('landing.nav.home'),
      items: [{ label: t('landing.nav.home'), to: '/', icon: Home }],
    },
    {
      heading: t('landing.nav.console'),
      items: [
        { label: t('nav.dashboard'), to: '/dashboard' },
        { label: t('nav.accounts'), to: '/accounts', icon: Users },
        { label: t('nav.repos'), to: '/repos', icon: FolderGit2 },
        { label: t('nav.workflowRuns'), to: '/workflow-runs', icon: Activity },
      ],
    },
    {
      heading: t('landing.nav.automation'),
      items: [
        { label: t('nav.tasks'), to: '/tasks', icon: Clock },
        { label: t('nav.batch'), to: '/batch', icon: Layers },
        { label: t('nav.batchRepos'), to: '/batch-repos', icon: FolderPlus },
        { label: t('nav.batchActions'), to: '/batch-actions', icon: Star },
        { label: t('nav.automationLogs'), to: '/automation', icon: Timer },
      ],
    },
    {
      heading: t('nav.system'),
      items: [
        { label: t('nav.settings'), to: '/settings', icon: Settings },
        { label: t('nav.apiDocs'), to: '/api-docs', icon: FileCode2 },
      ],
    },
    {
      heading: t('settings.title'),
      items: [
        { label: t('settings.automation'), to: '/settings?tab=automation', icon: Timer },
        { label: 'API Keys', to: '/settings?tab=apikeys', icon: KeyRound },
        { label: t('settings.security'), to: '/settings?tab=security', icon: Lock },
        { label: t('settings.system'), to: '/settings?tab=system', icon: Settings },
        { label: t('settings.about'), to: '/settings?tab=about', icon: Info },
      ],
    },
  ]

  return (
    <CommandDialog modal open={open} onOpenChange={onOpenChange}>
      <Command>
        <CommandInput placeholder={t('common.search') + '...'} />
        <CommandList>
          <CommandEmpty>{t('common.noData')}</CommandEmpty>

          {groups.map((group) => (
            <React.Fragment key={group.heading}>
              <CommandGroup heading={group.heading}>
                {group.items.map((item) => (
                  <CommandItem key={item.to} onSelect={() => runCommand(() => navigate(item.to))}>
                    <div className="mr-2 flex size-4 items-center justify-center">
                      {item.icon ? <item.icon className="size-3.5 text-muted-foreground" /> : <ArrowRight className="size-2 text-muted-foreground/80" />}
                    </div>
                    <span>{item.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </React.Fragment>
          ))}

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
