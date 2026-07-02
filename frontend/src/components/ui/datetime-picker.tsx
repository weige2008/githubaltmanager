import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { CalendarIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface DateTimePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

const DateTimePicker = ({ value, onChange, className, disabled, ...rest }: DateTimePickerProps) => {
  const { t } = useTranslation()
  const placeholder = rest.placeholder ?? t('ui.selectDateTime')
  const [open, setOpen] = React.useState(false)
  const timeValue = value ? format(value, 'HH:mm') : ''

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!value) return
    const [hours, minutes] = e.target.value.split(':').map(Number)
    const newDate = new Date(value)
    newDate.setHours(hours || 0, minutes || 0, 0, 0)
    onChange?.(newDate)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground', className)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, 'PP HH:mm', { locale: zhCN }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(d) => {
            if (!d) return
            if (value) {
              d.setHours(value.getHours(), value.getMinutes(), 0, 0)
            }
            onChange?.(d)
          }}
          locale={zhCN}
        />
        <Separator />
        <div className="flex items-center gap-2 p-3">
          <span className="text-sm text-muted-foreground">{t('ui.time')}</span>
          <Input
            type="time"
            value={timeValue}
            onChange={handleTimeChange}
            className="w-32"
          />
        </div>
        <div className="flex justify-end p-3 pt-0">
          <Button size="sm" onClick={() => setOpen(false)}>{t('ui.ok')}</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
DateTimePicker.displayName = 'DateTimePicker'

export { DateTimePicker }
