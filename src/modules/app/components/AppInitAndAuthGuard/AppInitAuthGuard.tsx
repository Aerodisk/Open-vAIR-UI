import { defineComponent } from 'vue'
import { VProgressCircular } from 'vuetify/components'

import { AppActionTypes } from '@/store'
import { AppLogo } from '@icons/logo'

import { LoginForm } from '../LoginForm'
import AppInitBackground from './AppInitBackground.vue'

export const AppInitAuthGuard = defineComponent({
  name: 'AppInitAuthGuard',
  created() {
    if (this.isAuth) this.$store.dispatch(AppActionTypes.INIT, undefined)
  },
  computed: {
    isAppReady() {
      return this.$store.getters.isAppReady
    },
    isAuth() {
      return this.$store.getters.isAuth
    },
  },
  render() {
    if (!this.isAppReady)
      return (
        <AppInitBackground>
          {!this.isAuth ? (
            <LoginForm />
          ) : (
            <>
              <AppLogo class='mb-4' style={{ width: '280px' }} />
              <VProgressCircular indeterminate color='#466ED4' />
            </>
          )}
        </AppInitBackground>
      )

    return this.$slots.default?.()
  },
})
