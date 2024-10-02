<script lang="ts" setup>
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { SessionsTable } from '../components'
</script>

<template>
  <Breadcrumbs>
    <SessionsTable />
  </Breadcrumbs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'BlockDevicesView' })
</script>
