<template>
  <svg width="24" height="24" viewBox="0 0 24 24" :stroke="c.color" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="7" width="16" height="12" rx="1" :fill="c.fill" :stroke="c.color2" />
    <path d="M7.2002 10H16.8002" stroke-linecap="round" />
    <path d="M7.2002 13H16.8002" stroke-linecap="round" />
    <path d="M7.2002 16H16.8002" stroke-linecap="round" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'JournalIcon',
  computed: {
    c() {
      const isDark = this.$vuetify.theme.global.current.dark
      const colors = this.$vuetify.theme.global.current.colors
      return {
        fill: isDark ? colors['sidebar-item-icon'] : colors['bg-sidebar'],
        color: isDark ? colors['bg-sidebar'] : colors['sidebar-item-icon'],
        color2: colors['sidebar-item-icon'],
      }
    },
  },
})
</script>
