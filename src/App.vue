<script setup lang="ts">
import { Header, Sidebar } from '@/components/layout'
import { HookedModalConfirm } from '@/components/Modal'
import { KeyboardListener } from '@/components/KeyboardListener'
import { Snackbar } from '@/components/Snackbar'
import { AppInitAuthGuard, TransitionRouterView } from '@/modules/app'
</script>

<template>
  <v-app class="theme-transition">
    <AppInitAuthGuard>
      <div class="app-layout">
        <Header />
        <Sidebar />
        <main class="content scrollbar">
          <TransitionRouterView />
        </main>
      </div>
      <HookedModalConfirm />
      <KeyboardListener />
      <Snackbar />
    </AppInitAuthGuard>
  </v-app>
</template>
