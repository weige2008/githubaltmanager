import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Languages, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { LANGUAGES } from '@/i18n/languages'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  className?: string
  variant?: 'button' | 'icon'
}

const LanguageSwitcher = ({ className, variant = 'icon' }: LanguageSwitcherProps) => {
  const { i18n, t } = useTranslation()
  const current = i18n.language

  const handleSelect = (lng: string) => {
    i18n.changeLanguage(lng)
    document.documentElement.lang = lng
  }

  if (variant === 'button') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={cn('gap-2', className)}>
            <Languages className="h-4 w-4" />
            {LANGUAGES.find((l) => l.value === current)?.label ?? 'Language'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('settings.language')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {LANGUAGES.map((lang) => (
            <DropdownMenuItem key={lang.value} onClick={() => handleSelect(lang.value)} className="gap-2">
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
              {current === lang.value && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn(className)}>
          <Languages className="h-4 w-4" />
          <span className="sr-only">{t('settings.language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t('settings.language')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem key={lang.value} onClick={() => handleSelect(lang.value)} className="gap-2">
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
            {current === lang.value && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { LanguageSwitcher }
