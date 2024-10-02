<script setup lang="ts">
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { VMTable } from '../components'
</script>

<template>
  <Breadcrumbs>
    <VMTable />
  </Breadcrumbs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'VMListView' })
</script>
