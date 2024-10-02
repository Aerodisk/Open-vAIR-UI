<script setup lang="ts">
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { StoragesTable } from '../components'
</script>

<template>
  <Breadcrumbs>
    <StoragesTable />
  </Breadcrumbs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'StoragesView' })
</script>
