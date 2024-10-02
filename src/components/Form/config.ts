import { defaultConfig, plugin } from '@formkit/vue'
import { ru as defaultRu, en as defaultEn } from '@formkit/i18n'
import type { FormKitLocale } from '@formkit/i18n'

import { ru, en, defaultLocale } from '@/locales'
import { select, multiselect, checkbox, radio, table, custom, file, text, textarea, number, size, date } from './fields'
import { ip, mac, uniq, multipleOf, name, login } from './validations'

const inputs = {
  select,
  multiselect,
  checkbox,
  radio,
  table,
  custom,
  file,
  text,
  textarea,
  number,
  size,
  date,
}

export const rules = { ip, mac, uniq, multipleOf, name, login }

export const config = defaultConfig({
  rules,
  inputs,
  locales: { ru: defaultRu, en: defaultEn },
  locale: defaultLocale,
  messages: {
    en: en.formkit as unknown as Partial<FormKitLocale>,
    ru: ru.formkit as unknown as Partial<FormKitLocale>,
  },
})

export const form = [plugin, config]
