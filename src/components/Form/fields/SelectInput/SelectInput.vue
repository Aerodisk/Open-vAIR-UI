<script setup lang="ts">
import { Icon } from '@/components/Icon'
import { InputWrapper } from '../InputWrapper'
</script>

<template>
  <InputWrapper>
    <v-menu :disabled="disabled" v-model="open" max-height="400px">
      <template #activator="{ props }">
        <div
          data-type="select"
          class="formkit-input"
          :class="{ _placeholder: !selectedOption, _disabled: disabled }"
          :tabindex="disabled ? undefined : 1"
          v-bind="props"
        >
          <input
            v-if="open"
            v-model="search"
            :placeholder="$t('formkit.inputs.select.optionSearch')"
            ref="searchInput"
            type="text"
            class="select_search"
          />
          <div v-else>
            {{ selectedOption?.label || $props.context.attrs.placeholder }}
          </div>
          <Icon icon="chevronDown" size="xsmall" />
        </div>
      </template>
      <v-list class="formkit-select-options-list scrollbar">
        <v-list-item v-if="!required && filteredOptions.length !== 0" @click="handleInput(null)" class="empty_item">
          <v-list-item-title>{{ $t('formkit.inputs.select.empty') }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-for="option in filteredOptions"
          :key="option.value"
          :data-disabled="option.disabled"
          @click="!option.disabled && handleInput(option)"
          class="d-flex"
        >
          <v-list-item-title>{{ option.label }}</v-list-item-title>
          <div class="formkit-select-option-hint" v-if="option.hint">
            <Icon icon="helpCircleOutline" size="xsmall" color="#969696" />
            <v-tooltip activator="parent" location="top">{{ option.hint }}</v-tooltip>
          </div>
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
import type { FormKitFrameworkContext } from '@formkit/core'
import type { SelectOption } from '@/components/Form'

export default defineComponent({
  name: 'SelectInput',
  props: { context: { type: Object as PropType<FormKitFrameworkContext>, required: true } },
  watch: {
    selectedOption(value) {
      if (!value && !!this.value) this.handleInput(null)
    },
    async open(v: boolean) {
      if (v) {
        await this.$nextTick()
        const input = this.$refs.searchInput as HTMLInputElement
        input?.focus()
        this.handleFocus()
      } else {
        setTimeout(() => (this.search = ''), 180)
        this.handleBlur()
      }
    },
  },
  data() {
    return { open: false, search: '' }
  },
  computed: {
    selectedOption() {
      return this.options.find(option => option.value === this.value)
    },
    options(): SelectOption[] {
      return (this.$props.context.options || []).map(i => ({ ...i, value: i.__original || i.value }))
    },
    filteredOptions() {
      return this.options.filter(i => i.label.toLowerCase().includes(this.search.toLowerCase()))
    },
    value() {
      return this.$props.context.value
    },
    required() {
      return !!this.$props.context.node.props.parsedRules.find((i: { name: string }) => i.name === 'required')
    },
    disabled(): boolean {
      return !!this.$props.context.disabled
    },
  },
  methods: {
    handleInput(option: SelectOption | null) {
      if (!option) return this.$props.context.node.input(null)
      if (this.disabled || option.disabled) return
      this.$props.context.node.input(option.value)
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
