import { createI18n } from 'vue-i18n'
import type { I18n, LocaleMessages } from 'vue-i18n'
import km from './km.json'
import en from './en.json'

type MessageSchema = typeof en

const savedLanguage = localStorage.getItem('lang') || 'en'

const messages = {
  en,
  km,
} as const

const i18n = createI18n<[MessageSchema], 'en' | 'km'>({
  legacy: false,
  globalInjection: true,
  locale: savedLanguage,
  fallbackLocale: 'km',
  messages,
})

export default i18n
