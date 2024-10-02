<template>
  <svg width="75" height="38" viewBox="0 0 75 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 37.5C0 32.5754 0.969963 27.6991 2.85452 23.1494C4.73907 18.5997 7.5013 14.4657 10.9835 10.9835C14.4657 7.5013 18.5997 4.73907 23.1494 2.85452C27.6991 0.969963 32.5754 0 37.5 0C42.4246 0 47.3009 0.969963 51.8506 2.85452C56.4003 4.73907 60.5343 7.5013 64.0165 10.9835C67.4987 14.4657 70.2609 18.5997 72.1455 23.1494C74.03 27.6991 75 32.5754 75 37.5H73.875C73.875 32.7232 72.9341 27.9931 71.1061 23.5799C69.2781 19.1667 66.5987 15.1567 63.221 11.779C59.8433 8.40126 55.8333 5.7219 51.4201 3.89388C47.0069 2.06586 42.2768 1.125 37.5 1.125C32.7232 1.125 27.9931 2.06586 23.5799 3.89388C19.1667 5.72189 15.1567 8.40126 11.779 11.779C8.40126 15.1567 5.7219 19.1667 3.89388 23.5799C2.06586 27.9931 1.125 32.7232 1.125 37.5H0Z"
      fill="url(#paint0_linear_1178_290735)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1178_290735"
        x1="75"
        y1="38.0137"
        x2="0"
        y2="38.0137"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#F14E46" />
        <stop offset="0.0833333" stop-color="#F14E46" />
        <stop offset="0.119792" stop-color="#DE9F41" />
        <stop offset="0.375" stop-color="#DE9F41" />
        <stop offset="0.4375" :stop-color="c.green" />
        <stop offset="1" :stop-color="c.green" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GradientHalfSvg',
  computed: {
    c() {
      const colors = this.$vuetify.theme.global.current.colors
      return { green: colors['green'] }
    },
  },
})
</script>
