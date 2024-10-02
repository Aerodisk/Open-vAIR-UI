<script setup lang="ts">
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { LocalDisksTable } from '../components'
</script>

<template>
  <Breadcrumbs>
    <LocalDisksTable />
  </Breadcrumbs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'LocalDisksView' })
</script>
