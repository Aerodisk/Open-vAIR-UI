<script setup lang="ts">
import { capitalize } from 'vue'
import { Icon } from '@/components/Icon'
</script>

<template>
  <div class="d-flex align-center">
    <Icon v-if="value" icon="check" color="success" size="xsmall" />
    <Icon v-else icon="close" color="error" size="xsmall" />
    <span class="text">
      {{ capitalize(val ? $t('yes') : $t('no')) }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'TableCellBoolean',
  props: {
    value: undefined as unknown as PropType<string | boolean | number>,
  },
  computed: {
    val() {
      if (typeof this.value === 'string') return this.value.toLowerCase() === 'true'

      return this.value
    },
  },
})
</script>

<style scoped>
.text {
  margin-left: 4px;
  font-size: 13px;
  line-height: 20px;
  color: rgb(var(--v-theme-table-body-text));
}
</style>
