<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    :color="c.color"
    stroke="currentColor"
    :fill="c.fill"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="4" y="5" width="16" height="11" rx="1" stroke-width="2" stroke-linejoin="round" />
    <path d="M9 20H15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M12 20L12 16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MonitorIcon',
  computed: {
    c() {
      const isDark = this.$vuetify.theme.global.current.dark
      const colors = this.$vuetify.theme.global.current.colors
      return { fill: isDark ? colors['sidebar-item-icon'] : colors['bg-sidebar'], color: colors['sidebar-item-icon'] }
    },
  },
})
</script>
