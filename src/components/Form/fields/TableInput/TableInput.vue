<script setup lang="ts">
import DataTable from '@/components/DataTable'
import { InputWrapper } from '../InputWrapper'
</script>

<template>
  <InputWrapper>
    <DataTable
      :headers="headers"
      :items="items"
      :selected="selected"
      @update:selected="selectUpdateHandler"
      v-bind="props"
      clickable
    />
  </InputWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isArray, isEqual, last, pick, without } from 'lodash'
import type { PropType } from 'vue'
import type { FormKitFrameworkContext } from '@formkit/core'
import type { TableFieldType } from '@/components/Form/types'

type TableProps = {
  items: Exclude<TableFieldType['items'], Function>
} & Omit<TableFieldType, 'items'>
export default defineComponent({
  name: 'TableInput',
  props: { context: { type: Object as PropType<FormKitFrameworkContext & TableProps>, required: true } },
  watch: {
    items(i: TableProps['items']) {
      const itemValue = this.context.itemValue || 'id'
      const items = i.map(i => (i as { [key: string]: unknown })[itemValue])
      const diff = this.selected.map(i => (items.includes(i) ? null : i)).filter(Boolean)
      if (diff.length) this.handleInput(without(this.selected, ...diff))
    },
  },
  computed: {
    props() {
      return pick(this.context, ['itemValue', 'short', 'multiple', 'onRefresh'])
    },
    headers() {
      return this.context.headers
    },
    items() {
      return this.context.attrs.items
    },
    required() {
      return !!this.context.node.props.parsedRules.find((i: { name: string }) => i.name === 'required')
    },
    disabled(): boolean {
      return !!this.context.disabled
    },
    selected() {
      const value = this.context.value
      return isArray(value) ? value : value ? [value] : []
    },
  },
  methods: {
    handleInput(value: unknown) {
      return this.context.node.input(value)
    },
    async selectUpdateHandler(v: string[]) {
      if (this.disabled || isEqual(v, this.selected)) return

      if (this.context.multiple === false) await this.handleInput(last(v))
      else await this.handleInput(v)

      setTimeout(() => this.$props.context.handlers.blur())
    },
  },
})
</script>
