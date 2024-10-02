<template>
  <svg :width="sizeValue" :height="sizeValue" :viewBox="viewboxValue" :color="color" :data-icon="name" :style="styles">
    <path :d="path" />
  </svg>
</template>

<script lang="ts">
// From npm package - "@jamescoyle/vue-icon": "^0.1.2"
import { defineComponent, type PropType } from 'vue'

const types = {
  mdi: {
    size: 24,
    viewbox: '0 0 24 24',
  },
  'simple-icons': {
    size: 24,
    viewbox: '0 0 24 24',
  },
  default: {
    size: 0,
    viewbox: '0 0 0 0',
  },
}
export default defineComponent({
  name: 'SvgIcon',
  props: {
    type: String as PropType<keyof typeof types>,
    path: { type: String, required: true },
    size: { type: [String, Number], default: 24 },
    viewbox: String,
    flip: String as PropType<'horizontal' | 'vertical' | 'both' | 'none'>,
    rotate: { type: Number, default: 0 },
    color: String,
    name: String,
  },
  computed: {
    styles() {
      return {
        '--sx': ['both', 'horizontal'].includes(this.flip || '') ? '-1' : '1',
        '--sy': ['both', 'vertical'].includes(this.flip || '') ? '-1' : '1',
        '--r': isNaN(this.rotate) ? this.rotate : this.rotate + 'deg',
      }
    },
    defaults() {
      if (!this.type) return types.default
      return types[this.type] || types.default
    },
    sizeValue() {
      return this.size || this.defaults.size
    },
    viewboxValue() {
      return this.viewbox || this.defaults.viewbox
    },
  },
})
</script>

<style scoped>
svg {
  transform: rotate(var(--r, 0deg)) scale(var(--sx, 1), var(--sy, 1));
}

path {
  fill: currentColor;
}
</style>
