<script setup lang="ts">
import { Icon } from '@/components/Icon'

import Chip from './MultiselectInputChip.vue'
import { InputWrapper } from '../InputWrapper'
</script>

<template>
  <InputWrapper>
    <v-menu :disabled="disabled" :close-on-content-click="false" v-model="open" max-height="400px">
      <template #activator="{ props }">
        <div
          data-type="multiselect"
          class="formkit-input"
          :class="{ _placeholder: !selectedOptions.length, _disabled: disabled }"
          :tabindex="disabled ? undefined : 1"
          v-bind="props"
        >
          <Chip v-for="option in selectedOptions" :key="option.label" :option="option" @remove="handleInput(option)" />
          <input
            v-if="open"
            v-model="search"
            ref="searchInput"
            :placeholder="$t('formkit.inputs.select.optionSearch')"
            type="text"
            class="select_search"
            @click.stop="null"
          />
          <div v-else-if="!open && !selectedOptions.length">
            <span>{{ $props.context.attrs.placeholder }}</span>
          </div>
          <Icon icon="chevronDown" size="xsmall" />
        </div>
      </template>
      <v-list class="formkit-select-options-list multiselect scrollbar">
        <v-list-item
          v-for="option in filteredOptions"
          :key="option.label"
          @mousedown.prevent.stop="null"
          @click.prevent.stop="handleInput(option)"
        >
          <Icon v-if="option.selected" icon="minus" size="xsmall" />
          <Icon v-else icon="plus" size="xsmall" />
          <v-list-item-title>
            {{ option.label }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item v-if="filteredOptions.length === 0" class="empty_item" @click.prevent.stop="null">
          <v-list-item-title>{{ $t('formkit.inputs.select.noElements') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </InputWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { isEqual } from 'lodash'
import type { FormKitFrameworkContext } from '@formkit/core'
import type { SelectOption } from '../../types'
import type { SelectOptionExt } from './types'

export default defineComponent({
  name: 'MultiSelectInput',
  props: { context: { type: Object as PropType<FormKitFrameworkContext>, required: true } },
  data() {
    return { open: false, search: '' }
  },
  computed: {
    options(): SelectOptionExt[] {
      return (this.$props.context.options || [])
        ?.map(i => ({ label: i.label, value: i.__original || i.value }))
        .map(i => ({ ...i, selected: !!this.value?.find(value => value === i.value) }))
    },
    filteredOptions() {
      return this.options.filter(i => i.label.includes(this.search))
    },
    selectedOptions() {
      return this.options.filter(i => i.selected)
    },
    value(): SelectOption[] {
      return this.$props.context.value || []
    },
    disabled() {
      return !!this.$props.context.disabled
    },
    required() {
      return !!this.$props.context.node.props.parsedRules.find((i: { name: string }) => i.name === 'required')
    },
  },
  watch: {
    selectedOptions(value: SelectOptionExt[]) {
      const selected = value.map(i => i.value)
      if (!isEqual(selected, this.value)) this.$props.context.node.input(selected)
    },
    async open(v: boolean) {
      if (v) {
        await this.$nextTick()
        const input = this.$refs.searchInput as HTMLInputElement
        input?.focus()
        this.handleFocus()
      } else {
        this.handleBlur()
        setTimeout(() => (this.search = ''), 180)
      }
    },
  },
  methods: {
    handleInput({ value, selected }: SelectOptionExt) {
      if (this.disabled) return
      if (selected) this.$props.context.node.input(this.value.filter(i => i !== value))
      else this.$props.context.node.input([...this.value, value])
    },
    handleFocus() {
      if (this.disabled) return
      this.$props.context.handlers.touch()
    },
    handleBlur() {
      if (this.disabled) return
      this.$props.context.handlers.blur()
    },
  },
})
</script>
