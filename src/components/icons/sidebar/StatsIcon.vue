<template>
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    :color="c.color"
    stroke="currentColor"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.90137 19H6.56803H10.6514L14.568 19H18.2347H21.9014"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M6.15137 13.375L6.15137 19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M10.6514 11.125L10.6514 19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M15.1514 8.875L15.1514 19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M19.6514 11.125V18.4018" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StatsIcon',
  computed: {
    c() {
      const colors = this.$vuetify.theme.global.current.colors
      return { color: colors['sidebar-item-icon'] }
    },
  },
})
</script>
