<template>
  <svg width="24" height="24" viewBox="0 0 24 24" :stroke="c.color" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="8" transform="matrix(1 0 0 -1 4 20)" :fill="c.fill" :stroke="c.circle" />
    <path d="M12 20V18.6667M12 4V5.33333M20 12H18.6667M4 12H5.33333" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M12 8V12H14.6667" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ClockIcon',
  computed: {
    c() {
      const isDark = this.$vuetify.theme.global.current.dark
      const colors = this.$vuetify.theme.global.current.colors
      return isDark
        ? { fill: colors['sidebar-item-icon'], color: colors['bg-sidebar'], circle: colors['sidebar-item-icon'] }
        : { fill: colors['bg-sidebar'], color: colors['sidebar-item-icon'], circle: colors['sidebar-item-icon'] }
    },
  },
})
</script>
