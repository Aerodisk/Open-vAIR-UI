import type { VuetifyOptions } from 'vuetify'
import { getLocalStorage } from '@helpers/localStorageHelpers'

import { light } from './light'
import { dark } from './dark'
import { darkBlue } from './darkBlue'

export const theme: VuetifyOptions['theme'] = {
  defaultTheme: getLocalStorage('ui_settings')?.theme || 'darkBlue',
  themes: { dark, light, darkBlue },
}
