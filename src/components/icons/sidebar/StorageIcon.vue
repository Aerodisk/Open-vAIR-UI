<template>
  <svg width="24" height="24" viewBox="0 0 24 24" :stroke="c.color" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="12" height="4" rx="1" :fill="c.fill" />
    <rect x="6" y="12" width="12" height="4" rx="1" :fill="c.fill" />
    <path d="M10 20H14" stroke-linecap="round" />
    <path d="M12 20L12 18" stroke-linecap="round" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StorageIcon',
  computed: {
    c() {
      const isDark = this.$vuetify.theme.global.current.dark
      const colors = this.$vuetify.theme.global.current.colors
      return { fill: isDark ? colors['sidebar-item-icon'] : colors['bg-sidebar'], color: colors['sidebar-item-icon'] }
    },
  },
})
</script>
