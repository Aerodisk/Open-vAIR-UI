<template>
  <div class="cell_progress_bar">
    <div class="text">{{ Math.round(Number(percent) || 0) }}%</div>
    <v-progress-linear :model-value="percent || 0" height="5px" rounded></v-progress-linear>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'TableCellProgressBar',
  props: {
    percent: {
      type: Number as PropType<number | string>,
      default: 0,
    },
  },
})
</script>

<style>
.cell_progress_bar .v-progress-linear {
  /*border-radius: 10px;*/
  left: 0 !important;
  transform: none !important;
}
.cell_progress_bar .v-progress-linear__determinate,
.cell_progress_bar .v-progress-linear__indeterminate {
  background: rgb(var(--v-theme-green));
}
</style>
<style scoped>
.cell_progress_bar {
  display: flex;
  align-items: center;
}
.text {
  min-width: 37px;
  color: rgb(var(--v-theme-table-body-text));
  font-size: 12px;
  line-height: 20px;
}
</style>
