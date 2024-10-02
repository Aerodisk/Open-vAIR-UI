<script lang="ts" setup>
import { Button } from '@/components/Button'
</script>

<template>
  <transition-group name="data-table-item-actions-list">
    <Button v-for="item in actionsItems" :key="item.title" size="small" variant="secondary" v-bind="item" />
  </transition-group>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { DataTableProps } from '@/components/DataTable'

export default defineComponent({
  name: 'TopItemsActions',
  props: {
    items: { type: Object as PropType<unknown[]>, required: true },
    actions: { type: Function as PropType<DataTableProps['itemActions']> },
  },
  computed: {
    actionsItems() {
      const actionsItems = this.actions?.(this.items)
      if (!actionsItems?.length || !this.items.length) return []
      return actionsItems
    },
  },
})
</script>

<style>
.data-table-item-actions-list-enter-active,
.data-table-item-actions-list-leave-active {
  transition: all 0.28s ease;
}
.data-table-item-actions-list-enter-from,
.data-table-item-actions-list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
