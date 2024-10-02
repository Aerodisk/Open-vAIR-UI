import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { plugin } from '@formkit/vue'
import 'vuetify/dist/vuetify.min.css'
import 'vuetify/styles'
import '@vuepic/vue-datepicker/dist/main.css'

import { config } from '@/components/Form'
import App from './App.vue'
import { router } from './router'
import { store } from './store'
import { theme } from './theme'
import { i18n, locale } from './locales'
import './assets/main.css'

const vuetify = createVuetify({ locale, theme })

const app = createApp(App)

app.use(router)
app.use(store)
app.use(i18n)
app.use(vuetify)
app.use(plugin, config)

app.mount('#app')
