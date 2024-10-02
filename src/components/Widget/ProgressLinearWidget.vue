<template>
  <div style="width: 100%">
    <div v-if="!noGradient" class="progress_linear_widget_gradient" />
    <v-progress-linear
      class="progress_linear_widget"
      :color="color"
      :data-zone="zone"
      :height="height!"
      :model-value="value as number"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

const WARN_ZONE = 60
const RED_ZONE = 85
export default defineComponent({
  name: 'ProgressLinearWidget',
  props: {
    noGradient: Boolean,
    value: {
      type: [String, Number] as PropType<number | string>,
      default: 0,
    },
    height: {
      type: [String, Number] as PropType<string | number>,
      default: '8',
    },
    color: String,
  },
  computed: {
    zone() {
      if (this.value <= WARN_ZONE) return 'green'
      else if (WARN_ZONE < this.value && this.value <= RED_ZONE) return 'warn'
      else return 'red'
    },
  },
})
</script>

<style>
.progress_linear_widget {
  border-radius: 2px;
  background-color: rgb(var(--v-theme-progress-widget-bg));
  left: 0 !important;
  transform: none !important;
}
.progress_linear_widget .v-progress-linear__background {
  background: none;
}
.progress_linear_widget[data-zone='green'] .v-progress-linear__determinate {
  background: rgb(var(--v-theme-green));
}
.progress_linear_widget[data-zone='warn'] .v-progress-linear__determinate {
  background: rgb(var(--v-theme-warn));
}
.progress_linear_widget[data-zone='red'] .v-progress-linear__determinate {
  background: rgb(var(--v-theme-red));
}
.progress_linear_widget_gradient {
  margin-bottom: 1px;
  height: 1px;
  border-radius: 1px;
  width: 100%;
  background: linear-gradient(
    90deg,
    rgb(var(--v-theme-green)) 0%,
    rgb(var(--v-theme-green)) 60%,
    rgb(var(--v-theme-warn)) 60%,
    rgb(var(--v-theme-warn)) 85%,
    rgb(var(--v-theme-red)) 85%,
    rgb(var(--v-theme-red)) 100%
  );
}
</style>
