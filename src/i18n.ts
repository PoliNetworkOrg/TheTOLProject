import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enLocale from './locales/en.json'
import itLocale from './locales/it.json'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enLocale
    },
    it: {
      translation: itLocale
    }
  },
  fallbackLng: 'it'
})

export default i18n
