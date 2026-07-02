export interface LanguageOption {
  value: string
  label: string
  englishName: string
  flag: string
}

export const LANGUAGES: LanguageOption[] = [
  { value: 'zh-CN', label: '简体中文', englishName: 'Chinese', flag: '🇨🇳' },
  { value: 'en-US', label: 'English', englishName: 'English', flag: '🇺🇸' },
  { value: 'ja-JP', label: '日本語', englishName: 'Japanese', flag: '🇯🇵' },
  { value: 'ru-RU', label: 'Русский', englishName: 'Russian', flag: '🇷🇺' },
  { value: 'fr-FR', label: 'Français', englishName: 'French', flag: '🇫🇷' },
  { value: 'vi-VN', label: 'Tiếng Việt', englishName: 'Vietnamese', flag: '🇻🇳' },
]

export const DEFAULT_LANGUAGE = 'zh-CN'
