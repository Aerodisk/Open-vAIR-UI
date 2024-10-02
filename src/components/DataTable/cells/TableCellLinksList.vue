<script setup lang="ts">
import { Collapse } from '@/components/Collapse'
</script>

<template>
  <RouterLink
    @click.stop="null"
    v-for="{ link, label } in items.slice(0, 5)"
    :key="label"
    :to="link"
    class="data-table-link-cell"
    >{{ label }}</RouterLink
  >
  <Collapse v-model="collapse">
    <RouterLink
      @click.stop="null"
      v-for="{ link, label } in items.slice(5)"
      :key="label"
      :to="link"
      class="data-table-link-cell"
      >{{ label }}</RouterLink
    >
  </Collapse>
  <div v-if="items.length > 10" @click="toggle" class="data-table-link-cell-btn">
    {{ collapse ? '...' : $t('dataTable.cells.linksList.collapse') }}
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'TableCellLinksList',
  props: {
    items: {
      type: Array as PropType<{ link: string; label: string }[]>,
      required: true,
    },
  },
  data() {
    return { collapse: true }
  },
  methods: {
    toggle() {
      this.collapse = !this.collapse
    },
  },
})
</script>

<style scoped>
.data-table-link-cell {
  color: rgb(var(--v-theme-table-cell-link));
  text-decoration: none;
  transition: opacity 0.28s;
}
.data-table-link-cell-btn {
  display: inline-block;
  cursor: pointer;
}
.data-table-link-cell:hover,
.data-table-link-cell-btn:hover {
  opacity: 0.75;
}
.data-table-link-cell + .data-table-link-cell:before {
  content: ', ';
}
</style>
