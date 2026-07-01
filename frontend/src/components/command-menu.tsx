import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  LayoutDashboard, Users, FolderGit2, Clock, Layers, Timer, Settings,
  Sun, Moon, Monitor, Home,
} from 'lucide-react'
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator,
} from '@/components/ui/command'
import { useThemeStore } from '@/store/theme'

interface CommandMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CommandMenu = ({ open, onOpenChange }: CommandMenuProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { mode, setMode } = useThemeStore()

  const runCommand = (cmd: () => void) => {
    cmd()
    onOpenChange(false)
  }

  const navItems = [
    { icon: Home, label: t('nav.overview'), href: '/' },
    { icon: LayoutDashboard, label: t('nav.dashboard'), href: '/dashboard' },
    { icon: Users, label: t('nav.accounts'), href: '/accounts' },
    { icon: FolderGit2, label: t('nav.repos'), href: '/repos' },
    { icon: Clock, label: t('nav.tasks'), href: '/tasks' },
    { icon: Layers, label: t('nav.batch'), href: '/batch' },
    { icon: Timer, label: t('nav.automationLogs'), href: '/automation' },
    { icon: Settings, label: t('nav.settings'), href: '/settings' },
  ]

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder={t('common.search')} />
      <CommandList>
        <CommandEmpty>{t('common.noData')}</CommandEmpty>
        <CommandGroup heading={t('nav.overview')}>
          {navItems.map((item) => (
            <CommandItem key={item.href} onSelect={() => runCommand(() => navigate(item.href))}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t('theme.mode')}>
          <CommandItem onSelect={() => runCommand(() => setMode('light'))}>
            <Sun className="mr-2 h-4 w-4" />
            {t('theme.modeLight')}
            {mode === 'light' && <span className="ml-auto">✓</span>}
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setMode('dark'))}>
            <Moon className="mr-2 h-4 w-4" />
            {t('theme.modeDark')}
            {mode === 'dark' && <span className="ml-auto">✓</span>}
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setMode('system'))}>
            <Monitor className="mr-2 h-4 w-4" />
            {t('theme.modeSystem')}
            {mode === 'system' && <span className="ml-auto">✓</span>}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export { CommandMenu }
