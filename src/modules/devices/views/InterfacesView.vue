<script setup lang="ts">
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { InterfacesTable } from '../components'
</script>

<template>
  <Breadcrumbs>
    <InterfacesTable />
  </Breadcrumbs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'InterfacesView' })
</script>
