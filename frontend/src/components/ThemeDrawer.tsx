import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeStore, PRESETS, RADIUS_OPTIONS, SCALE_OPTIONS, type ThemeMode, type ThemePreset, type ThemeFont, type ThemeRadius, type ThemeScale, type ContentLayout, type SidebarMode } from '@/store/theme'
import { Button } from '@/components/ui/button'
import { X, Check, RotateCcw, Monitor, Sun, Moon, Type } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  open: boolean
  onClose: () => void
}

function SectionTitle({ title, onReset }: { title: string; onReset?: () => void }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>
      {onReset && (
        <button onClick={onReset} className="text-muted-foreground/50 hover:text-foreground transition-colors">
          <RotateCcw className="size-3" />
        </button>
      )}
    </div>
  )
}

function OptionCard({ active, onClick, children, className }: { active: boolean; onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button onClick={onClick} className={cn(
      'group relative flex flex-col items-stretch overflow-hidden rounded-md ring-1 transition-all duration-200',
      active ? 'ring-primary shadow-md' : 'ring-border hover:ring-primary/50',
      className
    )}>
      {active && (
        <span className="absolute right-0 top-0 z-10 flex size-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-primary text-white shadow">
          <Check className="size-3" strokeWidth={3} />
        </span>
      )}
      {children}
    </button>
  )
}

export function ThemeDrawer({ open, onClose }: Props) {
  const { t } = useTranslation()
  const ts = useThemeStore()

  const themeModes: { value: ThemeMode; labelKey: string; icon: React.ReactNode }[] = [
    { value: 'system', labelKey: 'theme.modeSystem', icon: <Monitor className="size-4" /> },
    { value: 'light', labelKey: 'theme.modeLight', icon: <Sun className="size-4" /> },
    { value: 'dark', labelKey: 'theme.modeDark', icon: <Moon className="size-4" /> },
  ]

  const fonts: { value: ThemeFont; label: string }[] = [
    { value: 'default', label: 'Auto' },
    { value: 'sans', label: 'Sans' },
    { value: 'serif', label: 'Serif' },
  ]

  const sidebarModes: { value: SidebarMode; labelKey: string }[] = [
    { value: 'inset', labelKey: 'theme.sidebarInset' },
    { value: 'floating', labelKey: 'theme.sidebarFloating' },
    { value: 'sidebar', labelKey: 'theme.sidebarSidebar' },
  ]

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l bg-card shadow-2xl"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-card/95 px-6 py-4 backdrop-blur">
              <div>
                <h2 className="text-lg font-semibold">{t('theme.title')}</h2>
                <p className="text-xs text-muted-foreground">{t('theme.subtitle')}</p>
              </div>
              <button onClick={onClose} className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-8 px-6 py-6">
              {/* Theme Mode */}
              <div>
                <SectionTitle title={t('theme.mode')} onReset={ts.mode !== 'dark' ? () => ts.setMode('dark') : undefined} />
                <div className="grid grid-cols-3 gap-3">
                  {themeModes.map((m) => (
                    <OptionCard key={m.value} active={ts.mode === m.value} onClick={() => ts.setMode(m.value)}>
                      <div className="flex h-16 items-center justify-center gap-2 text-sm font-medium">
                        {m.icon} {t(m.labelKey)}
                      </div>
                    </OptionCard>
                  ))}
                </div>
              </div>

              {/* Color Preset */}
              <div>
                <SectionTitle title={t('theme.preset')} onReset={ts.preset !== 'default' ? () => ts.setPreset('default') : undefined} />
                <div className="grid grid-cols-4 gap-3">
                  {PRESETS.map((p) => (
                    <OptionCard key={p.value} active={ts.preset === p.value} onClick={() => ts.setPreset(p.value)}>
                      <div className="h-12" style={{ background: `linear-gradient(135deg, ${p.swatches[0]}, ${p.swatches[1]})` }} />
                      <div className="truncate py-1 text-center text-[10px]">{p.label}</div>
                    </OptionCard>
                  ))}
                </div>
              </div>

              {/* Font */}
              <div>
                <SectionTitle title={t('theme.font')} onReset={ts.font !== 'default' ? () => ts.setFont('default') : undefined} />
                <div className="grid grid-cols-3 gap-3">
                  {fonts.map((f) => (
                    <OptionCard key={f.value} active={ts.font === f.value} onClick={() => ts.setFont(f.value)}>
                      <div className="flex h-12 items-center justify-center text-lg font-medium" style={f.value === 'serif' ? { fontFamily: 'Georgia, serif' } : undefined}>
                        Aa
                      </div>
                      <div className="py-1 text-center text-[10px]">{f.label}</div>
                    </OptionCard>
                  ))}
                </div>
              </div>

              {/* Radius */}
              <div>
                <SectionTitle title={t('theme.radius')} onReset={ts.radius !== 'default' ? () => ts.setRadius('default') : undefined} />
                <div className="grid grid-cols-6 gap-2">
                  {RADIUS_OPTIONS.map((r) => (
                    <OptionCard key={r.value} active={ts.radius === r.value} onClick={() => ts.setRadius(r.value)}>
                      <div className="flex h-12 items-center justify-center text-xs">{r.label}</div>
                    </OptionCard>
                  ))}
                </div>
              </div>

              {/* Scale */}
              <div>
                <SectionTitle title={t('theme.scale')} onReset={ts.scale !== 'default' ? () => ts.setScale('default') : undefined} />
                <div className="grid grid-cols-4 gap-3">
                  {SCALE_OPTIONS.map((s) => (
                    <OptionCard key={s.value} active={ts.scale === s.value} onClick={() => ts.setScale(s.value)}>
                      <div className="flex h-12 items-center justify-center text-xs">{s.label}</div>
                    </OptionCard>
                  ))}
                </div>
              </div>

              {/* Sidebar Mode */}
              <div>
                <SectionTitle title={t('theme.sidebarMode')} onReset={ts.sidebarMode !== 'inset' ? () => ts.setSidebarMode('inset') : undefined} />
                <div className="grid grid-cols-3 gap-3">
                  {sidebarModes.map((s) => (
                    <OptionCard key={s.value} active={ts.sidebarMode === s.value} onClick={() => ts.setSidebarMode(s.value)}>
                      <div className="flex h-14 items-center justify-center text-xs">{t(s.labelKey)}</div>
                    </OptionCard>
                  ))}
                </div>
              </div>

              {/* Content Layout */}
              <div>
                <SectionTitle title={t('theme.contentLayout')} onReset={ts.contentLayout !== 'full' ? () => ts.setContentLayout('full') : undefined} />
                <div className="grid grid-cols-2 gap-3">
                  <OptionCard active={ts.contentLayout === 'full'} onClick={() => ts.setContentLayout('full')}>
                    <div className="flex h-12 items-center justify-center text-xs">{t('theme.layoutFull')}</div>
                  </OptionCard>
                  <OptionCard active={ts.contentLayout === 'centered'} onClick={() => ts.setContentLayout('centered')}>
                    <div className="flex h-12 items-center justify-center text-xs">{t('theme.layoutCentered')}</div>
                  </OptionCard>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 border-t bg-card/95 px-6 py-4 backdrop-blur">
              <Button variant="destructive" className="w-full gap-2" onClick={() => ts.reset()}>
                <RotateCcw className="size-4" /> {t('theme.resetAll')}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
