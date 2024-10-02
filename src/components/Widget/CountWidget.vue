<template>
  <div class="count-widget">
    <div class="count-widget-count">{{ count }}</div>
    <div class="count-widget-text">{{ text }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'CountWidget',
  props: {
    count: [Number, String] as PropType<string | number>,
    text: String,
  },
})
</script>

<style scoped>
.count-widget {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.count-widget-count {
  font-size: 24px;
  line-height: 20px;
  color: rgb(var(--v-theme-dashboard-widget-text2));
}
.count-widget-text {
  font-size: 14px;
  line-height: 20px;
  color: rgb(var(--v-theme-dashboard-widget-text));
  white-space: pre-line;
  text-align: center;
}
</style>
