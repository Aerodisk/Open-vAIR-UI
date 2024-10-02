<template>
  <svg width="76" height="56" viewBox="0 0 76 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.41067 54.7761C1.52141 49.0438 0.15201 42.6658 0.433581 36.2527C0.71515 29.8396 2.63826 23.6062 6.01879 18.1492C9.39933 12.6922 14.1241 8.19436 19.7407 5.08628C25.3574 1.97821 31.6779 0.363975 38.097 0.39813C44.5162 0.432291 50.8191 2.11369 56.4024 5.28136C61.9856 8.44903 66.6623 12.9969 69.9845 18.4896C73.3068 23.9822 75.1635 30.2358 75.3768 36.6515C75.5901 43.0672 74.1529 49.4303 71.2028 55.1315L70.2036 54.6145C73.0652 49.0843 74.4593 42.9121 74.2524 36.6889C74.0455 30.4656 72.2445 24.3997 69.0219 19.0718C65.7993 13.7439 61.263 9.33249 55.8472 6.25985C50.4315 3.18721 44.3176 1.55625 38.091 1.52312C31.8644 1.48998 25.7336 3.05579 20.2854 6.07062C14.8373 9.08546 10.2543 13.4484 6.97515 18.7417C3.69604 24.035 1.83062 30.0814 1.5575 36.3021C1.28437 42.5228 2.61269 48.7094 5.41527 54.2697L4.41067 54.7761Z"
      fill="url(#paint0_linear_1585_440386)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1585_440386"
        x1="70.4998"
        y1="55.4998"
        x2="3.49976"
        y2="21.9998"
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
  name: 'GradientTwoThirdsSvg',
  computed: {
    c() {
      const colors = this.$vuetify.theme.global.current.colors
      return { green: colors['green'] }
    },
  },
})
</script>
