<script setup lang="ts">
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { VolumesTable } from '../components'
</script>

<template>
  <Breadcrumbs>
    <VolumesTable />
  </Breadcrumbs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'VolumesView' })
</script>
