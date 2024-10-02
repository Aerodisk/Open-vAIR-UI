import { computed } from 'vue'
import type { LocaleOptions, RtlOptions } from 'vuetify'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { createI18n, useI18n } from 'vue-i18n'

import { getLocalStorage } from '@helpers/localStorageHelpers'

import { en } from './en'
import { ru } from './ru'
import { pluralizationRules } from './plural'

type MessageSchema = typeof ru

export * from './en'
export * from './ru'

export const defaultLocale =
  getLocalStorage('ui_settings')?.locale || window.navigator.language.startsWith('ru-') ? 'ru' : 'en'

// regexp кириллица [а-яё]
export const i18n = createI18n<[MessageSchema], 'ru' | 'en', false>({
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  globalInjection: true,
  messages: { en, ru },
  pluralizationRules,
})

export const locale: LocaleOptions & RtlOptions = {
  // @ts-ignore
  adapter: createVueI18nAdapter({ i18n, useI18n }),
}

export const t = i18n.global.t

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const compT = (key: string, params?: any) => computed(() => t(key, params))
