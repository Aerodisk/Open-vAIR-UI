<script setup lang="ts">
import { Icon } from '@/components/Icon'
</script>

<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn class="table_rowsPerPage_button btn_icon_right" variant="text" size="small" v-bind="props">
        {{ $tc('dataTable.rowsPerPage', value) }}
        <!--        <MenuButtonChevronIcon />-->
        <Icon icon="chevronDown" size="xsmall" style="transform: translateY(1px)" />
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="option in rowsPerPageOptions"
        :key="option"
        :value="option"
        :active="option === value"
        @click="value = option"
      >
        <v-list-item-title>{{ option }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'DataTableRowsPerPageMenu',
  props: { modelValue: Number, rowsPerPageOptions: Array as PropType<number[]> },
  emits: ['update:modelValue'],
  computed: {
    value: {
      get(): number {
        return Number(this.modelValue)
      },
      set(value: number) {
        this.$emit('update:modelValue', value)
      },
    },
  },
})
</script>
