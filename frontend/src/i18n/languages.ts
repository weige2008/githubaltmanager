export interface LanguageOption {
  value: string
  label: string
  englishName: string
  flag: string
}

export const LANGUAGES: LanguageOption[] = [
  { value: 'zh-CN', label: '简体中文', englishName: 'Chinese', flag: '🇨🇳' },
  { value: 'en-US', label: 'English', englishName: 'English', flag: '🇺🇸' },
]

export const DEFAULT_LANGUAGE = 'zh-CN'
