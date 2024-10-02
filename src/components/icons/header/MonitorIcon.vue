<template>
  <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="8.04297"
      y="9"
      width="16"
      height="14"
      rx="1"
      :fill="c.fill"
      :stroke="c.color"
      stroke-width="2"
      stroke-linejoin="round"
    />
    <path
      d="M7.04297 16.4212H11.6724L12.8528 17.143L14.9887 11.4287L17.4236 20.5716L19.5595 15.4287L20.7452 16.4212H25.043"
      :stroke="c.line"
      stroke-width="2"
      stroke-linecap="square"
      stroke-linejoin="round"
    />
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
      return {
        fill: isDark ? colors['header-icon'] : colors['bg-header'],
        color: colors['header-icon'],
        line: isDark ? colors['bg-header'] : colors['header-icon'],
      }
    },
  },
})
</script>
