import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enLocale from './locales/en.json'
import itLocale from './locales/it.json'
import { STORAGE } from './utils/constants'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enLocale
      },
      it: {
        translation: itLocale
      }
    },
    fallbackLng: 'it',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: STORAGE.LANG,
      caches: ['localStorage']
    }
  })

export default i18n
