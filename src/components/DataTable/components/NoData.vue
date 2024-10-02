<script setup lang="ts">
import NoDataIcon from '@icons/table/NoDataIcon.vue'
</script>

<template>
  <div class="wrapper">
    <div class="text">{{ $t('dataTable.noData') }}</div>
    <NoDataIcon width="24" height="18" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'DataTableNoData' })
</script>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 30px 0;
}
*.v-theme--dark .wrapper svg {
  fill: rgb(var(--v-theme-table-head-text));
  stroke: rgb(var(--v-theme-table-head-text));
  color: rgb(var(--v-theme-table-bg-head));
}
*.v-theme--light .wrapper svg {
  fill: rgb(var(--v-theme-table-bg-head));
  stroke: rgb(var(--v-theme-table-head-text));
  color: rgb(var(--v-theme-table-head-text));
}
.text {
  font-size: 12px;
  line-height: 20px;
  color: rgb(var(--v-theme-table-head-text));
}
</style>
