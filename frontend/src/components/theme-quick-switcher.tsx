import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Moon, Sun, Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'
import { useThemeStore } from '@/store/theme'

interface ThemeQuickSwitcherProps {
  onOpenDrawer?: () => void
  className?: string
}

const ThemeQuickSwitcher = ({ onOpenDrawer, className }: ThemeQuickSwitcherProps) => {
  const { t } = useTranslation()
  const { mode, setMode } = useThemeStore()

  const cycle = () => {
    if (mode === 'light') setMode('dark')
    else if (mode === 'dark') setMode('system')
    else setMode('light')
  }

  return (
    <div className={cn('flex items-center', className)}>
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={cycle}>
              {mode === 'light' && <Sun className="h-4 w-4" />}
              {mode === 'dark' && <Moon className="h-4 w-4" />}
              {mode === 'system' && <Palette className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {mode === 'light' ? t('theme.modeLight') : mode === 'dark' ? t('theme.modeDark') : t('theme.modeSystem')}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {onOpenDrawer && (
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onOpenDrawer}>
                <Palette className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('theme.title')}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}

import { cn } from '@/lib/utils'

export { ThemeQuickSwitcher }
