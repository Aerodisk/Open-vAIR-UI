<script setup lang="ts">
import { UISettings } from '../components/UISettings'
</script>

<template>
  <div>
    <div class="title">{{ $t('settings.settings') }}</div>
    <div class="container">
      <UISettings />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'SettingsView' })
</script>

<style scoped>
.title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 24px;
}
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 24px;
}
.container > div {
  padding: 24px;
  border-radius: 5px;
  background-color: rgb(var(--v-theme-card-bg));
  transition: background-color 0.28s;
  width: 300px;
}
</style>
