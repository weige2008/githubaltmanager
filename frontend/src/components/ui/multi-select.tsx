import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Check, ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { cn } from '@/lib/utils'

export interface MultiSelectOption {
  label: string
  value: string
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

const MultiSelect = ({ options, value, onChange, className, disabled, ...rest }: MultiSelectProps) => {
  const { t } = useTranslation()
  const placeholder = rest.placeholder ?? t('ui.selectPlaceholder')
  const [open, setOpen] = React.useState(false)

  const handleToggle = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val))
    } else {
      onChange([...value, val])
    }
  }

  const selectedLabels = options.filter((o) => value.includes(o.value))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn('w-full justify-between', className)}
        >
          <span className="flex flex-wrap gap-1">
            {selectedLabels.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : selectedLabels.length <= 2 ? (
              selectedLabels.map((s) => <Badge key={s.value} variant="secondary" className="mr-1">{s.label}</Badge>)
            ) : (
              <Badge variant="secondary">{t('ui.itemsSelected', { count: selectedLabels.length })}</Badge>
            )}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder={t('ui.search')} />
          <CommandList>
            <CommandEmpty>{t('ui.noResults')}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem key={option.value} onSelect={() => handleToggle(option.value)}>
                  <div className={cn('mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary', value.includes(option.value) && 'bg-primary text-primary-foreground')}>
                    {value.includes(option.value) && <Check className="h-3 w-3" />}
                  </div>
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { MultiSelect }
