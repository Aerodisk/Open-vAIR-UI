<script setup lang="ts">
const OLD_VERSION_LINK = window.origin
</script>

<template>
  <a class="old-version-link" :class="{ 'link-login-screen': loginScreen }" :href="OLD_VERSION_LINK">
    {{ $t('settings.oldVersion') }}
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'OldVersionLink', props: { loginScreen: Boolean } })
</script>

<style scoped>
.old-version-link.link-login-screen {
  position: absolute;
  top: 0;
  right: 0;
  background: #111822;
  padding: 8px;
  border-radius: 0 0 10px 10px;
}
.old-version-link {
  width: fit-content;
  display: block;
  text-decoration-color: transparent;
  color: white;
  transition: opacity 0.28s, text-decoration-color 0.28s;
  opacity: 0.5;
}
.old-version-link:hover {
  opacity: 0.8;
  text-decoration-color: white;
}
</style>
