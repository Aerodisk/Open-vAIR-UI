import { defineComponent } from 'vue'
import { FormKit } from '@formkit/vue'
import { keys } from 'lodash'

import { getLocalStorage, setLocalStorage } from '@helpers'
import { AppMutationTypes } from '@/store'

export const UISettings = defineComponent({
  name: 'UISettings',
  computed: {
    ui_settings() {
      return getLocalStorage('ui_settings')
    },
    locale: {
      get() {
        return this.$i18n.locale
      },
      set(locale: 'ru' | 'en') {
        setLocalStorage('ui_settings', { ...this.ui_settings, locale })
        this.$i18n.locale = locale
        this.$formkit.setLocale(locale)
      },
    },
    locales() {
      return keys(this.$vuetify.locale.messages).map(i => ({ label: this.$t(`settings.locales.${i}`), value: i }))
    },
    theme: {
      get() {
        return this.$vuetify.theme.global.name
      },
      set(theme: 'dark' | 'light') {
        setLocalStorage('ui_settings', { ...this.ui_settings, theme })
        // @ts-ignore $vuetify.theme.global.name is not read-only property
        this.$vuetify.theme.global.name = theme
      },
    },
    themes() {
      return keys(this.$vuetify.theme.themes).map(i => ({ label: this.$t(`settings.themes.${i}`), value: i }))
    },
    sizeNotation: {
      get() {
        return this.$store.state.app.settings.sizeNotation
      },
      set(sizeNotation: 'si' | 'iec') {
        return this.$store.commit(AppMutationTypes.SET_SETTINGS, { sizeNotation })
      },
    },
  },
  render() {
    return (
      <div>
        <div>{this.$t('settings.interfaceSettings')}</div>
        <FormKit
          label={this.$t('settings.theme')}
          type='select'
          options={this.themes}
          modelValue={this.theme}
          onUpdate:modelValue={v => (this.theme = v as string)}
          validation='required'
        />
        <FormKit
          label={this.$t('settings.locale')}
          type='select'
          options={this.locales}
          modelValue={this.locale}
          onUpdate:modelValue={v => (this.locale = v as string)}
          validation='required'
        />
        <FormKit
          label={this.$t('settings.sizeNotation')}
          type='select'
          help={this.$t(`settings.sizeNotationsDesc.${this.sizeNotation}`)}
          modelValue={this.sizeNotation}
          onUpdate:modelValue={e => (this.sizeNotation = e as 'si' | 'iec')}
          options={[
            { value: 'si', label: this.$t('settings.sizeNotations.si') },
            { value: 'iec', label: this.$t('settings.sizeNotations.iec') },
          ]}
          validation='required'
        />
      </div>
    )
  },
})
