<script setup lang="ts">
import { Icon } from '@/components/Icon'
import { InputWrapper } from '../InputWrapper'
</script>

<template>
  <InputWrapper>
    <div
      v-for="option in options"
      :key="option.label"
      class="formkit-input-radio-option"
      :data-disabled="option.disabled"
      data-type="radio"
    >
      <div class="formkit-input-radio" @click="!option.disabled && handleInput(option.value)">
        <div class="formkit-radio" :data-checked="option.value === value" />
        <span class="formkit-radio-label">{{ option.label }}</span>
        <div class="formkit-radio-option-hint" v-if="option.hint">
          <Icon icon="helpCircleOutline" size="xsmall" color="#969696" />
          <v-tooltip activator="parent" location="top">{{ option.hint }}</v-tooltip>
        </div>
      </div>
      <div class="formkit-radio-help" v-if="option.help">{{ option.help }}</div>
    </div>
  </InputWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { FormKitFrameworkContext } from '@formkit/core'
import type { RadioGroupOption } from '@/components/Form/types'

export default defineComponent({
  name: 'RadioInput',
  props: { context: { type: Object as PropType<FormKitFrameworkContext>, required: true } },
  computed: {
    options(): RadioGroupOption[] {
      return (this.$props.context.options || []).map(i => ({ ...i, value: i.__original || i.value }))
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
    id() {
      return this.$props.context.id
    },
  },
  methods: {
    handleInput(value: unknown) {
      if (this.disabled) return
      this.$props.context.node.input(value)
    },
  },
})
</script>
