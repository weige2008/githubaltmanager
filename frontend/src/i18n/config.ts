import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { DEFAULT_LANGUAGE } from './languages'
import zhCN from './locales/zh-CN.json'
import enUS from './locales/en-US.json'
import jaJP from './locales/ja-JP.json'
import ruRU from './locales/ru-RU.json'
import frFR from './locales/fr-FR.json'
import viVN from './locales/vi-VN.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'zh-CN': { translation: zhCN },
      'en-US': { translation: enUS },
      'ja-JP': { translation: jaJP },
      'ru-RU': { translation: ruRU },
      'fr-FR': { translation: frFR },
      'vi-VN': { translation: viVN },
    },
    fallbackLng: DEFAULT_LANGUAGE,
    lng: DEFAULT_LANGUAGE,
    load: 'currentOnly',
    nsSeparator: false,
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'gam-language',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
