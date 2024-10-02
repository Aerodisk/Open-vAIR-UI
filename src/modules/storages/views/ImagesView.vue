<script setup lang="ts">
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ImagesTable } from '../components'
</script>

<template>
  <Breadcrumbs>
    <ImagesTable />
  </Breadcrumbs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'ImagesView' })
</script>
