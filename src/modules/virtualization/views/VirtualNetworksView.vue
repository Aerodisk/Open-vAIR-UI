<script setup lang="ts">
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { VirtualNetworksTable } from '../components'
</script>

<template>
  <Breadcrumbs>
    <VirtualNetworksTable />
  </Breadcrumbs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'VirtualNetworksView' })
</script>
