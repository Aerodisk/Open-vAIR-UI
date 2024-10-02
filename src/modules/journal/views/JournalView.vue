<script setup lang="ts">
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { JournalTable } from '../components'
</script>

<template>
  <Breadcrumbs>
    <JournalTable />
  </Breadcrumbs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'JournalView' })
</script>
