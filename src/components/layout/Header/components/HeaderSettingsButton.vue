<script setup lang="ts">
import { SettingsIcon } from '@icons/header'
import { routes } from '@/router/routes'
</script>

<template>
  <v-btn
    size="small"
    variant="text"
    style="height: 32px; padding: 0; margin-left: -4px"
    @click="$router.push(routes.settings.root)"
  >
    <SettingsIcon />
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'HeaderSettingsButton' })
</script>
