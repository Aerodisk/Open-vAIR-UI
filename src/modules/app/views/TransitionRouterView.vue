<template>
  <router-view v-slot="{ Component }">
    <transition name="fade-slide">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'TransitionRouterView' })
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: transform 0.15s ease-out, opacity 0.15s ease-out;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  transform: translateX(3%);
  opacity: 0;
}
.fade-slide-leave-to {
  position: absolute;
  width: calc(100% - 24px) !important;
  height: calc(100% - 24px) !important;
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
