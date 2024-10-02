<script setup lang="ts">
import { routes } from '@/router/routes'
import { AppLogo } from '@icons/logo'
import { HeaderAccountButton, HeaderSearch, HeaderSettingsButton, HeaderNotifications } from './components'
</script>

<template>
  <header class="header theme-transition">
    <div class="header_logo">
      <RouterLink :to="routes.root">
        <AppLogo style="width: 120px" :style="{ color: logoColor }" />
      </RouterLink>
    </div>
    <HeaderNotifications />
    <div class="flex-grow-1 justify-space-between">
      <HeaderSettingsButton />
      <HeaderSearch />
    </div>
    <HeaderAccountButton />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppHeader',
  computed: {
    logoColor() {
      const colors = this.$vuetify.theme.global.current.colors
      const isDark = this.$vuetify.theme.global.current.dark
      return isDark ? 'white' : colors.primary
    },
  },
})
</script>
