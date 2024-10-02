<script setup lang="ts">
import { VProgressCircular } from 'vuetify/components'
import GradientHalfSvg from './GradientHalfSvg.vue'
import GradientTwoThirdsSvg from './GradientTwoThirdsSvg.vue'
</script>

<template>
  <div :class="modeClass" :data-zone="zone" class="progress-ellipse-widget">
    <VProgressCircular
      class="progress-ellipse-widget_circle"
      :rotate="rotate"
      :model-value="compValue"
      :size="dimensions.size"
      :width="dimensions.width"
    />
    <div class="gradient" v-if="variant !== 'default'">
      <GradientHalfSvg v-if="variant === 'half'" />
      <GradientTwoThirdsSvg v-else />
    </div>
    <div class="progress-ellipse-widget-text">
      <div class="progress-ellipse-widget-title">{{ title }}</div>
      <div class="progress-ellipse-widget-subtitle">{{ subtitle }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

const WARN_ZONE = 67
const RED_ZONE = 86
export default defineComponent({
  name: 'ProgressEllipseWidget',
  props: {
    variant: {
      type: String as PropType<'default' | 'half' | 'two-thirds'>,
      default: 'default',
    },
    title: [String, Number] as PropType<string | number>,
    subtitle: [String, Number] as PropType<string | number>,
    value: {
      type: Number,
      default: 0,
    },
    size: {
      type: String as PropType<'medium' | 'big'>,
      default: 'medium',
    },
  },
  computed: {
    dimensions() {
      if (this.size === 'medium') return { size: 71, width: 6 }
      return { size: 90, width: 10 }
    },
    rotate() {
      if (this.variant === 'half') return -90
      else if (this.variant === 'two-thirds') return -115
      return 0
    },
    compValue() {
      if (this.variant === 'half') return this.value / 2
      else if (this.variant === 'two-thirds' && this.size === 'medium') return this.value / 1.5847860538827259
      else if (this.variant === 'two-thirds' && this.size === 'big') return this.value / 1.5625
      return this.value
    },
    zone() {
      if (this.value <= WARN_ZONE) return 'green'
      else if (WARN_ZONE < this.value && this.value <= RED_ZONE) return 'warn'
      else return 'red'
    },
    modeClass() {
      const v = this.variant
      return {
        _half: v === 'half',
        _two_thirds: v === 'two-thirds',
        _default: v === 'default',
        [`_${this.size}`]: true,
      }
    },
  },
})
</script>

<style>
.progress-ellipse-widget_circle .v-progress-circular__underlay {
  color: rgb(var(--v-theme-progress-widget-bg));
}
.progress-ellipse-widget {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.progress-ellipse-widget._big {
  height: 96px;
  width: 96px;
  min-width: 96px;
}
.progress-ellipse-widget._medium {
  height: 75px;
  width: 75px;
  min-width: 75px;
}
.progress-ellipse-widget-text {
  position: absolute;
  top: 25px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: center;
  z-index: 3;
}
.progress-ellipse-widget._big .progress-ellipse-widget-text {
  top: 35px;
}
.progress-ellipse-widget-title {
  font-size: 22px;
  line-height: 20px;
  color: rgb(var(--v-theme-dashboard-widget-text));
}
.progress-ellipse-widget-subtitle {
  font-size: 14px;
  line-height: 20px;
  margin-top: 6px;
  color: rgb(var(--v-theme-dashboard-widget-text2));
}
.progress-ellipse-widget._big .progress-ellipse-widget-subtitle {
  margin-top: 12px;
}
.gradient {
  position: absolute;
  top: 0;
  left: 0;
}
.progress-ellipse-widget._big .gradient {
  left: -17px;
}
.progress-ellipse-widget._big .gradient svg {
  width: 130px;
  height: 71px;
}
.progress-ellipse-widget._medium .gradient svg {
  width: 76px;
  height: 56px;
}

.progress-ellipse-widget._default .progress-ellipse-widget-text {
  top: 20px;
}

.progress-ellipse-widget._half:before {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 50%;
  top: 50%;
  background-color: rgb(var(--v-theme-dashboard-widget-bg));
  z-index: 1;
}

.progress-ellipse-widget._two_thirds:before,
.progress-ellipse-widget._two_thirds:after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 50%;
  background-color: rgb(var(--v-theme-dashboard-widget-bg));
  z-index: 1;
}
.progress-ellipse-widget._two_thirds:before {
  bottom: -22px;
  left: -1px;
  transform: rotate(-117deg);
}
.progress-ellipse-widget._big._two_thirds:before {
  bottom: -28px;
}
.progress-ellipse-widget._two_thirds:after {
  bottom: -21px;
  right: -1.5px;
  transform: rotate(117deg);
}
.progress-ellipse-widget._big._two_thirds:after {
  bottom: -30px;
}

.progress-ellipse-widget[data-zone='green'] .v-progress-circular svg {
  color: rgb(var(--v-theme-green));
}
.progress-ellipse-widget[data-zone='warn'] .v-progress-circular svg {
  color: rgb(var(--v-theme-warn));
}
.progress-ellipse-widget[data-zone='red'] .v-progress-circular svg {
  color: rgb(var(--v-theme-red));
}
</style>
