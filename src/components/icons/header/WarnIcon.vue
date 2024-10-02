<template>
  <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="8.79297"
      y="8.75"
      width="14.5"
      height="14.5"
      rx="2.25"
      :fill="c.fill"
      :stroke="c.color"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      d="M16.043 11.2861V16.8454M16.043 20.731V20.9667"
      :stroke="c.line"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WarnIcon',
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

<style scoped></style>
