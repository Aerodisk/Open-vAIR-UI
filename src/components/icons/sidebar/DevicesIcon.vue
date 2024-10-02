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
    <circle cx="19" cy="6" r="2" />
    <circle cx="12" cy="13" r="3" />
    <circle cx="4.5" cy="12.5" r="1.5" />
    <path d="M6 12.5L9 13M14 11L17.5 7.5" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DevicesIcon',
  computed: {
    c() {
      const isDark = this.$vuetify.theme.global.current.dark
      const colors = this.$vuetify.theme.global.current.colors
      return { fill: isDark ? colors['sidebar-item-icon'] : colors['bg-sidebar'], color: colors['sidebar-item-icon'] }
    },
  },
})
</script>
